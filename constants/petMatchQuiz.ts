import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type QuizOption = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconTint: 'lavender' | 'primary' | 'rose' | 'peach';
};

export type QuizStepDef = {
  id: string;
  title: string;
  question: string;
  options: QuizOption[];
};

export const PET_MATCH_QUIZ_STEPS: QuizStepDef[] = [
  {
    id: 'living',
    title: 'Living Arrangement',
    question: 'What is your living arrangement?',
    options: [
      {
        id: 'apartment',
        title: 'Apartment',
        subtitle: 'Comfortable multi-unit building with shared spaces.',
        icon: 'apartment',
        iconTint: 'lavender',
      },
      {
        id: 'house',
        title: 'House with Yard',
        subtitle: 'Private residence with dedicated outdoor playing area.',
        icon: 'home',
        iconTint: 'primary',
      },
      {
        id: 'farm',
        title: 'Farm / Acreage',
        subtitle: 'Expansive rural land with room to roam and explore.',
        icon: 'landscape',
        iconTint: 'rose',
      },
    ],
  },
  {
    id: 'family',
    title: 'Family & Household',
    question: 'Who shares your home?',
    options: [
      {
        id: 'solo',
        title: 'Just me',
        subtitle: 'Solo household looking for a devoted companion.',
        icon: 'person',
        iconTint: 'lavender',
      },
      {
        id: 'adults',
        title: 'Adults only',
        subtitle: 'Partners or roommates—no young children.',
        icon: 'people',
        iconTint: 'primary',
      },
      {
        id: 'kids',
        title: 'Have young children',
        subtitle: 'Looking for a gentle, patient family-friendly pet.',
        icon: 'child-care',
        iconTint: 'rose',
      },
      {
        id: 'other-pets',
        title: 'Have other pets',
        subtitle: 'Need a pet that plays well with existing animals.',
        icon: 'pets',
        iconTint: 'peach',
      },
    ],
  },
  {
    id: 'activity',
    title: 'Activity Level',
    question: 'How active is your lifestyle?',
    options: [
      {
        id: 'low',
        title: 'Couch Potato',
        subtitle: 'Relaxed days, short strolls, lots of cuddles.',
        icon: 'weekend',
        iconTint: 'lavender',
      },
      {
        id: 'moderate',
        title: 'Moderate / Daily Walks',
        subtitle: 'Regular walks and weekend adventures.',
        icon: 'directions-walk',
        iconTint: 'primary',
      },
      {
        id: 'high',
        title: 'Highly Active / Runner',
        subtitle: 'Runs, hikes, and high-energy play every day.',
        icon: 'directions-run',
        iconTint: 'rose',
      },
    ],
  },
  {
    id: 'experience',
    title: 'Time & Experience',
    question: 'What best describes you as an owner?',
    options: [
      {
        id: 'new-limited',
        title: 'First-time owner with limited time',
        subtitle: 'New to pet parenthood—need an easygoing match.',
        icon: 'schedule',
        iconTint: 'lavender',
      },
      {
        id: 'experienced-time',
        title: 'Experienced with plenty of time',
        subtitle: 'Ready to train, exercise, and invest daily.',
        icon: 'timer',
        iconTint: 'primary',
      },
      {
        id: 'new-eager',
        title: 'First-time but eager to learn',
        subtitle: 'Excited to grow with classes, routines, and love.',
        icon: 'school',
        iconTint: 'rose',
      },
      {
        id: 'busy-flex',
        title: 'Busy weekdays, flexible weekends',
        subtitle: 'Balanced schedule with quality time on days off.',
        icon: 'calendar-today',
        iconTint: 'peach',
      },
    ],
  },
];

export type QuizAnswers = Partial<Record<string, string>>;

export type MatchPet = {
  id: string;
  name: string;
  breed: string;
  matchPct: number;
  imageUri: string;
};

