export interface Message {
  sender: string;
  message?: string;
  timestamp: string;
  type: "text" | "image";
  image?: string;
}

export interface Chat {
  id: number;
  name: string;
  age: number;
  online: boolean;
  chats_history: Message[];
  img_url?: string;
}
