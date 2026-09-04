import {
  SubscriptionPlan,
  PaymentMethod,
  BillingHistory,
  PlanFeature,
} from "./types";

export const mockSubscription: SubscriptionPlan = {
  id: "sub_001",
  name: "Premium Plus",
  price: 29.99,
  billingCycle: "monthly",
  status: "active",
  nextBillingDate: "2025-11-09",
  startDate: "2024-05-09",
  features: [
    "Unlimited projects",
    "Advanced analytics",
    "Priority support",
    "Custom branding",
    "API access",
    "Team collaboration (up to 10 members)",
  ],
};

export const mockPaymentMethod: PaymentMethod = {
  type: "Visa",
  last4: "4242",
  expiryDate: "12/26",
};

export const mockBillingHistory: BillingHistory[] = [
  {
    id: "inv_001",
    date: "2025-10-09",
    amount: 29.99,
    status: "paid",
    invoiceUrl: "#",
  },
  {
    id: "inv_002",
    date: "2025-09-09",
    amount: 29.99,
    status: "paid",
    invoiceUrl: "#",
  },
  {
    id: "inv_003",
    date: "2025-08-09",
    amount: 29.99,
    status: "paid",
    invoiceUrl: "#",
  },
  {
    id: "inv_004",
    date: "2025-07-09",
    amount: 29.99,
    status: "paid",
    invoiceUrl: "#",
  },
  {
    id: "inv_005",
    date: "2025-06-09",
    amount: 29.99,
    status: "paid",
    invoiceUrl: "#",
  },
];

export const availablePlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    billingCycle: "monthly",
    status: "active",
    nextBillingDate: "",
    startDate: "",
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "Email support",
      "Standard templates",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    billingCycle: "monthly",
    status: "active",
    nextBillingDate: "",
    startDate: "",
    features: [
      "Up to 25 projects",
      "Advanced analytics",
      "Priority support",
      "Custom templates",
      "API access",
    ],
  },
  {
    id: "premium_plus",
    name: "Premium Plus",
    price: 29.99,
    billingCycle: "monthly",
    status: "active",
    nextBillingDate: "",
    startDate: "",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "API access",
      "Team collaboration (up to 10 members)",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99.99,
    billingCycle: "monthly",
    status: "active",
    nextBillingDate: "",
    startDate: "",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24/7 phone support",
      "Custom branding",
      "Full API access",
      "Unlimited team collaboration",
      "Advanced security features",
      "Custom integrations",
    ],
  },
];

export const planFeatures: PlanFeature[] = [
  {
    id: "projects",
    name: "Projects",
    description: "Number of projects you can create",
    included: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Access to performance analytics",
    included: true,
  },
  {
    id: "support",
    name: "Support",
    description: "Customer support level",
    included: true,
  },
  {
    id: "branding",
    name: "Custom Branding",
    description: "Add your own logo and colors",
    included: true,
  },
  {
    id: "api",
    name: "API Access",
    description: "Integrate with external services",
    included: true,
  },
  {
    id: "collaboration",
    name: "Team Collaboration",
    description: "Work with team members",
    included: true,
  },
  {
    id: "security",
    name: "Advanced Security",
    description: "Enhanced security features",
    included: false,
  },
  {
    id: "integrations",
    name: "Custom Integrations",
    description: "Build custom integrations",
    included: false,
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    type: "Visa",
    last4: "4242",
    expiryDate: "12/26",
  },
  {
    type: "Mastercard",
    last4: "5555",
    expiryDate: "08/25",
  },
  {
    type: "American Express",
    last4: "1234",
    expiryDate: "06/27",
  },
];

export const billingCycles = [
  { value: "monthly", label: "Monthly", discount: 0 },
  { value: "yearly", label: "Yearly", discount: 20 },
] as const;
