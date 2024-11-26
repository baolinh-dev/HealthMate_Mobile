// types/exercise.ts

export interface Exercise {
    name: string;
    sets: number;
    timePerSet: number; // Thời gian cho mỗi set (tính bằng phút)
    restTimePerSet: number; // Thời gian nghỉ giữa các set (tính bằng phút)
    caloriesPerSet: number; // Số calo đốt cháy cho mỗi set
    exerciseImage?: string; // Ảnh minh họa bài tập (nếu có)
  }
  