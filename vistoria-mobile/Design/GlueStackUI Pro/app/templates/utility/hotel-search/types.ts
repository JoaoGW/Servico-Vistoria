export interface Hotel {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  location: string;
  distance: string;
}

export type ViewMode = "list" | "map";
