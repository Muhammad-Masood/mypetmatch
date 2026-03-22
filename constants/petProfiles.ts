/**
 * Shared pet list + profile detail data for discovery and profile screens.
 */

export type PetListItem = {
  id: string;
  name: string;
  breed: string;
  age: string;
  tag: { label: string; tone: 'orange' | 'rose' | 'lavender' } | null;
  imageH: number;
  uri: string;
};

export type PetProfileDetail = {
  id: string;
  name: string;
  breed: string;
  images: string[];
  statusLabel: string;
  stats: { age: string; gender: string; size: string };
  personality: string[];
  bio: string;
  health: {
    vaccination: { title: string; subtitle: string };
    microchip: { title: string; subtitle: string };
  };
  listedBy: {
    name: string;
    subtitle: string;
    imageUri: string;
  };
};

export const PETS_LIST: PetListItem[] = [
  {
    id: '1',
    name: 'Cooper',
    breed: 'Golden Retriever',
    age: '2 Years Old',
    tag: { label: 'Friendly', tone: 'orange' },
    imageH: 168.75,
    uri: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&h=800&fit=crop',
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Bombay Mix',
    age: '4 Months',
    tag: { label: 'Urgent', tone: 'rose' },
    imageH: 202.5,
    uri: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=800&fit=crop',
  },
  {
    id: '3',
    name: 'Oliver',
    breed: 'French Bulldog',
    age: '1 Year Old',
    tag: null,
    imageH: 135,
    uri: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop',
  },
  {
    id: '4',
    name: 'Bella',
    breed: 'Ragdoll',
    age: '3 Years Old',
    tag: { label: 'Quiet', tone: 'lavender' },
    imageH: 168.75,
    uri: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=800&fit=crop',
  },
];

const COOPER_IMAGES = [
  'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=1000&fit=crop',
];

export const PET_PROFILES: Record<string, PetProfileDetail> = {
  '1': {
    id: '1',
    name: 'Cooper',
    breed: 'Golden Retriever',
    images: COOPER_IMAGES,
    statusLabel: 'Available',
    stats: { age: '2 Years', gender: 'Male', size: 'Large' },
    personality: ['Friendly', 'Playful', 'Good with Kids', 'Energetic'],
    bio:
      "Cooper is a bundle of joy who loves afternoon strolls and games of fetch. He is extremely gentle with children and has a heart of gold. He's looking for a family that can match his energetic spirit and provide plenty of belly rubs.",
    health: {
      vaccination: { title: 'Vaccination Status', subtitle: 'Up to date as of Oct 2023' },
      microchip: { title: 'Microchip ID', subtitle: 'Registered & Available' },
    },
    listedBy: {
      name: 'The Sanctuary Shelter',
      subtitle: 'Professional Agency • Los Angeles, CA',
      imageUri: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop',
    },
  },
};

export function getPetProfile(id: string): PetProfileDetail | undefined {
  const full = PET_PROFILES[id];
  if (full) return full;
  const list = PETS_LIST.find((p) => p.id === id);
  if (!list) return undefined;
  return {
    id: list.id,
    name: list.name,
    breed: list.breed,
    images: [list.uri],
    statusLabel: 'Available',
    stats: {
      age: list.age.replace(/\s*Old\s*$/i, ''),
      gender: '—',
      size: '—',
    },
    personality: ['Loving', 'Calm'],
    bio: `${list.name} is looking for a forever home. Meet them and fall in love.`,
    health: {
      vaccination: { title: 'Vaccination Status', subtitle: 'Contact shelter for records' },
      microchip: { title: 'Microchip ID', subtitle: 'Ask the listing agency' },
    },
    listedBy: {
      name: 'The Sanctuary Shelter',
      subtitle: 'Professional Agency • Los Angeles, CA',
      imageUri: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop',
    },
  };
}
