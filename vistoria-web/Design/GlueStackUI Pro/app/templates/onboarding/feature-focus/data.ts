import { FeatureStep } from "./types";
import { Zap, Shield, Users } from "lucide-react-native";

export const featureSteps: FeatureStep[] = [
  {
    id: 1,
    title: "Lightning Fast Performance",
    description:
      "Experience blazing fast speeds with optimized performance that keeps you productive all day long.",
    icon: Zap,
    gradientColors: ["#3b82f6", "#8b5cf6"],
  },
  {
    id: 2,
    title: "Bank-Level Security",
    description:
      "Your data is protected with enterprise-grade encryption and security measures you can trust.",
    icon: Shield,
    gradientColors: ["#10b981", "#06b6d4"],
  },
  {
    id: 3,
    title: "Seamless Collaboration",
    description:
      "Work together in real-time with your team, share ideas, and achieve goals faster than ever.",
    icon: Users,
    gradientColors: ["#f59e0b", "#ef4444"],
  },
];
