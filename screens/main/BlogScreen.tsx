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
import { Blog } from "../../types/blog"; 
import { fetchAllBlogs, addNewBlog } from "../../apis/blogApi";
import { addComment } from "../../apis/commentApi"; 
import { MaterialIcons } from "@expo/vector-icons";

const BlogScreen = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);
  
  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const fetchedBlogs = await fetchAllBlogs(); // Gọi hàm fetch blogs từ API
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding new blog
  const handleAddBlog = async () => {
    try {
      await addNewBlog(newBlog); // Gọi hàm thêm blog mới
      setNewBlog({ title: "", content: "", image: "" });
      setIsFormVisible(false);

      Alert.alert("Success", "Bạn đã đăng bài thành công. Admin đang trong quá trình duyệt bài của bạn.");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedBlogId) {
      Alert.alert("Error", "Nội dung bình luận không được để trống.");
      return;
    }

    try {
      const response = await addComment(selectedBlogId, newComment);
      setComments((prev) => [...prev, response.comment]); // Thêm bình luận vào danh sách
      setNewComment(""); // Reset comment input
    } catch (error) {
      console.error("Error adding comment:", error);
      Alert.alert("Error", "Không thể thêm bình luận.");
    }
  };

  // Handle open modal to add blog
  const openAddBlogForm = () => {
    setIsFormVisible(true);
  };

  // Handle close modal
  const closeAddBlogForm = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    fetchBlogs(); // Fetch blogs when component mounts
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

            {/* Hiển thị danh sách bình luận ngay lập tức */}
            <View style={styles.commentSection}>
              <FlatList
                data={item.comments}
                keyExtractor={(comment) => comment._id}
                renderItem={({ item }) => (
                  <View style={styles.commentItem}>
                    <Text style={styles.commentAuthor}>{item.userName}:</Text>
                    <Text style={styles.commentContent}>{item.content}</Text>
                  </View>
                )}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập bình luận..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                style={styles.commentButton}
                onPress={() => {
                  setSelectedBlogId(item._id);
                  handleAddComment();
                }}
              >
                <Text style={styles.commentButtonText}>Post Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={openAddBlogForm}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal for adding new blog */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isFormVisible}
        onRequestClose={closeAddBlogForm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
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
              value={newBlog.content}
              onChangeText={(text) => setNewBlog({ ...newBlog, content: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL" 
              placeholderTextColor="#888"
              value={newBlog.image}
              onChangeText={(text) => setNewBlog({ ...newBlog, image: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddBlog}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={closeAddBlogForm}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
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
  commentSection: {
    marginTop: 10,
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  commentAuthor: {
    fontWeight: "bold",
  },
  commentContent: {
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BlogScreen;
