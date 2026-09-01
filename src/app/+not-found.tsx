import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cores, espacos, larguraMaximaDoConteudo, tipografia } from '../theme/tokens';

export default function NaoEncontrado() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tela, { paddingTop: insets.top + espacos.lg }]}>
      <Stack.Screen options={{ title: 'Endereço não encontrado' }} />
      <View style={styles.coluna}>
        <Text style={styles.titulo}>Este endereço não existe no mural.</Text>
        <Link href="/" style={styles.link}>
          Ir para o mural
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
  titulo: { ...tipografia.subtitulo, color: cores.texto },
  link: { ...tipografia.corpo, color: cores.acao, fontWeight: '600' },
});
