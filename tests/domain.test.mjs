import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validarRecado } from '../src/features/recados/domain/validarRecado.ts';
import { criarRecado } from '../src/features/recados/domain/criarRecado.ts';
import {
  encontrarRecado,
  incluirRecado,
  marcarComoArquivado,
  resumirRecados,
} from '../src/features/recados/domain/colecaoDeRecados.ts';
import { formatarHora } from '../src/shared/formatacao/data.ts';
import { ordenarRecados } from '../src/features/recados/domain/ordenarRecados.ts';

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

const publicado = { id: '1', texto: 'A', status: 'publicado', criadoEm: '2026-03-12T14:02:00' };
const arquivado = { id: '2', texto: 'B', status: 'arquivado', criadoEm: '2026-03-10T16:45:00' };

test('recado novo nasce publicado, com o id e o instante recebidos', () => {
  const agora = new Date('2026-03-12T17:02:00Z');
  assert.deepEqual(criarRecado('Olá', 'local-1', agora), {
    id: 'local-1',
    texto: 'Olá',
    criadoEm: '2026-03-12T17:02:00.000Z',
    status: 'publicado',
  });
});

test('incluir põe o recado no início e arquivar muda só o recado pedido', () => {
  const lista = Object.freeze([publicado, arquivado]);
  const novo = { ...publicado, id: '3' };
  assert.deepEqual(incluirRecado(lista, novo), [novo, publicado, arquivado]);
  assert.deepEqual(marcarComoArquivado(lista, '1'), [
    { ...publicado, status: 'arquivado' },
    arquivado,
  ]);
  assert.deepEqual(marcarComoArquivado(lista, 'inexistente'), [publicado, arquivado]);
  assert.deepEqual(lista, [publicado, arquivado]);
});

test('encontrar devolve o recado ou undefined', () => {
  assert.equal(encontrarRecado([publicado, arquivado], '2'), arquivado);
  assert.equal(encontrarRecado([publicado, arquivado], '9'), undefined);
});

test('resumo conta publicados e arquivados', () => {
  assert.deepEqual(resumirRecados([]), { publicados: 0, arquivados: 0 });
  assert.deepEqual(resumirRecados([publicado, publicado, arquivado]), {
    publicados: 2,
    arquivados: 1,
  });
});

test('hora usa dois dígitos no fuso local', () => {
  assert.equal(formatarHora('2026-03-12T14:02:00'), '14:02');
  assert.equal(formatarHora('2026-03-12T09:05:00'), '09:05');
});
