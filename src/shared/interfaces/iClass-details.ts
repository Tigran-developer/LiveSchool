import {ISimplePrivateUser} from './iSimple-private-user';
import {ISimpleUser} from './iSimple-user';
import {IClassStatus} from './iclass-status';

export interface IClassDetails {
  id: string;
  title: string;
  description: string;
  startTime: string;
  durationInMinutes: number;
  zoomLink: string;
  isRecurring: boolean,
  status: IClassStatus;
  recurrencePattern?: 'none' | 'weekly' | 'monthly';
  maxParticipants: number,
  participantsCount: number,
  createdAt: string;
  isDeleted: boolean,
  teacher: ISimpleUser
  admin: ISimplePrivateUser
}
