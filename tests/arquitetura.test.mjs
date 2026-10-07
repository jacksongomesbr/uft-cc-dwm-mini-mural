import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../src', import.meta.url));

function arquivos(pasta) {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((entrada) => {
    const caminho = join(pasta, entrada.name);
    return entrada.isDirectory() ? arquivos(caminho) : [caminho];
  });
}

function importacoes(caminho) {
  const texto = readFileSync(caminho, 'utf8');
  return [...texto.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((m) => m[1]);
}

const todos = arquivos(raiz).map((caminho) => ({
  caminho: relative(raiz, caminho).split(sep).join('/'),
  importacoes: importacoes(caminho),
}));

const dePlataforma = /^(react|react-native|expo|expo-.*|@expo\/.*|@react-native-async-storage\/.*)$/;

function violacoes(filtro, proibido) {
  const alvos = todos.filter((arquivo) => filtro(arquivo.caminho));
  assert.ok(alvos.length > 0, 'a regra não encontrou nenhum arquivo para conferir');
  return alvos
    .flatMap((arquivo) => arquivo.importacoes
      .filter(proibido)
      .map((origem) => `${arquivo.caminho} importa ${origem}`));
}

test('domínio e serviços não importam React, Expo nem AsyncStorage', () => {
  const excecao = 'features/preferencias/services/armazenamentoLocal.ts';
  assert.deepEqual(
    violacoes(
      (c) => /\/(domain|services)\//.test(c) && c !== excecao,
      (origem) => dePlataforma.test(origem),
    ),
    [],
  );
});

test('o domínio não depende de hooks, componentes, contexto nem serviços', () => {
  assert.deepEqual(
    violacoes(
      (c) => c.includes('/domain/'),
      (origem) => /\/(hooks|components|context|services)\//.test(origem),
    ),
    [],
  );
});

test('preferências não dependem de recados', () => {
  assert.deepEqual(
    violacoes(
      (c) => c.startsWith('features/preferencias/'),
      (origem) => origem.startsWith('@/features/recados'),
    ),
    [],
  );
});

test('o código compartilhado não depende de funcionalidades', () => {
  assert.deepEqual(
    violacoes(
      (c) => c.startsWith('shared/'),
      (origem) => origem.startsWith('@/features'),
    ),
    [],
  );
});
