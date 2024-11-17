import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() { 
  const [count, setCount] = useState<number>(0);
  return (
    <View style={styles.container}>
        <Text style = {styles.text}> {count}</Text>
        <Button title="Increse" onPress={() => setCount(count + 1)}></Button>
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
