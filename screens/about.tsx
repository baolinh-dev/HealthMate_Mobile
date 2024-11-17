// screens/about.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native"; 
import { globalStyles } from "../utils/const";

const styles = StyleSheet.create({
    about: {
        fontSize: 20
    }
})

const About = () => (
  <View>
    <Text style={[styles.about, globalStyles.globalFont]}>
      About Screen
    </Text>
  </View>
);

export default About;
