import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type NovoRecadoProps = {
  onPublicar: (texto: string) => void;
  limite?: number;
};

export default function NovoRecado({ onPublicar, limite = 140 }: NovoRecadoProps) {
  const [texto, setTexto] = useState('');

  const podePublicar = texto.trim().length > 0;

  function publicar() {
    if (!podePublicar) {
      return;
    }

    onPublicar(texto.trim());
    setTexto('');
  }

  return (
    <View style={styles.bloco}>
      <Text style={styles.rotulo}>Nova mensagem</Text>

      <TextInput
        style={styles.campo}
        value={texto}
        onChangeText={setTexto}
        maxLength={limite}
        placeholder="Escreva um recado"
        returnKeyType="send"
        onSubmitEditing={publicar}
        accessibilityLabel="Nova mensagem"
      />

      <Text style={styles.contador}>
        {texto.length} de {limite} caracteres
      </Text>

      <Pressable
        style={[styles.botao, !podePublicar && styles.botaoDesabilitado]}
        onPress={publicar}
        disabled={!podePublicar}
        accessibilityRole="button"
        accessibilityLabel="Publicar recado"
      >
        <Text style={styles.botaoTexto}>Publicar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bloco: { gap: 8 },
  rotulo: { fontWeight: '600' },
  campo: {
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
  },
  contador: { fontSize: 14, color: '#555' },
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
});
