export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

export interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItemCount: number;
}

export interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart: (productId: number) => void;
  isInCart: boolean;
}

export interface ProductGridProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  onAddToCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
}
