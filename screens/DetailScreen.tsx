// screens/DetailScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../utils/types';

type DetailScreenRouteProp = RouteProp<RootTabParamList, 'Detail'>;

const DetailScreen = () => {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Đây là screen Detail</Text>
    </View>
  );
};

export default DetailScreen;
