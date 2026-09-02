import { PaymentMethod, PaymentMethodType } from "./types";
import {
  VisaIcon,
  MastercardIcon,
  PayPalIcon,
  ApplePayIcon,
  ChaseIcon,
  BitcoinIcon,
} from "./icons";

// Payment method data with all necessary information
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    name: "Visa",
    lastFour: "4242",
    expiryDate: "12/26",
    isDefault: true,
    iconComponent: VisaIcon,
  },
  {
    id: "2",
    type: "card",
    name: "Mastercard",
    lastFour: "5555",
    expiryDate: "08/25",
    isDefault: false,
    iconComponent: MastercardIcon,
  },
  {
    id: "3",
    type: "bank",
    name: "Chase Bank",
    lastFour: "1234",
    isDefault: false,
    iconComponent: ChaseIcon,
  },
  {
    id: "4",
    type: "wallet",
    name: "PayPal",
    walletType: "PayPal",
    isDefault: false,
    iconComponent: PayPalIcon,
  },
  {
    id: "5",
    type: "wallet",
    name: "Apple Pay",
    walletType: "Apple Pay",
    isDefault: false,
    iconComponent: ApplePayIcon,
  },
  {
    id: "6",
    type: "crypto",
    name: "Bitcoin",
    isDefault: false,
    iconComponent: BitcoinIcon,
  },
];

// Payment method types for easy reference
export const PAYMENT_TYPES: Record<string, PaymentMethodType> = {
  CARD: "card",
  BANK: "bank",
  WALLET: "wallet",
  CRYPTO: "crypto",
} as const;

// Default payment method configuration
export const DEFAULT_PAYMENT_CONFIG = {
  defaultMethodId: "1", // Visa card is default
  supportedTypes: ["card", "bank", "wallet", "crypto"] as PaymentMethodType[],
  maxMethods: 10,
} as const;
