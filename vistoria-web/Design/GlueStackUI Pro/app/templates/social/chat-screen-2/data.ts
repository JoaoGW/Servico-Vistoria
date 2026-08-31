import { GroupMember, GroupMessage } from "./types";

export const groupMembers: GroupMember[] = [
  {
    id: "1",
    name: "Alex Morgan",
    color: "text-tertiary-500",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Taylor Swift",
    color: "text-info-500",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Jamie Lee",
    color: "text-warning-500",
    avatar:
      "https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Jordan Smith",
    color: "text-error-500",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60",
  },
];

export const initialMessages: GroupMessage[] = [
  {
    id: "1",
    userId: "1",
    text: "Ready for our meeting tomorrow? 🚀",
    timestamp: "10:30 AM",
    type: "text",
  },
  {
    id: "2",
    userId: "2",
    text: "Yes, I've prepared the presentation slides 📊",
    timestamp: "10:32 AM",
    type: "text",
  },
  {
    id: "3",
    userId: "3",
    text: "I can't make it in the morning, is afternoon okay? 🤔",
    timestamp: "10:45 AM",
    type: "text",
  },
  {
    id: "4",
    userId: "4",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=60",
    text: "Here's the mockup we discussed",
    timestamp: "10:50 AM",
    type: "image",
  },
  {
    id: "5",
    userId: "1",
    text: "Looks great! Let's do 2 PM then 👍",
    timestamp: "10:55 AM",
    type: "text",
  },
  {
    id: "6",
    userId: "2",
    text: "Perfect! I'll send the agenda 📋",
    timestamp: "11:00 AM",
    type: "text",
  },
  {
    id: "7",
    userId: "3",
    text: "Thanks team, looking forward to it ✨",
    timestamp: "11:05 AM",
    type: "text",
  },
  {
    id: "8",
    userId: "4",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&auto=format&fit=crop&q=60",
    text: "Draft reports are ready 📄",
    timestamp: "11:10 AM",
    type: "image",
  },
];

// Helper to get user by ID
export const getUserById = (userId: string): GroupMember =>
  groupMembers.find((member) => member.id === userId) || groupMembers[0];
