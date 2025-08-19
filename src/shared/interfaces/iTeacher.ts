import {IUser} from './iUser';

export interface ITeacher extends IUser {
  isTeacher: true;
  specialization: string;
  experience: number;
  hourlyRate: number;
}
