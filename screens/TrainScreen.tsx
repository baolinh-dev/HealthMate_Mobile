import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutStackParamList } from "../types/navigation";
import { completeWorkout } from "../apis/exerciseApi"; // Import hàm completeWorkout từ exerciseApi.ts
import { Exercise } from "../types/exercise";

type TrainScreenRouteProp = RouteProp<WorkoutStackParamList, "Train">;
type TrainScreenNavigationProp = StackNavigationProp<
  WorkoutStackParamList,
  "Train"
>;

type Props = {
  route: TrainScreenRouteProp;
  navigation: TrainScreenNavigationProp;
};

const TrainScreen: React.FC<Props> = ({ route, navigation }) => {
  const { exercise, currentSet: initialSet, email } = route.params; // Get email from params
  const [timeRemaining, setTimeRemaining] = useState(exercise.timePerSet * 60); // Time remaining in seconds
  const [isActive, setIsActive] = useState(false); // Timer active status
  const [currentSet, setCurrentSet] = useState(initialSet || 1); // Track current set

  // Countdown timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      clearInterval(timer);
      Alert.alert("Time's up!", "Move to the next phase or take a rest.");
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeRemaining]);

  const handleStartTimer = () => {
    setIsActive(true); // Start the countdown timer
  };

  const handleCompleteSet = async () => {
    setIsActive(false);

    try {
      // Call completeWorkout regardless of whether it's the last set
      const response = await completeWorkout(
        email,
        exercise as Exercise,
        currentSet
      );

      if (currentSet >= exercise.sets) {
        Alert.alert("Workout Complete!", "You have finished all sets!");
        navigation.navigate("WorkoutList"); // Navigate after all sets are completed
      } else {
        // Increment set and navigate to RestScreen if not the last set
        setCurrentSet((prevSet) => prevSet + 1);
        navigation.navigate("Rest", {
          exercise,
          restTime: exercise.restTimePerSet * 60, // Rest time (seconds)
          currentSet: currentSet + 1, // Pass the next set number
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to complete the workout");
    }
  };

  const handleStopTraining = () => {
    setIsActive(false);
    setTimeRemaining(exercise.timePerSet * 60); // Reset timer
    navigation.goBack(); // Go back to the previous screen
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.setCount}>
        Set: {currentSet}/{exercise.sets}
      </Text>
      <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
      {!isActive && (
        <Button title="Start Timer" onPress={handleStartTimer} />
      )}{" "}
      {/* Start Timer button */}
      {isActive && (
        <Button title="Complete Set" onPress={handleCompleteSet} />
      )}{" "}
      {/* Complete Set button */}
      <Button
        title="Stop Training"
        onPress={handleStopTraining}
        color="red"
      />{" "}
      {/* Stop button */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  setCount: {
    fontSize: 18,
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    marginBottom: 30,
  },
});

export default TrainScreen;
