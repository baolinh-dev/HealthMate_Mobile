import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const StartTrainScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { exercise, email } = route.params; // Get exercise and email from params

  const startTraining = () => {
    // Navigate to the TrainScreen and pass both exercise and email
    navigation.navigate("Train", { exercise, email });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inforContainer}>
        <View style={styles.infor}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text>Time per set: {exercise.timePerSet} minutes</Text>
          <Text>Rest time: {exercise.restTimePerSet} minutes</Text>
        </View>

        <Image
          source={{ uri: exercise.exerciseImage }} // Use the exerciseImage URL
          style={styles.exerciseImage} // Add styles for the image
          resizeMode="contain" // Ensure the image fits within the given size
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={startTraining}>
          <Text style={styles.buttonText}>Start Training</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Space between content and buttons
    alignItems: "center",
    padding: 20,
  },
  inforContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  }, 
  infor:{

  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  exerciseImage: {
    width: 320, // Adjust width as needed
    height: 400, // Adjust height as needed
    marginBottom: 20, // Space between image and text
    borderRadius: 10, // Optional: rounded corners
  },
  buttonContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", // Distribute space between buttons
    width: "100%", // Full width to position buttons at the bottom
    marginBottom: 20, // Space from the bottom
  },
  startButton: {
    backgroundColor: "#4CAF50", // Green color for Start Training
    padding: 10,
    borderRadius: 5,
    flex: 1, // Allow button to grow
    marginRight: 10, // Space between buttons
    alignItems: "center", // Center text in button
  },
  stopButton: {
    backgroundColor: "#F44336", // Red color for Go Back
    padding: 10,
    borderRadius: 5,
    flex: 1, // Allow button to grow
    alignItems: "center", // Center text in button
  },
  buttonText: {
    color: "#FFFFFF", // Text color for buttons
    fontWeight: "bold",
  },
});

export default StartTrainScreen;
