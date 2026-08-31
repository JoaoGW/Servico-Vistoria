export interface VideoData {
  id?: string;
  title?: string;
  description?: string;
  duration?: number; // in seconds
  thumbnail?: string;
  videoUrl?: string;
}

export interface VideoPlayerProps {
  video?: VideoData;
  onClose: () => void;
}
