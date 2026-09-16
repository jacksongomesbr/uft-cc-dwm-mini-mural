import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';

import Cartao from './Cartao';
import { validarRecado } from '../domain/validarRecado';
import { alvoMinimo, cores, espacos, raios, tipografia } from '../theme/tokens';

type NovoRecadoProps = {
  onPublicar: (texto: string) => void;
  limite?: number;
};

export default function NovoRecado({ onPublicar, limite = 280 }: NovoRecadoProps) {
  const [texto, setTexto] = useState('');
  const [tocouNoCampo, setTocouNoCampo] = useState(false);
  const campoRef = useRef<TextInput>(null);
  const erro = tocouNoCampo ? validarRecado(texto, limite).texto : undefined;

  const restantes = limite - texto.length;
  const proximoDoLimite = restantes <= 20;

  function publicar() {
    setTocouNoCampo(true);
    if (validarRecado(texto, limite).texto) {
      campoRef.current?.focus();
      return;
    }

    onPublicar(texto.trim());
    setTexto('');
    setTocouNoCampo(false);
  }

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
        onBlur={() => setTocouNoCampo(true)}
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
