import type { Recado } from '../types/recado';

import type { Ordem } from '../types/ordem';

export function ordenarRecados(
  recados: Recado[], ordem: Ordem
): Recado[] {
  const direcao = ordem === 'mais-antigos' ? 1 : -1;
  return [...recados].sort((a, b) =>
    direcao * (Date.parse(a.criadoEm) - Date.parse(b.criadoEm))
  );
}
