import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../constants/api";
import { Blog } from "../types/blog";

// Fetch all blogs
export const fetchAllBlogs = async (): Promise<Blog[]> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.get(`${API_BASE_URL}/api/blogs/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Add a new blog
export const addNewBlog = async (newBlog: {
  title: string;
  content: string;
  image: string;
}): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    await axios.post(`${API_BASE_URL}/api/blogs/add`, newBlog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};
