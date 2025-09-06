import {StudentStatus} from '../../../shared/constants/StudentStatus';
import {Ranks} from '../../../shared/constants/Ranks';
import {ISubscriptionPlan} from '../../../shared/interfaces/iSubscription-plan';

export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  status: StudentStatus;
  rank: Ranks;
  availableClasses: number;
  totalClassesAttended: number;
  totalClassesBooked: number;
  preferredSubjects: string[];
  joinDate: string
  avatar: string;
  grade: string;
  subjects: string[];
  enrollmentDate: string;
  totalClasses: number;
  completedClasses: number;
  lastActiveDate: string;
  subscriptionPlan: Pick<ISubscriptionPlan, 'id' | 'name'>
  subscriptionExpiry: string
}
