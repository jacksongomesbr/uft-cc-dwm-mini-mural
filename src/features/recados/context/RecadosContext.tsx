import { createContext, type ReactNode, useContext, useRef, useState } from 'react';

import {
  encontrarRecado,
  incluirRecado,
  marcarComoArquivado,
} from '@/features/recados/domain/colecaoDeRecados';
import { criarRecado } from '@/features/recados/domain/criarRecado';
import {
  recadosEmMemoria,
  type RecadosRepositorio,
} from '@/features/recados/services/recadosRepositorio';
import type { Recado } from '@/features/recados/types';

type RecadosContexto = {
  recados: Recado[];
  adicionarRecado: (texto: string) => void;
  buscarRecado: (id: string) => Recado | undefined;
  arquivarRecado: (id: string) => void;
};

const ContextoDeRecados = createContext<RecadosContexto | null>(null);

type RecadosProviderProps = {
  children: ReactNode;
  repositorio?: RecadosRepositorio;
};

export function RecadosProvider(
  { children, repositorio = recadosEmMemoria }: RecadosProviderProps
) {
  const [recados, setRecados] = useState(() => repositorio.listar());

  const sequencia = useRef(0);

  function adicionarRecado(texto: string) {
    // Identificador da sessão; a sequência evita colisões no mesmo milissegundo.
    const id = `local-${Date.now()}-${++sequencia.current}`;
    const recado = criarRecado(texto, id, new Date());
    setRecados((atuais) => incluirRecado(atuais, recado));
  }

  function buscarRecado(id: string) {
    return encontrarRecado(recados, id);
  }

  function arquivarRecado(id: string) {
    setRecados((atuais) => marcarComoArquivado(atuais, id));
  }

  return (
    <ContextoDeRecados value={{
      recados, adicionarRecado, buscarRecado, arquivarRecado,
    }}>
      {children}
    </ContextoDeRecados>
  );
}

export function useRecados() {
  const contexto = useContext(ContextoDeRecados);
  if (!contexto) throw new Error('useRecados exige RecadosProvider.');
  return contexto;
}
