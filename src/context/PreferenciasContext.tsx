import {
  createContext, useContext, useEffect, useRef, useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Ordem } from '../types/ordem';
const CHAVE_ORDEM = '@mini-mural:ordem';

async function lerOrdem(): Promise<Ordem> {
  const valor = await AsyncStorage.getItem(CHAVE_ORDEM);
  return valor === 'mais-antigos' ? 'mais-antigos' : 'mais-recentes';
}

async function salvarOrdem(ordem: Ordem) {
  await AsyncStorage.setItem(CHAVE_ORDEM, ordem);
}


type Preferencias = {
  ordem: Ordem;
  carregando: boolean;
  salvando: boolean;
  erro: string | null;
  escolherOrdem: (proxima: Ordem) => Promise<void>;
};

const Contexto = createContext<Preferencias | null>(null);

export function PreferenciasProvider(
  { children }: { children: ReactNode }
) {
  const [ordem, setOrdem] = useState<Ordem>('mais-recentes');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const gravacaoEmCurso = useRef(false);

  useEffect(() => {
    let ativo = true;
    lerOrdem()
      .then((valor) => { if (ativo) setOrdem(valor); })
      .catch(() => {
        if (ativo) setErro('Falha ao ler a ordem. Usando mais recentes.');
      })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, []);

  async function escolherOrdem(proxima: Ordem) {
    if (carregando || gravacaoEmCurso.current) return;
    gravacaoEmCurso.current = true;
    setSalvando(true);
    setErro(null);
    try {
      await salvarOrdem(proxima);
      setOrdem(proxima);
    } catch {
      setErro('Não foi possível salvar a ordem. Tente novamente.');
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
