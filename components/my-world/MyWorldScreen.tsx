import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Href, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

const USER = {
  name: 'Muhammad Masood',
  city: 'Karachi, Pakistan',
  memberSince: 'Member since 2026',
  avatar:
    'https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?w=400&h=400&fit=crop&facepad=4',
  profilePct: 85,
};

const STATS = [
  { label: 'Saved', value: '12', icon: 'bookmark' as const, hint: 'pets you love' },
  { label: 'Applications', value: '3', icon: 'assignment-turned-in' as const, hint: 'in progress' },
  { label: 'Bookings', value: '2', icon: 'event' as const, hint: 'upcoming' },
];

const SHORTCUTS: {
  title: string;
  sub: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  href: Href;
  gradient: [string, string];
}[] = [
  {
    title: 'Pet Match Quiz',
    sub: 'Refine your match',
    icon: 'quiz',
    href: '/(tabs)/pet-match-quiz' as Href,
    gradient: ['#fd8f13', '#ffb66e'],
  },
  {
    title: 'Find My Pet',
    sub: 'Tell us your dream pet',
    icon: 'search',
    href: '/(tabs)/find-my-pet' as Href,
    gradient: ['#f4e2ff', '#f5e2ff'],
  },
  {
    title: 'Pet Spa',
    sub: 'Grooming & care',
    icon: 'spa',
    href: '/(tabs)/pet-spa' as Href,
    gradient: ['#f1bfcb', '#fdd2dd'],
  },
  {
    title: 'Meet Pets',
    sub: 'Discover companions',
    icon: 'pets',
    href: '/(tabs)/meet-pets' as Href,
    gradient: ['#fde0c1', '#fff5eb'],
  },
];

const SAVED_PETS = [
  {
    id: 's1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    uri: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&h=800&fit=crop',
  },
  {
    id: 's2',
    name: 'Luna',
    breed: 'British Shorthair',
    uri: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=800&fit=crop',
  },
  {
    id: 's3',
    name: 'Milo',
    breed: 'Labrador',
    uri: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&h=800&fit=crop',
  },
];

const JOURNEY = [
  { id: 'j1', title: 'Application sent', detail: 'Golden Retriever · Portland Shelter', when: '2d ago' },
  { id: 'j2', title: 'Spa booking confirmed', detail: 'The Velvet Paw Studio', when: '5d ago' },
  { id: 'j3', title: 'Quiz completed', detail: 'Your match profile updated', when: '1w ago' },
];

function ambientShadow() {
  return {
    shadowColor: '#1b1c1c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 6,
  };
}

