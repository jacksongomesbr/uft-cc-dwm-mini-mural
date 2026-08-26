import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Recado } from '../types/recado';

type ItemDoMuralProps = {
  recado: Recado;
  onArquivar: (id: string) => void;
};

export default function ItemDoMural({ recado, onArquivar }: ItemDoMuralProps) {
  const arquivado = recado.status === 'arquivado';

  return (
    <View style={[styles.item, arquivado && styles.itemArquivado]}>
      <Text style={styles.texto}>{recado.texto}</Text>

      {!arquivado && (
        <Pressable
          onPress={() => onArquivar(recado.id)}
          accessibilityRole="button"
          accessibilityLabel={`Arquivar recado: ${recado.texto}`}
        >
          <Text style={styles.acao}>Arquivar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  itemArquivado: { opacity: 0.5 },
  texto: { fontSize: 16 },
  acao: { color: '#2563eb', fontWeight: '600', marginTop: 8 },
});
