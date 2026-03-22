/**
 * My Pet Match — design tokens from DESIGN.md + Figma "Updated Home Dashboard".
 * Font keys match @expo-google-fonts load names (use as fontFamily).
 */

import { Platform } from 'react-native';

/** Loaded via useFonts in app/_layout.tsx */
export const FontFamily = {
  jakartaRegular: 'PlusJakartaSans_400Regular',
  jakartaMedium: 'PlusJakartaSans_500Medium',
  jakartaSemiBold: 'PlusJakartaSans_600SemiBold',
  jakartaBold: 'PlusJakartaSans_700Bold',
  jakartaExtraBold: 'PlusJakartaSans_800ExtraBold',
  manropeRegular: 'Manrope_400Regular',
  manropeMedium: 'Manrope_500Medium',
  manropeBold: 'Manrope_700Bold',
  manropeExtraBold: 'Manrope_800ExtraBold',
} as const;

export const PetMatchColors = {
  /** Figma onboarding background */
  onboardingBackground: '#fff8f5',
  /** Figma screen / header tint */
  surfaceScreen: '#fffcfb',
  onboardingTitle: '#36322f',
  onboardingSubtitle: '#635e5b',
  onboardingEmailText: '#6a5173',
  onboardingMuted: '#807976',
  onboardingOutline: 'rgba(184, 176, 172, 0.3)',
  onboardingDivider: 'rgba(184, 176, 172, 0.2)',
  primaryGradientEnd: '#ffdfc4',
  /** DESIGN.md surface */
  surface: '#fcf9f8',
  surfaceContainerLowest: '#ffffff',
  urgentSection: '#faf2ef',
  primary: '#fd8f13',
  /** Gradient endpoints (DESIGN.md signature CTA) */
  primaryDark: '#904d00',
  onPrimary: '#ffffff',
  onSurface: '#1d1b1a',
  onSurfaceMuted: '#504542',
  onSurfaceVariant: '#564335',
  /** Lavender accent — soft glow-friendly */
  secondaryLavender: '#f4e2ff',
  secondaryLavenderSoft: '#f5e2ff',
  secondaryOnLavender: '#3d2a45',
  tertiaryRose: '#f1bfcb',
  tertiaryRoseWash: '#fdd2dd',
  tertiaryOnRose: '#4a2d38',
  servicePeach: '#ffe4cc',
  servicePeachOn: '#4a2800',
  servicePeachGlow: '#fde0c1',
  serviceNeutral: '#dedcda',
  serviceNeutralOn: '#3d3c3b',
  urgentBadge: '#ba1a1a',
  tabInactive: '#504542',
  tabBarBorder: 'rgba(130, 117, 113, 0.1)',
  tabBarBg: 'rgba(255, 255, 255, 0.8)',
  secondaryContainer: '#f5e2ff',
  pillOverlay: 'rgba(255, 255, 255, 0.92)',
  ambientShadow: 'rgba(27, 28, 28, 0.06)',
  /** Card / border glow (lavender base #f4e2ff) */
  lavenderBorderStrong: 'rgba(244, 226, 255, 0.55)',
  lavenderBorder: 'rgba(244, 226, 255, 0.4)',
  lavenderBorderMuted: 'rgba(244, 226, 255, 0.3)',
  lavenderBorderSoft: 'rgba(244, 226, 255, 0.25)',
  lavenderBorderHairline: 'rgba(244, 226, 255, 0.2)',
  lavenderWash: 'rgba(244, 226, 255, 0.12)',
  lavenderWashLight: 'rgba(244, 226, 255, 0.1)',
  lavenderWashFaint: 'rgba(244, 226, 255, 0.08)',
  lavenderBadge: 'rgba(244, 226, 255, 0.9)',
  ambientShadowLavender: 'rgba(139, 92, 180, 0.14)',
  /** Meet Pets discovery (Figma) */
  discoverySearchBg: '#efe7e2',
  discoveryPlaceholder: '#6b7280',
  discoveryChipOnLavender: '#241a2e',
  /** Pet profile detail (Figma) */
  profileScreen: '#fffbfc',
  profileText: '#2d2a2e',
  profileTextMuted: '#6b656e',
  profileStatLabel: '#8a848c',
  profileStatsSurface: '#faf7fc',
  profileGalleryStroke: 'rgba(244, 226, 255, 0.65)',
  profileHealthSectionBg: '#fef9ff',
  profileStickyBar: 'rgba(255, 255, 255, 0.95)',
  profileOutlineBtnBg: '#f5f0f7',
  profileOutlineBtnBorder: '#d8d1d9',
  statusPillRose: '#f1bfcb',
  statusOnRose: '#2c1a36',
  applyGradientEnd: '#ffb66e',
  vaccineIconBg: '#e8f5e9',
  /** Pet Spa booking (Figma) */
  spaScreenBg: '#fff8f5',
  spaSectionAccent: '#944c00',
  spaNextAvailable: '#aa371c',
  spaBookingContainer: '#faf2ef',
  spaBookingContainerBorder: 'rgba(244, 226, 255, 0.45)',
  spaSpecialistSection: 'rgba(244, 226, 255, 0.12)',
} as const;

export const PetMatchRadius = {
  sm: 12,
  md: 24,
  lg: 32,
  xl: 48,
  full: 9999,
} as const;

export const PetMatchSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

/** Legacy hook compatibility (tabs still reference Colors) */
const tintColorLight = PetMatchColors.primary;

export const Colors = {
  light: {
    text: PetMatchColors.onSurface,
    background: PetMatchColors.surfaceScreen,
    tint: tintColorLight,
    icon: PetMatchColors.onSurfaceMuted,
    tabIconDefault: PetMatchColors.tabInactive,
    tabIconSelected: PetMatchColors.primary,
  },
  dark: {
    text: PetMatchColors.onSurface,
    background: PetMatchColors.surfaceScreen,
    tint: tintColorLight,
    icon: PetMatchColors.onSurfaceMuted,
    tabIconDefault: PetMatchColors.tabInactive,
    tabIconSelected: PetMatchColors.primary,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
