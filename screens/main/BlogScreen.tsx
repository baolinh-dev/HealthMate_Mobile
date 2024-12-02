import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Blog } from "../../types/blog";
import { API_BASE_URL } from "../../constants/api";

const BlogScreen = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: "",
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) throw new Error("No token found");

      const response = await axios.get(`${API_BASE_URL}/api/blogs/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlog = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${API_BASE_URL}/api/blogs/add`,
        newBlog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewBlog({ title: "", content: "", image: "" });
      setIsFormVisible(false); 

      Alert.alert(
        "Success",
        "Bạn đã đăng bài thành công. Admin đang trong quá trình duyệt bài của bạn.")
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading blogs...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.blogPost}>
            <Text style={styles.author}>Author: {item.authorId?.name}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.footer}>
              <Text>Likes: {item.likes.length}</Text>
              <Text>Comments: {item.comments.length}</Text>
            </View>
          </View>
        )}
      />

      {/* Nút Add */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsFormVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal Form */}
      <Modal visible={isFormVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Post Blog</Text>
            <TextInput
              style={styles.input}
              placeholder="Title" 
               placeholderTextColor="#888"
              value={newBlog.title}
              onChangeText={(text) => setNewBlog({ ...newBlog, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Content" 
               placeholderTextColor="#888"
              multiline
              value={newBlog.content}
              onChangeText={(text) => setNewBlog({ ...newBlog, content: text })}
            />
            <TextInput 
              placeholderTextColor="#888"
              style={styles.input}
              placeholder="Image URL" 
               
              value={newBlog.image}
              onChangeText={(text) => setNewBlog({ ...newBlog, image: text })}
            />
            <View style={styles.formActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsFormVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddBlog}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  blogPost: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 30,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  form: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc", 
    borderRadius: 5,
    padding: 10,
    marginBottom: 15, 
  },
  formActions: {
    flexDirection: "row", 
    justifyContent: "flex-end"
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5, 
    marginRight: 12
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BlogScreen;
