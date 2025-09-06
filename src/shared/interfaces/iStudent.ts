import { IUser } from './iUser';

export interface IStudent extends IUser {
  // Backend model fields
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: string[];
  
  // Frontend-specific properties (optional)
  status?: string;
  rank?: string;
  grade?: string;
  age?: number;
  parentEmail?: string;
  parentPhone?: string;
  emergencyContact?: string;
  availableClasses?: number;
  totalClassesAttended?: number;
  totalClassesBooked?: number;
  subscriptionPlan?: string;
  subscriptionExpiry?: string;
  preferredSubjects?: string[];
  learningGoals?: string[];
  notes?: string;
  joinDate?: string;
  lastActiveDate?: string;
  isApproved?: boolean;
}
