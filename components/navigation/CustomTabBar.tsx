import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BlurView } from 'expo-blur';

import { FontFamily, PetMatchColors } from '@/constants/theme';

/** Meet Pets stack: hide tab bar on pet profile so the screen sticky CTAs sit at the bottom edge. */
function isMeetPetsProfileDetailOpen(tabState: BottomTabBarProps['state']): boolean {
  const meetPets = tabState.routes.find((r) => r.name === 'meet-pets');
  const nested = meetPets?.state;
  if (!nested || typeof nested !== 'object' || !('routes' in nested)) return false;
  const s = nested as { index?: number; routes?: { name: string }[] };
  const idx = typeof s.index === 'number' ? s.index : 0;
  const active = s.routes?.[idx];
  return active?.name === '[id]';
}

type TabConfig = {
  key: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const TAB_CONFIG: TabConfig[] = [
  { key: 'index', label: 'Home', icon: 'home' },
  { key: 'meet-pets', label: 'Meet Pets', icon: 'pets' },
  { key: 'find-my-pet', label: 'Find My Pet', icon: 'search' },
  { key: 'pet-spa', label: 'Pet Spa', icon: 'spa' },
  { key: 'my-world', label: 'My World', icon: 'person' },
];

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  if (isMeetPetsProfileDetailOpen(state)) {
    return null;
  }

  return (
    <View style={[styles.outer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <BlurView intensity={48} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.inner}>
        {state.routes
          .filter((route) => TAB_CONFIG.some((t) => t.key === route.name))
          .map((route) => {
          const isFocused = state.routes[state.index]?.key === route.key;
          const cfg = TAB_CONFIG.find((t) => t.key === route.name)!;

          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : cfg.label
              : cfg.label;

          const onPress = () => {
            if (process.env.EXPO_OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabPressable}>
              <View style={[styles.tabInner, isFocused && styles.tabInnerActive]}>
                <MaterialIcons
                  name={cfg.icon}
                  size={isFocused ? 20 : 19}
                  color={isFocused ? PetMatchColors.onPrimary : PetMatchColors.tabInactive}
                />
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                  style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: PetMatchColors.tabBarBorder,
    backgroundColor: PetMatchColors.tabBarBg,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingTop: 6,
    minHeight: 62,
  },
  tabPressable: {
    flex: 1,
    alignItems: 'center',
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
    minHeight: 48,
  },
  tabInnerActive: {
    backgroundColor: PetMatchColors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 56,
    borderRadius: 999,
    minHeight: 58,
    shadowColor: PetMatchColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.38,
    shadowRadius: 10,
    elevation: 8,
  },
  tabLabel: {
    marginTop: 4,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: -0.25,
    color: PetMatchColors.tabInactive,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: PetMatchColors.onPrimary,
  },
});
