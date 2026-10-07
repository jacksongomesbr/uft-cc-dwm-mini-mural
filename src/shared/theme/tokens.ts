export const cores = {
  fundo: '#f5f5f4',
  superficie: '#ffffff',
  borda: '#d6d3d1',
  texto: '#1c1917',
  textoApoio: '#57534e',
  acao: '#1d4ed8',
  acaoTexto: '#ffffff',
  alerta: '#b45309',
} as const;

export const espacos = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

export const raios = {
  md: 8,
  lg: 12,
} as const;

export const tipografia = {
  titulo: { fontSize: 28, fontWeight: '700' },
  subtitulo: { fontSize: 20, fontWeight: '700' },
  corpo: { fontSize: 16 },
  apoio: { fontSize: 14 },
} as const;

/** Alvo de toque mínimo, em dp: 48 no Android, 44 pontos no iOS. */
export const alvoMinimo = 48;

/** Largura máxima da coluna de conteúdo em telas largas, em dp. */
export const larguraMaximaDoConteudo = 640;

/** Abaixo desta largura, a tela é tratada como estreita. */
export const larguraDeTelaEstreita = 480;
