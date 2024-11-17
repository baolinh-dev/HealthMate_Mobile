import React, { useState } from "react";
import { FlatList, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, Keyboard, Alert, TouchableWithoutFeedback } from "react-native";

// Định nghĩa kiểu cho mỗi phần tử Todo
interface Todo {
  id: string;
  name: string;
}

export default function App() {
  // State lưu trữ danh sách todo
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Hàm xử lý khi nhấn nút thêm Todo
  const addTodo = () => { 
    if (newTodo.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập tên công việc!");
      return;
    }
    if (newTodo.trim()) {
      const newTodoItem = {
        id: String(todos.length + 1),
        name: newTodo.trim(),
      };
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      setNewTodo(""); // Làm trống trường TextInput
      Keyboard.dismiss(); // Tắt bàn phím
    }
  };

  // Hàm sửa Todo
  const editTodo = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditingTodo(todoToEdit);
      setNewTodo(todoToEdit.name); // Đặt lại tên Todo vào ô nhập liệu
    }
  };

  // Hàm lưu Todo đã chỉnh sửa
  const saveEdit = () => {
    if (editingTodo && newTodo.trim()) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, name: newTodo.trim() } : todo
        )
      );
      setNewTodo(""); // Làm trống TextInput sau khi lưu
      setEditingTodo(null); // Đặt lại editingTodo là null
      Keyboard.dismiss(); // Tắt bàn phím
    }
  };

  // Hàm xóa Todo
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Hàm renderItem cho FlatList
  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.item}>
      <Text style={styles.text}>ID: {item.id}</Text>
      <Text style={styles.text}>Name: {item.name}</Text>
      <TouchableOpacity style={styles.button} onPress={() => editTodo(item.id)}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => deleteTodo(item.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
      <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      {/* start: Form để nhập todo */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
          placeholder="Enter Todo"
        />
        {editingTodo ? (
          <Button title="Save Edit" onPress={saveEdit} />
        ) : (
          <Button title="Add Todo" onPress={addTodo} />
        )}
      </View>
      {/* end: Form */}

      {/* start: List todo */}
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* end: List todo */}
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "orange",
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 40,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderColor: "green",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  item: {
    padding: 20,
    backgroundColor: "lightgreen",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  button: {
    backgroundColor: "orange",
    padding: 10,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
