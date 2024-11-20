import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../types/navigation'; // Import RootStackParamList
import ImageTest from '../assets/logo.png'; // Adjust the path as needed

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>; // Define navigation type

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation = useNavigation<RegisterScreenNavigationProp>(); // Declare navigation type

  const handleRegister = async () => {
    // Validate input
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    try {
      // Send request to server
      const response = await fetch('http://192.168.1.11:5002/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message, [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        // Server error
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to connect to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={ImageTest} style={styles.logo} /> {/* Logo */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
            Log in here.
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
  },
  logo: {
    width: 80, // Set logo width to 80
    height: 80, // Set logo height to 80
    marginBottom: 20, // Add spacing below the logo
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%', // Make inputs full width
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
  loginContainer: {
    marginTop: 20, // Spacing above the login text
  },
  loginText: {
    color: '#000', // Text color for the login prompt
    textAlign: 'center', // Center the text
  },
  linkText: {
    color: '#1E90FF', // Link color (Dodger Blue)
    fontWeight: 'bold', // Make it bold to stand out
  },
});

export default RegisterScreen;