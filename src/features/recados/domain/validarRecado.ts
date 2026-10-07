export type ErrosDoRecado = { texto?: string };

export function validarRecado(texto: string, limite = 280): ErrosDoRecado {
  const textoLimpo = texto.trim();
  if (textoLimpo.length === 0) {
    return { texto: 'Escreva o recado antes de publicar.' };
  }
  if (textoLimpo.length > limite) {
    return { texto: `O recado aceita até ${limite} caracteres.` };
  }
  return {};
}
