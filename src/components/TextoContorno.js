// src/components/TextoContorno.js
// Texto com contorno (outline). O React Native não tem "stroke" em <Text>,
// então desenhamos o texto várias vezes deslocado (na cor do contorno) atrás
// do texto principal — isso cria a borda.
// Se receber onPress, o container vira tocável (usado nas letras da floresta).
import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function TextoContorno({
  children,
  textStyle,
  corContorno = '#FFFFFF',
  espessura = 2,
  containerStyle,
  onPress,
}) {
  const e = espessura;
  const offsets = [
    [-e, -e], [0, -e], [e, -e],
    [-e, 0], [e, 0],
    [-e, e], [0, e], [e, e],
  ];

  const conteudo = (
    <View>
      {offsets.map(([x, y], i) => (
        <Text
          key={i}
          style={[textStyle, {
            position: 'absolute', left: 0, top: 0,
            color: corContorno, textShadowColor: 'transparent',
            transform: [{ translateX: x }, { translateY: y }],
          }]}
        >
          {children}
        </Text>
      ))}
      <Text style={[textStyle, { textShadowColor: 'transparent' }]}>{children}</Text>
    </View>
  );

  const estiloWrap = [{ alignItems: 'center', justifyContent: 'center' }, containerStyle];

  if (onPress) {
    return (
      <Pressable style={estiloWrap} onPress={onPress}>
        {conteudo}
      </Pressable>
    );
  }
  return <View style={estiloWrap}>{conteudo}</View>;
}
