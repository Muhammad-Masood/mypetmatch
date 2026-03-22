import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';
import { useAppDrawer } from '@/context/AppDrawerContext';

const { width: SCREEN_W } = Dimensions.get('window');
const DRAWER_W = Math.min(320, Math.round(SCREEN_W * 0.86));

type NavItem = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  href: Href;
};

const MAIN_LINKS: NavItem[] = [
  { label: 'Home', icon: 'home', href: '/(tabs)' as Href },
  { label: 'Meet Pets', icon: 'pets', href: '/(tabs)/meet-pets' as Href },
  { label: 'Urgent Homes', icon: 'volunteer-activism', href: '/(tabs)/menu/urgent-homes' as Href },
  { label: 'Find My Pet', icon: 'search', href: '/(tabs)/find-my-pet' as Href },
  { label: 'Find a Home', icon: 'house', href: '/(tabs)/menu/find-a-home' as Href },
  { label: 'Pet Match Quiz', icon: 'quiz', href: '/(tabs)/pet-match-quiz' as Href },
  { label: 'Pet Spa', icon: 'spa', href: '/(tabs)/pet-spa' as Href },
  { label: 'Vets', icon: 'local-hospital', href: '/(tabs)/menu/vets' as Href },
  { label: 'Report a Pet Found', icon: 'report', href: '/(tabs)/menu/report-pet-found' as Href },
  { label: 'Saved Pets', icon: 'bookmark-outline', href: '/(tabs)/menu/saved-pets' as Href },
  { label: 'My Requests', icon: 'inbox', href: '/(tabs)/menu/my-requests' as Href },
  { label: 'My Applications', icon: 'assignment', href: '/(tabs)/menu/my-applications' as Href },
  { label: 'My Bookings', icon: 'event', href: '/(tabs)/menu/my-bookings' as Href },
];

const SUPPORT_EMAIL = 'hello@mypetmatch.com';

type FooterItem = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  href?: Href;
  onPress?: () => void;
};

const FOOTER_LINKS: FooterItem[] = [
  { label: 'Chat With Us', icon: 'chat-bubble-outline', href: '/(tabs)/menu/chat-with-us' as Href },
  {
    label: 'Email Us',
    icon: 'mail-outline',
    onPress: () => Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=My%20Pet%20Match`),
  },
  { label: 'Help & Support', icon: 'help-outline', href: '/(tabs)/menu/help-support' as Href },
];

const PROFILE_URI =
  'https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?w=200&h=200&fit=crop&facepad=3';

export function AppDrawer() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isOpen, closeDrawer, registerDrawerClose, markDrawerClosed } = useAppDrawer();

  const translateX = useRef(new Animated.Value(-DRAWER_W)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    registerDrawerClose(() => {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_W,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) markDrawerClosed();
      });
    });
    return () => registerDrawerClose(null);
  }, [backdropOpacity, markDrawerClosed, registerDrawerClose, translateX]);

  useEffect(() => {
    if (!isOpen) return;
    translateX.setValue(-DRAWER_W);
    backdropOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen, backdropOpacity, translateX]);

  const navigateTo = useCallback(
    (href: Href) => {
      closeDrawer();
      requestAnimationFrame(() => {
        router.push(href);
      });
    },
    [closeDrawer, router],
  );

  const onViewProfile = useCallback(() => {
    navigateTo('/(tabs)/my-world' as Href);
  }, [navigateTo]);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeDrawer}>
      <View style={styles.modalRoot}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeDrawer} accessibilityLabel="Close menu" />
        </Animated.View>

        <Animated.View
          style={[
            styles.panel,
            {
              width: DRAWER_W,
              paddingTop: insets.top + PetMatchSpacing.md,
              paddingBottom: Math.max(insets.bottom, PetMatchSpacing.lg),
              transform: [{ translateX }],
            },
          ]}>
          <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFill} />
          <View style={styles.panelTint} />

          <View style={styles.panelContent}>
          <View style={styles.profileBlock}>
            <Image source={{ uri: PROFILE_URI }} style={styles.avatar} contentFit="cover" />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>Muhammad Masood</Text>
              <Pressable onPress={onViewProfile} hitSlop={8} accessibilityRole="link">
                <Text style={styles.viewProfile}>View Profile</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces>
            {MAIN_LINKS.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => navigateTo(item.href)}
                style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                accessibilityRole="button"
                accessibilityLabel={item.label}>
                <View style={styles.iconWrap}>
                  <MaterialIcons name={item.icon} size={22} color={PetMatchColors.onSurfaceMuted} />
                </View>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <MaterialIcons name="chevron-right" size={20} color={PetMatchColors.onboardingOutline} />
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerDivider} />
            {FOOTER_LINKS.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => {
                  if (item.onPress) {
                    closeDrawer();
                    requestAnimationFrame(() => item.onPress?.());
                  } else if (item.href) {
                    navigateTo(item.href);
                  }
                }}
                style={({ pressed }) => [styles.footerRow, pressed && styles.rowPressed]}
                accessibilityRole="button"
                accessibilityLabel={item.label}>
                <View style={styles.iconWrap}>
                  <MaterialIcons name={item.icon} size={22} color={PetMatchColors.primary} />
                </View>
                <Text style={styles.footerLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(29, 27, 26, 0.45)',
  },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 252, 251, 0.94)',
    overflow: 'hidden',
    borderTopRightRadius: PetMatchRadius.lg,
    borderBottomRightRadius: PetMatchRadius.lg,
    shadowColor: '#1b1c1c',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
  },
  panelTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 245, 0.55)',
  },
  panelContent: {
    flex: 1,
    zIndex: 1,
  },
  profileBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PetMatchSpacing.xl,
    paddingBottom: PetMatchSpacing.lg,
    gap: PetMatchSpacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(253, 143, 19, 0.35)',
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: PetMatchColors.onboardingTitle,
  },
  viewProfile: {
    marginTop: 4,
    fontFamily: FontFamily.jakartaSemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.primary,
  },
  scroll: {
    flex: 1,
    minHeight: 120,
  },
  scrollContent: {
    paddingHorizontal: PetMatchSpacing.md,
    paddingBottom: PetMatchSpacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: PetMatchSpacing.md,
    paddingHorizontal: PetMatchSpacing.sm,
    borderRadius: PetMatchRadius.md,
    gap: PetMatchSpacing.sm,
  },
  rowPressed: {
    backgroundColor: PetMatchColors.lavenderBorderHairline,
  },
  iconWrap: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 16,
    lineHeight: 22,
    color: PetMatchColors.onSurface,
  },
  footer: {
    paddingHorizontal: PetMatchSpacing.md,
    paddingTop: PetMatchSpacing.sm,
  },
  footerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: PetMatchColors.onboardingDivider,
    marginBottom: PetMatchSpacing.md,
    marginHorizontal: PetMatchSpacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: PetMatchSpacing.md,
    paddingHorizontal: PetMatchSpacing.sm,
    borderRadius: PetMatchRadius.md,
    gap: PetMatchSpacing.sm,
  },
  footerLabel: {
    flex: 1,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 16,
    lineHeight: 22,
    color: PetMatchColors.primary,
  },
});
