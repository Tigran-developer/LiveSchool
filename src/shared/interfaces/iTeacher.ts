import {IUser} from './iUser';
import {TeacherStatus} from '../constants/TeacherStatus';

export interface ITeacher extends IUser {
  isTeacher: true;
  specialization: string;
  experience: number;
  hourlyRate: number;
  status: TeacherStatus;
  bio?: string;
  subjects?: string[];
  totalClasses?: number;
  rating?: number;
  isApproved?: boolean;
}
