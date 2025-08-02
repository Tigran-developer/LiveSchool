import {IUser} from './iUser';

export interface ITeacher extends IUser {
  role: 'teacher';
  specialization: string;
  experience: number;
  hourlyRate: number;
}
