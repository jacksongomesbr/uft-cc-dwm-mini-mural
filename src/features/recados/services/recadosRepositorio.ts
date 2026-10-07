import type { Recado } from '@/features/recados/types';

/** Fronteira de onde os recados vêm. Hoje a lista é fixa; a troca por uma
 *  fonte remota acontece aqui, sem mexer em telas nem em regras. */
export type RecadosRepositorio = {
  listar: () => Recado[];
};

const recadosIniciais: Recado[] = [
  {
    id: '42',
    texto: 'Reunião de equipe na quinta, às 14h.',
    criadoEm: '2026-03-12T14:02:00',
    status: 'publicado',
  },
  {
    id: '7',
    texto: 'A chave da sala 3 está na coordenação.',
    criadoEm: '2026-03-11T09:20:00',
    status: 'publicado',
  },
  {
    id: '3',
    texto: 'Entrega do relatório adiada.',
    criadoEm: '2026-03-10T16:45:00',
    status: 'arquivado',
  },
];

export const recadosEmMemoria: RecadosRepositorio = {
  listar: () => recadosIniciais,
};
