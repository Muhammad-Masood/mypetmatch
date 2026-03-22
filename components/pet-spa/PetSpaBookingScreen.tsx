import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
  PET_SPA_PROVIDERS,
  PET_SPA_TIME_SLOTS,
  getPetSpaProviderById,
} from '@/constants/petSpaProviders';
import { FontFamily, PetMatchColors, PetMatchRadius, PetMatchSpacing } from '@/constants/theme';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildCalendarCells(viewMonthStart: Date) {
  const y = viewMonthStart.getFullYear();
  const m = viewMonthStart.getMonth();
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = last.getDate();
  const cells: { date: Date; inMonth: boolean }[] = [];

  const prevLast = new Date(y, m, 0).getDate();
  for (let i = 0; i < startPad; i++) {
    const day = prevLast - startPad + i + 1;
    cells.push({ date: new Date(y, m - 1, day), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(y, m, d), inMonth: true });
  }
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: new Date(y, m + 1, nextDay), inMonth: false });
    nextDay += 1;
  }
  return cells;
}

export function PetSpaBookingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenW } = useWindowDimensions();
  const pad = PetMatchSpacing.xl;
  const shellPad = PetMatchSpacing.xl;
  const { providerId } = useLocalSearchParams<{ providerId?: string }>();

  const provider = useMemo(() => {
    return getPetSpaProviderById(providerId) ?? PET_SPA_PROVIDERS[0];
  }, [providerId]);

  const now = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date(now.getFullYear(), now.getMonth(), Math.min(5, 28));
    return d;
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(viewMonth),
    [viewMonth],
  );

  const cells = useMemo(() => buildCalendarCells(viewMonth), [viewMonth]);

  const slotDateLabel = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(selectedDate);
  }, [selectedDate]);

  const innerW = screenW - pad * 2 - shellPad * 2;
  const cellGap = 4;
  const cellSize = Math.max(36, Math.floor((innerW - cellGap * 6) / 7));

  const shiftMonth = (delta: number) => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  return (
    <View style={styles.root}>
      <DashboardHeader leading="back" onBackPress={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 68 + 8, paddingBottom: 60 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: pad }}>
          <Text style={styles.pageTitle}>Book Your Session</Text>
          <Text style={styles.pageSub}>
            Give your companion the premium care they deserve. Our therapists offer a curated
            sanctuary for relaxation and rejuvenation.
          </Text>
        </View>

        <View
          style={[
            styles.bookingShell,
            {
              marginHorizontal: pad,
              marginTop: PetMatchSpacing.lg,
              padding: PetMatchSpacing.xl,
            },
          ]}>
          <View style={styles.calHeader}>
            <Text style={styles.sectionTitleAccent}>
              Select{'\n'}Date
            </Text>
            <View style={styles.monthRow}>
              <Pressable
                onPress={() => shiftMonth(-1)}
                style={styles.monthNavBtn}
                hitSlop={8}
                accessibilityLabel="Previous month">
                <MaterialIcons name="chevron-left" size={22} color={PetMatchColors.onboardingTitle} />
              </Pressable>
              <Text style={styles.monthLabel}>{monthLabel}</Text>
              <Pressable
                onPress={() => shiftMonth(1)}
                style={styles.monthNavBtn}
                hitSlop={8}
                accessibilityLabel="Next month">
                <MaterialIcons name="chevron-right" size={22} color={PetMatchColors.onboardingTitle} />
              </Pressable>
            </View>
          </View>

          <View style={[styles.weekRow, { width: innerW, gap: cellGap }]}>
            {WEEKDAYS.map((d, i) => (
              <Text
                key={d}
                style={[
                  styles.weekday,
                  { width: cellSize },
                  i >= 5 && styles.weekendMuted,
                ]}>
                {d}
              </Text>
            ))}
          </View>

          <View style={[styles.grid, { width: innerW, gap: cellGap }]}>
            {cells.map((c, idx) => {
              const sel = sameDay(c.date, selectedDate);
              const label = String(c.date.getDate());
              return (
                <Pressable
                  key={`${c.date.toISOString()}-${idx}`}
                  onPress={() => setSelectedDate(c.date)}
                  style={[
                    styles.dayCell,
                    { width: cellSize, height: Math.max(44, cellSize * 0.95) },
                    c.inMonth && styles.dayCellInMonth,
                    sel && styles.dayCellSelected,
                  ]}>
                  <Text
                    style={[
                      styles.dayNum,
                      !c.inMonth && styles.dayNumMuted,
                      c.inMonth && !sel && styles.dayNumSolid,
                      sel && styles.dayNumSelected,
                    ]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={[styles.slotsHeader, { marginTop: PetMatchSpacing.xl }]}>
            <Text style={styles.slotsTitle}>Available Slots</Text>
            <View style={styles.datePill}>
              <Text style={styles.datePillText}>{slotDateLabel}</Text>
            </View>
          </View>

          <View style={styles.slotsGrid}>
            {PET_SPA_TIME_SLOTS.map((slot) => {
              const active = selectedSlot === slot;
              return (
                <Pressable
                  key={slot}
                  onPress={() => setSelectedSlot(slot)}
                  style={[
                    styles.slotBtn,
                    active ? styles.slotBtnActive : styles.slotBtnIdle,
                  ]}>
                  <Text style={[styles.slotText, active && styles.slotTextActive]}>{slot}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.specialist}>
            <Image
              source={{ uri: provider.specialist.imageUri }}
              style={styles.specialistAvatar}
              contentFit="cover"
            />
            <Text style={styles.specialistName}>
              Assigned: {provider.specialist.name}
            </Text>
            <Text style={styles.specialistBio}>{provider.specialist.bio}</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: pad, marginTop: PetMatchSpacing.lg }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Confirm booking"
            onPress={() => router.back()}
            style={styles.confirmWrap}>
            <LinearGradient
              colors={[PetMatchColors.primary, PetMatchColors.applyGradientEnd]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.confirmGradient}>
              <Text style={styles.confirmText}>Confirm Booking</Text>
              <MaterialIcons name="arrow-forward" size={22} color={PetMatchColors.onPrimary} />
            </LinearGradient>
          </Pressable>
          <Text style={styles.cancelNote}>
            Free cancellation up to 24 hours before session.
          </Text>
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
  scrollContent: { flexGrow: 1, paddingBottom: PetMatchSpacing.xl },
  pageTitle: {
    fontFamily: FontFamily.jakartaExtraBold,
    fontSize: 36,
    lineHeight: 45,
    letterSpacing: -0.9,
    color: PetMatchColors.onboardingTitle,
  },
  pageSub: {
    marginTop: PetMatchSpacing.md,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 18,
    lineHeight: 29,
    color: PetMatchColors.onboardingSubtitle,
  },
  bookingShell: {
    backgroundColor: PetMatchColors.spaBookingContainer,
    borderRadius: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.spaBookingContainerBorder,
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: PetMatchSpacing.md,
  },
  sectionTitleAccent: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.spaSectionAccent,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: PetMatchSpacing.sm,
    flexShrink: 1,
    justifyContent: 'flex-end',
  },
  monthNavBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: PetMatchColors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: {
    fontFamily: FontFamily.jakartaSemiBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onboardingTitle,
    textAlign: 'center',
    minWidth: 112,
  },
  weekRow: {
    flexDirection: 'row',
    marginTop: PetMatchSpacing.lg,
  },
  weekday: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 12,
    letterSpacing: 1.2,
    textAlign: 'center',
    color: PetMatchColors.onboardingMuted,
  },
  weekendMuted: {
    color: PetMatchColors.spaSectionAccent,
    opacity: 0.45,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: PetMatchSpacing.sm,
  },
  dayCell: {
    borderRadius: PetMatchRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellInMonth: {
    backgroundColor: PetMatchColors.surfaceContainerLowest,
  },
  dayCellSelected: {
    backgroundColor: PetMatchColors.secondaryLavender,
    paddingVertical: 2,
  },
  dayNum: {
    fontFamily: FontFamily.manropeRegular,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onboardingTitle,
  },
  dayNumMuted: {
    opacity: 0.38,
  },
  dayNumSolid: {
    fontFamily: FontFamily.manropeMedium,
    opacity: 1,
  },
  dayNumSelected: {
    fontFamily: FontFamily.manropeBold,
    color: PetMatchColors.onboardingTitle,
  },
  slotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: PetMatchSpacing.md,
  },
  slotsTitle: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.spaSectionAccent,
    flex: 1,
  },
  datePill: {
    backgroundColor: PetMatchColors.tertiaryRose,
    paddingHorizontal: PetMatchSpacing.md,
    paddingVertical: 6,
    borderRadius: PetMatchRadius.full,
  },
  datePillText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.6,
    color: PetMatchColors.onboardingTitle,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PetMatchSpacing.md,
    marginTop: PetMatchSpacing.lg,
  },
  slotBtn: {
    borderRadius: PetMatchRadius.full,
    paddingVertical: 14,
    paddingHorizontal: PetMatchSpacing.lg,
    flexGrow: 1,
    flexBasis: '47%',
    maxWidth: '48%',
    alignItems: 'center',
  },
  slotBtnIdle: {
    backgroundColor: PetMatchColors.surfaceContainerLowest,
  },
  slotBtnActive: {
    backgroundColor: PetMatchColors.primary,
  },
  slotText: {
    fontFamily: FontFamily.jakartaSemiBold,
    fontSize: 16,
    lineHeight: 24,
    color: PetMatchColors.onboardingTitle,
  },
  slotTextActive: {
    color: PetMatchColors.onPrimary,
  },
  specialist: {
    marginTop: PetMatchSpacing.xl,
    padding: PetMatchSpacing.lg,
    borderRadius: 32,
    backgroundColor: PetMatchColors.spaSpecialistSection,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: PetMatchColors.spaBookingContainerBorder,
    alignItems: 'center',
  },
  specialistAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  specialistName: {
    marginTop: PetMatchSpacing.lg,
    fontFamily: FontFamily.jakartaBold,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: PetMatchColors.onboardingTitle,
  },
  specialistBio: {
    marginTop: PetMatchSpacing.sm,
    fontFamily: FontFamily.manropeRegular,
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    color: PetMatchColors.onboardingSubtitle,
  },
  confirmWrap: {
    borderRadius: PetMatchRadius.full,
    overflow: 'hidden',
  },
  confirmGradient: {
    minHeight: 68,
    paddingHorizontal: PetMatchSpacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: PetMatchSpacing.md,
  },
  confirmText: {
    fontFamily: FontFamily.jakartaBold,
    fontSize: 20,
    lineHeight: 28,
    color: PetMatchColors.onPrimary,
  },
  cancelNote: {
    marginTop: PetMatchSpacing.lg,
    textAlign: 'center',
    fontFamily: FontFamily.manropeMedium,
    fontSize: 14,
    lineHeight: 20,
    color: PetMatchColors.onboardingSubtitle,
  },
});
