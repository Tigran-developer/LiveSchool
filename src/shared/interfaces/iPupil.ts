import {IUser} from './iUser';
import {ISubscriptionPlan} from './iSubscription-plan';

export interface IPupil extends IUser {
  role: 'pupil';
  subscriptionPlan: ISubscriptionPlan;
  remainingClasses: number;
  totalPurchased: number;
}
