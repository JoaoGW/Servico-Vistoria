import { LucideIcon } from "lucide-react-native";

export interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
  icon: LucideIcon;
  features: string[];
  isPopular?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  date: string;
  available: boolean;
}

export interface DeliveryOptionsState {
  selectedMethod: string;
  selectedTimeSlot: string;
}

export interface DeliverySummary {
  method: DeliveryMethod;
  timeSlot: TimeSlot;
  totalFee: number;
}
