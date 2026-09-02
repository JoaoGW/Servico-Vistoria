// TypeScript interfaces for restaurant detail screen
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  image: string;
  amenities: string[];
  isOpen: boolean;
  isFavorite: boolean;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
}

