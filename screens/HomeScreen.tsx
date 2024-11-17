// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../utils/types';
import ImageTest from '../assets/sue.jpg';

// Định nghĩa kiểu cho navigation prop
type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Sử dụng kiểu cho navigation

  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen</Text>
      <Image
        source={ImageTest} // Đảm bảo đường dẫn đúng
        style={styles.image} // Áp dụng style cho hình ảnh
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100, // Đặt kích thước cho hình ảnh
    resizeMode: 'contain', // Điều chỉnh cách hình ảnh được hiển thị
  },
});

export default HomeScreen;
