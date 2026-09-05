// src/navigation/AppNavigator.js
// Uma pilha única: começa SEMPRE na Home. O login é verificado no botão "play" da Home.
// Por enquanto só a Ilha da Natureza está pronta — as outras ilhas/fases entram
// conforme forem feitas (evita empacotar telas que usam assets ainda não criados).
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
import ResultScreen from '../screens/ResultScreen';
import ParentsScreen from '../screens/ParentsScreen';

// Ilha da Natureza (a única pronta) + suas 3 fases
import NaturezaScreen from '../screens/islands/NaturezaScreen';
import NaturezaFase1 from '../game/fases/NaturezaFase1';
import NaturezaFase2 from '../game/fases/NaturezaFase2';
import NaturezaFase3 from '../game/fases/NaturezaFase3';

// Ilha do Deserto (tela + Fases 1 e 2; a fase 3 entra depois)
import DesertoScreen from '../screens/islands/DesertoScreen';
import DesertoFase1 from '../game/fases/DesertoFase1';
import DesertoFase2 from '../game/fases/DesertoFase2';

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

  // Transição suave (cross-fade) entre as telas — evita o "pulo" da animação padrão.
  const transicao = {
    headerShown: false,
    gestureEnabled: false,
    cardStyleInterpolator: ({ current }) => ({ cardStyle: { opacity: current.progress } }),
    transitionSpec: {
      open: { animation: 'timing', config: { duration: 260 } },
      close: { animation: 'timing', config: { duration: 220 } },
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={transicao}>
        {/* Entrada */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />

        {/* Jogo */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Parents" component={ParentsScreen} />

        {/* Ilha da Natureza */}
        <Stack.Screen name="Natureza" component={NaturezaScreen} />
        <Stack.Screen name="NaturezaFase1" component={NaturezaFase1} />
        <Stack.Screen name="NaturezaFase2" component={NaturezaFase2} />
        <Stack.Screen name="NaturezaFase3" component={NaturezaFase3} />

        {/* Ilha do Deserto (tela + Fases 1 e 2) */}
        <Stack.Screen name="Deserto" component={DesertoScreen} />
        <Stack.Screen name="DesertoFase1" component={DesertoFase1} />
        <Stack.Screen name="DesertoFase2" component={DesertoFase2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
