import { IUser } from './iUser';

export interface ITeacher extends IUser {
  // Backend model fields
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: string[];
  
  // Frontend-specific properties (optional)
  specialization?: string;
  experience?: number;
  hourlyRate?: number;
  bio?: string;
  subjects?: string[];
  totalClasses?: number;
  rating?: number;
  isApproved?: boolean;
}