export function buildResultSummary(answers: QuizAnswers): string {
  const living = answers.living;
  const activity = answers.activity;
  const family = answers.family;
  const experience = answers.experience;

  const lifestyleBits: string[] = [];

  if (activity === 'high') {
    lifestyleBits.push('an active lifestyle');
  } else if (activity === 'moderate') {
    lifestyleBits.push('moderate daily activity');
  } else if (activity === 'low') {
    lifestyleBits.push('a calmer pace');
  }

  if (living === 'farm' || living === 'house') {
    lifestyleBits.push('a yard');
  } else if (living === 'apartment') {
    lifestyleBits.push('cozy indoor space');
  }

  if (family === 'kids') {
    lifestyleBits.push('young children at home');
  } else if (family === 'other-pets') {
    lifestyleBits.push('other pets in the household');
  }

  const lifestyle =
    lifestyleBits.length > 0 ? lifestyleBits.slice(0, 3).join(', ') : 'your answers';

  let breedLine = 'a mix of affectionate, well-rounded companions';
  if (activity === 'high' && (living === 'house' || living === 'farm')) {
    breedLine = 'medium-to-large active breeds that thrive with room to run';
  } else if (activity === 'high') {
    breedLine = 'energetic breeds that love movement and play';
  } else if (activity === 'low' && living === 'apartment') {
    breedLine = 'smaller, lower-energy breeds suited to apartment life';
  } else if (activity === 'low') {
    breedLine = 'laid-back breeds that enjoy cuddles and short outings';
  } else if (family === 'kids') {
    breedLine = 'patient, family-friendly breeds known for gentle temperaments';
  } else if (experience === 'new-limited') {
    breedLine = 'beginner-friendly breeds with straightforward care needs';
  } else if (experience === 'experienced-time') {
    breedLine = 'trainable breeds that reward consistent time and attention';
  }

  return `Based on ${lifestyle}, we recommend ${breedLine}.`;
}

export function getMockMatches(answers: QuizAnswers): MatchPet[] {
  const activity = answers.activity;
  const living = answers.living;

  const sets: Record<string, MatchPet[]> = {
    active: [
      {
        id: 'm1',
        name: 'Max',
        breed: 'Golden Retriever',
        matchPct: 98,
        imageUri:
          'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&h=720&fit=crop',
      },
      {
        id: 'm2',
        name: 'Bella',
        breed: 'Border Collie',
        matchPct: 96,
        imageUri:
          'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&h=720&fit=crop',
      },
      {
        id: 'm3',
        name: 'Cooper',
        breed: 'Australian Shepherd',
        matchPct: 94,
        imageUri:
          'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=720&fit=crop',
      },
    ],
    moderate: [
      {
        id: 'a1',
        name: 'Luna',
        breed: 'Cavalier King Charles',
        matchPct: 97,
        imageUri:
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=720&fit=crop',
      },
      {
        id: 'a2',
        name: 'Oliver',
        breed: 'Cocker Spaniel',
        matchPct: 95,
        imageUri:
          'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=720&fit=crop',
      },
      {
        id: 'a3',
        name: 'Milo',
        breed: 'Labrador Retriever',
        matchPct: 93,
        imageUri:
          'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&h=720&fit=crop',
      },
    ],
    calm: [
      {
        id: 'c1',
        name: 'Poppy',
        breed: 'French Bulldog',
        matchPct: 99,
        imageUri:
          'https://images.unsplash.com/photo-1583337130417-334622a6d011?w=600&h=720&fit=crop',
      },
      {
        id: 'c2',
        name: 'Nala',
        breed: 'British Shorthair',
        matchPct: 96,
        imageUri:
          'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=720&fit=crop',
      },
      {
        id: 'c3',
        name: 'Teddy',
        breed: 'Shih Tzu',
        matchPct: 92,
        imageUri:
          'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=720&fit=crop',
      },
    ],
  };

  if (activity === 'high' || living === 'farm') return sets.active;
  if (activity === 'low') return sets.calm;
  return sets.moderate;
}