export function MyWorldScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenW } = useWindowDimensions();
  const pad = PetMatchSpacing.xl;
  const savedCardW = Math.min(160, 0.42 * screenW);

  return (
    <View style={styles.root}>
      <View style={styles.decorTop} pointerEvents="none" />
      <View style={styles.decorBottom} pointerEvents="none" />

      <DashboardHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 68 + 8, paddingBottom: 60 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: pad }}>
          <Text style={styles.eyebrow}>Your world</Text>
          <Text style={styles.pageTitle}>Everything in one place</Text>
        </View>

        <View style={[styles.heroWrap, { marginHorizontal: pad, marginTop: PetMatchSpacing.lg }]}>
          <LinearGradient
            colors={[PetMatchColors.primary, PetMatchColors.applyGradientEnd]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.heroAccentBar}
          />
          <View style={styles.heroInner}>
            <View style={styles.heroRow}>
              <Image source={{ uri: USER.avatar }} style={styles.heroAvatar} contentFit="cover" />
              <View style={styles.heroInfo}>
                <Text style={styles.heroName}>{USER.name}</Text>
                <View style={styles.heroRowMeta}>
                  <MaterialIcons name="location-on" size={16} color={PetMatchColors.onSurfaceMuted} />
                  <Text style={styles.heroMeta}>{USER.city}</Text>
                </View>
                <Text style={styles.heroMember}>{USER.memberSince}</Text>
              </View>
            </View>
            <View style={styles.heroActions}>
              <Pressable style={({ pressed }) => [styles.editBtn, pressed && styles.pressed]}>
                <MaterialIcons name="edit" size={18} color={PetMatchColors.onPrimary} />
                <Text style={styles.editBtnText}>Edit profile</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.settingsBtn, pressed && styles.pressed]}>
                <MaterialIcons name="settings" size={22} color={PetMatchColors.onSurfaceMuted} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.statsRow, { paddingHorizontal: pad, marginTop: PetMatchSpacing.lg }]}>
          {STATS.map((s) => (
            <View key={s.label} style={[styles.statCard, ambientShadow()]}>
              <View style={styles.statIconWrap}>
                <MaterialIcons name={s.icon} size={22} color={PetMatchColors.primary} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statHint}>{s.hint}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.completionCard, { marginHorizontal: pad, marginTop: PetMatchSpacing.xl }, ambientShadow()]}>
          <View style={styles.completionTop}>
            <Text style={styles.completionTitle}>Profile strength</Text>
            <Text style={styles.completionPct}>{USER.profilePct}%</Text>
          </View>
          <View style={styles.completionTrack}>
            <LinearGradient
              colors={[PetMatchColors.primary, PetMatchColors.applyGradientEnd]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.completionFill, { width: `${USER.profilePct}%` }]}
            />
          </View>
          <Text style={styles.completionSub}>
            Add a short bio and your ideal pet to unlock better matches.
          </Text>
        </View>

        <View style={{ paddingHorizontal: pad, marginTop: PetMatchSpacing.xxl }}>
          <Text style={styles.sectionTitle}>Shortcuts</Text>
          <Text style={styles.sectionSub}>Jump back into what matters</Text>
        </View>

        <View style={[styles.shortcutGrid, { paddingHorizontal: pad }]}>
          {SHORTCUTS.map((s) => (
            <Pressable
              key={s.title}
              onPress={() => router.push(s.href)}
              style={({ pressed }) => [styles.shortcutTile, pressed && styles.pressed]}>
              <LinearGradient colors={s.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.shortcutGrad}>
                <MaterialIcons name={s.icon} size={26} color={PetMatchColors.onboardingTitle} />
                <Text style={styles.shortcutTitle}>{s.title}</Text>
                <Text style={styles.shortcutSub}>{s.sub}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        <View style={[styles.sectionHead, { paddingHorizontal: pad, marginTop: PetMatchSpacing.xxl }]}>
          <Text style={styles.sectionTitle}>Saved pets</Text>
          <Pressable onPress={() => router.push('/(tabs)/menu/saved-pets' as Href)} hitSlop={8}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.savedCarousel, { paddingLeft: pad, paddingRight: pad }]}
          decelerationRate="fast">
          {SAVED_PETS.map((pet, i) => (
            <Pressable
              key={pet.id}
              style={({ pressed }) => [
                styles.savedCard,
                { width: savedCardW },
                i < SAVED_PETS.length - 1 && { marginRight: PetMatchSpacing.md },
                ambientShadow(),
                pressed && styles.pressed,
              ]}>
              <View style={styles.savedImageWrap}>
                <Image source={{ uri: pet.uri }} style={styles.savedImage} contentFit="cover" />
                <View style={styles.savedHeart}>
                  <MaterialIcons name="favorite" size={18} color={PetMatchColors.urgentBadge} />
                </View>
              </View>
              <Text style={styles.savedName}>{pet.name}</Text>
              <Text style={styles.savedBreed}>{pet.breed}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={[styles.sectionHead, { paddingHorizontal: pad, marginTop: PetMatchSpacing.xxl, paddingBottom: 20 }]}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
        </View>

        <View style={{ paddingHorizontal: pad, gap: PetMatchSpacing.sm }}>
          {JOURNEY.map((j) => (
            <View key={j.id} style={[styles.journeyRow, ambientShadow()]}>
              <View style={styles.journeyDot} />
              <View style={styles.journeyBody}>
                <Text style={styles.journeyTitle}>{j.title}</Text>
                <Text style={styles.journeyDetail}>{j.detail}</Text>
              </View>
              <Text style={styles.journeyWhen}>{j.when}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.tipCard, { marginHorizontal: pad, marginTop: PetMatchSpacing.xl }, ambientShadow()]}>
          <View style={styles.tipIcon}>
            <MaterialIcons name="lightbulb-outline" size={24} color={PetMatchColors.primary} />
          </View>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Tip of the week</Text>
            <Text style={styles.tipBody}>
              Update your Pet Match Quiz seasonally—your lifestyle changes, and so do your best matches.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PetMatchColors.onboardingBackground,
  },
  decorTop: {
    position: 'absolute',
    top: 100,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: PetMatchColors.secondaryLavender,
    opacity: 0.25,
  },
  decorBottom: {
    position: 'absolute',
    bottom: 200,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: PetMatchColors.tertiaryRose,
    opacity: 0.2,
  },
  scroll: { flex: 1, zIndex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: PetMatchSpacing.xl },
  eyebrow: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: PetMatchColors.primary,
    opacity: 0.75,
  },
  pageTitle: {
    marginTop: PetMatchSpacing.xs,
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: PetMatchColors.onboardingTitle,
  },
  heroWrap: {
    borderRadius: PetMatchRadius.lg,
    overflow: 'hidden',
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: PetMatchColors.onboardingDivider,
    ...ambientShadow(),
  },
  heroAccentBar: {
    height: 4,
    width: '100%',
  },
  heroInner: {
    padding: PetMatchSpacing.xl,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: PetMatchSpacing.lg,
  },
  heroAvatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: PetMatchColors.profileOutlineBtnBorder,
  },
  heroInfo: { flex: 1 },
  heroName: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 22,
    lineHeight: 28,
    color: PetMatchColors.onboardingTitle,
  },
  heroRowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  heroMeta: {
    fontFamily: FontFamily.manropeMedium,
    fontSize: 14,
    color: PetMatchColors.onSurfaceMuted,
  },
  heroMember: {
    marginTop: 8,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 13,
    color: PetMatchColors.onboardingSubtitle,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: PetMatchSpacing.lg,
    gap: PetMatchSpacing.md,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: PetMatchSpacing.sm,
    backgroundColor: PetMatchColors.primary,
    paddingVertical: PetMatchSpacing.md,
    borderRadius: PetMatchRadius.full,
  },
  editBtnText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 15,
    color: PetMatchColors.onPrimary,
  },
  settingsBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PetMatchColors.discoverySearchBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.onboardingDivider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.88,
  },
  statsRow: {
    flexDirection: 'row',
    gap: PetMatchSpacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: PetMatchRadius.md,
    padding: PetMatchSpacing.md,
    alignItems: 'center',
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(253, 143, 19, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: PetMatchSpacing.sm,
  },
  statValue: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 22,
    lineHeight: 28,
    color: PetMatchColors.onboardingTitle,
  },
  statLabel: {
    fontFamily: FontFamily.jakartaSemiBold,
    fontSize: 12,
    color: PetMatchColors.onSurfaceMuted,
    marginTop: 2,
  },
  statHint: {
    fontFamily: FontFamily.manropeRegular,
    fontSize: 10,
    color: PetMatchColors.onboardingMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  completionCard: {
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: PetMatchRadius.lg,
    padding: PetMatchSpacing.xl,
  },
  completionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completionTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    color: PetMatchColors.onboardingTitle,
  },
  completionPct: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 18,
    color: PetMatchColors.primary,
  },
  completionTrack: {
    marginTop: PetMatchSpacing.md,
    height: 8,
    borderRadius: 4,
    backgroundColor: PetMatchColors.discoverySearchBg,
    overflow: 'hidden',
  },
  completionFill: {
    height: '100%',
    borderRadius: 4,
  },
  completionSub: {
    marginTop: PetMatchSpacing.md,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 14,
    lineHeight: 22,
    color: PetMatchColors.onboardingSubtitle,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 20,
    lineHeight: 26,
    color: PetMatchColors.onboardingTitle,
  },
  sectionSub: {
    marginTop: 4,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 14,
    color: PetMatchColors.onboardingSubtitle,
  },
  seeAll: {
    fontFamily: FontFamily.jakartaSemiBold,
    fontSize: 14,
    color: PetMatchColors.primary,
  },
  shortcutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PetMatchSpacing.md,
    marginTop: PetMatchSpacing.lg,
  },
  shortcutTile: {
    width: '47%',
    minWidth: 150,
    borderRadius: PetMatchRadius.md,
    overflow: 'hidden',
  },
  shortcutGrad: {
    padding: PetMatchSpacing.lg,
    minHeight: 118,
    borderRadius: PetMatchRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  shortcutTitle: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 15,
    lineHeight: 20,
    color: PetMatchColors.onboardingTitle,
  },
  shortcutSub: {
    marginTop: 4,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 12,
    lineHeight: 16,
    color: PetMatchColors.onSurfaceMuted,
  },
  savedCarousel: {
    marginTop: PetMatchSpacing.lg,
    paddingBottom: PetMatchSpacing.sm,
  },
  savedCard: {
    borderRadius: PetMatchRadius.md,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    overflow: 'hidden',
    paddingBottom: PetMatchSpacing.md,
  },
  savedImageWrap: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  savedImage: {
    ...StyleSheet.absoluteFillObject,
  },
  savedHeart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 252, 251, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedName: {
    marginTop: PetMatchSpacing.sm,
    marginHorizontal: PetMatchSpacing.md,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    color: PetMatchColors.onboardingTitle,
  },
  savedBreed: {
    marginHorizontal: PetMatchSpacing.md,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 13,
    color: PetMatchColors.onboardingSubtitle,
  },
  journeyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: PetMatchRadius.md,
    padding: PetMatchSpacing.lg,
    gap: PetMatchSpacing.md,
  },
  journeyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PetMatchColors.primary,
    marginTop: 6,
  },
  journeyBody: { flex: 1 },
  journeyTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 15,
    color: PetMatchColors.onboardingTitle,
  },
  journeyDetail: {
    marginTop: 4,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 13,
    lineHeight: 18,
    color: PetMatchColors.onboardingSubtitle,
  },
  journeyWhen: {
    fontFamily: FontFamily.manropeMedium,
    fontSize: 11,
    color: PetMatchColors.onboardingMuted,
  },
  tipCard: {
    flexDirection: 'row',
    padding: PetMatchSpacing.lg,
    backgroundColor: PetMatchColors.profileStatsSurface,
    borderRadius: PetMatchRadius.lg,
    gap: PetMatchSpacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.profileOutlineBtnBorder,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(253, 143, 19, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: { flex: 1 },
  tipTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 15,
    color: PetMatchColors.onboardingTitle,
  },
  tipBody: {
    marginTop: 6,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 14,
    lineHeight: 22,
    color: PetMatchColors.onboardingSubtitle,
  },
});
