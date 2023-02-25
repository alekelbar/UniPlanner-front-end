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
  loading: boolean;
  error: string | null;
  count: number;
  selected: Course | null;
}

export interface PaginatedCourses {
  courses: Array<Course>;
  count: number;
}
