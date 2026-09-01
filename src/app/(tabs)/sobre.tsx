import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Cartao from '../../components/Cartao';
import { cores, espacos, larguraMaximaDoConteudo, tipografia } from '../../theme/tokens';

export default function SobreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tela, { paddingTop: insets.top + espacos.lg }]}>
      <View style={styles.coluna}>
        <Text style={styles.titulo}>Sobre o Mini Mural</Text>
        <Cartao>
          <Text style={styles.texto}>
            Um mural de recados construído passo a passo na disciplina de
            Desenvolvimento Webmobile.
          </Text>
          <Text style={styles.apoio}>
            Nesta etapa, cada recado tem um endereço que pode ser aberto
            diretamente.
          </Text>
        </Cartao>
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
  titulo: { ...tipografia.titulo, color: cores.texto },
  texto: { ...tipografia.corpo, color: cores.texto },
  apoio: { ...tipografia.apoio, color: cores.textoApoio },
});
