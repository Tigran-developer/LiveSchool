export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'teacher' | 'pupil';
  avatar?: string;
  isApproved?: boolean;
  createdAt: string;
}
