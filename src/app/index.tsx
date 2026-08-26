import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import ItemDoMural from '../components/ItemDoMural';
import NovoRecado from '../components/NovoRecado';
import ResumoDoMural from '../components/ResumoDoMural';
import { Recado } from '../types/recado';

export default function MuralScreen() {
  const [recados, setRecados] = useState<Recado[]>([]);

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
    <View style={styles.container}>
      <Text style={styles.titulo}>Mini Mural</Text>

      <NovoRecado onPublicar={publicar} />

      <ResumoDoMural recados={recados} />

      <Text style={styles.subtitulo}>Recados</Text>

      <FlatList
        data={recados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <ItemDoMural recado={item} onArquivar={arquivar} />
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum recado ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  titulo: { fontSize: 28, fontWeight: '700' },
  subtitulo: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  lista: { gap: 8 },
  vazio: { color: '#555', fontStyle: 'italic' },
});
