---
colors:
  brand:
    navy: "#1E274A"
    cyan: "#00C8E0"
    red: "#C8353F"
  surfaces:
    app: "#F2F4F8"
    card: "#FFFFFF"
    telemetry: "#090D14"
  text:
    primary: "#11181C"
    muted: "#687076"
    inverse: "#ECEDEE"
  feedback:
    success: "#22C55E"
    warning: "#F5C518"
    danger: "#C8353F"
spacing:
  base: 4
  scale: [4, 8, 12, 16, 24, 32, 40]
radii:
  sm: 4
  md: 8
  lg: 16
  xl: 24
---

# DESIGN.md — Padrões de Design do ECU Pro Max

## Onde encontrar os arquivos da biblioteca PRO do GlueStack UI

Navegue até a pasta Design/ que fica na raíz de todo repositório e veja todo o
conteúdo que estiver dentro do ficheiro com nome similar a "Gluestack UI PRO".

## 1. Propósito e princípios norteadores

O ECU Pro Max é um painel técnico para conectar, monitorar e configurar ECUs
Multscan. A interface é usada perto da motocicleta, com luz variável, conexão
instável e operações que podem alterar o comportamento do veículo. Portanto,
o produto deve parecer uma ferramenta técnica confiável — não um dashboard
genérico nem uma interface de entretenimento.

1. **Segurança antes da velocidade.** Alterar mapa, corte, bloqueio, firmware
   ou calibrar sensores exige contexto, valor atual, consequência e confirmação
   explícita quando a operação for relevante ou destrutiva.
2. **Estado do dispositivo sempre visível.** Conexão BLE, ECU selecionada,
   sincronização de mapas, permissões e carregamentos devem ser comunicados
   antes da ação depender deles. Nunca simular sucesso enquanto uma escrita na
   ECU ainda estiver pendente.
3. **Leitura imediata em campo.** Priorizar números, unidade e tendência em
   telemetria; rótulos claros e contraste alto em mapas, diagnósticos e
   configurações. O usuário deve compreender o estado com uma olhada rápida.
4. **Mobile-first, com web de apoio.** A experiência principal é Android/iOS,
   operável com uma mão e alvos generosos. A web serve visualização,
   desenvolvimento e fallbacks; telas densas podem aproveitar largura extra sem
   sacrificar a hierarquia do mobile.
5. **Progressão por camadas.** Exibir primeiro o essencial e revelar detalhes
   técnicos em modal, accordion, tela secundária ou modo de edição. Não ocultar
   alertas críticos nem criar fluxos longos para ações frequentes.
6. **Consistência multilíngue.** Todo texto visível deve usar `useI18n` e os
   dicionários em `languages/`. Não introduzir strings fixas em Português nas
   telas compartilhadas.

## 2. Contextos de interface

| Contexto      | Objetivo                                        | Linguagem visual                                                                            |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Autenticação  | Entrar, cadastrar ou recuperar acesso           | Fundo escuro, marca Multscan em destaque, formulário direto e CTA azul.                     |
| Home          | Ver conexão, ECU atual e acessos rápidos        | Superfícies claras, cabeçalho azul-marinho e cards de operação.                             |
| Mapas         | Criar, selecionar, editar e aplicar calibrações | Formulários e gráficos legíveis; mudança pendente e mapa aplicado claramente distintos.     |
| Telemetria    | Acompanhar dados e sessão em tempo real         | Painel escuro, leitura numérica de alto contraste e cores reservadas para séries/destaques. |
| Diagnósticos  | Ler e limpar falhas presentes ou históricas     | Severidade explícita, lista escaneável e ações irreversíveis protegidas.                    |
| Configurações | Conta, ECU, idioma, suporte e manutenção        | Lista de opções com ícone, rótulo e consequência; manutenção em área separada.              |

## 3. Tokens visuais

`src/constants/theme.ts` é a referência de tokens de runtime; `src/global.css`
mantém as famílias de fonte expostas para web; e `tailwind.config.js` mapeia os
tokens das primitivas. Novos valores devem nascer nesta seção e, em seguida,
serem centralizados nesses arquivos — não em hexadecimais isolados na tela.

### 3.1 Cores

