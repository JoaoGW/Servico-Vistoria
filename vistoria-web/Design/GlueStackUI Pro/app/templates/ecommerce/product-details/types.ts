export interface Review {
  id: number;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
  isLiked: boolean;
  image: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
}
