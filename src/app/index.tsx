import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ItemDoMural from '../components/ItemDoMural';
import NovoRecado from '../components/NovoRecado';
import ResumoDoMural from '../components/ResumoDoMural';
import {
  cores,
  espacos,
  larguraDeTelaEstreita,
  larguraMaximaDoConteudo,
  tipografia,
} from '../theme/tokens';
import { Recado } from '../types/recado';

function Separador() {
  return <View style={styles.separador} />;
}

export default function MuralScreen() {
  const [recados, setRecados] = useState<Recado[]>([]);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const telaEstreita = width < larguraDeTelaEstreita;

  function publicar(texto: string) {
    const novo: Recado = {
      id: String(Date.now()),
      texto,
      criadoEm: new Date().toISOString(),
      status: 'publicado',
    };

    setRecados((atuais) => [novo, ...atuais]);
  }

  function arquivar(id: string) {
    setRecados((atuais) =>
      atuais.map((recado) =>
        recado.id === id ? { ...recado, status: 'arquivado' } : recado,
      ),
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        style={styles.coluna}
        data={recados}
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
            <NovoRecado onPublicar={publicar} />
            <ResumoDoMural recados={recados} />
            <Text style={styles.subtitulo}>Recados</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum recado ainda.</Text>}
        renderItem={({ item }) => (
          <ItemDoMural recado={item} onArquivar={arquivar} />
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
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
