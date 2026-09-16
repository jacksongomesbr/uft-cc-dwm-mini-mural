import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Cartao from '../../components/Cartao';
import { usePreferencias } from '../../context/PreferenciasContext';
import type { Ordem } from '../../types/ordem';
import { alvoMinimo, raios, cores, espacos, larguraMaximaDoConteudo, tipografia } from '../../theme/tokens';

export default function SobreScreen() {
  const insets = useSafeAreaInsets();
  const { ordem, carregando, salvando, erro, escolherOrdem } = usePreferencias();
  const bloqueado = carregando || salvando;
  const opcoes: { valor: Ordem; rotulo: string }[] = [
    { valor: 'mais-recentes', rotulo: 'Mais recentes primeiro' },
    { valor: 'mais-antigos', rotulo: 'Mais antigos primeiro' },
  ];

  return (
    <ScrollView style={styles.tela} contentContainerStyle={{ paddingTop: insets.top + espacos.lg, paddingBottom: insets.bottom + espacos.lg }}>
      <View style={styles.coluna}>
        <Text style={styles.titulo}>Sobre o Mini Mural</Text>
        <Cartao>
          <Text style={styles.texto}>
            Um mural de recados construído passo a passo na disciplina de
            Desenvolvimento Webmobile.
          </Text>
          <Text style={styles.apoio}>
            Lista e detalhe compartilham os recados desta sessão. Recarregar
            o aplicativo restaura os recados de exemplo; a ordem escolhida permanece.
          </Text>
        </Cartao>
        <Cartao>
          <Text style={styles.subtitulo}>Ordem do mural</Text>
          <View accessibilityRole="radiogroup">
            {opcoes.map(({ valor, rotulo }) => (
              <Pressable
                key={valor}
                onPress={() => { void escolherOrdem(valor); }}
                disabled={bloqueado}
                accessibilityRole="radio"
                aria-checked={ordem === valor}
                accessibilityState={{ checked: ordem === valor, disabled: bloqueado }}
                style={({ pressed }) => [
                  styles.opcao, ordem === valor && styles.selecionada,
                  bloqueado && styles.bloqueada, pressed && styles.pressionada,
                ]}
              >
                <Text style={styles.texto}>{rotulo}</Text>
                {ordem === valor && <Text style={styles.apoio}>Selecionada</Text>}
              </Pressable>
            ))}
          </View>
          {carregando && <Text style={styles.apoio}>Carregando preferência...</Text>}
          {salvando && <Text style={styles.apoio}>Salvando preferência...</Text>}
          {erro && <Text style={styles.erro} accessibilityLiveRegion="polite" aria-live="polite">{erro}</Text>}
        </Cartao>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingHorizontal: espacos.md,
    backgroundColor: cores.fundo,
  },
  coluna: {
    width: '100%',
    maxWidth: larguraMaximaDoConteudo,
    alignSelf: 'center',
    gap: espacos.md,
  },
  subtitulo: { ...tipografia.subtitulo, color: cores.texto },
  opcao: {
    minHeight: alvoMinimo, padding: espacos.sm, borderWidth: 1,
    borderColor: cores.borda, borderRadius: raios.md, justifyContent: 'center',
  },
  selecionada: { borderColor: cores.acao, borderWidth: 2 },
  bloqueada: { opacity: 0.6 },
  pressionada: { opacity: 0.85 },
  erro: { ...tipografia.apoio, color: cores.alerta },
  titulo: { ...tipografia.titulo, color: cores.texto },
  texto: { ...tipografia.corpo, color: cores.texto },
  apoio: { ...tipografia.apoio, color: cores.textoApoio },
});
