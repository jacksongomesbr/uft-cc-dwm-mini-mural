import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';

import { validarRecado } from '@/features/recados/domain/validarRecado';

/** Estado e regras do formulário de recado. O componente só desenha. */
export function useNovoRecado(
  onPublicar: (texto: string) => void,
  limite: number,
) {
  const [texto, setTexto] = useState('');
  const [tocouNoCampo, setTocouNoCampo] = useState(false);
  const campoRef = useRef<TextInput>(null);
  const erro = tocouNoCampo ? validarRecado(texto, limite).texto : undefined;

  const restantes = limite - texto.length;
  const proximoDoLimite = restantes <= 20;

  function aoSairDoCampo() {
    setTocouNoCampo(true);
  }

  function publicar() {
    setTocouNoCampo(true);
    if (validarRecado(texto, limite).texto) {
      campoRef.current?.focus();
      return;
    }

    onPublicar(texto.trim());
    setTexto('');
    setTocouNoCampo(false);
  }

  return {
    texto, setTexto, campoRef, erro,
    restantes, proximoDoLimite, aoSairDoCampo, publicar,
  };
}
