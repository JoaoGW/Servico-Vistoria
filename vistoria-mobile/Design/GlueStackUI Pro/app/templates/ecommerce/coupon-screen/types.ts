export interface Coupon {
  id: string;
  title: string;
  points: number;
  date: string;
  location: string;
  isUsed: boolean;
  isExpired: boolean;
  color: string;
}

export type CouponColor =
  | "primary-500"
  | "success-500"
  | "warning-500"
  | "error-500"
  | "info-500";

export interface CouponWithColor extends Omit<Coupon, "color"> {
  color: CouponColor;
}
