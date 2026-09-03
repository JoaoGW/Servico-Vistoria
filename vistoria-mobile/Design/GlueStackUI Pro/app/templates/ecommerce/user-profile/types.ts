export interface Order {
  id: string;
  product: string;
  image: string;
  price: number;
  status: "delivered" | "shipped" | "processing";
  date: string;
  rating?: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
}

export interface UserProfile {
  name: string;
  initials: string;
  avatar: string;
  membership: string;
  stats: {
    orders: number;
    wishlist: number;
    rating: number;
    points: number;
    saved: number;
  };
}
