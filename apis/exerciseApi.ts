import axios from 'axios';
import { API_BASE_URL } from '../constants/api'; 


export interface Exercise {
  name: string;
  sets: number;
  timePerSet: number;
  restTimePerSet: number;
  exerciseImage: string;
}

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/exercises`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};