| Token recomendado   | Valor atual | Uso                                                               |
| ------------------- | ----------- | ----------------------------------------------------------------- |
| `brand.navy`        | `#1E274A`   | Cabeçalho, CTA técnico, títulos e elementos estruturais.          |
| `brand.cyan`        | `#00C8E0`   | Destaque de telemetria, foco técnico e séries de gráfico.         |
| `feedback.danger`   | `#C8353F`   | Erro, bloqueio, falha de diagnóstico e ações destrutivas.         |
| `feedback.success`  | `#22C55E`   | Sucesso confirmado, conexão estável e estado operacional normal.  |
| `feedback.warning`  | `#F5C518`   | Atenção, limite, valor próximo de faixa crítica ou ação pendente. |
| `surface.app`       | `#F2F4F8`   | Fundo de telas operacionais claras.                               |
| `surface.card`      | `#FFFFFF`   | Cards, formulários, listas e modais claros.                       |
| `surface.telemetry` | `#090D14`   | Painel e área de dados em tempo real.                             |
| `text.primary`      | `#11181C`   | Texto principal em superfícies claras.                            |
| `text.muted`        | `#687076`   | Rótulos auxiliares e metadados.                                   |
| `text.inverse`      | `#ECEDEE`   | Texto em superfícies escuras.                                     |

As cores de `Colors.gauge` só devem identificar séries distintas ou faixas de
leitura. Não devem indicar sucesso, erro ou seleção por conta própria. Todo
status precisa de texto e, quando útil, ícone — nunca apenas cor.

### 3.2 Tipografia

- Interface geral: família sans nativa do dispositivo (`Fonts.sans`) para
  desempenho e legibilidade. Na web, usar as variáveis de `src/global.css`.
- Dados críticos: números tabulares/monoespaçados quando o alinhamento melhora
  a leitura; unidades sempre próximas ao valor (`RPM`, `km/h`, `°C`, `%`).
- Gráficos Skia: usar os arquivos BJCree já presentes em `assets/fonts/BJCree/`
  somente onde a renderização do gráfico exigir uma fonte carregável.
- Hierarquia mínima: título de tela 28–32px; título de seção 20–24px; corpo
  16px; label auxiliar 12–14px. Campos editáveis nunca abaixo de 16px.
- Pesos: 700 para títulos, valores críticos e CTA; 600 para rótulos de card;
  400–500 para texto de apoio. Evitar caixa alta em textos longos.

### 3.3 Espaçamento, raio e elevação

- Grade de 4px: `4, 8, 12, 16, 24, 32, 40px`. O espaçamento padrão de uma tela
  é 16px; seções independentes são separadas por 24px ou mais.
- Raios: 8px para controles compactos, 12–16px para cards, inputs e botões,
  24px para superfícies de destaque. Botões em pílula são reservados para CTAs
  de autenticação e não são o padrão de todas as ações técnicas.
- Elevação: utilizar sombras discretas em superfícies claras. Em telemetria,
  separar blocos por borda/contraste antes de usar sombra.
- Conteúdo centralizado na web pode usar `MaxContentWidth` de 800px; o layout
  continua fluido e rolável em telas menores.

## 4. Navegação e composição

As abas principais refletem as tarefas recorrentes: **Home, Mapas, Telemetria,
Diagnósticos e Configurações**. Login, cadastro e recuperação de senha não
aparecem na barra de abas. O cabeçalho global conduz à Home e às configurações
de perfil; ele não deve esconder o nome da tela, o estado da ECU ou uma ação
crítica da rota atual.

- Use `PageBase` para telas de aplicação que precisam de cabeçalho, área segura
  e rolagem controlada.
- Em modal, apresente título, explicação curta, estado de carregamento e saída
  evidente. `AppModal` deve ser usado para preservar o ciclo correto de
  fechamento nativo, especialmente no iOS.
- Preserve a navegação atual da aba ao abrir detalhes. Para tarefas longas
  (criação/edição de mapa, atualização de ECU), prefira páginas ou modais
  paginados com progresso visível.
- O botão voltar deve cancelar apenas a navegação. Se existirem alterações não
  salvas, pedir confirmação antes de descartá-las.

## 5. Padrões de componentes

### 5.1 Botões e ações

- CTA principal: altura mínima de 48px (preferencialmente 52–56px), ícone
  quando ele reduz ambiguidade, rótulo com verbo e estado `loading` enquanto a
  operação estiver em curso.
- Ações de navegação e ajustes comuns usam `ButtonRoutes`, `ButtonModals` ou
  outra primitiva em `components/Buttons/`; não recriar card-botão em cada
  tela.
- Ações perigosas usam vermelho e texto explícito: “Aplicar mapa”, “Limpar
  histórico”, “Bloquear ECU”, “Restaurar” ou “Atualizar ECU”. Não usar apenas
  “Confirmar” quando o objeto da ação puder ser incluído no rótulo.
- Desabilitar a ação explica o motivo: por exemplo, “Conecte à ECU para aplicar
  o mapa”, em vez de deixar um botão inerte.

### 5.2 Cards e listas

