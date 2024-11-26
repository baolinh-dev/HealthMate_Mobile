import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WorkoutStackParamList } from "../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type RestScreenRouteProp = RouteProp<WorkoutStackParamList, "Rest">;
type RestScreenNavigationProp = StackNavigationProp<
  WorkoutStackParamList,
  "Rest"
>;

type Props = {
  route: RestScreenRouteProp;
  navigation: RestScreenNavigationProp;
};

const RestScreen: React.FC<Props> = ({ route, navigation }) => {
  const { exercise, restTime, currentSet } = route.params;
  const [timeRemaining, setTimeRemaining] = useState(restTime);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await AsyncStorage.getItem("email");
      setUserEmail(email);
    };

    fetchEmail();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      goToTrainScreen();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining]);

  const goToTrainScreen = () => {
    if (userEmail) {
      navigation.navigate("Train", {
        exercise,
        currentSet: currentSet,
        email: userEmail,
      });
    }
  };

  const handleSkipRest = () => {
    setTimeRemaining(0);
    goToTrainScreen();
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{exercise.name} - Rest</Text>

        {/* Circular Progress */}
        <AnimatedCircularProgress
          size={360}
          width={20}
          fill={(timeRemaining / restTime) * 100} // Percentage completed
          tintColor="#FFCDD2" // Active progress color
          backgroundColor="#3d5875" // Background color
          rotation={0} // Prevent rotation animation
        >
          {() => <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>}
        </AnimatedCircularProgress>
        <Text style={styles.setCount}>
          Set: {currentSet}/{exercise.sets}
        </Text>
      </View>

      {/* Skip Rest Button */}
      <View style={styles.buttonContainer}>
        <View style={styles.skipButtonWrapper}>
          <Button title="Skip Rest" onPress={handleSkipRest} color="#fff" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Space between content and button
    padding: 20,
  },
  content: {
    flexGrow: 1, // Allow content to take available space
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timer: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  setCount: {
    fontSize: 18,
    marginTop: 20,
  },
  buttonContainer: {
    marginBottom: 20, // Optional: 
    alignItems: "center", 
  }, 
  skipButtonWrapper: {
    backgroundColor: "#4CAF50", // Orange background for Skip Rest
    borderRadius: 8, // Rounded corners
    overflow: "hidden", // Ensure button stays inside rounded border
    width: "60%", // Optional: Adjust width
  },
});

export default RestScreen;
