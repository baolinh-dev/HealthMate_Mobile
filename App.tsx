import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Bao Linh", age: 19 },
    { id: 2, name: "Minh Tu", age: 21 },
    { id: 3, name: "Nguyen Hoang", age: 20 },
    { id: 4, name: "Lan Anh", age: 22 },
    { id: 5, name: "Tuan Anh", age: 18 },
    { id: 6, name: "Mai Lan", age: 23 },
    { id: 7, name: "Thao Ly", age: 20 },
    { id: 8, name: "Duy Anh", age: 22 },
    { id: 9, name: "Hieu Hoang", age: 19 },
    { id: 10, name: "Khanh Linh", age: 21 },
    { id: 11, name: "Hieu Minh", age: 22 }, // Thêm nhiều sinh viên
    { id: 12, name: "Thanh Mai", age: 20 },
    { id: 13, name: "Lan Thanh", age: 18 },
    { id: 14, name: "Tuan Ki", age: 21 },
    { id: 15, name: "Tuan Hoang", age: 20 },
  ]);

  return (
    <ScrollView style={{ flex: 1 }} >
      {students.map((student) => {
        return (
          <View
            key={student.id}
            style={{
              padding: 20,
              backgroundColor: "green",
              marginBottom: 40,
            }}
          >
            <Text style={styles.text}>{student.id}</Text>
            <Text style={styles.text}>{student.name}</Text>
            <Text style={styles.text}>{student.age}</Text>
          </View>
        );
      })}
    </ScrollView>
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
