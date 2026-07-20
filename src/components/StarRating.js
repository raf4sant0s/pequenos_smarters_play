// src/components/StarRating.js
import React from 'react';
import { View, Text } from 'react-native';

export default function StarRating({ quantidade }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {[1, 2, 3].map((n) => (
        <Text key={n} style={{ fontSize: 44, marginHorizontal: 4 }}>
          {n <= quantidade ? '⭐' : '☆'}
        </Text>
      ))}
    </View>
  );
}
