export interface IClassDetails {
  id: string;
  title: string;
  description: string;
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
  startTime: string;
  durationInMinutes: number;
  zoomLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  maxStudents: number;
  enrolledStudents: number;
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
} 