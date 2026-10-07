import type { Ordem } from '@/features/preferencias/types';
import type { Armazenamento } from './armazenamento';

export const CHAVE_ORDEM = '@mini-mural:ordem';

export function criarRepositorioDePreferencias(armazenamento: Armazenamento) {
  return {
    async lerOrdem(): Promise<Ordem> {
      const valor = await armazenamento.ler(CHAVE_ORDEM);
      return valor === 'mais-antigos' ? 'mais-antigos' : 'mais-recentes';
    },
    async salvarOrdem(ordem: Ordem): Promise<void> {
      await armazenamento.gravar(CHAVE_ORDEM, ordem);
    },
  };
}

export type RepositorioDePreferencias = ReturnType<
  typeof criarRepositorioDePreferencias
>;
