import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ThresholdProvider } from '../contexts/ThresholdContext';
import { initializeNotifications } from '../utils/notifications';

export default function RootLayout() {
  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <ThresholdProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThresholdProvider>
  );
} 