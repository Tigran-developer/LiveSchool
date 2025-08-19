import {IUser} from './iUser';
import {ISubscriptionPlan} from './iSubscription-plan';

export interface IStudent extends IUser {
  isStudent: true;
  subscriptionPlan: ISubscriptionPlan;
  remainingClasses: number;
  totalPurchased: number;
}
