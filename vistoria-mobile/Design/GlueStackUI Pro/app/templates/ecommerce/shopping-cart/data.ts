import { CartItem } from "./types";

export const SHIPPING_COST = 5.99;
export const TAX_RATE = 0.08;

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
    color: "Black",
    size: "One Size",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Smart Fitness Tracker",
    price: 79.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
    color: "Silver",
    size: "Medium",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    price: 89.99,
    quantity: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_2TjCa9N1o8I8sa0T9r_ik9r5NORXdNo1Q&s",
    color: "Stainless Steel",
    size: "Large",
    isFavorite: true,
  },
];
