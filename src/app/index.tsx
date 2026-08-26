import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Recado = {
  id: string;
  texto: string;
};

export default function MuralScreen() {
  const [texto, setTexto] = useState('');
  const [recados, setRecados] = useState<Recado[]>([]);

  const podePublicar = texto.trim().length > 0;

  function publicar() {
    if (!podePublicar) {
      return;
    }

    setRecados((atuais) => [
      ...atuais,
      { id: String(Date.now()), texto: texto.trim() },
    ]);

    setTexto('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mini Mural</Text>

      <Text style={styles.rotulo}>Nova mensagem</Text>

      <TextInput
        style={styles.campo}
        value={texto}
        onChangeText={setTexto}
        maxLength={140}
        placeholder="Escreva um recado"
        returnKeyType="send"
        onSubmitEditing={publicar}
        accessibilityLabel="Nova mensagem"
      />

      <View style={styles.meta}>
        <Text style={styles.metaTexto} accessibilityLiveRegion="polite">
          {texto.length} caracteres
        </Text>
        <Text style={styles.metaTexto} accessibilityLiveRegion="polite">
          {recados.length === 1 ? '1 recado' : `${recados.length} recados`}
        </Text>
      </View>

      <Pressable
        style={[styles.botao, !podePublicar && styles.botaoDesabilitado]}
        onPress={publicar}
        disabled={!podePublicar}
        accessibilityRole="button"
        accessibilityLabel="Publicar recado"
      >
        <Text style={styles.botaoTexto}>Publicar</Text>
      </Pressable>

      <Text style={styles.subtitulo}>Recados</Text>

      <FlatList
        data={recados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.texto}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  titulo: { fontSize: 28, fontWeight: '700' },
  rotulo: { fontWeight: '600' },
  campo: {
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
  },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaTexto: { fontSize: 14, color: '#555' },
  botao: {
    minHeight: 44,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  botaoDesabilitado: { opacity: 0.5 },
  botaoTexto: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  subtitulo: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  lista: { gap: 8 },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