- Um card representa uma unidade de decisão: uma ECU, um mapa, um diagnóstico,
  uma leitura ou um atalho. Não usar cards apenas como decoração.
- Ordem interna: ícone/indicador, título, valor ou estado principal, detalhe
  curto e ação. Informação mais importante vem antes da descrição.
- Listas de falhas e mapas devem permitir varredura visual: nome, estado, data
  ou referência técnica e ação contextual.
- Estados vazios incluem causa e próximo passo. Ex.: “Nenhum mapa salvo” +
  “Criar mapa” ou “Nenhuma falha presente” + confirmação visual de normalidade.

### 5.3 Formulários, seleção e stepper

- Cada campo tem label persistente, unidade/formato esperado e validação junto
  ao campo. Placeholder não substitui label.
- O `StepperInput` é apropriado para parâmetros numéricos com passo conhecido;
  exibir valor, unidade, faixa válida e qualquer limite de segurança.
- Use rádio para escolhas exclusivas pequenas, switch para liga/desliga
  imediato e select/modal para catálogos maiores. Mudanças que escrevem na ECU
  não podem ocorrer apenas ao alternar um switch sem feedback de confirmação.
- Ao editar um mapa, diferenciar visualmente valor original, rascunho local e
  valor efetivamente aplicado na ECU.

### 5.4 Modais e feedback

- `SuccessModal`, `ErrorModal`, `SecurityAlertModal` e `FeedbackModalHost`
  devem representar o resultado real do serviço, não somente o clique.
- Confirmação crítica mostra: ação, ECU/mapa alvo, consequência e opções de
  voltar/confirmar. A confirmação deve ficar desabilitada durante envio BLE.
- Toast é complementar para sucesso breve; erros que exigem decisão ou
  recuperação devem permanecer visíveis em modal/banner.
- Falha de rede/BLE deve informar se o comando não foi enviado, falhou ou teve
  resultado desconhecido. Quando o resultado for desconhecido, orientar nova
  leitura antes de tentar novamente.

## 6. Padrões por fluxo

### 6.1 Conexão e ECU selecionada

O estado de conexão é uma informação de primeira classe. Exibir o nome ou
número de série da ECU ativa e um destes estados: **desconectada**,
**solicitando permissão**, **procurando**, **conectando**, **conectada**,
**reconectando** ou **erro**. Não permitir comandos que dependem de BLE antes
de a conexão estar pronta.

Durante scan ou escrita, usar spinner/progresso e uma ação de cancelar quando
isso for seguro. Uma desconexão deve preservar rascunhos locais e tornar clara
a diferença entre conteúdo salvo localmente e conteúdo sincronizado.

### 6.2 Home

Priorizar: ECU ativa, botão de conectar/desconectar, condição de bloqueio,
modelo de moto e atalhos para os ajustes usados com frequência. Cards de
pipoco, corte e modelo devem indicar o estado atual e nunca depender apenas do
ícone para serem compreendidos.

### 6.3 Mapas e calibração

- A criação mostra etapas curtas: identificação do mapa, veículo e parâmetros.
- “Meus mapas”, compartilhados/pendentes, mapa selecionado e mapa aplicado na
  ECU são estados diferentes e devem ter rótulos próprios.
- Antes de aplicar, resumir nome do mapa, modelo/ECU alvo e campos alterados.
- Durante transferência BLE, bloquear alterações concorrentes e mostrar
  progresso. O `CloudSaveIndicator` e as filas de sincronização comunicam a
  persistência remota, mas não substituem a confirmação de aplicação na ECU.
- Em gráficos de injeção e ignição, manter escala, eixos, unidade, legenda e
  valor selecionado legíveis. Série selecionada deve ganhar destaque além da
  cor; não comprimir controles a ponto de impedir ajustes precisos.

### 6.4 Telemetria

Telemetria é uma área de foco: fundo escuro, números grandes, unidade clara e
baixa ambiguidade. RPM e velocidade são prioritários; cartões auxiliares
mostram somente parâmetros selecionados. Os controles iniciar, pausar e parar
devem ter estados mutuamente exclusivos e texto sempre visível.

Ao encerrar uma sessão, apresentar resumo de duração, RPM máximo, velocidade
máxima, parâmetros registrados e rota quando disponível. A geração do PDF deve
mostrar progresso e manter os dados da sessão até a operação concluir ou
falhar.

### 6.5 Diagnósticos

Separar falhas presentes de histórico. Cada ocorrência mostra código, label
traduzida, estado e orientação quando existente. “Limpar histórico” exige
confirmação porque é uma operação destrutiva; não aplicar essa mesma linguagem
de risco a uma simples consulta.

