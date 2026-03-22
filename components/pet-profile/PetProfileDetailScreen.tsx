import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { getPetProfile } from '@/constants/petProfiles';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

const GAP = 16;

export function PetProfileDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { width: screenW } = useWindowDimensions();
  const profile = id ? getPetProfile(String(id)) : undefined;

  const horizontalPad = PetMatchSpacing.xl;
  const itemW = Math.min(304, screenW - horizontalPad * 2);
  const itemH = itemW * (380.36 / 304.3);
  const snapInterval = itemW + GAP;

  const [galleryIndex, setGalleryIndex] = useState(0);

  /** Sticky bar replaces tab bar (hidden in CustomTabBar); reserve space for bar + safe area. */
  const stickyBarContentHeight = 72;
  const bottomReserve = stickyBarContentHeight + Math.max(insets.bottom, 12) + PetMatchSpacing.lg;

  if (!profile) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 80 }]}>
        <DashboardHeader />
        <Text style={styles.fallback}>Pet not found.</Text>
      </View>
    );
  }

  const images = profile.images.length > 0 ? profile.images : ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop'];

  const onGalleryScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / snapInterval);
    if (idx !== galleryIndex && idx >= 0 && idx < images.length) {
      setGalleryIndex(idx);
    }
  };

  return (
    <View style={styles.root}>
      <DashboardHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomReserve, paddingTop: insets.top + 68 + 8 },
        ]}
        showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          snapToInterval={snapInterval}
          snapToAlignment="start"
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onGalleryScroll}
          onScrollEndDrag={onGalleryScroll}
          contentContainerStyle={[styles.galleryScroll, { paddingHorizontal: horizontalPad }]}>
          {images.map((uri, i) => (
            <View
              key={`${uri}-${i}`}
              style={[
                styles.galleryCard,
                {
                  width: itemW,
                  height: itemH,
                  marginRight: i < images.length - 1 ? GAP : 0,
                  borderColor: PetMatchColors.profileGalleryStroke,
                },
              ]}>
              <Image source={{ uri }} style={styles.galleryImage} contentFit="cover" />
            </View>
          ))}
        </ScrollView>

        <View style={[styles.dotsRow, { marginTop: PetMatchSpacing.md }]}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === galleryIndex ? styles.dotActive : styles.dotIdle,
              ]}
            />
          ))}
        </View>

        <View style={[styles.block, { paddingHorizontal: horizontalPad }]}>
          <View style={styles.identityRow}>
            <View style={styles.identityText}>
              <Text style={styles.petTitle}>{profile.name}</Text>
              <Text style={styles.petBreed}>{profile.breed}</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>{profile.statusLabel}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            {[
              { label: 'Age', value: profile.stats.age },
              { label: 'Gender', value: profile.stats.gender },
              { label: 'Size', value: profile.stats.size },
            ].map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Personality</Text>
          <View style={styles.chipWrap}>
            {profile.personality.map((p) => (
              <View key={p} style={styles.chip}>
                <Text style={styles.chipText}>{p}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.bio}>{profile.bio}</Text>

          <View style={styles.healthSection}>
            <Text style={styles.healthSectionHeading}>Health & Documents</Text>
            <View style={styles.healthCard}>
              <View style={[styles.healthIcon, { backgroundColor: PetMatchColors.vaccineIconBg }]}>
                <MaterialIcons name="verified" size={20} color="#2e7d32" />
              </View>
              <View style={styles.healthTextCol}>
                <Text style={styles.healthRowTitle}>{profile.health.vaccination.title}</Text>
                <Text style={styles.healthRowSub}>{profile.health.vaccination.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={PetMatchColors.profileTextMuted} />
            </View>
            <View style={[styles.healthCard, styles.healthCardSecond]}>
              <View style={[styles.healthIcon, { backgroundColor: PetMatchColors.tertiaryRose }]}>
                <MaterialIcons name="pets" size={20} color={PetMatchColors.discoveryChipOnLavender} />
              </View>
              <View style={styles.healthTextCol}>
                <Text style={styles.healthRowTitle}>{profile.health.microchip.title}</Text>
                <Text style={styles.healthRowSub}>{profile.health.microchip.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={PetMatchColors.profileTextMuted} />
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: PetMatchSpacing.xxl }]}>Listed By</Text>
          <View style={styles.listedCard}>
            <Image
              source={{ uri: profile.listedBy.imageUri }}
              style={styles.listedAvatar}
              contentFit="cover"
            />
            <View style={styles.listedTextCol}>
              <Text style={styles.listedName}>{profile.listedBy.name}</Text>
              <Text style={styles.listedSub}>{profile.listedBy.subtitle}</Text>
            </View>
            <Pressable style={styles.listedMsgBtn}>
              <MaterialIcons name="chat-bubble-outline" size={22} color={PetMatchColors.onSurface} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.stickyBar,
          {
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}>
        <View style={styles.stickyRow}>
          <Pressable style={styles.iconAction}>
            <MaterialIcons name="favorite-border" size={22} color={PetMatchColors.profileText} />
          </Pressable>
          <Pressable style={styles.outlineCta}>
            <Text style={styles.outlineCtaText}>Request Info</Text>
          </Pressable>
          <View style={styles.primaryCtaWrap}>
            <LinearGradient
              colors={[PetMatchColors.primary, PetMatchColors.applyGradientEnd]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={styles.primaryCta}>
              <Text style={styles.primaryCtaText}>Apply Now</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PetMatchColors.profileScreen,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  fallback: {
    textAlign: 'center',
    marginTop: PetMatchSpacing.xxl,
    fontFamily: FontFamily.manropeMedium,
    color: PetMatchColors.profileTextMuted,
  },
  galleryScroll: {
    alignItems: 'center',
  },
  galleryCard: {
    borderRadius: PetMatchRadius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    backgroundColor: PetMatchColors.surfaceContainerLowest,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 24,
    backgroundColor: PetMatchColors.primary,
  },
  dotIdle: {
    width: 6,
    backgroundColor: PetMatchColors.secondaryLavender,
  },
  block: {
    marginTop: PetMatchSpacing.xl,
  },
  identityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: PetMatchSpacing.md,
  },
  identityText: {
    flex: 1,
  },
  petTitle: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.9,
    color: PetMatchColors.profileText,
  },
  petBreed: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 18,
    lineHeight: 28,
    color: PetMatchColors.profileTextMuted,
  },
  statusPill: {
    backgroundColor: PetMatchColors.statusPillRose,
    paddingHorizontal: PetMatchSpacing.lg,
    paddingVertical: 6,
    borderRadius: PetMatchRadius.full,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  statusPillText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.7,
    color: PetMatchColors.statusOnRose,
  },
  statsRow: {
    flexDirection: 'row',
    gap: PetMatchSpacing.md,
    marginTop: PetMatchSpacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: PetMatchColors.profileStatsSurface,
    borderRadius: PetMatchRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.lavenderBorderHairline,
    paddingVertical: PetMatchSpacing.md,
    paddingHorizontal: PetMatchSpacing.sm,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: FontFamily.jakartaRegular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    color: PetMatchColors.profileStatLabel,
  },
  statValue: {
    marginTop: 4,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.primary,
  },
  sectionTitle: {
    marginTop: PetMatchSpacing.xxl,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.profileText,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PetMatchSpacing.md,
    marginTop: PetMatchSpacing.lg,
  },
  chip: {
    backgroundColor: PetMatchColors.secondaryLavender,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d8d1d9',
    paddingHorizontal: PetMatchSpacing.lg,
    paddingVertical: 9,
    borderRadius: PetMatchRadius.full,
  },
  chipText: {
    fontFamily: FontFamily.manropeMedium,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.statusOnRose,
  },
  bio: {
    marginTop: PetMatchSpacing.xl,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 16,
    lineHeight: 26,
    color: PetMatchColors.profileTextMuted,
  },
  healthSection: {
    marginTop: PetMatchSpacing.xxl,
    backgroundColor: PetMatchColors.profileHealthSectionBg,
    borderRadius: PetMatchRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.lavenderBorderMuted,
    padding: PetMatchSpacing.xl,
  },
  healthSectionHeading: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.profileText,
    marginBottom: PetMatchSpacing.lg,
  },
  healthCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: 6,
    paddingVertical: PetMatchSpacing.md,
    paddingHorizontal: PetMatchSpacing.md,
  },
  healthCardSecond: {
    marginTop: PetMatchSpacing.md,
  },
  healthIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: PetMatchSpacing.md,
  },
  healthTextCol: {
    flex: 1,
  },
  healthRowTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.profileText,
  },
  healthRowSub: {
    marginTop: 2,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 12,
    lineHeight: 16,
    color: PetMatchColors.profileTextMuted,
  },
  listedCard: {
    marginTop: PetMatchSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: PetMatchRadius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.lavenderBorderHairline,
    padding: PetMatchSpacing.xl,
    gap: PetMatchSpacing.md,
  },
  listedAvatar: {
    width: 48,
    height: 56,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.tertiaryRose,
  },
  listedTextCol: {
    flex: 1,
  },
  listedName: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.profileText,
  },
  listedSub: {
    marginTop: 4,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 12,
    lineHeight: 16,
    color: PetMatchColors.profileTextMuted,
  },
  listedMsgBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PetMatchColors.tertiaryRose,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: PetMatchSpacing.xl,
    paddingTop: PetMatchSpacing.lg,
    backgroundColor: PetMatchColors.profileStickyBar,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: PetMatchColors.lavenderBorderSoft,
    shadowColor: '#1b1c1c',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 16,
  },
  stickyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: PetMatchSpacing.md,
  },
  iconAction: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PetMatchColors.profileOutlineBtnBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.profileOutlineBtnBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineCta: {
    height: 48,
    paddingHorizontal: PetMatchSpacing.lg,
    borderRadius: PetMatchRadius.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.primary,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineCtaText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.35,
    color: PetMatchColors.primary,
  },
  primaryCtaWrap: {
    flex: 1,
    minWidth: 140,
    borderRadius: PetMatchRadius.full,
    overflow: 'hidden',
  },
  primaryCta: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PetMatchSpacing.xl,
  },
  primaryCtaText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.35,
    color: PetMatchColors.onPrimary,
  },
});
