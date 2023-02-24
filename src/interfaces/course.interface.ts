export interface Course {
  name: string;
  courseDescription: string;
  credits: number;
  career: string;
  user: string;
}

export interface CoursesState {
  courses: Array<Course>;
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}
