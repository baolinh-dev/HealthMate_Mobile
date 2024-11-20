import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation"; // Đường dẫn đến nơi bạn định nghĩa RootStackParamList
import UserInfoView from "../components/UserInfoView "; 
import Avatar from '../assets/avatar.png'; 

type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ route }) => {
  const { userName } = route.params;
  const handleNotificationPress = () => {
    Alert.alert("Notification", "Notification button pressed!");
  };
  return ( 
    
    <View style={styles.container}>
      <UserInfoView
        avatarUrl= {Avatar}// Link avatar mẫu
        userName={userName}
        level="5"
        onNotificationPress={handleNotificationPress}
      />
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ chiều cao
    justifyContent: 'flex-start', // Dính lên trên
    backgroundColor: 'white', // Hoặc màu nền bạn muốn
  },
});

export default HomeScreen;
