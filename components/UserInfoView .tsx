import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

type UserInfoViewProps = {
  avatarUrl: { uri: string } | number;
  userName: string;
  level: string;
  onNotificationPress: () => void;
};

const UserInfoView: React.FC<UserInfoViewProps> = ({
  avatarUrl,
  userName,
  level,
  onNotificationPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Avatar, Name, Level */}
      <View style={styles.leftContainer}>
        <Image source={avatarUrl} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.level}>Level: {level}</Text>
        </View>
      </View>

      {/* Notification Icon */}
      <TouchableOpacity
        onPress={onNotificationPress}
        style={styles.notificationButton}
      >
        <MaterialIcons name="notifications" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    height: 100,
    width: "100%", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: colors.backGround,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15, 
    marginTop: 20, 
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  userInfo: {
    flexDirection: "column", 
    
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  level: {
    fontSize: 10,
    color: "#666",
  },
  notificationButton: {
    padding: 5,
  },
});

export default UserInfoView;
