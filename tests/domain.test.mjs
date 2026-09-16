import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validarRecado } from '../src/domain/validarRecado.ts';
import { ordenarRecados } from '../src/domain/ordenarRecados.ts';

test('recado vazio ou só com espaços exige preenchimento', () => {
  for (const texto of ['', '   ', '\n\t']) {
    assert.equal(validarRecado(texto).texto, 'Escreva o recado antes de publicar.');
  }
});

test('validação aceita o limite padrão e rejeita entrada externa maior', () => {
  assert.deepEqual(validarRecado('a'.repeat(280)), {});
  assert.ok(validarRecado('a'.repeat(281)).texto);
  assert.deepEqual(validarRecado('  Recado válido\ncom duas linhas  '), {});
});

test('validação respeita um limite diferente do padrão', () => {
  assert.deepEqual(validarRecado('a'.repeat(50), 50), {});
  assert.ok(validarRecado('a'.repeat(51), 50).texto);
});

test('ordenação usa o instante e não altera a fonte compartilhada', () => {
  const antigo = Object.freeze({ id: 'antigo', texto: 'A', status: 'publicado', criadoEm: '2026-09-08T09:00:00-03:00' });
  const recente = Object.freeze({ id: 'recente', texto: 'B', status: 'arquivado', criadoEm: '2026-09-08T12:30:00Z' });
  const recados = Object.freeze([recente, antigo]);
  assert.deepEqual(ordenarRecados(recados, 'mais-antigos'), [antigo, recente]);
  assert.deepEqual(ordenarRecados(recados, 'mais-recentes'), [recente, antigo]);
  assert.deepEqual(recados, [recente, antigo]);
  assert.deepEqual(ordenarRecados([], 'mais-recentes'), []);
});
