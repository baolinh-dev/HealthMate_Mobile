import React from "react";
import { StyleSheet, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { MainTabParamList } from "../../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import UserInfoView from "../../components/UserInfoView";
import Avatar from '../../assets/avatar.png'; 
import colors from "../../constants/colors";

type HomeScreenProps = StackScreenProps<MainTabParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ route }) => {
  const { userName } = route.params;
  const handleNotificationPress = () => {
    Alert.alert("Notification", "Notification button pressed!");
  };
  return ( 
    <SafeAreaView style={styles.container}>
      <UserInfoView
        avatarUrl={Avatar}
        userName={userName}
        level="5"
        onNotificationPress={handleNotificationPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ chiều cao
    justifyContent: 'flex-start', // Dính lên trên
    backgroundColor: colors.white, // Hoặc màu nền bạn muốn
  },
});

export default HomeScreen;
