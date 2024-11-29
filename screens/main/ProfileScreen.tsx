import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../constants/api'; // Ensure this is the correct path

// Define a type for the daily calories data
interface DailyCalories {
  [key: string]: number; // The key is a date string, and the value is the number of calories
}

// Define a type for the weekly calories data
interface WeeklyCalories {
  [key: string]: number; // The key is the week identifier (e.g., "2024-W48"), and the value is the total calories for that week
}

const ProfileScreen = () => {
  const [dailyData, setDailyData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);
  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        
        if (!token) {
          Alert.alert('Error', 'No token found. Please login again.');
          return;
        }

        // Fetch the daily calories data from the correct endpoint
        const response = await axios.get(`${API_BASE_URL}/api/users/stats/calories`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Assuming the response has the daily and weekly calories data
        const { daily, weekly } = response.data;

        // Type assertion to tell TypeScript that daily is of type DailyCalories
        const dailyDates = Object.keys(daily) as string[];
        const dailyValues = Object.values(daily) as number[];

        setLabels(dailyDates); // Set the dates as labels
        setDailyData(dailyValues); // Set the daily calories data for each day

        // Process weekly data
        const weeklyData: number[] = [];
        const weeklyLabels: string[] = Object.keys(weekly);

        // Explicitly cast the weekly values to numbers
        Object.values(weekly).forEach((calories: unknown) => {
          weeklyData.push(calories as number); // Cast to number
        });

        setWeeklyData(weeklyData); // Set the weekly calories data
        setWeeklyLabels(weeklyLabels); // Set the weekly labels
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'Unable to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // If data is still loading, show a loading indicator or message
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 100 }}>
        Calories Consumed (Daily)
      </Text>
      <LineChart
        data={{
          labels, // Set the labels (dates)
          datasets: [{ data: dailyData }], // Set the calories data
        }} 
        width={Dimensions.get('window').width - 20} // Adjust chart width
        height={220} 
        yAxisSuffix=" cal" 
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#f5f5f5',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 10,
          borderRadius: 16,
        }}
      />

      <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 30 }}>
        Calories Consumed (Weekly)
      </Text>
      <LineChart
        data={{
          labels: weeklyLabels, // Set the weekly labels (week identifiers)
          datasets: [{ data: weeklyData }], // Set the weekly calories data
        }} 
        width={Dimensions.get('window').width - 20} // Adjust chart width
        height={220} 
        yAxisSuffix=" cal" 
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#f5f5f5',
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

export default ProfileScreen;
