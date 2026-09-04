import { BadRequestException, ConflictException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { VistoriasController } from './vistorias.controller.js';
import type { VistoriasService } from '../../services/vistorias/vistorias.service.js';

const vistoriaVencedora = {
  id: 'b1a1bcaa-0000-4000-8000-000000000001',
  userId: 'b1a1bcaa-0000-4000-8000-000000000002',
  description: 'Instalação',
  photoMimeType: 'image/jpeg',
  latitude: -23.5,
  longitude: -46.6,
  pendente: false,
  completedAt: new Date('2026-09-03T12:00:00.000Z'),
  createdAt: new Date('2026-09-03T10:00:00.000Z'),
  updatedAt: new Date('2026-09-03T12:00:00.000Z'),
};

function criarController(resultado: unknown) {
  const service = {
    update: vi.fn().mockResolvedValue(resultado),
  };

  return {
    controller: new VistoriasController(service as unknown as VistoriasService),
    service,
  };
}

describe('VistoriasController.update', () => {
  it('exige completedAt ISO-8601 ao concluir uma vistoria', async () => {
    const { controller } = criarController({
      tipo: 'atualizada',
      vistoria: vistoriaVencedora,
    });

    await expect(
      controller.update(vistoriaVencedora.id, {
        pendente: 'false',
        latitude: '-23.5',
        longitude: '-46.6',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('encaminha a data capturada ao serviço de conclusão', async () => {
    const { controller, service } = criarController({
      tipo: 'atualizada',
      vistoria: vistoriaVencedora,
    });

    await controller.update(vistoriaVencedora.id, {
      completedAt: '2026-09-03T12:00:00.000Z',
      pendente: 'false',
      latitude: '-23.5',
      longitude: '-46.6',
    });

    expect(service.update).toHaveBeenCalledWith(
      vistoriaVencedora.id,
      expect.objectContaining({
        completedAt: new Date('2026-09-03T12:00:00.000Z'),
        pendente: false,
      }),
      undefined,
    );
  });

  it('expõe o conflito com os dados vencedores', async () => {
    const { controller } = criarController({
      tipo: 'conflito',
      vistoria: vistoriaVencedora,
    });

    const erro = await controller
      .update(vistoriaVencedora.id, {
        completedAt: '2026-09-03T12:01:00.000Z',
        pendente: 'false',
        latitude: '-23.5',
        longitude: '-46.6',
      })
      .catch((motivo: unknown) => motivo);

    expect(erro).toBeInstanceOf(ConflictException);
    expect((erro as ConflictException).getResponse()).toMatchObject({
      code: 'INSPECTION_COMPLETION_CONFLICT',
      vistoria: vistoriaVencedora,
    });
  });
});
