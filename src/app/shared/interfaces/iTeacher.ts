import {TeacherStatus} from '../../../shared/constants/TeacherStatus';

export interface ITeacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: TeacherStatus;
  subjects: string[];
  experience: string;
  specialization: string;
  hourlyRate: number
  bio: string;
  totalClasses: number;
  rating: number,
  avatar: string,
  joinedAt: string
}
