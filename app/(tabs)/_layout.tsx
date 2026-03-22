import { Tabs } from 'expo-router';
import React from 'react';

import { AppDrawer } from '@/components/navigation/AppDrawer';
import { CustomTabBar } from '@/components/navigation/CustomTabBar';
import { AppDrawerProvider } from '@/context/AppDrawerContext';

export default function TabLayout() {
  return (
    <AppDrawerProvider>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="meet-pets" options={{ title: 'Meet Pets' }} />
        <Tabs.Screen name="find-my-pet" options={{ title: 'Find My Pet' }} />
        <Tabs.Screen name="pet-spa" options={{ title: 'Pet Spa' }} />
        <Tabs.Screen name="my-world" options={{ title: 'My World' }} />
        <Tabs.Screen name="pet-match-quiz" options={{ href: null }} />
        <Tabs.Screen name="menu/[id]" options={{ href: null }} />
      </Tabs>
      <AppDrawer />
    </AppDrawerProvider>
  );
}
