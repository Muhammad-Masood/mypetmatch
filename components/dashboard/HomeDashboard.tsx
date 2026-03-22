import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Href, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { PETS_LIST } from '@/constants/petProfiles';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

/** First two discoverable pets — ids match `meet-pets/[id]` profiles. */
const HIGHLIGHTED = PETS_LIST.slice(0, 2);

const URGENT: { pet: (typeof PETS_LIST)[number]; detail: string }[] = [
  {
    pet: PETS_LIST[1],
    detail: 'Needs a quiet foster home soon.\nVery gentle and shy.',
  },
  {
    pet: PETS_LIST[3],
    detail: 'Looking for a calm forever home.\nSweet and easygoing.',
  },
];

const SERVICES: {
  key: string;
  label: string;
  bg: string;
  onColor: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  href: Href;
}[] = [
  {
    key: 'grooming',
    label: 'Grooming',
    bg: PetMatchColors.secondaryLavender,
    onColor: PetMatchColors.secondaryOnLavender,
    icon: 'content-cut',
    href: '/(tabs)/pet-spa',
  },
  {
    key: 'vets',
    label: 'Vets',
    bg: PetMatchColors.tertiaryRose,
    onColor: PetMatchColors.tertiaryOnRose,
    icon: 'local-hospital',
    href: '/(tabs)/menu/vets',
  },
  {
    key: 'found',
    label: 'Found a Pet',
    bg: PetMatchColors.servicePeachGlow,
    onColor: PetMatchColors.servicePeachOn,
    icon: 'search',
    href: '/(tabs)/menu/report-pet-found',
  },
  {
    key: 'sitting',
    label: 'Pet Sitting',
    bg: PetMatchColors.serviceNeutral,
    onColor: PetMatchColors.serviceNeutralOn,
    icon: 'hotel',
    href: '/(tabs)/menu/find-a-home',
  },
];

function openPetProfile(petId: string) {
  router.push({ pathname: '/meet-pets/[id]', params: { id: petId } });
}

function ambientCardShadow(kind: 'lavender' | 'neutral' = 'lavender') {
  if (kind === 'lavender') {
    return {
      shadowColor: PetMatchColors.ambientShadowLavender,
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.55,
      shadowRadius: 32,
      elevation: 8,
    };
  }
  return {
    shadowColor: '#1b1c1c',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 6,
  };
}

