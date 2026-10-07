/** O que o repositório exige de um armazenamento. Quem implementa decide
 *  se grava em AsyncStorage, em memória ou em outro lugar. */
export type Armazenamento = {
  ler: (chave: string) => Promise<string | null>;
  gravar: (chave: string, valor: string) => Promise<void>;
};
