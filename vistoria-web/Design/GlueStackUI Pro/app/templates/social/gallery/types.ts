// Types for Photo Gallery
export interface PersonPhoto {
  id: number;
  name: string;
  image: string;
  likes: number;
}

export interface PhotoModalProps {
  photo: PersonPhoto;
  onClose: () => void;
}
