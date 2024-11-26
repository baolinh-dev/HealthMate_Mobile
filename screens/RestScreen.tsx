import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutStackParamList } from "../types/navigation";

type RestScreenRouteProp = RouteProp<WorkoutStackParamList, "Rest">;
type RestScreenNavigationProp = StackNavigationProp<WorkoutStackParamList, "Rest">;

type Props = {
  route: RestScreenRouteProp;
  navigation: RestScreenNavigationProp;
};

const RestScreen: React.FC<Props> = ({ route, navigation }) => {
  const { exercise, restTime, currentSet } = route.params; // Nhận currentSet từ params
  const [timeRemaining, setTimeRemaining] = useState(restTime);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      goToTrainScreen(); // Quay lại TrainScreen khi hết thời gian nghỉ
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining]);

  const goToTrainScreen = () => {
    navigation.navigate("Train", {
      exercise,
      currentSet: currentSet + 1, // Tăng set hiện tại
    });
  };

  const handleSkipRest = () => {
    setTimeRemaining(0); // Bỏ qua thời gian nghỉ và đi tiếp
    goToTrainScreen();
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name} - Rest</Text>
      <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
      <Text style={styles.setCount}>Set: {currentSet}/{exercise.sets}</Text>
      <Button title="Skip Rest" onPress={handleSkipRest} color="blue" />
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
  timer: {
    fontSize: 48,
    marginBottom: 30,
  },
  setCount: {
    fontSize: 18,
  },
});

export default RestScreen;
