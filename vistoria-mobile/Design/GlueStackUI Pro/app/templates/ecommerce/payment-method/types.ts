// Payment method types
export type PaymentMethodType = "card" | "bank" | "wallet" | "crypto";

// Payment method interface
export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  lastFour?: string;
  expiryDate?: string;
  bankName?: string;
  walletType?: string;
  isDefault: boolean;
  iconComponent: any;
}

// Screen props interface
export interface PaymentMethodScreenProps {
  onSelectMethod?: (method: PaymentMethod) => void;
  onAddNew?: () => void;
  selectedMethodId?: string;
}
