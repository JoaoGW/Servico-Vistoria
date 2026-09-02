import { Restaurant} from "./types";

// Mock restaurant data
export const restaurantData: Restaurant = {
  id: "1",
  name: "Bella Vista Ristorante",
  description:
    "Authentic Italian cuisine with a modern twist. We source the finest ingredients from local farms and Italy to bring you an unforgettable dining experience.",
  cuisine: "Italian",
  rating: 4.7,
  reviewCount: 1247,
  priceRange: "$$$",
  address: "123 Main Street, Downtown District, NY 10001",
  phone: "+1 (555) 123-4567",
  website: "www.bellavista.com",
  hours: "11:00 AM - 10:00 PM",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  amenities: ["wifi", "parking", "outdoor", "delivery", "takeout"],
  isOpen: true,
  isFavorite: false,
  deliveryTime: "25-35 min",
  deliveryFee: 2.99,
  minimumOrder: 15.0,
};