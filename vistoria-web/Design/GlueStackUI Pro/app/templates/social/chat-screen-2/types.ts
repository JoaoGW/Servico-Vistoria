export interface GroupMember {
  id: string;
  name: string;
  color: string;
  avatar: string;
}

export interface GroupMessage {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  type: "text" | "image";
  image?: string;
}
