export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  grade: string;
  subjects: string[];
  enrollmentDate: string;
  totalClasses: number;
  completedClasses: number;
} 