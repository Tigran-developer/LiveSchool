import {IUser} from './iUser';
import {ISubscriptionPlan} from './iSubscription-plan';

export interface IStudent extends IUser {
  role: 'pupil';
  subscriptionPlan: ISubscriptionPlan;
  remainingClasses: number;
  totalPurchased: number;
}
