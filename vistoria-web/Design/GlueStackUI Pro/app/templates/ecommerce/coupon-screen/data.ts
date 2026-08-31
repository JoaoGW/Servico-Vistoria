import { Gift, Car, MapPin } from "lucide-react-native";
import { CouponWithColor } from "./types";

export const mockCoupons: CouponWithColor[] = [
  {
    id: "1",
    title: "Ram Nagar Parking",
    points: 5,
    date: "12/02/2019",
    location: "Ram Nagar",
    isUsed: false,
    isExpired: false,
    color: "primary-500",
  },
  {
    id: "2",
    title: "Ram Nagar Parking",
    points: 21,
    date: "12/02/2019",
    location: "Ram Nagar",
    isUsed: false,
    isExpired: false,
    color: "success-500",
  },
  {
    id: "3",
    title: "Ram Nagar Parking",
    points: 10,
    date: "12/02/2019",
    location: "Ram Nagar",
    isUsed: false,
    isExpired: true,
    color: "warning-500",
  },
  {
    id: "4",
    title: "Central Mall Parking",
    points: 15,
    date: "15/02/2019",
    location: "Central Mall",
    isUsed: true,
    isExpired: false,
    color: "error-500",
  },
  {
    id: "5",
    title: "City Center Parking",
    points: 8,
    date: "18/02/2019",
    location: "City Center",
    isUsed: false,
    isExpired: true,
    color: "info-500",
  },
];

export const getTotalPoints = (coupons: CouponWithColor[]): number => {
  return coupons.reduce((total, coupon) => total + coupon.points, 0);
};

export const getActiveCoupons = (
  coupons: CouponWithColor[]
): CouponWithColor[] => {
  return coupons.filter((coupon) => !coupon.isUsed);
};
