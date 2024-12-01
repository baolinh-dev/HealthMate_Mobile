export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';  // Or any other roles you may have
  }
  

  export interface Blog {
    _id: string;
    title: string;
    content: string;
    image?: string;
    authorId: User; // Changed from authorId to author, populated with User data
    status: 'draft' | 'published' | 'archived';
    likes: { userId: string }[];
    comments: { userId: string; content: string; createdAt: string }[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Like {
    userId: string; // ID của người dùng đã like (chuỗi)
  }
  
  export interface Comment {
    userId: string; // ID của người dùng đã bình luận (chuỗi)
    content: string; // Nội dung bình luận
    createdAt: string; // Thời gian bình luận (ISO date string)
  }
  