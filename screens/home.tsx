// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Detail {
  id: number;
  name: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const details: Detail[] = [
    { id: 1, name: 'Detail 1' },
    { id: 2, name: 'Detail 2' },
    { id: 3, name: 'Detail 3' },
    { id: 4, name: 'Detail 4' },
    
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Home Screen</Text>
      
      <FlatList
        data={details}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id, name: item.name })}
          >
            <View style={{ padding: 10, marginBottom: 5, backgroundColor: '#f0f0f0' }}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
