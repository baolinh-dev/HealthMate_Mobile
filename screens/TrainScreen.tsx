import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutStackParamList } from "../types/navigation";

type TrainScreenRouteProp = RouteProp<WorkoutStackParamList, "Train">;
type TrainScreenNavigationProp = StackNavigationProp<WorkoutStackParamList, "Train">;

type Props = {
  route: TrainScreenRouteProp;
  navigation: TrainScreenNavigationProp;
};

const TrainScreen: React.FC<Props> = ({ route, navigation }) => {
  const { exercise, currentSet: initialSet } = route.params; // Lấy currentSet từ params (bắt đầu từ set đầu tiên)
  const [timeRemaining, setTimeRemaining] = useState(exercise.timePerSet * 60); // Thời gian còn lại (giây)
  const [isActive, setIsActive] = useState(false); // Trạng thái đếm ngược
  const [currentSet, setCurrentSet] = useState(initialSet || 1); // Theo dõi set hiện tại

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
    setIsActive(true); // Bắt đầu đếm ngược
  };

  const handleCompleteSet = () => {
    if (currentSet >= exercise.sets) {
      Alert.alert("Workout Complete!", "You have finished all sets!");
      navigation.navigate("WorkoutList")
      return;
    }

    // Chuyển sang RestScreen sau khi hoàn thành 1 set
    setIsActive(false);
    navigation.navigate("Rest", {
      exercise,
      restTime: exercise.restTimePerSet * 60, // Rest time (giây)
      currentSet,
    });
  };

  const handleStopTraining = () => {
    setIsActive(false);
    setTimeRemaining(exercise.timePerSet * 60); // Reset timer
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.setCount}>Set: {currentSet}/{exercise.sets}</Text>
      <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
      {!isActive && <Button title="Start Timer" onPress={handleStartTimer} />} {/* Nút Start Timer */}
      {isActive && <Button title="Complete Set" onPress={handleCompleteSet} />}
      <Button title="Stop Training" onPress={handleStopTraining} color="red" />
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
