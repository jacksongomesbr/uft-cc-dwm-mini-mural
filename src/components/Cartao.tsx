import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { cores, espacos, raios } from '../theme/tokens';

type CartaoProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Cartao({ children, style }: CartaoProps) {
  return <View style={[styles.cartao, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  cartao: {
    padding: espacos.md,
    gap: espacos.sm,
    backgroundColor: cores.superficie,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cores.borda,
    borderRadius: raios.lg,
  },
});
