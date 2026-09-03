export interface MusicData {
  id?: string;
  title?: string;
  artist?: string;
  album?: string;
  duration?: number; // in seconds
  coverImage?: string;
  audioUrl?: string;
  genre?: string;
  year?: number;
}

export interface MusicPlayerProps {
  music?: MusicData;
  onClose: () => void;
}
