export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  status: "active" | "cancelled" | "expired";
  nextBillingDate: string;
  startDate: string;
  features: string[];
}

export interface PaymentMethod {
  type: string;
  last4: string;
  expiryDate: string;
}

export interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  invoiceUrl: string;
}

export interface SubscriptionFormData {
  planId: string;
  billingCycle: "monthly" | "yearly";
  paymentMethodId: string;
}

export interface PlanFeature {
  id: string;
  name: string;
  description?: string;
  included: boolean;
}

export interface SubscriptionStatus {
  isActive: boolean;
  canCancel: boolean;
  canUpgrade: boolean;
  canDowngrade: boolean;
  daysUntilRenewal: number;
}
