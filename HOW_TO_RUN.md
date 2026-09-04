# Como executar o Serviço de Vistoria

Este guia descreve a preparação completa de um computador novo e a execução do
monorepo. O sistema reúne uma API NestJS, um portal administrativo em Next.js,
um aplicativo mobile Expo/React Native e PostgreSQL.

## Sumário

- [Visão geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Obter o código](#obter-o-código)
- [Opção recomendada: Docker](#opção-recomendada-docker)
- [Execução local sem Docker](#execução-local-sem-docker)
- [Aplicativo mobile](#aplicativo-mobile)
- [Verificação da instalação](#verificação-da-instalação)
- [Comandos úteis](#comandos-úteis)
- [Troubleshooting](#troubleshooting)
- [Segurança e limites](#segurança-e-limites)

## Visão geral

| Componente | Diretório | Responsabilidade | Porta padrão |
| --- | --- | --- | --- |
| API | vistoria-back/ | Autenticação, regras de negócio, uploads e persistência | 3001 |
| Portal web | vistoria-web/ | Interface administrativa e rotas BFF para a API | 3000 |
| Aplicativo mobile | vistoria-mobile/ | Operação em campo, foto, localização e fila offline | Expo/Android/iOS |
| Banco de dados | PostgreSQL | Dados, fotos de vistorias e documentos | Interna no Docker |

A composição Docker inicializa quatro serviços:

1. **postgres**: PostgreSQL 17 com volume persistente;
2. **migrate**: processo único que aplica o schema com Drizzle;
3. **api**: API NestJS;
4. **web**: portal Next.js.

O banco não publica a porta 5432 na máquina host. A API e o portal são
acessíveis pelas portas definidas em .env.

O aplicativo mobile não é containerizado. Ele exige SDKs, emuladores ou
dispositivos Android/iOS, câmera, localização e armazenamento nativo. Ainda
assim, ele pode consumir a API iniciada pelo Docker.

## Pré-requisitos

### Para executar com Docker

- Git;
- Docker Desktop atualizado no macOS ou Windows, ou Docker Engine com Docker
  Compose V2 no Linux;
- acesso à internet na primeira execução, para baixar imagens e dependências de
  build.

Confirme a instalação:

~~~bash
git --version
docker --version
docker compose version
~~~

### Para executar sem Docker

- Git;
- Node.js 24 LTS, a mesma versão de referência usada pelas imagens Docker;
- npm;
- PostgreSQL 14 ou superior em execução;
- openssl, recomendado para gerar o segredo JWT;
- para o mobile, Android Studio e emulador/dispositivo Android, ou Xcode e
  dispositivo iOS.

~~~bash
node --version
npm --version
psql --version
openssl version
~~~

Cada aplicação possui seu próprio package.json e package-lock.json. Não existe
um único comando npm na raiz que instale todas as dependências.

## Obter o código

Clone o repositório e entre na pasta raiz:

~~~bash
git clone https://github.com/JoaoGW/Servico-Vistoria.git
cd Servico-Vistoria
~~~

Para atualizar um clone já existente sem criar um merge local não intencional:

~~~bash
git fetch origin
git pull --ff-only
~~~

Se houver alterações locais, salve-as em um commit ou em uma branch antes de
executar a atualização.

## Opção recomendada: Docker

O Docker é o caminho recomendado para subir PostgreSQL, API e portal com
dependências isoladas. O arquivo compose.yaml fica na raiz do repositório.

### 1. Criar o arquivo de ambiente

Na raiz, copie o modelo versionado:

~~~bash
cp .env.example .env
~~~

No PowerShell:

~~~powershell
Copy-Item .env.example .env
~~~

Abra .env e preencha todas as variáveis obrigatórias. Um exemplo local é:

~~~dotenv
POSTGRES_DB=vistoria
POSTGRES_USER=vistoria
POSTGRES_PASSWORD=troque-por-uma-senha-local-forte
DATABASE_URL=postgresql://vistoria:sua-senha-forte@postgres:5432/vistoria
JWT_SECRET=cole-um-segredo-aleatorio-com-pelo-menos-32-caracteres

API_PORT=3001
WEB_PORT=3000

# Opcional. No Docker, o padrão já é http://api:3001.
# APIS_URL=http://api:3001
~~~

Gere um segredo seguro para JWT:

~~~bash
openssl rand -hex 32
~~~

A URL de banco é obrigatória e precisa usar o host **postgres**, que é o nome
do serviço na rede interna Docker. Não use localhost em DATABASE_URL nessa
modalidade.

Mantenha POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD e DATABASE_URL
coerentes. Se usuário ou senha contiverem caracteres reservados de URL, como
@, :, /, ? ou #, aplique percent-encoding apenas na URL. Por exemplo, uma senha
literal com @ deve usar %40 dentro de DATABASE_URL.

O Compose também interpreta o caractere $. Caso uma credencial contenha esse
caractere, envolva o valor correspondente em aspas simples no arquivo .env. A
variável POSTGRES_PASSWORD pode manter o valor literal; a mesma senha deve
aparecer codificada para URL em DATABASE_URL.

APIS_URL é opcional e normalmente deve permanecer comentada. Sem ela, o portal
usa http://api:3001 na rede interna. Não defina APIS_URL como localhost dentro
da composição: para o contêiner web, localhost significa o próprio contêiner,
não a API.

O arquivo .env contém credenciais e é ignorado pelo Git. Nunca o versione ou o
envie por canais não seguros.

### 2. Validar a configuração e iniciar

Valide a composição antes de iniciar os serviços:

~~~bash
docker compose config --quiet
~~~

Se houver uma variável obrigatória ausente, complete o arquivo .env e execute
o comando novamente. Para acompanhar os logs no terminal:

~~~bash
docker compose up --build
~~~

Para deixar os serviços em segundo plano:

~~~bash
docker compose up --build -d
~~~

Na primeira execução, o Docker baixa imagens, instala dependências e cria o
volume do banco. A ordem de inicialização é controlada pela composição:

1. postgres inicia e precisa passar no health check;
2. migrate executa drizzle-kit push;
3. api inicia somente após migrate terminar com sucesso;
4. web inicia após o health check da API.

Confira o estado:

~~~bash
docker compose ps
~~~

É esperado que migrate apareça como exited (0): ele é um serviço de execução
única. postgres, api e web devem permanecer em execução e saudáveis.

### 3. Abrir o sistema

Com os valores padrão de .env:

- Portal web: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3001](http://localhost:3001)

A API não possui uma rota pública exclusiva de health check. O health check do
contêiner consulta GET /usuarios e considera a resposta 401 correta, pois essa
rota exige token Bearer.

Para acompanhar a inicialização:

~~~bash
docker compose logs -f migrate api web
~~~

### 4. Atualizar o schema em desenvolvimento

Depois de alterar vistoria-back/src/db/schema.ts, reconstrua a imagem de
migração e execute-a antes dos serviços dependentes:

~~~bash
docker compose up --build migrate
docker compose up --build -d api web
~~~

O processo usa drizzle-kit push, adequado ao banco local de desenvolvimento.
Para homologação, banco compartilhado ou produção, revise a alteração, gere
migrações versionadas, valide em cópia dos dados e tenha backup antes de
aplicar a mudança.

### 5. Acessar e preservar o banco

O PostgreSQL não possui porta exposta no host por decisão de isolamento. Para
usar psql dentro do contêiner:

~~~bash
docker compose exec postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
~~~

Para gerar um backup SQL no diretório atual:

~~~bash
docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' > vistoria-backup.sql
~~~

Para restaurar o backup, com a composição em execução:

~~~bash
docker compose exec -T postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < vistoria-backup.sql
~~~

O comando abaixo interrompe e remove os contêineres, mas preserva o volume
postgres_data:

~~~bash
docker compose down
~~~

O próximo comando apaga irreversivelmente o banco local junto com o volume:

~~~bash
docker compose down -v
~~~

Use a remoção de volume somente quando nenhum dado de desenvolvimento precisar
ser preservado.

## Execução local sem Docker

Use este modo para depurar processos diretamente no host ou desenvolver o
mobile. O .env da raiz é exclusivo do Docker Compose; cada aplicação local usa
seu próprio arquivo .env.local.

### 1. Criar o banco local

Com PostgreSQL ativo e uma conta administrativa disponível, crie um banco vazio
uma única vez. Ajuste host, porta e usuário à instalação local:

~~~bash
createdb --host localhost --port 5432 --username postgres vistoria
~~~

Se o banco já existir, não repita esse comando. Confirme a URL de conexão antes
de continuar.

### 2. Configurar e iniciar o backend

Crie manualmente o arquivo vistoria-back/.env.local:

~~~dotenv
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/vistoria
JWT_SECRET=cole-um-segredo-aleatorio-com-pelo-menos-32-caracteres
PORT=3001
~~~

DATABASE_URL e JWT_SECRET são obrigatórias. O backend rejeita JWT_SECRET com
menos de 32 caracteres. Se a senha tiver caracteres reservados de URL, use o
valor percent-encoded na URL.

Instale as dependências e sincronize o schema de um banco novo de
desenvolvimento:

~~~bash
cd vistoria-back
npm ci
npx drizzle-kit push
~~~

Há uma migração versionada para adicionar a coluna concluido_em a uma instalação
antiga que já possuía a tabela vistorias. Nessa situação específica, depois de
backup, use:

~~~bash
npx drizzle-kit migrate
~~~

Não use a migração isolada para inicializar um banco vazio: a migração atual
pressupõe que a tabela vistorias já exista. Para banco novo, drizzle-kit push
cria e sincroniza o schema definido em src/db/schema.ts.

Inicie a API:

~~~bash
npm run start:dev
~~~

Com a configuração do exemplo, ela estará em http://localhost:3001.

### 3. Configurar e iniciar o portal web

Crie vistoria-web/.env.local:

~~~dotenv
APIS_URL=http://localhost:3001
~~~

Não inclua barra no fim. A variável é lida pelos Route Handlers do Next.js,
que encaminham as rotas internas /api para a API de domínio.

Instale e inicie:

~~~bash
cd vistoria-web
npm ci
npm run dev
~~~

Abra [http://localhost:3000](http://localhost:3000). O Next.js recarrega o
portal após alterações nos arquivos.

### 4. Configurar o mobile

Crie vistoria-mobile/.env.local:

~~~dotenv
APIS_URL=http://localhost:3001
~~~

Quando a API e o servidor Expo executam na mesma máquina em desenvolvimento,
esse é o ponto de partida correto. O nome api só existe dentro da rede Docker e
não deve ser usado nesse arquivo.

Em dispositivo físico ou quando as API Routes estiverem implantadas, valide qual
processo atende /api e use uma origem alcançável por ele. Isso normalmente exige
IP de rede local ou URL HTTPS publicada, em vez de assumir localhost.

Instale as dependências:

~~~bash
cd vistoria-mobile
npm ci
~~~

O postinstall executa patch-package; aguarde sua conclusão antes de abrir o
Expo.

## Aplicativo mobile

O aplicativo mobile deve ser executado nativamente, mesmo quando a API e o
portal usam Docker. O contêiner não substitui:

- Android Studio, Android SDK e emulador/dispositivo;
- Xcode, dispositivo iOS e assinatura apropriada;
- permissões de câmera e localização;
- SQLite/WatermelonDB e o armazenamento persistente local;
- validação da troca real entre os estados online e offline.

Inicie o Expo:

~~~bash
cd vistoria-mobile
npm run start
~~~

Use as opções do Expo CLI para abrir a development build, emulador ou
dispositivo. Os scripts nativos disponíveis são:

~~~bash
npm run android
npm run run:android
npm run ios
~~~

npm run android inicia o Expo com development client no Android. npm run
run:android exige Android Studio, SDK e emulador ou dispositivo configurados.
npm run ios usa o fluxo nativo do Expo para um dispositivo iOS e requer macOS,
Xcode e configuração de assinatura.

Em builds nativos de produção, as API Routes do Expo Router precisam estar
implantadas e ter uma origem configurada. Subir apenas os contêineres não
publica essas rotas para Android ou iOS.

## Verificação da instalação

### API e banco

Crie uma conta de desenvolvimento depois que a API estiver disponível. Use outro
e-mail se o exemplo já tiver sido cadastrado:

~~~bash
curl --request POST http://localhost:3001/usuarios \
  --header 'Content-Type: application/json' \
  --data '{"email":"dev@example.com","password":"uma-senha-segura"}'
~~~

A resposta esperada é 201 e inclui os dados do usuário. Faça login:

~~~bash
curl --request POST http://localhost:3001/usuarios/login \
  --header 'Content-Type: application/json' \
  --data '{"email":"dev@example.com","password":"uma-senha-segura"}'
~~~

Copie accessToken da resposta e valide uma rota protegida:

~~~bash
curl http://localhost:3001/vistorias \
  --header 'Authorization: Bearer SEU_ACCESS_TOKEN'
~~~

Sem Authorization, GET /vistorias deve retornar 401. Essa resposta é esperada e
confirma que o guard JWT está ativo.

### Portal web

1. Abra http://localhost:3000.
2. Faça login com a conta criada na etapa anterior.
3. Confira o carregamento das listas de vistorias e documentos.
4. Cadastre uma vistoria e confirme que ela aparece na listagem.
5. Envie um PDF ou DOCX de até 10 MB em Documentos e valide sua abertura.

### Mobile e sincronização

1. Entre com a mesma conta usada no portal.
2. Com conexão, execute a sincronização e confirme uma vistoria pendente no
   dispositivo.
3. Selecione a vistoria, conceda as permissões e conclua-a com foto e
   localização.
4. Para testar a fila offline, desative a conexão antes de concluir, realize a
   captura e reative a rede.
5. A pendência deve ser enviada quando a conexão voltar ou quando o usuário
   solicitar sincronização. Confirme no portal que a vistoria foi concluída.

## Comandos úteis

### Docker Compose

~~~bash
docker compose up --build          # constrói e inicia em primeiro plano
docker compose up --build -d       # constrói e inicia em segundo plano
docker compose ps                  # mostra serviços, saúde e portas
docker compose logs -f api web     # acompanha API e portal
docker compose stop                # interrompe sem remover contêineres
docker compose down                # remove contêineres e preserva o banco
docker compose down -v             # remove contêineres e apaga o banco
~~~

### Backend

~~~bash
cd vistoria-back
npm run start:dev   # NestJS com recarga automática
npm run build       # gera dist/
npm run start:prod  # executa dist/main.js
npm run lint        # oxlint
npm test            # Vitest
npm run test:e2e    # testes de integração
~~~

### Portal web

~~~bash
cd vistoria-web
npm run dev
npm run build
npm run start
npm run lint
~~~

O build web usa fontes por next/font/google. O ambiente de build precisa de
acesso a fonts.googleapis.com; em rede bloqueada por proxy ou sem internet, o
build pode falhar.

O lint global percorre também vistoria-web/Design/GlueStackUI Pro, que contém
problemas preexistentes. Para validar somente o portal mantido:

~~~bash
cd vistoria-web
npx eslint app components utils
~~~

### Mobile

~~~bash
cd vistoria-mobile
npm run start
npm run android
npm run run:android
npm run ios
npm run lint
~~~

Os scripts build:android:*, build:ios:* e build:*:cloud em
vistoria-mobile/package.json cobrem fluxos EAS. Eles exigem SDK, credenciais e
configuração Expo/EAS adicionais, portanto não são necessários para a primeira
execução.

## Troubleshooting

### docker compose config informa variável obrigatória ausente

Crie .env na raiz a partir de .env.example e preencha POSTGRES_DB,
POSTGRES_USER, POSTGRES_PASSWORD, DATABASE_URL e JWT_SECRET. Os arquivos
.env.local das aplicações não substituem o .env da raiz.

### migrate falha

Consulte os logs:

~~~bash
docker compose logs migrate
~~~

Verifique se DATABASE_URL usa host postgres, porta 5432 e as mesmas credenciais
configuradas nas variáveis POSTGRES_*. Se o volume já foi criado com credenciais
diferentes, PostgreSQL não troca usuário ou senha automaticamente. Preserve os
dados e corrija a conta, ou recrie apenas o ambiente local com docker compose
down -v quando não houver dados a manter.

### A API fica unhealthy no Docker

Confirme a migração e os logs:

~~~bash
docker compose ps
docker compose logs api
~~~

Uma resposta 401 em GET /usuarios é normal no health check. Há falha apenas se
o contêiner permanecer unhealthy, parar ou reportar erro de configuração,
conexão ou segredo JWT.

### A porta 3000 ou 3001 está ocupada

Altere os mapeamentos públicos no .env do Docker:

~~~dotenv
API_PORT=3002
WEB_PORT=3003
~~~

Reinicie a composição. Internamente, API e portal continuam nas portas 3001 e
3000; externamente, use http://localhost:3002 e http://localhost:3003.

No modo local sem Docker, altere também PORT em vistoria-back/.env.local e os
valores APIS_URL em vistoria-web/.env.local e vistoria-mobile/.env.local.

### O portal não consegue consultar a API

No Docker, não use APIS_URL=http://localhost:3001. Remova APIS_URL para usar o
padrão http://api:3001, ou informe uma URL que seja realmente alcançável pelo
contêiner web. No modo local, use http://localhost:3001 ou a porta definida
para a API.

### O backend local não encontra as variáveis

Confira se o arquivo chama-se exatamente vistoria-back/.env.local e se o
comando foi executado dentro de vistoria-back/. O backend carrega esse arquivo
de forma explícita; o .env da raiz é exclusivo do Docker Compose.

### O mobile não abre ou não acessa a API

Confirme Expo, emulador/dispositivo e a origem usada pelas API Routes.
localhost não representa automaticamente a máquina de desenvolvimento para
todos os processos nativos. Em dispositivo físico, use uma URL LAN ou HTTPS
alcançável pela rota /api e mantenha dispositivo e servidor na mesma rede
quando usar LAN.

Confira também as permissões de câmera e localização. Sem elas, o aplicativo
não consegue registrar a evidência exigida para concluir a vistoria.

### O build web falha ao buscar fontes

Libere acesso a fonts.googleapis.com e execute o build novamente. Em redes
corporativas, configure o proxy de build. Auto-hospedar as fontes é uma melhoria
de produto futura, não parte da configuração atual.

### O cadastro retorna conflito

E-mail é único e a API normaliza letras maiúsculas/minúsculas. Use outro
endereço para teste ou entre com a conta existente.

## Segurança e limites

A composição foi preparada para desenvolvimento e fornece uma base segura, mas
não substitui uma implantação de produção completa.

- API e portal usam imagens Node 24 Alpine multiestágio e executam como usuário
  não privilegiado node.
- O portal usa saída standalone do Next.js, reduzindo os arquivos necessários
  no runtime.
- API e portal usam sistema de arquivos somente leitura, tmpfs restrito para
  diretórios temporários e inicialização com init.
- Os serviços removem capacidades Linux adicionais, ativam
  no-new-privileges e definem limites de memória, CPU e processos.
- O PostgreSQL fica na rede interna database e não expõe 5432 ao host. O portal
  não participa dessa rede.
- Credenciais e JWT ficam apenas no .env local. Em produção, use gerenciador de
  segredos, rotação de credenciais, TLS, proxy reverso, backups testados e
  observabilidade.
- Fotos, coordenadas e documentos podem ser dados sensíveis. Antes da
  publicação, defina autorização por recurso, retenção, auditoria, backup e
  exclusão.

Mantenha imagens e dependências atualizadas e inclua varredura de
vulnerabilidades em CI/CD. Docker reduz diferenças entre máquinas, mas não
elimina a necessidade de atualização, monitoramento e política de migrações
controlada.
