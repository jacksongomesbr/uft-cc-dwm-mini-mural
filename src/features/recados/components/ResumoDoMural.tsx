import { StyleSheet, Text, View } from 'react-native';

import { resumirRecados } from '@/features/recados/domain/colecaoDeRecados';
import type { Recado } from '@/features/recados/types';
import { cores, espacos, raios, tipografia } from '@/shared/theme/tokens';

type ResumoDoMuralProps = {
  recados: Recado[];
};

export default function ResumoDoMural({ recados }: ResumoDoMuralProps) {
  const { publicados, arquivados } = resumirRecados(recados);

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
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: espacos.sm,
    paddingHorizontal: espacos.sm,
    paddingVertical: espacos.xs,
    borderRadius: raios.md,
  },
  texto: { ...tipografia.apoio, color: cores.textoApoio },
});
