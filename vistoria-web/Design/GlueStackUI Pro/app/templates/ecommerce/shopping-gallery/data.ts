import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Fitness Tracker",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    price: 189.99,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: "Minimalist Backpack",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop",
    inStock: false,
  },
  {
    id: 6,
    name: "Ergonomic Office Chair",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop",
    inStock: true,
  },
];

// Utility Functions
export const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

export const filterProducts = (
  products: Product[],
  searchQuery: string
): Product[] => {
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
