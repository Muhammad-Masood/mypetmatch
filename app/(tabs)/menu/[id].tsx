import { useLocalSearchParams } from 'expo-router';

import { MenuPlaceholderScreen } from '@/components/navigation/MenuPlaceholderScreen';

const TITLES: Record<string, string> = {
  'urgent-homes': 'Urgent Homes',
  'find-a-home': 'Find a Home',
  'pet-match-quiz': 'Pet Match Quiz',
  vets: 'Vets',
  'report-pet-found': 'Report a Pet Found',
  'saved-pets': 'Saved Pets',
  'my-requests': 'My Requests',
  'my-applications': 'My Applications',
  'my-bookings': 'My Bookings',
  'chat-with-us': 'Chat With Us',
  'help-support': 'Help & Support',
};

export default function MenuSectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const title = (id && TITLES[id]) || id || 'Menu';
  return <MenuPlaceholderScreen title={title} />;
}
