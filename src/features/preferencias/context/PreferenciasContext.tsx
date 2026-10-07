import {
  createContext, useContext, useEffect, useRef, useState,
  type ReactNode,
} from 'react';

import { armazenamentoLocal } from '@/features/preferencias/services/armazenamentoLocal';
import {
  criarRepositorioDePreferencias,
  type RepositorioDePreferencias,
} from '@/features/preferencias/services/preferenciasRepositorio';
import type { Ordem } from '@/features/preferencias/types';

const repositorioPadrao = criarRepositorioDePreferencias(armazenamentoLocal);

type Preferencias = {
  ordem: Ordem;
  carregando: boolean;
  salvando: boolean;
  erro: string | null;
  escolherOrdem: (proxima: Ordem) => Promise<void>;
};

const Contexto = createContext<Preferencias | null>(null);

type PreferenciasProviderProps = {
  children: ReactNode;
  repositorio?: RepositorioDePreferencias;
};

export function PreferenciasProvider(
  { children, repositorio = repositorioPadrao }: PreferenciasProviderProps
) {
  const [ordem, setOrdem] = useState<Ordem>('mais-recentes');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const gravacaoEmCurso = useRef(false);

  useEffect(() => {
    let ativo = true;
    repositorio.lerOrdem()
      .then((valor) => { if (ativo) setOrdem(valor); })
      .catch(() => {
        if (ativo) setErro('Falha ao ler a ordem. Usando mais recentes.');
      })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [repositorio]);

  async function escolherOrdem(proxima: Ordem) {
    if (carregando || gravacaoEmCurso.current) return;
    gravacaoEmCurso.current = true;
    setSalvando(true);
    setErro(null);
    try {
      await repositorio.salvarOrdem(proxima);
      setOrdem(proxima);
    } catch {
      setErro('Não foi possível salvar a ordem. Tentem novamente.');
    } finally {
      gravacaoEmCurso.current = false;
      setSalvando(false);
    }
  }

  return (
    <Contexto value={{
      ordem, carregando, salvando, erro, escolherOrdem,
    }}>
      {children}
    </Contexto>
  );
}

export function usePreferencias() {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error('usePreferencias exige PreferenciasProvider.');
  }
  return contexto;
}
