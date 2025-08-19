export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  isApproved?: boolean;
  createdAt: string;
  isAdmin?: boolean;
  isStudent?: boolean;
  isTeacher?: boolean;
}
