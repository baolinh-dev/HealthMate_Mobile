import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Alert, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../constants/api"; // Ensure this is the correct path
import { SafeAreaView } from "react-native-safe-area-context";
import UserInfoView from "../../components/UserInfoView";
import Avatar from "../../assets/avatar.png";
import colors from "../../constants/colors";
import { StackScreenProps } from "@react-navigation/stack";
import { MainTabParamList } from "../../types/navigation";

type ProfileScreenProps = StackScreenProps<MainTabParamList, "Profile">;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  const { userName } = route.params;
  const [dailyData, setDailyData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);
  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          Alert.alert("Error", "No token found. Please login again.");
          return;
        }

        // Fetch the daily calories data from the correct endpoint
        const response = await axios.get(
          `${API_BASE_URL}/api/users/stats/calories`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { daily, weekly } = response.data;

        const dailyDates = Object.keys(daily) as string[];
        const dailyValues = Object.values(daily) as number[];

        setLabels(dailyDates); 
        setDailyData(dailyValues); 

        const weeklyData: number[] = [];
        const weeklyLabels: string[] = Object.keys(weekly);

        
        Object.values(weekly).forEach((calories: unknown) => {
          weeklyData.push(calories as number); 
        });

        setWeeklyData(weeklyData); 
        setWeeklyLabels(weeklyLabels); 
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Alert.alert("Error", "Unable to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleNotificationPress = () => {
    Alert.alert("Notification", "Notification button pressed!");
  };


  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <UserInfoView
          avatarUrl={Avatar}
          userName={userName}
          level="5"
          onNotificationPress={handleNotificationPress}
        />
      </SafeAreaView>
      <Text style={{ textAlign: "center", fontSize: 20, marginTop: 100 }}>
        Calories Consumed (Daily) ok
      </Text>
      <LineChart
        data={{
          labels, // Set the labels (dates)
          datasets: [{ data: dailyData }], // Set the calories data
        }}
        width={Dimensions.get("window").width - 20} // Adjust chart width
        height={220}
        yAxisSuffix=" cal"
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
        }}
      />

      <Text style={{ textAlign: "center", fontSize: 20, marginTop: 30 }}>
        Calories Consumed (Weekly)
      </Text>
      <LineChart
        data={{
          labels: weeklyLabels, // Set the weekly labels (week identifiers)
          datasets: [{ data: weeklyData }], // Set the weekly calories data
        }}
        width={Dimensions.get("window").width - 20} // Adjust chart width
        height={220}
        yAxisSuffix=" cal"
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ chiều cao
    justifyContent: "flex-start", // Dính lên trên
    backgroundColor: colors.white, // Hoặc màu nền bạn muốn
  },
});

export default ProfileScreen;
