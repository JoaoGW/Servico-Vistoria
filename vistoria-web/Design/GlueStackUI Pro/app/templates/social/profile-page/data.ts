import { Comment } from "./types";

export const comments: Comment[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
    user: "Michael Bruno",
    avatar: "MB",
    content:
      "#photoshoot #cute #beautiful #fashion Cites gravida bibendum dolor eu enim ipsum fermentum velit nisl, eget vehicula.",
    likes: 247,
    timestamp: "5m",
    isLiked: true,
  },
  {
    id: 2,
    user: "Emma Stone",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
    avatar: "ES",
    content:
      "Wow! Just amazing, I love your profile content. Look forward to see more. Well done! 👏",
    likes: 16,
    timestamp: "2h",
    isLiked: true,
  },
  {
    id: 3,
    user: "Sarah Jhone",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    avatar: "SJ",
    content:
      "Rhoncus ipsum eget tempor. Praeesent con fermentum sit rhoncus ipsum eget tem. Praeesnt. ❤️❤️❤️",
    likes: 5,
    timestamp: "5h",
    isLiked: false,
  },
];
