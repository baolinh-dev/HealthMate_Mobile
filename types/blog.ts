// types/blog.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user'; // Hoặc các role khác mà bạn có
}

export interface Comment { 
  _id: string,
  userId: string; // Thay vì userId là string, hãy tham chiếu User để lấy thông tin người dùng
  userName: string; // Thay vì userId là string, hãy tham chiếu User để lấy thông tin người dùng
  content: string;
  createdAt: string; // Thời gian bình luận (ISO date string)
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  authorId: User; // Dữ liệu tác giả được lấy từ User
  status: 'draft' | 'published' | 'archived';
  likes: Like[];
  comments: Comment[]; // Mảng bình luận với kiểu Comment đã được định nghĩa
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  userId: string; // ID của người dùng đã like (chuỗi)
}
