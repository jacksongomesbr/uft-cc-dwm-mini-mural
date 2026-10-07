import { Pressable, StyleSheet, Text, TextInput } from 'react-native';

import { useNovoRecado } from '@/features/recados/hooks/useNovoRecado';
import Cartao from '@/shared/components/Cartao';
import { alvoMinimo, cores, espacos, raios, tipografia } from '@/shared/theme/tokens';

type NovoRecadoProps = {
  onPublicar: (texto: string) => void;
  limite?: number;
};

export default function NovoRecado({ onPublicar, limite = 280 }: NovoRecadoProps) {
  const {
    texto, setTexto, campoRef, erro,
    restantes, proximoDoLimite, aoSairDoCampo, publicar,
  } = useNovoRecado(onPublicar, limite);

  return (
    <Cartao>
      <Text style={styles.rotulo}>Recado</Text>

      <TextInput
        ref={campoRef}
        style={[styles.campo, erro && styles.campoComErro]}
        value={texto}
        onChangeText={setTexto}
        maxLength={limite}
        multiline
        textAlignVertical="top"
        onBlur={aoSairDoCampo}
        placeholder="Escreva um recado"
        placeholderTextColor={cores.textoApoio}
        submitBehavior="newline"
        accessibilityLabel={erro ? `Recado. ${erro}` : 'Recado'}
        accessibilityHint={`Escreva até ${limite} caracteres`}
      />

      {erro && (
        <Text style={styles.erro} accessibilityLiveRegion="polite" aria-live="polite">{erro}</Text>
      )}

      <Text style={[styles.contador, proximoDoLimite && styles.contadorNoLimite]}>
        {restantes} caracteres restantes
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        onPress={publicar}
        accessibilityRole="button"
        accessibilityLabel="Publicar recado"
      >
        <Text style={styles.botaoTexto}>
          Publicar
        </Text>
      </Pressable>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  rotulo: { ...tipografia.apoio, color: cores.texto, fontWeight: '600' },
  campo: {
    minHeight: alvoMinimo * 2,
    padding: espacos.sm,
    ...tipografia.corpo,
    color: cores.texto,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.md,
  },
  campoComErro: { borderColor: cores.alerta },
  erro: { ...tipografia.apoio, color: cores.alerta },
  contador: { ...tipografia.apoio, color: cores.textoApoio },
  contadorNoLimite: { color: cores.alerta },
  botao: {
    minHeight: alvoMinimo,
    paddingHorizontal: espacos.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.md,
    backgroundColor: cores.acao,
  },
  botaoPressionado: { opacity: 0.85 },
  botaoTexto: { ...tipografia.corpo, color: cores.acaoTexto, fontWeight: '600' },
});
