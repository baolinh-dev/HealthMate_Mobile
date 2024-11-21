import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../types/navigation'; // Import RootStackParamList
import Logo from '../assets/logo.png'; 
import colors from '../constants/colors'; 
import { API_BASE_URL } from '../constants/api';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>; // Define navigation type

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation = useNavigation<RegisterScreenNavigationProp>(); // Declare navigation type

  const handleRegister = async () => {
    try {
      // Send request to server
      const response = await fetch(`${API_BASE_URL}/login`, {
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
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to connect to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />   
      <Text style={styles.healthmateText}>Register for a Healthmate account</Text>
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
    alignItems: 'center', 
  }, 
  healthmateText: {
    fontSize: 13, 
    marginBottom: 20, 
    textAlign: 'center',
    color: colors.text, 
    fontStyle: 'italic',
  },
  logo: {
    width: 120, 
    height: 120, 
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%', 
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
  loginContainer: {
    marginTop: 20, 
  },
  loginText: {
    color: colors.text, 
    textAlign: 'center', 
  },
  linkText: {
    color: colors.link,
    fontWeight: 'bold', 
  },
});

export default RegisterScreen;