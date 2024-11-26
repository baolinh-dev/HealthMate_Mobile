import { Exercise } from "./exercise";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: { userName: string }; // Truyền userName từ Login 
  Workout: { exercise: Exercise };
};

export type MainTabParamList = {
  Home: { userName: string }; // Hiển thị tên user trên Home
  Blog: undefined;
  Record: undefined;
  Workout: undefined;
  Profile: undefined;
};


export type WorkoutStackParamList = {
  WorkoutList: undefined; 
  StartTrain: { exercise: Exercise }; 
  Train: { exercise: Exercise; currentSet: number, email: string; }; 
  Rest: { exercise: Exercise; restTime: number; currentSet: number }; 
};

