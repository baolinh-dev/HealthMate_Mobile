import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../constants/api";

export const addComment = async (blogId: string, content: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `${API_BASE_URL}/api/comments/add`,
      { blogId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getComments = async (blogId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/comments/${blogId}`);
    return response.data.comments; // Trả về danh sách bình luận
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
