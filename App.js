// App.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, ConcertOne_400Regular } from '@expo-google-fonts/concert-one';
import {
  Baloo2_400Regular,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2';
import { AuthProvider } from './src/navigation/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [fontesCarregadas] = useFonts({
    ConcertOne_400Regular,
    Baloo2_400Regular,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  });

  // Espera as fontes carregarem antes de mostrar o app
  if (!fontesCarregadas) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
