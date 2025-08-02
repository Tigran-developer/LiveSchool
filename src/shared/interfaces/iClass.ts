import {ISimplePrivateUser} from './iSimple-private-user';

export interface IClass {
  id: string,
  title: string,
  description: string,
  startTime: string,
  endTime: string,
  isRecurring: boolean,
  recurrencePattern: number,
  zoomLink: string,
  maxParticipants: number,
  createdAt: string,
  status: string,
  notifyBeforeMinutes: number,
  isDeleted: boolean,
  teacher: ISimplePrivateUser
  admin: ISimplePrivateUser
}
