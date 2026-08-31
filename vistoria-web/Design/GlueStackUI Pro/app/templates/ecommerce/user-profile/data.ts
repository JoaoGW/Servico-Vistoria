import { Order, WishlistItem, UserProfile } from "./types";
import {
  ShoppingBag,
  Heart,
  Star,
  Award,
  CreditCard,
} from "lucide-react-native";
import { ShareIcon } from "@/components/ui/icon";

export interface StatItem {
  id: string;
  label: string;
  value: number | string;
  icon: any;
  bgColor: string;
  iconColor: string;
}

export const userProfile: UserProfile = {
  name: "Alex Johnson",
  initials: "AJ",
  avatar:
    "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400&h=400&fit=crop",
  membership: "Gold Member",
  stats: {
    orders: 47,
    wishlist: 23,
    rating: 4.8,
    points: 1240,
    saved: 12,
  },
};

export const recentOrders: Order[] = [
  {
    id: "ORD-001",
    product: "Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    price: 129.99,
    status: "delivered",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    product: "Smart Phone Case",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
    price: 29.99,
    status: "shipped",
    date: "2024-01-18",
  },
];

export const wishlistItems: WishlistItem[] = [
  {
    id: "WISH-001",
    name: "Gaming Laptop",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=300&fit=crop",
    price: 1299.99,
    originalPrice: 1599.99,
    discount: 19,
  },
  {
    id: "WISH-002",
    name: "Bluetooth Speaker",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
  },
];

export const statsData: StatItem[] = [
  {
    id: "orders",
    label: "Orders",
    value: userProfile.stats.orders,
    icon: ShoppingBag,
    bgColor: "bg-success-400",
    iconColor: "text-white",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    value: userProfile.stats.wishlist,
    icon: Heart,
    bgColor: "bg-error-400",
    iconColor: "text-white",
  },
  {
    id: "rating",
    label: "Rating",
    value: userProfile.stats.rating,
    icon: Star,
    bgColor: "bg-warning-400",
    iconColor: "text-white",
  },
  {
    id: "points",
    label: "Points",
    value: userProfile.stats.points.toLocaleString(),
    icon: Award,
    bgColor: "bg-info-400",
    iconColor: "text-white",
  },
  {
    id: "shared",
    label: "Shared",
    value: userProfile.stats.saved,
    icon: ShareIcon,
    bgColor: "bg-primary-400",
    iconColor: "text-white",
  },
];
