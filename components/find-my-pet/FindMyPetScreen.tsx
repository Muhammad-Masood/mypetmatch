import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

const ANIMAL_TYPES = ['Dog', 'Cat', 'Other'] as const;
const SIZES = [
  'Small (Under 20 lbs)',
  'Medium (20–50 lbs)',
  'Large (50–100 lbs)',
  'Extra Large (100+ lbs)',
] as const;
const AGES = ['Puppy / Kitten', 'Young', 'Adult', 'Senior'] as const;
const BUDGETS = ['Under $500', '$500 – $1,500', '$1,500 – $3,000', '$3,000+'] as const;
const TEMPERAMENTS = ['Calm & Gentle', 'Active & Energetic', 'Protective', 'Lap Pet'] as const;

type LabelAccent = 'lavender' | 'rose';

function labelBorderColor(accent: LabelAccent) {
  return accent === 'lavender' ? PetMatchColors.secondaryLavender : PetMatchColors.tertiaryRose;
}

type SelectFieldProps = {
  label: string;
  labelAccent: LabelAccent;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
};

function SelectField({ label, labelAccent, value, options, onChange }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <View style={[styles.labelRule, { borderColor: labelBorderColor(labelAccent) }]}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Pressable
        onPress={() => setOpen(true)}
        style={styles.selectShell}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${value}`}>
        <Text style={styles.selectValue}>{value}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color={PetMatchColors.onboardingTitle} />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.modalRoot}>
          <Pressable style={styles.modalBackdrop} onPress={() => setOpen(false)} />
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{label}</Text>
            {options.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                style={[styles.modalRow, opt === value && styles.modalRowActive]}>
                <Text style={[styles.modalRowText, opt === value && styles.modalRowTextActive]}>{opt}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export function FindMyPetScreen() {
  const insets = useSafeAreaInsets();
  const pad = PetMatchSpacing.xl;

  const [animalType, setAnimalType] = useState<string>(ANIMAL_TYPES[0]);
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState<string>(SIZES[0]);
  const [age, setAge] = useState<string>(AGES[0]);
  const [temperament, setTemperament] = useState<string>(TEMPERAMENTS[0]);
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState<string>(BUDGETS[0]);
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.root}>
      <View style={styles.decorTop} pointerEvents="none" />
      <View style={styles.decorBottom} pointerEvents="none" />

      <DashboardHeader />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 68 + 12, paddingBottom: 60 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: pad, width: '100%' }}>
            <Text style={styles.heroTitle}>Find My Pet</Text>
            <View style={styles.titleAccent} />

            <Text style={styles.heroBody}>
              Tell us about your perfect companion. Our curators will hand-select matches from our private
              network that align with your lifestyle and heart.
            </Text>

            <View style={{ marginTop: PetMatchSpacing.xxl }}>
              <SelectField
                label="Animal Type"
                labelAccent="lavender"
                value={animalType}
                options={ANIMAL_TYPES}
                onChange={setAnimalType}
              />
            </View>

            <View style={{ marginTop: PetMatchSpacing.lg }}>
              <View style={[styles.labelRule, { borderColor: labelBorderColor('rose') }]}>
                <Text style={styles.label}>Breed Preference</Text>
              </View>
              <TextInput
                value={breed}
                onChangeText={setBreed}
                placeholder="e.g. Golden Retriever"
                placeholderTextColor="#b8b0ac"
                style={styles.textShell}
              />
            </View>

            <View style={{ marginTop: PetMatchSpacing.lg }}>
              <SelectField
                label="Size Preference"
                labelAccent="rose"
                value={size}
                options={SIZES}
                onChange={setSize}
              />
            </View>

            <View style={{ marginTop: PetMatchSpacing.lg }}>
              <SelectField
                label="Age Preference"
                labelAccent="lavender"
                value={age}
                options={AGES}
                onChange={setAge}
              />
            </View>

            <View style={{ marginTop: PetMatchSpacing.xl }}>
              <Text style={styles.labelPlain}>Temperament</Text>
              <View style={styles.temperamentWrap}>
                {TEMPERAMENTS.map((t) => {
                  const active = temperament === t;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => setTemperament(t)}
                      style={[styles.tempChip, active ? styles.tempChipOn : styles.tempChipOff]}>
                      <Text style={[styles.tempChipText, active && styles.tempChipTextOn]}>{t}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: PetMatchSpacing.lg }}>
              <View style={[styles.labelRule, { borderColor: labelBorderColor('lavender') }]}>
                <Text style={styles.label}>Location</Text>
              </View>
              <View style={styles.locationRow}>
                <MaterialIcons
                  name="location-on"
                  size={22}
                  color={PetMatchColors.discoveryPlaceholder}
                  style={styles.locationIcon}
                />
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="City or Zip"
                  placeholderTextColor={PetMatchColors.discoveryPlaceholder}
                  style={styles.locationInput}
                />
              </View>
            </View>

            <View style={{ marginTop: PetMatchSpacing.lg }}>
              <SelectField
                label="Budget Range"
                labelAccent="rose"
                value={budget}
                options={BUDGETS}
                onChange={setBudget}
              />
            </View>

            <View style={{ marginTop: PetMatchSpacing.lg }}>
              <Text style={styles.labelPlain}>Additional Notes</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Describe your home environment, other pets, or specific needs..."
                placeholderTextColor="#b8b0ac"
                multiline
                textAlignVertical="top"
                style={styles.notesArea}
              />
            </View>

            <Pressable style={styles.premiumWrap} accessibilityRole="button">
              <LinearGradient
                colors={[PetMatchColors.primary, PetMatchColors.applyGradientEnd]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.premiumGradient}>
                <MaterialIcons name="auto-awesome" size={18} color={PetMatchColors.onPrimary} />
                <Text style={styles.premiumTitle}>
                  Priority Premium{'\n'}Submission
                </Text>
                <View style={styles.payBadge}>
                  <Text style={styles.payBadgeText}>Pay</Text>
                </View>
              </LinearGradient>
            </Pressable>

            <Pressable style={styles.outlineBtn} accessibilityRole="button">
              <Text style={styles.outlineBtnText}>Submit Request</Text>
            </Pressable>

            <Text style={styles.legal}>
              By submitting, you agree to our Curated{'\n'}
              <Text style={styles.legalAccent}>
                Concierge Terms. Premium submissions are processed within 24 hours.
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PetMatchColors.onboardingBackground,
  },
  flex: { flex: 1 },
  decorTop: {
    position: 'absolute',
    top: 120,
    right: -40,
    width: 256,
    height: 256,
    borderRadius: 9999,
    backgroundColor: PetMatchColors.secondaryLavender,
    opacity: 0.28,
    zIndex: 0,
  },
  decorBottom: {
    position: 'absolute',
    bottom: 180,
    left: -80,
    width: 320,
    height: 320,
    borderRadius: 9999,
    backgroundColor: PetMatchColors.tertiaryRose,
    opacity: 0.2,
    zIndex: 0,
  },
  scroll: { flex: 1, zIndex: 1 },
  scrollContent: {
    flexGrow: 1,
  },
  heroTitle: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.9,
    color: PetMatchColors.primary,
  },
  titleAccent: {
    marginTop: PetMatchSpacing.md,
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: PetMatchColors.secondaryLavender,
  },
  heroBody: {
    marginTop: PetMatchSpacing.lg,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 18,
    lineHeight: 29,
    color: PetMatchColors.onboardingSubtitle,
  },
  labelRule: {
    alignSelf: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 2,
    marginBottom: PetMatchSpacing.sm,
  },
  label: {
    fontFamily: FontFamily.jakartaMedium,
    fontSize: 12,
    letterSpacing: 1.2,
    lineHeight: 16,
    color: '#333333',
  },
  labelPlain: {
    fontFamily: FontFamily.jakartaMedium,
    fontSize: 12,
    letterSpacing: 1.2,
    lineHeight: 16,
    color: '#333333',
    marginBottom: PetMatchSpacing.md,
  },
  selectShell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PetMatchColors.discoverySearchBg,
    borderRadius: 32,
    paddingHorizontal: PetMatchSpacing.lg,
    minHeight: 56,
  },
  selectValue: {
    flex: 1,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onboardingTitle,
  },
  textShell: {
    backgroundColor: PetMatchColors.discoverySearchBg,
    borderRadius: 32,
    paddingHorizontal: PetMatchSpacing.lg,
    paddingVertical: 16,
    minHeight: 56,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 16,
    lineHeight: 22,
    color: PetMatchColors.onboardingTitle,
  },
  temperamentWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PetMatchSpacing.md,
  },
  tempChip: {
    paddingHorizontal: PetMatchSpacing.lg,
    paddingVertical: 10,
    borderRadius: PetMatchRadius.full,
    minHeight: 40,
    justifyContent: 'center',
  },
  tempChipOn: {
    backgroundColor: PetMatchColors.primary,
  },
  tempChipOff: {
    backgroundColor: PetMatchColors.lavenderBorder,
  },
  tempChipText: {
    fontFamily: FontFamily.manropeBold,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.onboardingTitle,
    textAlign: 'center',
  },
  tempChipTextOn: {
    color: PetMatchColors.onPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PetMatchColors.discoverySearchBg,
    borderRadius: 32,
    paddingLeft: PetMatchSpacing.md,
    paddingRight: PetMatchSpacing.lg,
    minHeight: 56,
  },
  locationIcon: {
    marginRight: PetMatchSpacing.sm,
  },
  locationInput: {
    flex: 1,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 16,
    lineHeight: 22,
    color: PetMatchColors.onboardingTitle,
    paddingVertical: 14,
  },
  notesArea: {
    backgroundColor: PetMatchColors.discoverySearchBg,
    borderRadius: 32,
    paddingHorizontal: PetMatchSpacing.lg,
    paddingVertical: PetMatchSpacing.lg,
    minHeight: 136,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onboardingTitle,
  },
  premiumWrap: {
    marginTop: PetMatchSpacing.xxl,
    borderRadius: PetMatchRadius.full,
    overflow: 'hidden',
  },
  premiumGradient: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: PetMatchSpacing.sm,
    paddingHorizontal: PetMatchSpacing.lg,
    gap: PetMatchSpacing.md,
  },
  premiumTitle: {
    flex: 1,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 18,
    lineHeight: 28,
    color: PetMatchColors.onPrimary,
    textAlign: 'center',
  },
  payBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: PetMatchRadius.full,
  },
  payBadgeText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 12,
    lineHeight: 16,
    color: PetMatchColors.onPrimary,
  },
  outlineBtn: {
    marginTop: PetMatchSpacing.lg,
    minHeight: 64,
    borderRadius: PetMatchRadius.full,
    borderWidth: 1,
    borderColor: PetMatchColors.primary,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtnText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 18,
    lineHeight: 28,
    color: PetMatchColors.primary,
  },
  legal: {
    marginTop: PetMatchSpacing.xl,
    textAlign: 'center',
    fontFamily: FontFamily.manropeMedium,
    fontSize: 12,
    lineHeight: 19.5,
    color: PetMatchColors.onboardingSubtitle,
  },
  legalAccent: {
    color: PetMatchColors.primary,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(29, 27, 26, 0.45)',
  },
  modalSheet: {
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderTopLeftRadius: PetMatchRadius.lg,
    borderTopRightRadius: PetMatchRadius.lg,
    padding: PetMatchSpacing.xl,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    marginBottom: PetMatchSpacing.md,
    color: PetMatchColors.onboardingTitle,
  },
  modalRow: {
    paddingVertical: PetMatchSpacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: PetMatchColors.onboardingDivider,
  },
  modalRowActive: {
    backgroundColor: 'rgba(253, 143, 19, 0.08)',
    marginHorizontal: -PetMatchSpacing.sm,
    paddingHorizontal: PetMatchSpacing.sm,
    borderRadius: PetMatchRadius.sm,
    borderBottomWidth: 0,
  },
  modalRowText: {
    fontFamily: FontFamily.manropeMedium,
    fontSize: 16,
    color: PetMatchColors.onboardingTitle,
  },
  modalRowTextActive: {
    fontFamily: FontFamily.manropeBold,
    color: PetMatchColors.primary,
  },
});
