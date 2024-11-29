import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Exercise } from "../types/exercise";

interface CompleteWorkoutResponse {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
    workOut: Array<{ date: Date; calories: number }>;
  };
} 

export const fetchCaloriesData = async () => {
  try {
    // Get the token from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found. Please login again.');
    }

    // Fetch the daily and weekly calories data from the API
    const response = await axios.get(`${API_BASE_URL}/api/users/stats/calories`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching calories data:', error);
    throw new Error('Unable to fetch calories data');
  }
};

export const completeWorkout = async (
  email: string, // Email của người dùng
  exercise: Exercise, // Thông tin bài tập
  setsCompleted: number // Số sets đã hoàn thành
): Promise<CompleteWorkoutResponse> => {
  try {
    // Gửi yêu cầu PUT với email qua URL params
    const response = await axios.put(
      `${API_BASE_URL}/api/users/completeWorkout/${email}`, // Đảm bảo email trong URL
      {
        exercise,
        setsCompleted,
      }
    );

    // Trả về dữ liệu từ server
    return response.data;
  } catch (error) {
    console.error("Error completing workout:", error);
    throw new Error("Failed to complete workout");
  }
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/exercises`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};
