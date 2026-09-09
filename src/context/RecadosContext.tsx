import { createContext, type ReactNode, useContext, useRef, useState } from 'react';
import { recadosIniciais } from '../data/recados';
import type { Recado } from '../types/recado';

type RecadosContexto = {
  recados: Recado[];
  adicionarRecado: (texto: string) => void;
  buscarRecado: (id: string) => Recado | undefined;
  arquivarRecado: (id: string) => void;
};

const ContextoDeRecados = createContext<RecadosContexto | null>(null);

export function RecadosProvider({ children }: { children: ReactNode }) {
  const [recados, setRecados] = useState(recadosIniciais);

  const sequencia = useRef(0);

  function adicionarRecado(texto: string) {
    // Identificador da sessão; a sequência evita colisões no mesmo milissegundo.
    const recado: Recado = {
      id: `local-${Date.now()}-${++sequencia.current}`,
      texto,
      criadoEm: new Date().toISOString(),
      status: 'publicado',
    };
    setRecados((atuais) => [recado, ...atuais]);
  }

  function buscarRecado(id: string) {
    return recados.find((recado) => recado.id === id);
  }

  function arquivarRecado(id: string) {
    setRecados((atuais) => atuais.map((recado) => (
      recado.id === id ? { ...recado, status: 'arquivado' } : recado
    )));
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
