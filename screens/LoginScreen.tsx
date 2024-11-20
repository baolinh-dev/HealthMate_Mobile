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
import colors from '../constants/colors'; 

type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">; // Define props type

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
      <Text style={styles.healthmateText}>Log in with your HealthMate account</Text>
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
    alignItems: "center", 
  }, 
  healthmateText: {
    fontSize: 13, 
    marginBottom: 20, 
    textAlign: 'center', 
    color: colors.text,  
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%', 
  },
  logo: {
    width: 120, 
    height: 120,
  },
  button: {
    backgroundColor: colors.primary, 
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center', 
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    color: colors.text, 
    textAlign: 'center', 
  },
  linkText: {
    color: colors.link, 
    fontWeight: 'bold', 
  },
});

export default LoginScreen;