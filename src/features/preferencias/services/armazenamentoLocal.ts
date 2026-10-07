import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Armazenamento } from './armazenamento';

/** Único arquivo do app que conhece o AsyncStorage. */
export const armazenamentoLocal: Armazenamento = {
  ler: (chave) => AsyncStorage.getItem(chave),
  gravar: (chave, valor) => AsyncStorage.setItem(chave, valor),
};
