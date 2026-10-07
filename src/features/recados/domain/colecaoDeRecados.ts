import type { Recado } from '@/features/recados/types';

export function incluirRecado(recados: Recado[], novo: Recado): Recado[] {
  return [novo, ...recados];
}

export function marcarComoArquivado(recados: Recado[], id: string): Recado[] {
  return recados.map((recado) => (
    recado.id === id ? { ...recado, status: 'arquivado' } : recado
  ));
}

export function encontrarRecado(
  recados: Recado[], id: string
): Recado | undefined {
  return recados.find((recado) => recado.id === id);
}

export function resumirRecados(recados: Recado[]) {
  const publicados = recados.filter(
    (recado) => recado.status === 'publicado',
  ).length;
  return { publicados, arquivados: recados.length - publicados };
}
