import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

type Props = {
  title: string;
};

export function MenuPlaceholderScreen({ title }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.root}>
      <DashboardHeader leading="back" onBackPress={() => router.back()} />
      <View
        style={[
          styles.body,
          { paddingTop: insets.top + 68 + PetMatchSpacing.xl, paddingBottom: 120 },
        ]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>We're polishing this experience. Check back soon.</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Coming soon</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PetMatchColors.onboardingBackground,
  },
  body: {
    flex: 1,
    paddingHorizontal: PetMatchSpacing.xl,
  },
  title: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
    color: PetMatchColors.onboardingTitle,
  },
  sub: {
    marginTop: PetMatchSpacing.md,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 16,
    lineHeight: 26,
    color: PetMatchColors.onboardingSubtitle,
  },
  pill: {
    alignSelf: 'flex-start',
    marginTop: PetMatchSpacing.xl,
    paddingHorizontal: PetMatchSpacing.lg,
    paddingVertical: PetMatchSpacing.sm,
    borderRadius: PetMatchRadius.full,
    backgroundColor: PetMatchColors.lavenderBorder,
  },
  pillText: {
    fontFamily: FontFamily.jakartaSemiBold,
    fontSize: 13,
    color: PetMatchColors.secondaryOnLavender,
  },
});