export function HomeDashboard() {
  const insets = useSafeAreaInsets();
  const { width: screenW } = useWindowDimensions();
  const pad = PetMatchSpacing.xl;
  const highlightCardW = Math.min(288, Math.round(screenW * (288 / 390)));
  const urgentCardW = Math.min(256, Math.round(screenW * (256 / 390)));
  const contentW = screenW - pad * 2;
  const serviceGap = PetMatchSpacing.lg;
  const serviceTileW = (contentW - serviceGap) / 2;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['rgba(244, 226, 255, 0.55)', '#fffcfb', 'rgba(241, 191, 203, 0.14)']}
        locations={[0, 0.42, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <DashboardHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 68 + 12, paddingBottom: 60 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: pad }}>
          <LinearGradient
            colors={[PetMatchColors.secondaryLavender, PetMatchColors.secondaryLavenderSoft]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.heroAccentBar}
          />
          <Text style={styles.heroTitle}>Hello, Muhammad!</Text>
          <Text style={styles.heroSubtitle}>Find your perfect soulmate today.</Text>
        </View>

        <View style={[styles.sectionHeaderRow, { paddingHorizontal: pad, marginTop: PetMatchSpacing.xxl }]}>
          <Text style={styles.sectionTitle}>Highlighted Pets</Text>
          <Pressable
            hitSlop={8}
            onPress={() => router.push('/(tabs)/meet-pets')}
            accessibilityRole="button"
            accessibilityLabel="See all pets">
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hCarousel}
          decelerationRate="fast">
          {HIGHLIGHTED.map((pet, i) => (
            <Pressable
              key={pet.id}
              onPress={() => openPetProfile(pet.id)}
              accessibilityRole="button"
              accessibilityLabel={`${pet.name}, ${pet.breed}. Open profile`}
              style={({ pressed }) => [
                styles.highlightCard,
                { width: highlightCardW, marginLeft: i === 0 ? pad : 0, marginRight: PetMatchSpacing.lg },
                ambientCardShadow('lavender'),
                styles.highlightCardRing,
                pressed && styles.cardPressed,
              ]}>
              <View style={[styles.highlightImageWrap, { height: Math.round(highlightCardW * (320 / 288)) }]}>
                <Image source={{ uri: pet.uri }} style={styles.highlightImage} contentFit="cover" />
                <View style={styles.pillRow}>
                  <View style={styles.pill}>
                    <Text style={styles.pillPrimary}>{pet.breed}</Text>
                  </View>
                  <View style={styles.pill}>
                    <Text style={styles.pillMuted}>{pet.age}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.highlightFooter}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Pressable
                  hitSlop={10}
                  onPress={() => router.push('/(tabs)/menu/saved-pets')}
                  accessibilityRole="button"
                  accessibilityLabel="Saved pets">
                  <MaterialIcons name="favorite-border" size={20} color={PetMatchColors.onSurfaceMuted} />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={[styles.urgentSection, { marginTop: PetMatchSpacing.xl }]}>
          <LinearGradient
            colors={['rgba(253, 210, 221, 0.38)', 'rgba(250, 242, 239, 0)']}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.urgentSectionGlow}
            pointerEvents="none"
          />
          <View style={[styles.urgentHeadingRow, { paddingHorizontal: pad, paddingTop: PetMatchSpacing.xl }]}>
            <Text style={styles.sectionTitle}>Urgent Homes</Text>
            <Pressable
              hitSlop={8}
              onPress={() => router.push('/(tabs)/menu/urgent-homes')}
              accessibilityRole="button"
              accessibilityLabel="See all urgent homes">
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>

          {/* <View style={[styles.sectionHeaderRow, { paddingHorizontal: pad, marginTop: PetMatchSpacing.xxl }]}>
          <Text style={styles.sectionTitle}>Highlighted Pets</Text>
          <Pressable
            hitSlop={8}
            onPress={() => router.push('/(tabs)/meet-pets')}
            accessibilityRole="button"
            accessibilityLabel="See all pets">
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View> */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hCarousel}
            decelerationRate="fast">
            {URGENT.map(({ pet, detail }, i) => (
              <Pressable
                key={pet.id}
                onPress={() => openPetProfile(pet.id)}
                accessibilityRole="button"
                accessibilityLabel={`${pet.name}, urgent. Open profile`}
                style={({ pressed }) => [
                  styles.urgentCard,
                  { width: urgentCardW, marginLeft: i === 0 ? pad : 0, marginRight: PetMatchSpacing.lg },
                  ambientCardShadow('neutral'),
                  pressed && styles.cardPressed,
                ]}>
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentBadgeText}>Urgent</Text>
                </View>
                <View style={styles.urgentImageWrap}>
                  <Image source={{ uri: pet.uri }} style={styles.urgentImage} contentFit="cover" />
                </View>
                <View style={styles.urgentBody}>
                  <Text style={styles.urgentName}>{pet.name}</Text>
                  <Text style={styles.urgentDetail}>{detail}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: pad, marginTop: PetMatchSpacing.xxl }}>
          <Text style={styles.sectionTitle}>Pet Care Services</Text>
          <View style={[styles.serviceGrid, { marginTop: PetMatchSpacing.lg, gap: serviceGap }]}>
            {SERVICES.map((s) => (
              <Pressable
                key={s.key}
                onPress={() => router.push(s.href)}
                accessibilityRole="button"
                accessibilityLabel={s.label}
                style={({ pressed }) => [
                  styles.serviceTile,
                  {
                    width: serviceTileW,
                    backgroundColor: s.bg,
                    opacity: pressed ? 0.92 : 1,
                  },
                  styles.serviceTileShadow,
                ]}>
                <View style={styles.serviceIconCircle}>
                  <MaterialIcons name={s.icon} size={22} color={PetMatchColors.onSurface} />
                </View>
                <Text style={[styles.serviceLabel, { color: s.onColor }]}>{s.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/(tabs)/menu/chat-with-us')}
          accessibilityRole="button"
          accessibilityLabel="Open chat support">
          <LinearGradient
            colors={[PetMatchColors.primary, PetMatchColors.applyGradientEnd]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.chatBanner, { width: contentW, marginHorizontal: pad, marginTop: PetMatchSpacing.xxl }]}>
            <View style={styles.chatTextCol}>
              <Text style={styles.chatTitle}>Quick Support</Text>
              <Text style={styles.chatBody}>
                Need help with adoption? Chat with{'\n'}our team now.
              </Text>
            </View>
            <View style={styles.chatFab}>
              <MaterialIcons name="chat-bubble-outline" size={20} color={PetMatchColors.onSurface} />
            </View>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PetMatchColors.surfaceScreen,
    overflow: 'hidden',
  },
  heroAccentBar: {
    alignSelf: 'flex-start',
    width: 56,
    height: 5,
    borderRadius: 3,
    marginBottom: PetMatchSpacing.md,
    opacity: 0.95,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroTitle: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.75,
    color: PetMatchColors.onSurface,
  },
  heroSubtitle: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onSurfaceMuted,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  urgentHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.985 }],
  },
  sectionTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.onSurface,
  },
  seeAll: {
    fontFamily: FontFamily.manropeBold,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.primary,
  },
  hCarousel: {
    paddingRight: PetMatchSpacing.xl,
    paddingVertical: PetMatchSpacing.md,
  },
  highlightCard: {
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: PetMatchRadius.xl,
    overflow: 'hidden',
  },
  highlightCardRing: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.lavenderBorderHairline,
  },
  highlightImageWrap: {
    width: '100%',
    position: 'relative',
  },
  highlightImage: {
    width: '100%',
    height: '100%',
  },
  pillRow: {
    position: 'absolute',
    left: PetMatchSpacing.lg,
    right: PetMatchSpacing.lg,
    bottom: PetMatchSpacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PetMatchSpacing.sm,
  },
  pill: {
    backgroundColor: PetMatchColors.pillOverlay,
    paddingHorizontal: PetMatchSpacing.md,
    paddingVertical: 4,
    borderRadius: PetMatchRadius.full,
  },
  pillPrimary: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    color: PetMatchColors.primary,
  },
  pillMuted: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    color: PetMatchColors.onSurface,
  },
  highlightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PetMatchSpacing.xl,
    paddingVertical: PetMatchSpacing.lg,
  },
  petName: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.onSurface,
  },
  urgentSection: {
    position: 'relative',
    backgroundColor: PetMatchColors.urgentSection,
    paddingBottom: PetMatchSpacing.xl,
    overflow: 'hidden',
  },
  urgentSectionGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 132,
  },
  urgentCard: {
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: PetMatchRadius.xl,
    overflow: 'visible',
  },
  urgentBadge: {
    position: 'absolute',
    top: PetMatchSpacing.lg,
    left: PetMatchSpacing.lg,
    zIndex: 2,
    backgroundColor: PetMatchColors.urgentBadge,
    paddingHorizontal: PetMatchSpacing.md,
    paddingVertical: 6,
    borderRadius: PetMatchRadius.full,
  },
  urgentBadgeText: {
    fontFamily: FontFamily.manropeExtraBold,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1,
    color: PetMatchColors.onPrimary,
  },
  urgentImageWrap: {
    width: '100%',
    height: 192,
    borderTopLeftRadius: PetMatchRadius.xl,
    borderTopRightRadius: PetMatchRadius.xl,
    overflow: 'hidden',
  },
  urgentImage: {
    width: '100%',
    height: '100%',
  },
  urgentBody: {
    paddingHorizontal: PetMatchSpacing.xl,
    paddingVertical: PetMatchSpacing.lg,
    minHeight: 104,
  },
  urgentName: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 18,
    lineHeight: 28,
    color: PetMatchColors.onSurface,
  },
  urgentDetail: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 12,
    lineHeight: 16,
    color: PetMatchColors.onSurfaceMuted,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTile: {
    height: 128,
    borderRadius: PetMatchRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PetMatchSpacing.sm,
  },
  serviceTileShadow: {
    shadowColor: PetMatchColors.ambientShadowLavender,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  serviceIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: PetMatchSpacing.md,
  },
  serviceLabel: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  chatBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: PetMatchRadius.xl,
    paddingVertical: PetMatchSpacing.xl,
    paddingHorizontal: PetMatchSpacing.xl,
    minHeight: 120,
    shadowColor: PetMatchColors.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 10,
  },
  chatTextCol: {
    flex: 1,
    marginRight: PetMatchSpacing.md,
  },
  chatTitle: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.onPrimary,
  },
  chatBody: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.9)',
  },
  chatFab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 4,
  },
});
