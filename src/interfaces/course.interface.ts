export interface Course {
  _id?: string;
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
  count: number;
}

export interface PaginatedCourses {
  courses: Array<Course>;
  count: number;
}
