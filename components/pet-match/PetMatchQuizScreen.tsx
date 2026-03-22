import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import {
  PET_MATCH_QUIZ_STEPS,
  buildResultSummary,
  getMockMatches,
  type QuizAnswers,
  type QuizOption,
} from '@/constants/petMatchQuiz';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

function iconTintStyle(tint: QuizOption['iconTint']) {
  switch (tint) {
    case 'primary':
      return { bg: PetMatchColors.primary, icon: PetMatchColors.onPrimary };
    case 'rose':
      return { bg: 'rgba(241, 191, 203, 0.45)', icon: PetMatchColors.onboardingTitle };
    case 'peach':
      return { bg: PetMatchColors.servicePeach, icon: PetMatchColors.servicePeachOn };
    default:
      return { bg: PetMatchColors.lavenderBorder, icon: PetMatchColors.secondaryOnLavender };
  }
}

function ambientCardShadow() {
  return {
    shadowColor: '#1b1c1c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  };
}

export function PetMatchQuizScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenW } = useWindowDimensions();
  const pad = PetMatchSpacing.xl;

  const [phase, setPhase] = useState<'quiz' | 'results'>('quiz');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const steps = PET_MATCH_QUIZ_STEPS;
  const current = steps[stepIndex];
  const total = steps.length;
  const progress = (stepIndex + 1) / total;
  const selectedId = current ? answers[current.id] : undefined;

  const summary = useMemo(() => buildResultSummary(answers), [answers]);
  const matches = useMemo(() => getMockMatches(answers), [answers]);

  const selectOption = (stepId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: optionId }));
  };

  const goNext = () => {
    if (!current || !selectedId) return;
    if (stepIndex < total - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setPhase('results');
    }
  };

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
    else router.back();
  };

  const retakeQuiz = () => {
    setAnswers({});
    setStepIndex(0);
    setPhase('quiz');
  };

  const cardW = Math.min(340, screenW - pad * 2);

  return (
    <View style={styles.root}>
      <DashboardHeader leading="back" onBackPress={() => router.back()} />

      {phase === 'quiz' ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 68 + 12, paddingBottom: 60 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={{ paddingHorizontal: pad }}>
            <View style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <Text style={styles.stepMeta}>
                  Step {stepIndex + 1} of {total}
                </Text>
                <Text style={styles.stepTitle}>{current.title}</Text>
              </View>
              <Text style={styles.pct}>{Math.round(progress * 100)}% Complete</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>

            <View style={styles.questionCard}>
              <View style={styles.decorRose} pointerEvents="none" />
              <View style={styles.decorLavender} pointerEvents="none" />

              <Text style={styles.question}>{current.question}</Text>

              <View style={styles.optionList}>
                {current.options.map((opt) => {
                  const active = selectedId === opt.id;
                  const tint = iconTintStyle(opt.iconTint);
                  return (
                    <Pressable
                      key={opt.id}
                      onPress={() => selectOption(current.id, opt.id)}
                      style={({ pressed }) => [
                        styles.optionCard,
                        active && styles.optionCardActive,
                        pressed && styles.optionPressed,
                        ambientCardShadow(),
                      ]}>
                      <View style={[styles.optionIcon, { backgroundColor: tint.bg }]}>
                        <MaterialIcons name={opt.icon} size={24} color={tint.icon} />
                      </View>
                      <Text style={styles.optionTitle}>{opt.title}</Text>
                      <Text style={styles.optionSub}>{opt.subtitle}</Text>
                      {active ? (
                        <View style={styles.check}>
                          <MaterialIcons name="check-circle" size={22} color={PetMatchColors.primary} />
                        </View>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.navRow}>
              <Pressable
                onPress={goBack}
                style={({ pressed }) => [styles.backBtn, pressed && styles.navPressed]}>
                <MaterialIcons name="arrow-back" size={18} color={PetMatchColors.spaSectionAccent} />
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              <Pressable
                onPress={goNext}
                disabled={!selectedId}
                style={({ pressed }) => [
                  styles.nextBtn,
                  !selectedId && styles.nextBtnDisabled,
                  pressed && selectedId && styles.navPressed,
                ]}>
                <LinearGradient
                  colors={
                    selectedId
                      ? [PetMatchColors.primary, PetMatchColors.applyGradientEnd]
                      : ['#c4bbb6', '#b0a8a3']
                  }
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.nextGradient}>
                  <Text style={styles.nextText}>
                    {stepIndex === total - 1 ? 'View results' : 'Next step'}
                  </Text>
                  <MaterialIcons name="arrow-forward" size={18} color={PetMatchColors.onPrimary} />
                </LinearGradient>
              </Pressable>
            </View>

            <Text style={styles.footerNote}>
              Your journey to finding a companion is handled with care.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 68 + 12, paddingBottom: 120 },
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: pad }}>
            <View style={styles.celebrateWrap}>
              <Text style={styles.celebrateEmoji}>✨</Text>
              <Text style={styles.resultsTitle}>Your Perfect Matches!</Text>
              <Text style={styles.resultsSummary}>{summary}</Text>
            </View>

            <Text style={styles.listingsLabel}>Live listings for you</Text>

            {matches.map((pet) => (
              <View
                key={pet.id}
                style={[styles.matchCard, { width: cardW }, ambientCardShadow()]}>
                <View style={styles.matchImageWrap}>
                  <Image source={{ uri: pet.imageUri }} style={styles.matchImage} contentFit="cover" />
                  <LinearGradient
                    colors={['transparent', 'rgba(29,27,26,0.75)']}
                    style={styles.matchImageGrad}
                  />
                  <View style={styles.matchBadge}>
                    <Text style={styles.matchBadgeText}>{pet.matchPct}% Match</Text>
                  </View>
                </View>
                <View style={styles.matchBody}>
                  <Text style={styles.matchName}>{pet.name}</Text>
                  <Text style={styles.matchBreed}>{pet.breed}</Text>
                  <Pressable style={styles.applyBtn}>
                    <Text style={styles.applyBtnText}>Apply Now</Text>
                    <MaterialIcons name="arrow-outward" size={18} color={PetMatchColors.onPrimary} />
                  </Pressable>
                </View>
              </View>
            ))}

            <Pressable
              onPress={retakeQuiz}
              style={({ pressed }) => [styles.retakeBtn, pressed && styles.navPressed]}>
              <MaterialIcons name="replay" size={20} color={PetMatchColors.primary} />
              <Text style={styles.retakeText}>Retake Quiz</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PetMatchColors.onboardingBackground,
  },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: PetMatchSpacing.md,
  },
  stepLeft: { flex: 1 },
  stepMeta: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    letterSpacing: 1.4,
    lineHeight: 20,
    color: PetMatchColors.spaSectionAccent,
    textTransform: 'uppercase',
  },
  stepTitle: {
    marginTop: 4,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 28,
    lineHeight: 34,
    color: PetMatchColors.onboardingTitle,
  },
  pct: {
    fontFamily: FontFamily.manropeBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onboardingSubtitle,
  },
  progressTrack: {
    marginTop: PetMatchSpacing.lg,
    height: 12,
    borderRadius: PetMatchRadius.full,
    backgroundColor: PetMatchColors.discoverySearchBg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: PetMatchRadius.full,
    backgroundColor: PetMatchColors.secondaryLavender,
  },
  questionCard: {
    marginTop: PetMatchSpacing.xl,
    backgroundColor: PetMatchColors.urgentSection,
    borderRadius: 48,
    padding: PetMatchSpacing.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  decorRose: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 999,
    backgroundColor: PetMatchColors.tertiaryRose,
    opacity: 0.2,
  },
  decorLavender: {
    position: 'absolute',
    bottom: -100,
    left: -80,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: PetMatchColors.secondaryLavender,
    opacity: 0.18,
  },
  question: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 24,
    lineHeight: 30,
    color: PetMatchColors.onboardingTitle,
    marginBottom: PetMatchSpacing.lg,
    zIndex: 1,
  },
  optionList: {
    gap: PetMatchSpacing.md,
    zIndex: 1,
  },
  optionCard: {
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    borderRadius: 32,
    padding: PetMatchSpacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  optionCardActive: {
    borderColor: PetMatchColors.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  optionPressed: {
    opacity: 0.92,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: PetMatchSpacing.md,
  },
  optionTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.onboardingTitle,
  },
  optionSub: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.onboardingSubtitle,
    maxWidth: '100%',
  },
  check: {
    position: 'absolute',
    top: PetMatchSpacing.lg,
    right: PetMatchSpacing.lg,
  },
  navRow: {
    marginTop: PetMatchSpacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: PetMatchSpacing.md,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: PetMatchSpacing.sm,
    paddingVertical: PetMatchSpacing.md,
    paddingHorizontal: PetMatchSpacing.lg,
    borderRadius: PetMatchRadius.full,
    backgroundColor: '#e9e1dc',
  },
  backBtnText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.spaSectionAccent,
  },
  nextBtn: {
    flex: 1,
    maxWidth: 200,
    borderRadius: PetMatchRadius.full,
    overflow: 'hidden',
  },
  nextBtnDisabled: {
    opacity: 0.55,
  },
  nextGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: PetMatchSpacing.sm,
    paddingVertical: 18,
    paddingHorizontal: PetMatchSpacing.xl,
    minHeight: 56,
  },
  nextText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onPrimary,
  },
  navPressed: {
    opacity: 0.88,
  },
  footerNote: {
    marginTop: PetMatchSpacing.xxl,
    textAlign: 'center',
    fontFamily: FontFamily.manropeRegular,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.onboardingSubtitle,
  },
  celebrateWrap: {
    alignItems: 'center',
    marginBottom: PetMatchSpacing.xl,
  },
  celebrateEmoji: {
    fontSize: 36,
    marginBottom: PetMatchSpacing.sm,
  },
  resultsTitle: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.5,
    textAlign: 'center',
    color: PetMatchColors.primary,
  },
  resultsSummary: {
    marginTop: PetMatchSpacing.lg,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 17,
    lineHeight: 28,
    textAlign: 'center',
    color: PetMatchColors.onboardingSubtitle,
  },
  listingsLabel: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: PetMatchColors.spaSectionAccent,
    marginBottom: PetMatchSpacing.lg,
  },
  matchCard: {
    borderRadius: PetMatchRadius.lg,
    overflow: 'hidden',
    marginBottom: PetMatchSpacing.lg,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
  },
  matchImageWrap: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  matchImage: {
    ...StyleSheet.absoluteFillObject,
  },
  matchImageGrad: {
    ...StyleSheet.absoluteFillObject,
  },
  matchBadge: {
    position: 'absolute',
    top: PetMatchSpacing.md,
    right: PetMatchSpacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: PetMatchSpacing.md,
    paddingVertical: 6,
    borderRadius: PetMatchRadius.full,
  },
  matchBadgeText: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 13,
    color: PetMatchColors.primary,
  },
  matchBody: {
    padding: PetMatchSpacing.lg,
  },
  matchName: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 22,
    lineHeight: 28,
    color: PetMatchColors.onboardingTitle,
  },
  matchBreed: {
    marginTop: 4,
    fontFamily: FontFamily.manropeMedium,
    fontSize: 15,
    lineHeight: 22,
    color: PetMatchColors.onboardingSubtitle,
  },
  applyBtn: {
    marginTop: PetMatchSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: PetMatchSpacing.sm,
    backgroundColor: PetMatchColors.primary,
    paddingVertical: PetMatchSpacing.md,
    borderRadius: PetMatchRadius.full,
  },
  applyBtnText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 16,
    color: PetMatchColors.onPrimary,
  },
  retakeBtn: {
    marginTop: PetMatchSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: PetMatchSpacing.sm,
    paddingVertical: PetMatchSpacing.lg,
    borderRadius: PetMatchRadius.full,
    borderWidth: 2,
    borderColor: PetMatchColors.primary,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
  },
  retakeText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 17,
    color: PetMatchColors.primary,
  },
});
