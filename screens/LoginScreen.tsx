import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation"; // Import RootStackParamList 
import ImageTest from '../assets/logo.png';

type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">; // Define props type

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password!");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.11:5002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        navigation.navigate("Home"); // Navigate to Home
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Unable to connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={ImageTest} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>
            If you don't have an account,{' '}
            <Text style={styles.linkText}>Sign up here</Text>.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center", // Center items horizontally
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%', // Make inputs full width
  },
  logo: {
    width: 80, // Set logo width to 80
    height: 80, // Set logo height to 80
    marginBottom: 20, // Add spacing below the logo
  },
  button: {
    backgroundColor: '#8B0000', // Dark red color
    padding: 15,
    borderRadius: 5,
    width: '100%', // Full width
    alignItems: 'center', // Center text inside button
  },
  buttonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20, // Spacing above the register text
  },
  registerText: {
    color: '#000', // Default text color for the prompt
    textAlign: 'center', // Center the text
  },
  linkText: {
    color: '#1E90FF', // Link color (Dodger Blue)
    fontWeight: 'bold', // Make it bold to stand out
  },
});

export default LoginScreen;