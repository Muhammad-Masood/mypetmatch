import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

const EDITORIAL_URI =
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=500&fit=crop';

function goToDashboard() {
  router.replace('/(tabs)');
}

export function OnboardingLoginScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const pad = Math.max(PetMatchSpacing.xl, (width - 326) / 2);
  const contentW = Math.min(326, width - pad * 2);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <View style={styles.root}>
      <View style={[styles.blobLavender, { opacity: 0.4 }]} />
      <View style={[styles.blobRose, { opacity: 0.3 }]} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + PetMatchSpacing.xl,
            paddingBottom: insets.bottom + PetMatchSpacing.xxl,
            paddingHorizontal: pad,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.brandBlock}>
          <View style={styles.logoCard}>
            <MaterialCommunityIcons name="paw" size={36} color={PetMatchColors.primary} />
          </View>
          <Text style={styles.title}>My Pet Match</Text>
          <Text style={styles.welcome}>Welcome to My Pet Match</Text>
        </View>

        <View style={[styles.actions, { width: contentW, alignSelf: 'center' }]}>
          <Pressable
            onPress={goToDashboard}
            style={({ pressed }) => [styles.googleBtn, pressed && styles.pressed]}>
            <MaterialCommunityIcons name="google-plus" size={24} color="#4285F4" />
            <Text style={styles.googleLabel}>Continue with Google</Text>
          </Pressable>

          <Pressable onPress={goToDashboard} style={styles.primaryWrap}>
            <LinearGradient
              colors={[PetMatchColors.primary, PetMatchColors.primaryGradientEnd]}
              start={{ x: 0.15, y: 0 }}
              end={{ x: 0.85, y: 1 }}
              style={styles.primaryGradient}>
              <MaterialIcons name="smartphone" size={22} color={PetMatchColors.onPrimary} />
              <Text style={styles.primaryLabel}>Mobile Number / OTP</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={goToDashboard}
            style={({ pressed }) => [styles.emailBtn, pressed && styles.pressed]}>
            <MaterialIcons name="mail-outline" size={22} color={PetMatchColors.onboardingEmailText} />
            <Text style={styles.emailLabel}>Continue with Email</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or join our community</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={[styles.editorial, { width: contentW }]}>
            <Image source={{ uri: EDITORIAL_URI }} style={styles.editorialImage} contentFit="cover" />
            <LinearGradient
              colors={['rgba(253, 143, 19, 0)', 'rgba(253, 143, 19, 0.4)']}
              locations={[0.35, 1]}
              style={styles.editorialGradient}
            />
            <Text style={styles.editorialCaption}>Every pet deserves a soulful home.</Text>
          </View>
        </View>

        <Pressable
          onPress={() => setTermsAccepted((v) => !v)}
          style={[styles.legalRow, { width: contentW, alignSelf: 'center', marginTop: PetMatchSpacing.xl }]}>
          <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
            {termsAccepted ? (
              <MaterialIcons name="check" size={16} color={PetMatchColors.onPrimary} />
            ) : null}
          </View>
          <Text style={styles.legalText}>
            I agree to the Terms & Conditions and{'\n'}Privacy Policy
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PetMatchColors.onboardingBackground,
    overflow: 'hidden',
  },
  blobLavender: {
    position: 'absolute',
    width: 384,
    height: 384,
    borderRadius: 9999,
    backgroundColor: PetMatchColors.secondaryLavender,
    top: -120,
    right: -140,
  },
  blobRose: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 9999,
    backgroundColor: PetMatchColors.tertiaryRose,
    bottom: -80,
    left: -100,
  },
  scrollContent: {
    flexGrow: 1,
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: PetMatchSpacing.xxl,
  },
  logoCard: {
    width: 72,
    height: 70,
    borderRadius: PetMatchRadius.xl,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: PetMatchSpacing.lg,
    shadowColor: '#1b1c1c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  title: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 36,
    lineHeight: 45,
    letterSpacing: -0.9,
    color: PetMatchColors.onboardingTitle,
    textAlign: 'center',
  },
  welcome: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 18,
    lineHeight: 28,
    color: PetMatchColors.onboardingSubtitle,
    textAlign: 'center',
  },
  actions: {
    gap: PetMatchSpacing.lg,
  },
  pressed: {
    opacity: 0.92,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: PetMatchSpacing.md,
    height: 56,
    borderRadius: PetMatchRadius.full,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    paddingHorizontal: PetMatchSpacing.lg,
  },
  googleLabel: {
    fontFamily: FontFamily.jakartaSemiBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onboardingTitle,
  },
  primaryWrap: {
    borderRadius: PetMatchRadius.full,
    overflow: 'hidden',
  },
  primaryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: PetMatchSpacing.md,
    height: 56,
    paddingHorizontal: PetMatchSpacing.lg,
  },
  primaryLabel: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onPrimary,
  },
  emailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: PetMatchSpacing.md,
    minHeight: 60,
    borderRadius: PetMatchRadius.full,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: PetMatchColors.onboardingOutline,
    paddingHorizontal: PetMatchSpacing.lg,
  },
  emailLabel: {
    fontFamily: FontFamily.jakartaSemiBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onboardingEmailText,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: PetMatchSpacing.lg,
    gap: PetMatchSpacing.md,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: PetMatchColors.onboardingDivider,
  },
  dividerText: {
    fontFamily: FontFamily.jakartaRegular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    color: PetMatchColors.onboardingMuted,
  },
  editorial: {
    marginTop: PetMatchSpacing.lg,
    borderRadius: PetMatchRadius.lg,
    overflow: 'hidden',
    minHeight: 183,
    maxHeight: 220,
  },
  editorialImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  editorialGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  editorialCaption: {
    position: 'absolute',
    left: PetMatchSpacing.lg,
    right: PetMatchSpacing.lg,
    bottom: PetMatchSpacing.lg,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.onPrimary,
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: PetMatchSpacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(184, 176, 172, 0.4)',
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: PetMatchColors.primary,
    borderColor: PetMatchColors.primary,
  },
  legalText: {
    flex: 1,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 13,
    lineHeight: 21,
    color: PetMatchColors.onboardingSubtitle,
  },
});