### 6.6 Atualização e manutenção de ECU

Fluxos de firmware, Wi‑Fi, restauração e debug precisam de uma tela focada:
pré-requisitos, aviso para não desligar a ECU, percentual/etapa, resultado e
rota de recuperação em caso de falha. Evitar dismiss acidental enquanto houver
operação que possa deixar o processo em estado indeterminado.

## 7. Iconografia e gráficos

- Usar `lucide-react-native` para ícones utilitários. Tamanho usual: 20–24px
  em linha, 24–28px em ação e 48px ou mais para estado vazio/alerta.
- Ícone complementa texto; ícones de motor, mapa, Bluetooth, cadeado e alerta
  não devem ser a única indicação de estado.
- Para gráficos, manter cores consistentes entre legenda, linha e controle:
  ciano para série técnica principal, vermelho para limite/alerta e cores
  adicionais apenas para séries simultâneas. Garantir alternativa textual para
  usuários que não distinguem as cores.
- Não usar ilustrações lúdicas nem imagens decorativas em telas de operação.
  Imagens de moto e marca são adequadas para home, onboarding e autenticação
  quando não competirem com ações técnicas.

## 8. Motion, carregamento e conectividade

| Situação               | Comportamento                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| Pressionar controle    | Escala/realce curto, até 150ms; não mascarar a espera do serviço.                           |
| Navegar ou abrir modal | Transição nativa breve, cerca de 200–250ms.                                                 |
| Ler telemetria         | Atualizar sem animação excessiva; mudanças críticas podem usar realce curto.                |
| Enviar BLE ou salvar   | Estado de carregamento contínuo, alvo bloqueado contra toque duplicado e mensagem de etapa. |
| Reconectar/sincronizar | Banner ou indicador persistente com o estado e nova tentativa quando suportada.             |
| Sucesso/erro           | Feedback imediato; toast breve apenas quando nenhuma decisão adicional for necessária.      |

Respeitar a redução de movimento do sistema quando a plataforma oferecer esse
sinal. Não usar animações elásticas em operações de segurança ou telemetria.

## 9. Acessibilidade e robustez

- Contraste mínimo AA (4.5:1 em texto normal); validar especialmente texto
  colorido sobre azul-marinho, vermelho e superfícies de telemetria.
- Alvo de toque mínimo de 44×44px; ações recorrentes de campo preferem 48px.
- Foco visível na web e ordem de foco coerente em modais/formulários.
- Não depender de hover, gesto exclusivo ou cor. Expor labels acessíveis para
  botões só com ícone e fornecer confirmação textual de estado.
- Manter conteúdo utilizável com fonte ampliada: labels podem quebrar linha e
  valores críticos não podem ser truncados silenciosamente.
- Permissões de Bluetooth, localização e arquivos/PDF devem explicar por que
  são solicitadas e oferecer um caminho de recuperação quando negadas.
- Rascunhos de mapas e dados locais não devem ser descartados por queda de
  conexão, troca de orientação ou fechamento de modal. Informar claramente o
  que ainda não foi sincronizado.

## 10. Contrato de implementação

Este documento orienta toda nova interface e refatoração visual. Ele não exige
reescrever automaticamente componentes legados que ainda usam valores locais;
quando um componente for tocado, sua mudança deve aproximá-lo destes padrões e
dos tokens compartilhados.

1. Reutilizar primitivas em `components/ui/`, `components/Buttons/`,
   `components/Modals/` e `components/Basics/` antes de criar uma variante.
2. Centralizar tokens novos em `src/constants/theme.ts`, `src/global.css` ou
   `tailwind.config.js`, conforme a plataforma que os consome.
3. Cobrir os estados necessários: normal, pressionado, desabilitado,
   carregando, vazio, erro, desconectado e sucesso confirmado.
4. Para cada escrita em ECU, validar alvo, conexão, faixa dos valores,
   confirmação adequada e resultado retornado pelo serviço.
5. Para cada ajuste visual, verificar Android, iOS e web/fallback quando a
   tela possuir implementação específica (`*.web.tsx`).
6. Não introduzir dados fictícios, métricas decorativas, CTAs ambíguos ou
   textos não traduzidos em telas de produção.

### Checklist de aceite visual

- A tarefa principal da tela é identificável em poucos segundos?
- A ECU e o estado de conexão estão claros quando forem relevantes?
- Valores possuem label, unidade e faixa/risco quando aplicável?
- A ação crítica identifica o alvo e o resultado real da operação?
- O layout funciona com toque, fonte ampliada, contraste adequado e teclado na
  web?
- Tokens, componentes e traduções compartilhados foram reutilizados?
