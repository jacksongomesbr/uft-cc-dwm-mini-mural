import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';

import Cartao from './Cartao';
import { alvoMinimo, cores, espacos, raios, tipografia } from '../theme/tokens';

type NovoRecadoProps = {
  onPublicar: (texto: string) => void;
  limite?: number;
};

export default function NovoRecado({ onPublicar, limite = 140 }: NovoRecadoProps) {
  const [texto, setTexto] = useState('');

  const podePublicar = texto.trim().length > 0;
  const restantes = limite - texto.length;
  const proximoDoLimite = restantes <= 20;

  function publicar() {
    if (!podePublicar) {
      return;
    }

    onPublicar(texto.trim());
    setTexto('');
  }

  return (
    <Cartao>
      <Text style={styles.rotulo}>Nova mensagem</Text>

      <TextInput
        style={styles.campo}
        value={texto}
        onChangeText={setTexto}
        maxLength={limite}
        placeholder="Escreva um recado"
        placeholderTextColor={cores.textoApoio}
        returnKeyType="send"
        onSubmitEditing={publicar}
        accessibilityLabel="Nova mensagem"
      />

      <Text style={[styles.contador, proximoDoLimite && styles.contadorNoLimite]}>
        {restantes} caracteres restantes
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          !podePublicar && styles.botaoDesabilitado,
          pressed && styles.botaoPressionado,
        ]}
        onPress={publicar}
        disabled={!podePublicar}
        accessibilityRole="button"
        accessibilityLabel="Publicar recado"
        accessibilityState={{ disabled: !podePublicar }}
      >
        <Text style={[styles.botaoTexto, !podePublicar && styles.botaoTextoDesabilitado]}>
          Publicar
        </Text>
      </Pressable>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  rotulo: { ...tipografia.apoio, color: cores.texto, fontWeight: '600' },
  campo: {
    minHeight: alvoMinimo,
    padding: espacos.sm,
    ...tipografia.corpo,
    color: cores.texto,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.md,
  },
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
  botaoDesabilitado: { backgroundColor: cores.borda },
  botaoPressionado: { opacity: 0.85 },
  botaoTexto: { ...tipografia.corpo, color: cores.acaoTexto, fontWeight: '600' },
  botaoTextoDesabilitado: { color: cores.textoApoio },
});
