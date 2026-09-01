import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Cartao from '../../../../components/Cartao';
import { buscarRecado } from '../../../../data/recados';
import {
  alvoMinimo,
  cores,
  espacos,
  larguraMaximaDoConteudo,
  raios,
  tipografia,
} from '../../../../theme/tokens';

function formatarDataHora(criadoEm: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(criadoEm));
}

export default function DetalheDoRecado() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const recado = id ? buscarRecado(id) : undefined;

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  if (!recado) {
    return (
      <View style={[styles.tela, { paddingTop: insets.top + espacos.lg }]}>
        <Stack.Screen options={{ title: 'Não encontrado' }} />
        <View style={styles.coluna}>
          <Text style={styles.aviso}>Este recado não está mais no mural.</Text>
          <Pressable
            onPress={voltar}
            accessibilityRole="button"
            accessibilityLabel="Ver todos os recados"
            style={({ pressed }) => [styles.acao, pressed && styles.acaoPressionada]}
          >
            <Text style={styles.acaoTexto}>Ver todos os recados</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.tela, { paddingTop: insets.top + espacos.lg }]}>
      <Stack.Screen options={{ title: 'Recado' }} />
      <View style={styles.coluna}>
        <Cartao>
          <Text style={styles.texto}>{recado.texto}</Text>
          <Text style={styles.hora}>{formatarDataHora(recado.criadoEm)}</Text>
          {recado.status === 'arquivado' && (
            <Text style={styles.etiqueta}>Arquivado</Text>
          )}
        </Cartao>
        <Link href="/" style={styles.link}>
          Ver todos os recados
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingHorizontal: espacos.md,
    backgroundColor: cores.fundo,
  },
  coluna: {
    width: '100%',
    maxWidth: larguraMaximaDoConteudo,
    alignSelf: 'center',
    gap: espacos.md,
  },
  texto: { ...tipografia.corpo, color: cores.texto },
  hora: { ...tipografia.apoio, color: cores.textoApoio },
  etiqueta: { ...tipografia.apoio, color: cores.textoApoio, fontStyle: 'italic' },
  aviso: { ...tipografia.corpo, color: cores.texto },
  acao: {
    minHeight: alvoMinimo,
    paddingHorizontal: espacos.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.md,
    backgroundColor: cores.acao,
  },
  acaoPressionada: { opacity: 0.85 },
  acaoTexto: { ...tipografia.corpo, color: cores.acaoTexto, fontWeight: '600' },
  link: { ...tipografia.corpo, color: cores.acao, fontWeight: '600' },
});
