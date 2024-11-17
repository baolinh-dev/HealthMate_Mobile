import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Age: {age}</Text>
        <TextInput
          multiline
          onChangeText={(value) => setAge(Number(value))}
          style={{
            borderColor: "green",
            borderWidth: 1,
            width: 200,
            padding: 15,
          }}
          keyboardType="numeric"
        />
      </View>
      <View>
        <Text style={styles.text}>Name: {name}</Text>
        <TextInput
          multiline
          onChangeText={(value) => setName(value)}
          style={{
            borderColor: "green",
            borderWidth: 1,
            width: 200,
            padding: 15,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});
