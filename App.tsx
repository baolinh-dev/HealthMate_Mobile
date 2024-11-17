import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

// Định nghĩa kiểu cho mỗi phần tử trong danh sách
interface Student {
  id: string;
  name: string;
  age: number;
}

export default function App() {
  const students: Student[] = [
    { id: "1", name: "Bao Linh", age: 19 },
    { id: "2", name: "Minh Tu", age: 21 },
    { id: "3", name: "Nguyen Hoang", age: 20 },
    { id: "4", name: "Lan Anh", age: 22 },
    { id: "5", name: "Tuan Anh", age: 18 },
    { id: "6", name: "Mai Lan", age: 23 },
    { id: "7", name: "Thao Ly", age: 20 },
    { id: "8", name: "Duy Anh", age: 22 },
    { id: "9", name: "Hieu Hoang", age: 19 },
    { id: "10", name: "Khanh Linh", age: 21 },
  ];

  // Hàm renderItem, chỉ định kiểu dữ liệu cho 'item'
  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.item}>
      <Text style={styles.text}>ID: {item.id}</Text>
      <Text style={styles.text}>Name: {item.name}</Text>
      <Text style={styles.text}>Age: {item.age}</Text>
    </View>
  );

  return (
    <View style = {styles.parentContainer}>
      <FlatList
        style={styles.container} 
        data={students} // Dữ liệu
        renderItem={renderItem} // Cách render mỗi item
        keyExtractor={(item) => item.id} // Cung cấp key cho mỗi item
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: "lightgreen",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "black",
  }, 
  parentContainer: {
    paddingHorizontal: 20, 
    backgroundColor: "white", 
    paddingTop: 80
  },
  container: {
    backgroundColor: "white",
  },
});
