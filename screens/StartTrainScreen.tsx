import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const StartTrainScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { exercise } = route.params; // Get exercise from params

  const startTraining = () => {
    // Navigate to the TrainScreen and pass the exercise data
    navigation.navigate("Train", { exercise });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Image 
        source={{ uri: exercise.exerciseImage }} // Use the exerciseImage URL
        style={styles.exerciseImage} // Add styles for the image
        resizeMode="contain" // Ensure the image fits within the given size
      />
      <Text>Time per set: {exercise.timePerSet} minutes</Text>
      <Text>Rest time: {exercise.restTimePerSet} minutes</Text>

      <Button title="Start Training" onPress={startTraining} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
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
  exerciseName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  exerciseImage: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    marginBottom: 20, // Space between image and text
    borderRadius: 10, // Optional: rounded corners
  },
});

export default StartTrainScreen;
