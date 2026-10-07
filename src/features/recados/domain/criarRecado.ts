import type { Recado } from '@/features/recados/types';

/** Todo recado nasce publicado. O id e o instante vêm de fora, para a
 *  função continuar pura e testável sem relógio. */
export function criarRecado(texto: string, id: string, agora: Date): Recado {
  return {
    id,
    texto,
    criadoEm: agora.toISOString(),
    status: 'publicado',
  };
}
