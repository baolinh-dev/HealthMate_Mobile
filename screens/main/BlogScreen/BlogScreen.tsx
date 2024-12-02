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
import { Blog } from "../../../types/blog";
import { fetchAllBlogs, addNewBlog } from "../../../apis/blogApi";
import { addComment } from "../../../apis/commentApi";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../constants/colors";
import styles from "./BlogScreenStyles";

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

  // State to track visibility of comments
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>(
    {}
  );

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

      Alert.alert(
        "Success",
        "Bạn đã đăng bài thành công. Admin đang trong quá trình duyệt bài của bạn."
      );
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

  // Toggle comments visibility
  const toggleCommentsVisibility = (blogId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
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
            <View style={styles.infor}>
              <Text style={styles.author}>Author: {item.author.name}</Text>
              <Text style={styles.date}>
                Date: {new Date(item.createdAt).toLocaleDateString("en-US")}
              </Text>
            </View>

            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.footer}>
              <Text>Likes: {item.likes.length}</Text>
              <Text>Comments: {item.comments.length}</Text>
            </View>

            {/* Toggleable comment section */}
            <View style={styles.commentSection}>
              {showComments[item._id] && (
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
              )}
              <TouchableOpacity
                style={styles.toggleCommentsButton}
                onPress={() => toggleCommentsVisibility(item._id)}
              >
                <Text style={styles.toggleCommentsText}>
                  {showComments[item._id]
                    ? "Hide comments"
                    : "See more comments ..."}
                </Text>
              </TouchableOpacity>
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
      <TouchableOpacity style={styles.fab} onPress={openAddBlogForm}>
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
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Create New Blog</Text>
            </View>
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
            <View style={styles.actionButtonPostForm}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddBlog}
              >
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
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BlogScreen;
