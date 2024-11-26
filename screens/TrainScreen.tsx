import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutStackParamList } from "../types/navigation";
import { completeWorkout } from "../apis/exerciseApi";
import { Exercise } from "../types/exercise";
import { AnimatedCircularProgress } from "react-native-circular-progress";

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
  const { exercise, currentSet: initialSet, email } = route.params;
  const [timeRemaining, setTimeRemaining] = useState(exercise.timePerSet * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentSet, setCurrentSet] = useState(initialSet || 1);
  const totalTime = exercise.timePerSet * 60;

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
    setIsActive(true);
  };

  const handleCompleteSet = async () => {
    setIsActive(false);

    try {
      const response = await completeWorkout(email, exercise as Exercise, currentSet);

      if (currentSet >= exercise.sets) {
        Alert.alert("Workout Complete!", "You have finished all sets!");
        navigation.navigate("WorkoutList");
      } else {
        setCurrentSet((prevSet) => prevSet + 1);
        navigation.navigate("Rest", {
          exercise,
          restTime: exercise.restTimePerSet * 60,
          currentSet: currentSet + 1,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to complete the workout");
    }
  };

  const handleStopTraining = () => {
    setIsActive(false);
    setTimeRemaining(totalTime);
    navigation.navigate("WorkoutList");
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{exercise.name}</Text>
        <Text style={styles.setCount}>
          Set: {currentSet}/{exercise.sets}
        </Text>

        <AnimatedCircularProgress
          size={360}
          width={20}
          fill={(timeRemaining / totalTime) * 100}
          tintColor="#4CAF50"
          backgroundColor="#3d5875"
          rotation={0}
        >
          {() => (
            <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.buttonContainer}>
        {!isActive && (
          <View style={[styles.buttonWrapper, styles.startButton]}>
            <Button title="Start Timer" onPress={handleStartTimer} color="#ffffff" />
          </View>
        )}
        {isActive && (
          <View style={[styles.buttonWrapper, styles.completeButton]}>
            <Button title="Complete Set" onPress={handleCompleteSet} color="#ffffff" />
          </View>
        )}
        <View style={[styles.buttonWrapper, styles.stopButton]}>
          <Button title="Stop Training" onPress={handleStopTraining} color="#ffffff" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Use space-between to position content and buttons
    padding: 20,
  },
  content: {
    flexGrow: 1, // Allow content to grow and take available space
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  startButton: {
    backgroundColor: "#4CAF50",
  },
  completeButton: {
    backgroundColor: "#FFC107",
  },
  stopButton: {
    backgroundColor: "#F44336",
  },
});

export default TrainScreen;