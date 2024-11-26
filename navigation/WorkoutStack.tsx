// navigation/WorkoutStack.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WorkoutStackParamList } from "../types/navigation"; // Your param list types
import WorkoutListScreen from "../screens/WorkoutListScreen";
import StartTrainScreen from "../screens/StartTrainScreen";
import TrainScreen from "../screens/TrainScreen";
import RestScreen from "../screens/RestScreen";

const Stack = createStackNavigator<WorkoutStackParamList>();

const WorkoutStackScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="WorkoutList">
      <Stack.Screen
        name="WorkoutList"
        component={WorkoutListScreen}
        options={{ title: "Workout List" }}
      />
      <Stack.Screen
        name="StartTrain"
        component={StartTrainScreen}
        options={{ title: "Start Training" }}
      />
      <Stack.Screen
        name="Train"
        component={TrainScreen}
        options={{ title: "Training" }}
      />
      <Stack.Screen
        name="Rest"
        component={RestScreen}
        options={{ title: "Rest" }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutStackScreen;
