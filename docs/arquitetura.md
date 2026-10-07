# Decisões de arquitetura

Registro das fronteiras criadas no capítulo 8. Cada linha diz o que mudou de
lugar, qual responsabilidade ficou em cada lado e o que a equipe ganhou. O
comportamento do aplicativo não mudou.

## Camadas e regra de dependência

| Camada | Pastas | Pode importar | Não pode importar |
|---|---|---|---|
| Apresentação | `src/app`, `components`, `hooks`, `context` | domínio, serviços, `shared` | |
| Domínio | `domain` | tipos | React, Expo, AsyncStorage, hooks, componentes, serviços |
| Acesso a dados | `services` | tipos | React, Expo (exceto `armazenamentoLocal.ts`) |

Entre funcionalidades: `recados` importa `preferencias`, nunca o contrário.
`shared` não importa nenhuma funcionalidade. O teste `tests/arquitetura.test.mjs`
confere essas regras.

## Decisões

| # | Decisão | Motivo | Custo |
|---|---|---|---|
| 1 | Código organizado por funcionalidade (`features/recados`, `features/preferencias`), fora de `src/app` | Expo Router trata todo arquivo de `src/app` como rota | Mais pastas para um app pequeno |
| 2 | `criarRecado`, `incluirRecado`, `marcarComoArquivado`, `encontrarRecado`, `resumirRecados` saem do contexto e do componente para `domain/` | Regras que não dependem de React passam a ter teste sem tela | Uma indireção a mais para ler `RecadosContext` |
| 3 | `criarRecado` recebe `id` e `agora` | A função fica pura; relógio e contador continuam no contexto | Quem chama passa dois argumentos |
| 4 | `useNovoRecado` recebe o estado e as regras do formulário; `NovoRecado` só desenha | O componente ficou com estilo e árvore; a regra de quando mostrar erro mora em um lugar | Para ler o formulário, abrem-se dois arquivos |
| 5 | `useMural` junta recados, ordem e estado da preferência | A tela não conhece dois contextos nem chama `ordenarRecados` | Hook com um único consumidor |
| 6 | `preferenciasRepositorio` depende da interface `Armazenamento`; `armazenamentoLocal.ts` é o único arquivo que importa AsyncStorage | Os testes usam um armazenamento falso e exercitam as falhas de leitura e gravação | Uma interface e um arquivo a mais |
| 7 | `recadosRepositorio` guarda os recados de exemplo atrás de `listar()` | Quando os recados vierem de uma API, a troca de fonte começa nesse arquivo | Hoje a interface é síncrona e só tem uma implementação |
| 8 | `formatarHora` e `formatarDataHora` ficam em `shared/formatacao/data.ts` com a saída anterior | Os dois formatos continuam diferentes; a mudança é de lugar, não de comportamento | |

## Deixado como está, de propósito

- `PreferenciasContext` mantém a lógica de carregar e salvar. Extrair um hook
  teria um só chamador e esconderia o `useEffect` sem simplificar nada.
- `screenOptions` aparece em `app/_layout.tsx` e em `(mural)/_layout.tsx` com o
  mesmo conteúdo. As duas pilhas mudam por motivos diferentes: o cabeçalho da
  raiz só aparece na rota de erro, e o do mural, no detalhe.
- `Separador` e os estilos continuam em cada arquivo. Nenhum outro componente os
  usa.
- `sobre.tsx` mantém a lista de opções de ordem. Ela descreve a tela, não o
  domínio.
