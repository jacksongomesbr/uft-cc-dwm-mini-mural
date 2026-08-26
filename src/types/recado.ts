export type StatusRecado = 'publicado' | 'arquivado';

export type Recado = {
  id: string;
  texto: string;
  criadoEm: string;
  status: StatusRecado;
  autor?: string;
};
