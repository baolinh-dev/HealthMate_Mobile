// screens/DetailScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../utils/types';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route }: { route: DetailScreenRouteProp }) => {
  const { id, name } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Detail Screen</Text>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
    </View>
  );
};

export default DetailScreen;
