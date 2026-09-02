import { Product, Review } from "./types";

export const product: Product = {
  id: "1",
  name: "Minimalist Canvas Backpack",
  price: 89.99,
  originalPrice: 129.99,
  discount: 31,
  rating: 4.7,
  reviewCount: 156,
  image:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
};

export const reviews: Review[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    user: "Alex Chen",
    avatar: "AC",
    content: "Perfect for daily use. Clean design and durable canvas.",
    likes: 89,
    timestamp: "2h",
    isLiked: true,
    rating: 5,
  },
  {
    id: 2,
    user: "Maya Patel",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    avatar: "MP",
    content: "Love the minimalist style. Great for work and travel.",
    likes: 34,
    timestamp: "1d",
    isLiked: true,
    rating: 5,
  },
  {
    id: 3,
    user: "Jordan Kim",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    avatar: "JK",
    content: "Good quality but could use more pockets.",
    likes: 12,
    timestamp: "3d",
    isLiked: false,
    rating: 4,
  },
];
