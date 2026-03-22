import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useOptionalAppDrawer } from '@/context/AppDrawerContext';
import { FontFamily, PetMatchColors, PetMatchSpacing } from '@/constants/theme';

export type DashboardHeaderProps = {
  /** Default: hamburger menu. Use `back` on nested flows (e.g. booking). */
  leading?: 'menu' | 'back';
  onBackPress?: () => void;
};

export function DashboardHeader({ leading = 'menu', onBackPress }: DashboardHeaderProps) {
  const insets = useSafeAreaInsets();
  const drawer = useOptionalAppDrawer();

  return (
    <View style={[styles.headerWrap, { paddingTop: insets.top }]}>
      <BlurView intensity={55} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.headerRow}>
        <Pressable
          style={styles.headerIconBtn}
          hitSlop={12}
          onPress={leading === 'back' ? onBackPress : () => drawer?.openDrawer()}
          accessibilityRole="button"
          accessibilityLabel={leading === 'back' ? 'Go back' : 'Open menu'}>
          <MaterialIcons
            name={leading === 'back' ? 'arrow-back' : 'menu'}
            size={22}
            color={PetMatchColors.onSurface}
          />
        </Pressable>
        <Text style={styles.headerTitle}>My Pet Match</Text>
        <Pressable style={styles.headerIconBtn} hitSlop={12}>
          <View>
            <MaterialIcons name="notifications-none" size={24} color={PetMatchColors.onSurface} />
            <View style={styles.notifDot} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    minHeight: 68,
    backgroundColor: 'rgba(255, 252, 255, 0.86)',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PetMatchSpacing.xl,
    paddingVertical: PetMatchSpacing.md,
    minHeight: 68,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -1,
    color: PetMatchColors.primary,
  },
  notifDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PetMatchColors.urgentBadge,
  },
});
