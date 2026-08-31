import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { usuarios } from '../../db/schema.js';

export type CadastroUsuarioDto = {
  email: string;
  password: string;
};

export type LoginUsuarioDto = {
  email: string;
  password: string;
};

@Injectable()
export class UsuariosService {
  constructor(private readonly jwtService: JwtService) {}

  find() {
    return db
      .select({
        id: usuarios.id,
        email: usuarios.email,
        createdAt: usuarios.createdAt,
        updatedAt: usuarios.updatedAt,
      })
      .from(usuarios);
  }

  async create({ email, password }: CadastroUsuarioDto) {
    const normalizedEmail = this.normalizeEmail(email);
    this.validatePassword(password);

    try {
      const [usuario] = await db
        .insert(usuarios)
        .values({
          email: normalizedEmail,
          passwordHash: this.hashPassword(password),
        })
        .returning({
          id: usuarios.id,
          email: usuarios.email,
          createdAt: usuarios.createdAt,
          updatedAt: usuarios.updatedAt,
        });

      return usuario;
    } catch (error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException('Já existe um usuário com este e-mail.');
      }

      throw error;
    }
  }

  async login({ email, password }: LoginUsuarioDto) {
    const normalizedEmail = this.normalizeEmail(email);
    const [usuario] = await db
      .select({
        id: usuarios.id,
        email: usuarios.email,
        passwordHash: usuarios.passwordHash,
      })
      .from(usuarios)
      .where(eq(usuarios.email, normalizedEmail));

    if (!usuario || !this.passwordMatches(password, usuario.passwordHash)) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    return {
      accessToken: this.jwtService.sign({
        sub: usuario.id,
        email: usuario.email,
      }),
      tokenType: 'Bearer',
      expiresIn: 3600,
    };
  }

  private normalizeEmail(email: string) {
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      throw new BadRequestException('Informe um e-mail válido.');
    }

    return normalizedEmail;
  }

  private validatePassword(password: string) {
    if (!password || password.length < 8) {
      throw new BadRequestException('A senha deve ter pelo menos 8 caracteres.');
    }
  }

  private hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');

    return `${salt}:${hash}`;
  }

  private passwordMatches(password: string, storedHash: string) {
    const [salt, hash] = storedHash.split(':');

    if (!salt || !hash) {
      return false;
    }

    const actualHash = scryptSync(password, salt, 64);
    const expectedHash = Buffer.from(hash, 'hex');

    return (
      expectedHash.length === actualHash.length &&
      timingSafeEqual(expectedHash, actualHash)
    );
  }

  private isUniqueViolation(error: unknown) {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23505'
    );
  }
}
