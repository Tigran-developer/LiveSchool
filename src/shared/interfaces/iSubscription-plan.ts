export interface ISubscriptionPlan {
  id: string;
  name: string;
  classCount: number;
  price: number;
  description: string;
  popular?: boolean;
}
