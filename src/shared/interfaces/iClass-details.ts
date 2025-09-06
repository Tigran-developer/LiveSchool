import { ISimplePrivateUser } from './iSimple-private-user';
import { ISimpleUser } from './iSimple-user';

export interface IClassDetails {
  // Core class properties from backend
  id: string;
  title: string;
  description: string;
  subject: string;
  teacherId: string;
  startTime: string; // datetime
  endTime: string; // datetime
  durationInMinutes: number;
  maxParticipants: number;
  price: number; // decimal
  difficultyId: number;
  isOnline: boolean;
  zoomLink: string

  // Additional frontend-specific properties
  teacher?: ISimpleUser;
  admin?: ISimplePrivateUser;
  enrolledStudents?: number; // Count of currently enrolled students
  isEnrolled?: boolean; // Whether current user is enrolled
  canEnroll?: boolean; // Whether current user can enroll
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  createdAt?: string;
  updatedAt?: string;
}
