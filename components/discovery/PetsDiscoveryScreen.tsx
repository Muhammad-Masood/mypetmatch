import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import type { PetListItem } from '@/constants/petProfiles';
import { PETS_LIST } from '@/constants/petProfiles';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

const FILTERS = [
  { id: 'animal', label: 'Animal Type' },
  { id: 'breed', label: 'Breed' },
  { id: 'gender', label: 'Gender' },
  { id: 'age', label: 'Age' },
  { id: 'size', label: 'Size' },
  { id: 'temperament', label: 'Temperament' },
  { id: 'location', label: 'Location' },
  { id: 'status', label: 'Status' },
  { id: 'urgency', label: 'Urgency', isUrgency: true },
] as const;

type TagTone = 'orange' | 'rose' | 'lavender';

function tagColors(tone: TagTone) {
  switch (tone) {
    case 'orange':
      return { bg: PetMatchColors.primary, text: PetMatchColors.onPrimary };
    case 'rose':
      return { bg: PetMatchColors.tertiaryRose, text: PetMatchColors.tertiaryOnRose };
    case 'lavender':
      return { bg: PetMatchColors.secondaryLavender, text: PetMatchColors.discoveryChipOnLavender };
    default:
      return { bg: PetMatchColors.primary, text: PetMatchColors.onPrimary };
  }
}

function PetCard({ pet, cardWidth }: { pet: PetListItem; cardWidth: number }) {
  const scale = cardWidth / 159;
  const innerPad = 12;
  const imageInnerW = cardWidth - innerPad * 2;
  const imgH = pet.imageH * scale;

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/meet-pets/[id]', params: { id: pet.id } })}
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        ambientCardShadow(),
        pressed && { opacity: 0.96 },
      ]}>
      <View
        style={[
          styles.imageShell,
          { width: imageInnerW, height: imgH, borderRadius: PetMatchRadius.lg },
        ]}>
        <Image
          source={{ uri: pet.uri }}
          style={{ width: imageInnerW, height: imgH, borderRadius: PetMatchRadius.lg }}
          contentFit="cover"
        />
        <Pressable style={styles.heartBtn} hitSlop={8}>
          <MaterialIcons name="favorite-border" size={20} color={PetMatchColors.onSurface} />
        </Pressable>
        {pet.tag ? (
          <View
            style={[
              styles.tagPill,
              { backgroundColor: tagColors(pet.tag.tone).bg },
            ]}>
            <Text
              style={[
                styles.tagText,
                { color: tagColors(pet.tag.tone).text },
              ]}>
              {pet.tag.label}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.petName} numberOfLines={1}>
          {pet.name}
        </Text>
        <Text style={styles.petBreed} numberOfLines={1}>
          {pet.breed}
        </Text>
        <View style={styles.ageRow}>
          <MaterialIcons name="event" size={14} color={PetMatchColors.onboardingTitle} />
          <Text style={styles.petAge}>{pet.age}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function ambientCardShadow() {
  return {
    shadowColor: '#1b1c1c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 5,
  };
}

export function PetsDiscoveryScreen() {
  const insets = useSafeAreaInsets();
  const { width: screenW } = useWindowDimensions();
  const pad = PetMatchSpacing.xl;
  const contentW = screenW - pad * 2;
  const colGap = PetMatchSpacing.xl;
  const cardWidth = (contentW - colGap) / 2;
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('animal');

  const chipStyle = useMemo(
    () => (id: string) => {
      const active = selectedFilter === id;
      const bg =
        !active
          ? PetMatchColors.secondaryLavender
          : id === 'urgency'
            ? PetMatchColors.tertiaryRose
            : PetMatchColors.primary;
      const color = !active
        ? PetMatchColors.discoveryChipOnLavender
        : id === 'urgency'
          ? PetMatchColors.tertiaryOnRose
          : PetMatchColors.onPrimary;
      const font = active ? FontFamily.jakartaBold : FontFamily.jakartaMedium;
      return { bg, color, font };
    },
    [selectedFilter],
  );

  const leftCol = [PETS_LIST[0], PETS_LIST[2]];
  const rightCol = [PETS_LIST[1], PETS_LIST[3]];

  return (
    <View style={styles.root}>
      <DashboardHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 68 + 12,
            paddingBottom: 120,
            paddingHorizontal: pad,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headline}>
          Find your{'\n'}soul companion.
        </Text>

        <View style={[styles.searchRow, { marginTop: PetMatchSpacing.xl }]}>
          <MaterialIcons
            name="search"
            size={22}
            color={PetMatchColors.discoveryPlaceholder}
            style={styles.searchIcon}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search breeds or personality..."
            placeholderTextColor={PetMatchColors.discoveryPlaceholder}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.filterScroll, { marginTop: PetMatchSpacing.xxl }]}
          decelerationRate="fast">
          {FILTERS.map((f) => {
            const cs = chipStyle(f.id);
            return (
              <Pressable
                key={f.id}
                onPress={() => setSelectedFilter(f.id)}
                style={({ pressed }) => [
                  styles.filterChip,
                  { backgroundColor: cs.bg, opacity: pressed ? 0.92 : 1 },
                ]}>
                <Text style={[styles.filterChipText, { color: cs.color, fontFamily: cs.font }]}>
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={[styles.masonry, { gap: colGap, marginTop: PetMatchSpacing.lg }]}>
          <View style={[styles.col, { gap: colGap }]}>
            {leftCol.map((pet) => (
              <PetCard key={pet.id} pet={pet} cardWidth={cardWidth} />
            ))}
          </View>
          <View style={[styles.col, { gap: colGap, paddingTop: 32 }]}>
            {rightCol.map((pet) => (
              <PetCard key={pet.id} pet={pet} cardWidth={cardWidth} />
            ))}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headline: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 36,
    lineHeight: 45,
    letterSpacing: -0.9,
    color: PetMatchColors.onboardingTitle,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    borderRadius: 6,
    backgroundColor: PetMatchColors.discoverySearchBg,
    paddingLeft: PetMatchSpacing.md,
    paddingRight: PetMatchSpacing.lg,
  },
  searchIcon: {
    marginRight: PetMatchSpacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 16,
    lineHeight: 22,
    color: PetMatchColors.onboardingTitle,
    paddingVertical: PetMatchSpacing.md,
  },
  filterScroll: {
    gap: 12,
    paddingRight: PetMatchSpacing.xl,
  },
  filterChip: {
    height: 40,
    paddingHorizontal: PetMatchSpacing.lg,
    borderRadius: PetMatchRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  masonry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  col: {
    flex: 1,
  },
  card: {
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: PetMatchRadius.xl,
    padding: 12,
    overflow: 'hidden',
  },
  imageShell: {
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagPill: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    paddingHorizontal: PetMatchSpacing.sm,
    paddingVertical: 3,
    borderRadius: PetMatchRadius.full,
  },
  tagText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 10,
    lineHeight: 15,
  },
  cardBody: {
    marginTop: PetMatchSpacing.md,
    paddingHorizontal: 4,
    minHeight: 72,
  },
  petName: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 18,
    lineHeight: 18,
    color: PetMatchColors.onboardingTitle,
  },
  petBreed: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 12,
    lineHeight: 16,
    color: PetMatchColors.onboardingMuted,
  },
  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: PetMatchSpacing.sm,
  },
  petAge: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.5,
    color: PetMatchColors.onboardingTitle,
  },
});
