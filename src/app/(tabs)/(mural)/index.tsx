import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ItemDoMural from '../../../components/ItemDoMural';
import NovoRecado from '../../../components/NovoRecado';
import ResumoDoMural from '../../../components/ResumoDoMural';
import { useRecados } from '../../../context/RecadosContext';
import { usePreferencias } from '../../../context/PreferenciasContext';
import { ordenarRecados } from '../../../domain/ordenarRecados';
import {
  cores,
  espacos,
  larguraDeTelaEstreita,
  larguraMaximaDoConteudo,
  tipografia,
} from '../../../theme/tokens';

function Separador() {
  return <View style={styles.separador} />;
}

export default function MuralScreen() {
  const { recados, adicionarRecado, arquivarRecado } = useRecados();
  const { ordem, carregando, erro } = usePreferencias();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const telaEstreita = width < larguraDeTelaEstreita;

  if (carregando) {
    return (
      <View style={[styles.tela, styles.carregando]}>
        <ActivityIndicator accessibilityLabel="Carregando preferência do mural" />
      </View>
    );
  }
  const recadosOrdenados = ordenarRecados(recados, ordem);

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        style={styles.coluna}
        data={recadosOrdenados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: telaEstreita ? espacos.md : espacos.lg,
          paddingTop: insets.top + espacos.md,
          paddingBottom: insets.bottom + espacos.lg,
        }}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={Separador}
        ListHeaderComponent={
          <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Mini Mural</Text>
            {erro && <Text accessibilityLiveRegion="polite" aria-live="polite" style={styles.erro}>{erro}</Text>}
            <NovoRecado onPublicar={adicionarRecado} />
            <ResumoDoMural recados={recados} />
            <Text style={styles.subtitulo}>Recados</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum recado ainda.</Text>}
        renderItem={({ item }) => (
          <ItemDoMural recado={item} onArquivar={arquivarRecado} />
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  carregando: { alignItems: 'center', justifyContent: 'center' },
  erro: { ...tipografia.apoio, color: cores.alerta },
  coluna: {
    width: '100%',
    maxWidth: larguraMaximaDoConteudo,
    alignSelf: 'center',
  },
  cabecalho: { gap: espacos.sm, marginBottom: espacos.sm },
  titulo: { ...tipografia.titulo, color: cores.texto },
  subtitulo: { ...tipografia.subtitulo, color: cores.texto, marginTop: espacos.sm },
  separador: { height: espacos.sm },
  vazio: { ...tipografia.corpo, color: cores.textoApoio, fontStyle: 'italic' },
});
