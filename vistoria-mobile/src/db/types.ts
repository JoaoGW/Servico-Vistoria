export interface DocumentoApi {
  createdAt: string;
  fileMimeType: string;
  fileName: string;
  id: string;
  title: string;
  updatedAt: string;
}

export interface VistoriaApi {
  completedAt: string | null;
  createdAt: string;
  description: string;
  id: string;
  latitude: number | null;
  longitude: number | null;
  pendente: boolean;
  photoMimeType: string | null;
  updatedAt: string;
  userId: string;
}
