export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  testimonial: string;
  date: string;
}

export interface Stat {
  value: string;
  label: string;
  imageId: string;
}
