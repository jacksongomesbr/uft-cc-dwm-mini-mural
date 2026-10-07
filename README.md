# Mini Mural

Projeto de acompanhamento da disciplina de Desenvolvimento Web e Mobile
(UFT), construído com [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction)
+ React Native + TypeScript.

O código evolui capítulo a capítulo do livro-texto do curso
([uft-cc-dwm](https://github.com/jacksongomesbr)). Cada branch congela o
estado do app no ponto em que o capítulo correspondente o deixa. `main`
sempre aponta para o capítulo mais recente.

## Branches

| Branch | Capítulo | Conteúdo |
|---|---|---|
| `capitulo-3` | 2 e 3: Ambiente, Git, TypeScript/JavaScript | Mini Mural em arquivo único (`src/app/index.tsx`), estado local com `useState`, sem componentes próprios. |
| `capitulo-4` | 4: Fundamentos de React aplicados ao React Native | Mesmo app recomposto em componentes com propriedades tipadas (`ItemDoMural`, `NovoRecado`, `ResumoDoMural`), estado elevado à tela, e a funcionalidade de arquivar um recado. |
| `capitulo-5` | 5: Interfaces com React Native | Mesmo app com tema em `src/theme/tokens.ts`, cartão reutilizável com `children`, área segura, ajuste ao teclado, coluna de largura máxima e alvos de toque de 48 dp. |
| `capitulo-6` | 6: Navegação universal e deep links | Mural com abas, tela de detalhe por endereço, rota de erro e esquema `minimural://`. |
| `capitulo-7` | 7: Formulários e estado compartilhado | Validação, recados em Context e preferência de ordem persistida com AsyncStorage. |
| `capitulo-8` | 8: Arquitetura e modularização | Mesmo comportamento, reorganizado por funcionalidade, com domínio puro, hooks próprios e armazenamento atrás de uma interface. Decisões em `docs/arquitetura.md`. |
| `main` | (aponta para o capítulo mais recente) | Sempre igual ao branch do capítulo mais recente. |

## Rodar o projeto

```bash
npm install
npx expo start
```

No terminal do Expo, escolha abrir em development build, emulador
Android, simulador iOS ou Expo Go.

Para conferir o tipo do código sem executar:

```bash
npx tsc --noEmit
```

## Estrutura (branch `capitulo-8`)

```text
src/
├── app/                        # Só rotas e layouts; sem regra de negócio
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx         # PreferenciasProvider + abas
│   │   ├── (mural)/
│   │   │   ├── _layout.tsx     # RecadosProvider + pilha do mural
│   │   │   ├── index.tsx       # Mural (usa useMural)
│   │   │   └── recado/[id].tsx # Detalhe de um recado
│   │   └── sobre.tsx           # Informações e preferência de ordem
│   └── +not-found.tsx
├── features/
│   ├── recados/
│   │   ├── components/         # ItemDoMural, NovoRecado, ResumoDoMural
│   │   ├── context/            # RecadosContext
│   │   ├── domain/             # validarRecado, ordenarRecados, criarRecado, colecaoDeRecados
│   │   ├── hooks/              # useMural, useNovoRecado
│   │   ├── services/           # recadosRepositorio
│   │   └── types.ts            # Recado e StatusRecado
│   └── preferencias/
│       ├── context/            # PreferenciasContext
│       ├── services/           # armazenamento, preferenciasRepositorio, armazenamentoLocal
│       └── types.ts            # Ordem
└── shared/
    ├── components/Cartao.tsx
    ├── formatacao/data.ts
    └── theme/tokens.ts
docs/
└── arquitetura.md              # Decisões e custo de cada fronteira
tests/
├── domain.test.mjs             # Regras puras
├── servicos.test.mjs           # Repositórios com armazenamento falso
└── arquitetura.test.mjs        # Regras de dependência entre pastas
```

## Conferir o capítulo 8

```bash
npm test
npx tsc --noEmit
npx expo export --platform web
```

O comportamento é o do capítulo 7. Publiquem, arquivem, abram o detalhe, mudem a
ordem em Sobre e recarreguem; nada disso mudou. O que mudou foi o lugar de cada
responsabilidade. Leiam `docs/arquitetura.md` e rodem `npm test`: o arquivo
`tests/arquitetura.test.mjs` falha se uma regra de dependência for quebrada, por exemplo
um arquivo de `domain/` importando `react-native`.

## Conferir o capítulo 7

```bash
npm test
npx tsc --noEmit
npx expo export --platform web
```

O formulário aceita até 280 caracteres e mantém Enter como quebra de linha.
Publicar vazio mostra uma mensagem e devolve o foco ao campo. O botão permanece
habilitado para permitir essa orientação.

Publiquem um recado, abram seu detalhe e arquivem-no. Confiram a mudança também
na lista. Em Sobre, mudem a ordem e esperem a gravação terminar. Recarreguem o
aplicativo e confiram a preferência restaurada.

Os recados existem somente na sessão. Recarregar ou abrir outra aba restaura os
exemplos iniciais; um endereço de recado criado na sessão anterior pode mostrar
recurso ausente. AsyncStorage persiste somente a preferência de ordem.

Uma falha de leitura libera a lista com a ordem padrão e uma mensagem. Uma falha
de gravação mantém a preferência anterior e permite repetir a escolha. As ações
ficam bloqueadas durante a leitura e a gravação.

Confiram teclado e anúncio de erro com TalkBack ou VoiceOver no aparelho. O erro
aparece em texto e no rótulo acessível; a seleção da ordem usa o estado `checked` e `aria-checked` para a versão web.
