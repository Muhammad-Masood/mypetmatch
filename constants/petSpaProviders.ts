import { PetMatchColors } from '@/constants/theme';

export type PetSpaFilterId = 'all' | 'full-spa' | 'bath-brush' | 'dental';

export type PetSpaProvider = {
  id: string;
  name: string;
  imageUri: string;
  badge: { label: string; bg: string; textColor?: string };
  rating: number;
  reviewCount: number;
  description: string;
  priceLabel: string;
  stat2Label: 'Duration' | 'Location' | 'Availability';
  stat2Value: string;
  stat2ValueAccent?: boolean;
  filters: Exclude<PetSpaFilterId, 'all'>[];
  cardStyle: 'white' | 'cream' | 'lavenderTint';
  primaryAction: { label: string };
  secondaryAction?: { label: string };
  specialist: {
    name: string;
    title: string;
    bio: string;
    imageUri: string;
  };
};

export const PET_SPA_FILTERS: { id: PetSpaFilterId; label: string; bg: string; onColor: string }[] = [
  { id: 'all', label: 'All Services', bg: '#fd8f13', onColor: '#ffffff' },
  { id: 'full-spa', label: 'Full Spa', bg: PetMatchColors.secondaryLavender, onColor: PetMatchColors.secondaryOnLavender },
  { id: 'bath-brush', label: 'Bath & Brush', bg: PetMatchColors.tertiaryRose, onColor: PetMatchColors.tertiaryOnRose },
  { id: 'dental', label: 'Dental', bg: PetMatchColors.servicePeachGlow, onColor: '#635742' },
];

export const PET_SPA_PROVIDERS: PetSpaProvider[] = [
  {
    id: 'velvet-paw',
    name: 'The Velvet Paw\nStudio',
    imageUri:
      'https://images.unsplash.com/photo-1719464454959-9cf304ef4774?w=800&h=600&fit=crop',
    badge: { label: 'Premier Partner', bg: PetMatchColors.lavenderBadge, textColor: '#36322f' },
    rating: 4.9,
    reviewCount: 128,
    description:
      'Full Grooming & Spa treatment including organic honey-oat wash, precision scissoring, and aroma therapy ear cleaning.',
    priceLabel: 'From $45',
    stat2Label: 'Duration',
    stat2Value: '90-120 min',
    filters: ['full-spa', 'bath-brush'],
    cardStyle: 'white',
    primaryAction: { label: 'Reserve Experience' },
    specialist: {
      name: 'Dr. Elena Vance',
      title: 'Certified Pet Aromatherapist',
      bio: 'Certified Pet Aromatherapist & Senior Grooming Specialist with 12 years of sanctuary experience.',
      imageUri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&facepad=4',
    },
  },
  {
    id: 'artisan-canine',
    name: 'Artisan Canine',
    imageUri:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop',
    badge: { label: 'Eco-Certified', bg: 'rgba(255, 192, 193, 0.9)', textColor: '#36322f' },
    rating: 4.8,
    reviewCount: 94,
    description:
      'Boutique styling focusing on breed-specific standard cuts. Includes paw pad hydration and non-toxic nail buffing.',
    priceLabel: 'From $60',
    stat2Label: 'Location',
    stat2Value: 'West Side',
    filters: ['full-spa', 'dental'],
    cardStyle: 'cream',
    primaryAction: { label: 'Reserve Experience' },
    secondaryAction: { label: 'View Menu' },
    specialist: {
      name: 'Dr. Marcus Cole',
      title: 'Master Stylist',
      bio: 'Breed-standard cuts and gentle handling with 10+ years in boutique grooming.',
      imageUri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&facepad=4',
    },
  },
  {
    id: 'feline-retreat',
    name: 'The Feline\nRetreat',
    imageUri:
      'https://images.unsplash.com/photo-1631511231050-24f8dba10537?w=800&h=600&fit=crop',
    badge: { label: 'High Demand', bg: PetMatchColors.tertiaryRoseWash, textColor: '#671200' },
    rating: 5.0,
    reviewCount: 210,
    description:
      'Specialized feline-only sanctuary. Low-stress waterless baths, degreasing treatments, and master-level lion cuts.',
    priceLabel: 'From $75',
    stat2Label: 'Availability',
    stat2Value: 'Next: Tue',
    stat2ValueAccent: true,
    filters: ['bath-brush', 'full-spa'],
    cardStyle: 'cream',
    primaryAction: { label: 'Secure Spot' },
    specialist: {
      name: 'Dr. Priya Nair',
      title: 'Feline Specialist',
      bio: 'Low-stress handling certified; focused on cats only with sanctuary-grade care.',
      imageUri: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&facepad=4',
    },
  },
];

export const PET_SPA_TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '03:30 PM',
  '05:00 PM',
] as const;

export function getPetSpaProviderById(id: string | undefined): PetSpaProvider | undefined {
  if (!id) return undefined;
  return PET_SPA_PROVIDERS.find((p) => p.id === id);
}
