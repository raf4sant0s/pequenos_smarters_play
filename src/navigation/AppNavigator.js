// src/navigation/AppNavigator.js
// Uma pilha única: começa SEMPRE na Home. O login é verificado no botão "play" da Home.
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from './AuthContext';

// Telas de entrada
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';

// Telas do jogo
import WelcomeScreen from '../screens/WelcomeScreen';
import MapScreen from '../screens/MapScreen';
import ResultScreen from '../screens/ResultScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ParentsScreen from '../screens/ParentsScreen';

// Telas das ilhas
import NaturezaScreen from '../screens/islands/NaturezaScreen';
import DesertoScreen from '../screens/islands/DesertoScreen';
import GeloScreen from '../screens/islands/GeloScreen';
import VentosScreen from '../screens/islands/VentosScreen';
import FogoScreen from '../screens/islands/FogoScreen';
import LagosScreen from '../screens/islands/LagosScreen';

// Fases
import NaturezaFase1 from '../game/fases/NaturezaFase1';
import NaturezaFase2 from '../game/fases/NaturezaFase2';
import NaturezaFase3 from '../game/fases/NaturezaFase3';
import DesertoFase1 from '../game/fases/DesertoFase1';
import DesertoFase2 from '../game/fases/DesertoFase2';
import DesertoFase3 from '../game/fases/DesertoFase3';
import GeloFase1 from '../game/fases/GeloFase1';
import GeloFase2 from '../game/fases/GeloFase2';
import GeloFase3 from '../game/fases/GeloFase3';
import VentosFase1 from '../game/fases/VentosFase1';
import VentosFase2 from '../game/fases/VentosFase2';
import VentosFase3 from '../game/fases/VentosFase3';
import FogoFase1 from '../game/fases/FogoFase1';
import FogoFase2 from '../game/fases/FogoFase2';
import FogoFase3 from '../game/fases/FogoFase3';
import LagosFase1 from '../game/fases/LagosFase1';
import LagosFase2 from '../game/fases/LagosFase2';
import LagosFase3 from '../game/fases/LagosFase3';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { carregando } = useAuth();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {/* Entrada */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />

        {/* Jogo */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Parents" component={ParentsScreen} />

        {/* Ilhas */}
        <Stack.Screen name="Natureza" component={NaturezaScreen} />
        <Stack.Screen name="Deserto" component={DesertoScreen} />
        <Stack.Screen name="Gelo" component={GeloScreen} />
        <Stack.Screen name="Ventos" component={VentosScreen} />
        <Stack.Screen name="Fogo" component={FogoScreen} />
        <Stack.Screen name="Lagos" component={LagosScreen} />

        {/* Fases */}
        <Stack.Screen name="NaturezaFase1" component={NaturezaFase1} />
        <Stack.Screen name="NaturezaFase2" component={NaturezaFase2} />
        <Stack.Screen name="NaturezaFase3" component={NaturezaFase3} />
        <Stack.Screen name="DesertoFase1" component={DesertoFase1} />
        <Stack.Screen name="DesertoFase2" component={DesertoFase2} />
        <Stack.Screen name="DesertoFase3" component={DesertoFase3} />
        <Stack.Screen name="GeloFase1" component={GeloFase1} />
        <Stack.Screen name="GeloFase2" component={GeloFase2} />
        <Stack.Screen name="GeloFase3" component={GeloFase3} />
        <Stack.Screen name="VentosFase1" component={VentosFase1} />
        <Stack.Screen name="VentosFase2" component={VentosFase2} />
        <Stack.Screen name="VentosFase3" component={VentosFase3} />
        <Stack.Screen name="FogoFase1" component={FogoFase1} />
        <Stack.Screen name="FogoFase2" component={FogoFase2} />
        <Stack.Screen name="FogoFase3" component={FogoFase3} />
        <Stack.Screen name="LagosFase1" component={LagosFase1} />
        <Stack.Screen name="LagosFase2" component={LagosFase2} />
        <Stack.Screen name="LagosFase3" component={LagosFase3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
