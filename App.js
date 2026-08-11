// App.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, ConcertOne_400Regular } from '@expo-google-fonts/concert-one';
import {
  Baloo2_400Regular,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2';
import { AuthProvider } from './src/navigation/AuthContext';
import { AudioProvider } from './src/navigation/AudioContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [fontesCarregadas] = useFonts({
    ConcertOne_400Regular,
    Baloo2_400Regular,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  });

  if (!fontesCarregadas) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AudioProvider>
          <AppNavigator />
        </AudioProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
