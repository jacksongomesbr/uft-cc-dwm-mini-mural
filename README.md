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

## Estrutura (branch `main`, capítulo 4)

```text
src/
├── app/
│   ├── _layout.tsx    # Stack de rotas (Expo Router)
│   └── index.tsx      # Tela: estado elevado (recados) + publicar/arquivar
├── components/
│   ├── NovoRecado.tsx     # Campo de digitação (estado próprio)
│   ├── ItemDoMural.tsx    # Um recado (sem estado)
│   └── ResumoDoMural.tsx  # Contagem de publicados/arquivados (derivado)
└── types/
    └── recado.ts       # Tipo Recado e StatusRecado
```
