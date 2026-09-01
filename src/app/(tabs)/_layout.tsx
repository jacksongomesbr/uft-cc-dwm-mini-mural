import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { cores } from '../../theme/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.acao,
        tabBarInactiveTintColor: cores.textoApoio,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mural',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
