export const LIMITE_RECADO = 280;

export type ErrosDoRecado = { texto?: string };

export function validarRecado(texto: string): ErrosDoRecado {
  const textoLimpo = texto.trim();
  if (textoLimpo.length === 0) {
    return { texto: 'Escreva o recado antes de publicar.' };
  }
  if (textoLimpo.length > LIMITE_RECADO) {
    return { texto: 'O recado aceita até 280 caracteres.' };
  }
  return {};
}
