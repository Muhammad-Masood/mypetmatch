import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import {
  PET_SPA_FILTERS,
  PET_SPA_PROVIDERS,
  type PetSpaFilterId,
} from '@/constants/petSpaProviders';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

function ambientShadow() {
  return {
    shadowColor: '#1b1c1c',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 6,
  };
}

export function PetSpaDirectoryScreen() {
  const insets = useSafeAreaInsets();
  const { width: screenW } = useWindowDimensions();
  const router = useRouter();
  const pad = PetMatchSpacing.xl;
  const contentW = screenW - pad * 2;

  const [filter, setFilter] = useState<PetSpaFilterId>('all');

  const providers = useMemo(() => {
    if (filter === 'all') return PET_SPA_PROVIDERS;
    return PET_SPA_PROVIDERS.filter((p) => p.filters.includes(filter));
  }, [filter]);

  return (
    <View style={styles.root}>
      <DashboardHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 68 + 8, paddingBottom: 60 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: pad }}>
          <Text style={styles.eyebrow}>Wellness & Care</Text>
          <Text style={styles.heroTitle}>
            Curated Grooming{'\n'}For Your{'\n'}Companion.
          </Text>

          <View style={styles.chipWrap}>
            {PET_SPA_FILTERS.map((f) => {
              const active = filter === f.id;
              const isAll = f.id === 'all';
              const bg = isAll
                ? active
                  ? PetMatchColors.primary
                  : 'rgba(253, 143, 19, 0.14)'
                : f.bg;
              return (
                <Pressable
                  key={f.id}
                  onPress={() => setFilter(f.id)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: bg,
                      borderWidth: !isAll && active ? 2 : 0,
                      borderColor: PetMatchColors.primary,
                    },
                    !active && !isAll && styles.chipMuted,
                  ]}>
                  <Text
                    style={[
                      styles.chipLabel,
                      {
                        color: isAll ? (active ? PetMatchColors.onPrimary : PetMatchColors.primary) : f.onColor,
                      },
                    ]}>
                    {f.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.cardsColumn, { paddingHorizontal: pad, marginTop: PetMatchSpacing.xl }]}>
          {providers.map((p) => {
            const cardBg =
              p.cardStyle === 'white'
                ? PetMatchColors.surfaceContainerLowest
                : p.cardStyle === 'cream'
                  ? PetMatchColors.urgentSection
                  : PetMatchColors.lavenderWashFaint;

            return (
              <View
                key={p.id}
                style={[
                  styles.card,
                  { width: contentW },
                  { backgroundColor: cardBg },
                  ambientShadow(),
                ]}>
                <View style={styles.cardImageWrap}>
                  <Image source={{ uri: p.imageUri }} style={styles.cardImage} contentFit="cover" />
                  <View style={styles.badgeWrap}>
                    <View style={[styles.badge, { backgroundColor: p.badge.bg }]}>
                      <Text style={[styles.badgeText, p.badge.textColor && { color: p.badge.textColor }]}>
                        {p.badge.label}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{p.name}</Text>
                    <View style={styles.ratingPill}>
                      <MaterialIcons name="star" size={14} color={PetMatchColors.onboardingTitle} />
                      <Text style={styles.ratingNum}>{p.rating.toFixed(1)}</Text>
                      <Text style={styles.ratingCount}>({p.reviewCount})</Text>
                    </View>
                  </View>

                  <Text style={styles.description}>{p.description}</Text>

                  <View style={styles.statsRow}>
                    <View style={styles.statCol}>
                      <Text style={styles.statLabel}>Investment</Text>
                      <Text style={styles.statValueAccent}>{p.priceLabel}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statCol}>
                      <Text style={styles.statLabel}>{p.stat2Label}</Text>
                      <Text
                        style={[
                          styles.statValue,
                          p.stat2ValueAccent && { color: PetMatchColors.spaNextAvailable },
                        ]}>
                        {p.stat2Value}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.actionsRow}>
                    <Pressable
                      onPress={() =>
                        router.push({ pathname: '/pet-spa/booking', params: { providerId: p.id } })
                      }
                      style={styles.primaryCta}>
                      <Text style={styles.primaryCtaText}>{p.primaryAction.label}</Text>
                    </Pressable>
                    {p.secondaryAction ? (
                      <Pressable
                        style={styles.secondaryCta}
                        onPress={() =>
                          router.push({ pathname: '/pet-spa/booking', params: { providerId: p.id } })
                        }>
                        <Text style={styles.secondaryCtaText}>{p.secondaryAction.label}</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PetMatchColors.spaScreenBg,
  },
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
  },
  eyebrow: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 12,
    letterSpacing: 2.4,
    lineHeight: 16,
    color: PetMatchColors.primary,
    opacity: 0.65,
    textTransform: 'uppercase',
  },
  heroTitle: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 36,
    lineHeight: 45,
    letterSpacing: -0.9,
    color: PetMatchColors.onboardingTitle,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PetMatchSpacing.md,
    marginTop: PetMatchSpacing.lg,
  },
  chip: {
    paddingHorizontal: PetMatchSpacing.lg,
    paddingVertical: PetMatchSpacing.sm,
    borderRadius: PetMatchRadius.full,
    minHeight: 36,
    justifyContent: 'center',
  },
  chipMuted: {
    opacity: 0.85,
  },
  chipLabel: {
    fontFamily: FontFamily.manropeBold,
    fontSize: 14,
    lineHeight: 20,
  },
  cardsColumn: {
    gap: PetMatchSpacing.xl,
    paddingBottom: PetMatchSpacing.lg,
  },
  card: {
    borderRadius: 48,
    overflow: 'hidden',
  },
  cardImageWrap: {
    height: 256,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
  },
  badgeWrap: {
    position: 'absolute',
    left: PetMatchSpacing.lg,
    bottom: PetMatchSpacing.lg,
  },
  badge: {
    paddingHorizontal: PetMatchSpacing.md,
    paddingVertical: 4,
    borderRadius: PetMatchRadius.full,
  },
  badgeText: {
    fontFamily: FontFamily.manropeBold,
    fontSize: 10,
    letterSpacing: 0.5,
    lineHeight: 15,
    color: PetMatchColors.onboardingTitle,
  },
  cardBody: {
    paddingHorizontal: PetMatchSpacing.xl,
    paddingTop: PetMatchSpacing.xl,
    paddingBottom: PetMatchSpacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: PetMatchSpacing.md,
  },
  cardTitle: {
    flex: 1,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 24,
    lineHeight: 32,
    color: PetMatchColors.onboardingTitle,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: PetMatchRadius.full,
    backgroundColor: PetMatchColors.lavenderBorderHairline,
  },
  ratingNum: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.onboardingTitle,
  },
  ratingCount: {
    fontFamily: FontFamily.manropeBold,
    fontSize: 10,
    lineHeight: 15,
    color: PetMatchColors.onboardingTitle,
  },
  description: {
    marginTop: PetMatchSpacing.md,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 16,
    lineHeight: 26,
    color: PetMatchColors.onboardingSubtitle,
  },
  statsRow: {
    marginTop: PetMatchSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    fontFamily: FontFamily.manropeBold,
    fontSize: 10,
    letterSpacing: 1,
    lineHeight: 15,
    color: PetMatchColors.onboardingMuted,
  },
  statValueAccent: {
    marginTop: 4,
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 18,
    lineHeight: 28,
    color: PetMatchColors.primary,
  },
  statValue: {
    marginTop: 4,
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 18,
    lineHeight: 28,
    color: PetMatchColors.onboardingTitle,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(184, 176, 172, 0.35)',
    marginHorizontal: PetMatchSpacing.md,
  },
  actionsRow: {
    marginTop: PetMatchSpacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PetMatchSpacing.md,
    alignItems: 'center',
  },
  primaryCta: {
    backgroundColor: PetMatchColors.primary,
    paddingHorizontal: PetMatchSpacing.xl,
    paddingVertical: PetMatchSpacing.md + 2,
    borderRadius: PetMatchRadius.full,
    minHeight: 56,
    justifyContent: 'center',
  },
  primaryCtaText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onPrimary,
    textAlign: 'center',
  },
  secondaryCta: {
    backgroundColor: '#e9e1dc',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(253, 143, 19, 0.12)',
    paddingHorizontal: PetMatchSpacing.xl,
    paddingVertical: PetMatchSpacing.md + 4,
    borderRadius: PetMatchRadius.full,
    minHeight: 58,
    justifyContent: 'center',
  },
  secondaryCtaText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.primary,
    textAlign: 'center',
  },
});
