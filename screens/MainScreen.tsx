import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // Import Icon library
import { MainTabParamList } from "../types/navigation"; // Import kiểu cho Bottom Tab Navigation
import HomeScreen from "./tabs/HomeScreen";
import BlogScreen from "./tabs/BlogScreen";

import ProfileScreen from "./tabs/ProfileScreen";
import WorkoutScreen from "./tabs/WorkoutScreen";
import { RootStackParamList } from "../types/navigation"; // Import kiểu của RootStackParamList
import colors from "../constants/colors"; // Import colors
import RecordsScreen from "./tabs/RecordsScreen";

// Sử dụng StackScreenProps để nhận các prop của màn hình Main
type MainScreenProps = StackScreenProps<RootStackParamList, "Main">;

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainScreen: React.FC<MainScreenProps> = ({ route }) => {
  const { userName } = route.params; // Nhận userName từ Login

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.primary, // Màu sắc khi tab được chọn
        tabBarInactiveTintColor: "gray", // Màu sắc khi tab không được chọn
        tabBarStyle: {
          backgroundColor: "white", // Màu nền của thanh tab
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ userName }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
