import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CHAVE_ORDEM,
  criarRepositorioDePreferencias,
} from '../src/features/preferencias/services/preferenciasRepositorio.ts';
import { recadosEmMemoria } from '../src/features/recados/services/recadosRepositorio.ts';

function armazenamentoFalso(inicial = {}) {
  const dados = new Map(Object.entries(inicial));
  return {
    dados,
    ler: async (chave) => dados.get(chave) ?? null,
    gravar: async (chave, valor) => { dados.set(chave, valor); },
  };
}

const armazenamentoQueFalha = {
  ler: async () => { throw new Error('leitura'); },
  gravar: async () => { throw new Error('gravação'); },
};

test('sem valor gravado, a ordem é a mais recente', async () => {
  const repositorio = criarRepositorioDePreferencias(armazenamentoFalso());
  assert.equal(await repositorio.lerOrdem(), 'mais-recentes');
});

test('valor desconhecido também cai na ordem mais recente', async () => {
  const repositorio = criarRepositorioDePreferencias(
    armazenamentoFalso({ [CHAVE_ORDEM]: 'qualquer-coisa' }),
  );
  assert.equal(await repositorio.lerOrdem(), 'mais-recentes');
});

test('a ordem salva volta na leitura seguinte', async () => {
  const armazenamento = armazenamentoFalso();
  const repositorio = criarRepositorioDePreferencias(armazenamento);
  await repositorio.salvarOrdem('mais-antigos');
  assert.equal(armazenamento.dados.get(CHAVE_ORDEM), 'mais-antigos');
  assert.equal(await repositorio.lerOrdem(), 'mais-antigos');
});

test('falhas do armazenamento chegam a quem chamou', async () => {
  const repositorio = criarRepositorioDePreferencias(armazenamentoQueFalha);
  await assert.rejects(repositorio.lerOrdem(), /leitura/);
  await assert.rejects(repositorio.salvarOrdem('mais-antigos'), /gravação/);
});

test('o repositório em memória lista os três recados de exemplo', () => {
  const recados = recadosEmMemoria.listar();
  assert.deepEqual(recados.map((recado) => recado.id), ['42', '7', '3']);
});
