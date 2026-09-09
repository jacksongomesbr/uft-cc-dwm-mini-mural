import { RecadosProvider } from '../../../context/RecadosContext';
import { Stack } from 'expo-router';

import { cores } from '../../../theme/tokens';

export default function MuralLayout() {
  return (
    <RecadosProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.superficie },
          headerTintColor: cores.acao,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="recado/[id]" options={{ title: 'Recado' }} />
      </Stack>
    </RecadosProvider>
  );
}
