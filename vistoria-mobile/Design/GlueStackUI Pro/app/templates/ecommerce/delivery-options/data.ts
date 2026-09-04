import { Truck, Clock, MapPin } from "lucide-react-native";
import { DeliveryMethod, TimeSlot } from "./types";

export const mockDeliveryMethods: DeliveryMethod[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "Delivered to your doorstep within 3-5 days",
    price: 4.99,
    estimatedTime: "3-5 days",
    icon: Truck,
    features: ["Free returns", "Package tracking", "Delivery confirmation"],
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "Fast delivery within 1-2 business days",
    price: 9.99,
    estimatedTime: "1-2 days",
    icon: Clock,
    features: [
      "Priority handling",
      "Real-time tracking",
      "Delivery confirmation",
    ],
    isPopular: true,
  },
  {
    id: "same-day",
    name: "Same Day Delivery",
    description: "Get your order delivered the same day",
    price: 19.99,
    estimatedTime: "Same day",
    icon: MapPin,
    features: ["Same day delivery", "Live tracking", "SMS notifications"],
  },
];

export const mockTimeSlots: TimeSlot[] = [
  { id: "1", time: "9:00 AM - 12:00 PM", date: "Today", available: true },
  { id: "2", time: "12:00 PM - 3:00 PM", date: "Today", available: true },
  { id: "3", time: "3:00 PM - 6:00 PM", date: "Today", available: false },
  { id: "4", time: "9:00 AM - 12:00 PM", date: "Tomorrow", available: true },
  { id: "5", time: "12:00 PM - 3:00 PM", date: "Tomorrow", available: true },
  { id: "6", time: "3:00 PM - 6:00 PM", date: "Tomorrow", available: true },
];

// Default delivery configuration
export const DEFAULT_DELIVERY_CONFIG = {
  defaultMethodId: "standard",
  defaultTimeSlotId: "1",
  supportedMethods: ["standard", "express", "same-day"],
  maxTimeSlots: 10,
} as const;
