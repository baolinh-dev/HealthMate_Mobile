export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: { userName: string }; // Truyền userName từ Login
};

export type MainTabParamList = {
  Home: { userName: string }; // Hiển thị tên user trên Home
  Blog: undefined;
  Record: undefined;
  Workout: undefined;
  Profile: undefined;
};
