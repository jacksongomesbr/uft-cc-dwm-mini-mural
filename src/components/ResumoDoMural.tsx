import { StyleSheet, Text, View } from 'react-native';
import { Recado } from '../types/recado';

type ResumoDoMuralProps = {
  recados: Recado[];
};

export default function ResumoDoMural({ recados }: ResumoDoMuralProps) {
  const publicados = recados.filter(
    (recado) => recado.status === 'publicado',
  ).length;
  const arquivados = recados.length - publicados;

  return (
    <View style={styles.linha}>
      <Text style={styles.texto} accessibilityLiveRegion="polite">
        {publicados === 1 ? '1 publicado' : `${publicados} publicados`}
      </Text>
      <Text style={styles.texto}>
        {arquivados === 1 ? '1 arquivado' : `${arquivados} arquivados`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between' },
  texto: { fontSize: 14, color: '#555' },
});
