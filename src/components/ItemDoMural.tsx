import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Cartao from './Cartao';
import { alvoMinimo, cores, espacos, raios, tipografia } from '../theme/tokens';
import { Recado } from '../types/recado';

type ItemDoMuralProps = {
  recado: Recado;
  onArquivar: (id: string) => void;
};

function formatarHora(criadoEm: string) {
  const data = new Date(criadoEm);
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');

  return `${hora}:${minuto}`;
}

export default function ItemDoMural({ recado, onArquivar }: ItemDoMuralProps) {
  const arquivado = recado.status === 'arquivado';

  return (
    <Cartao style={arquivado && styles.cartaoArquivado}>
      <Link href={{ pathname: '/recado/[id]', params: { id: recado.id } }} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`Abrir recado: ${recado.texto}`}
          style={({ pressed }) => [styles.link, pressed && styles.cartaoPressionado]}
        >
          <Text style={styles.texto} numberOfLines={2}>{recado.texto}</Text>
        </Pressable>
      </Link>

      <View style={styles.rodape}>
        <Text style={styles.hora}>{formatarHora(recado.criadoEm)}</Text>

        {arquivado ? (
          <Text style={styles.etiqueta}>Arquivado</Text>
        ) : (
          <Pressable
            onPress={() => onArquivar(recado.id)}
            hitSlop={espacos.sm}
            style={({ pressed }) => [styles.acao, pressed && styles.acaoPressionada]}
            accessibilityRole="button"
            accessibilityLabel={`Arquivar recado: ${recado.texto}`}
          >
            <Text style={styles.acaoTexto}>Arquivar</Text>
          </Pressable>
        )}
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  cartaoArquivado: { backgroundColor: cores.fundo },
  link: { minHeight: alvoMinimo, justifyContent: 'center' },
  cartaoPressionado: { opacity: 0.85 },
  texto: { ...tipografia.corpo, color: cores.texto },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hora: { ...tipografia.apoio, color: cores.textoApoio },
  etiqueta: { ...tipografia.apoio, color: cores.textoApoio, fontStyle: 'italic' },
  acao: {
    minHeight: alvoMinimo,
    minWidth: alvoMinimo,
    paddingHorizontal: espacos.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.md,
  },
  acaoPressionada: { backgroundColor: cores.borda },
  acaoTexto: { ...tipografia.corpo, color: cores.acao, fontWeight: '600' },
});
