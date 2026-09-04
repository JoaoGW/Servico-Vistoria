import { Chat } from "./types";

// Sample chat data with images and emojis
export const sampleChat: Chat = {
  id: 1,
  name: "John Doe",
  age: 30,
  online: true,
  chats_history: [
    {
      sender: "You",
      message: "Hey John! 👋 Are you free later today? ",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      sender: "John Doe",
      message: "Hey! Yeah, I should be free after 6. 😊",
      timestamp: "10:31 AM",
      type: "text",
    },
    {
      sender: "You",
      message: "Nice. Want to grab coffee near the park? ",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      sender: "John Doe",
      message: "Sounds good. 🤔 The one on Maple Street?",
      timestamp: "10:33 AM",
      type: "text",
    },
    {
      sender: "You",
      message: "Yep, that's the one. 6:30 works? 👍",
      timestamp: "10:34 AM",
      type: "text",
    },
    {
      sender: "John Doe",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=60",
      message: "This place looks perfect! 📍",
      timestamp: "10:35 AM",
      type: "image",
    },
    {
      sender: "You",
      message: "I don't think it's crowded, but let's do it just in case. 🤷‍♂️",
      timestamp: "10:36 AM",
      type: "text",
    },
    {
      sender: "John Doe",
      message: "Cool, I'll book it now. ✅",
      timestamp: "10:37 AM",
      type: "text",
    },
    {
      sender: "You",
      message: "🤔 Awesome, thanks! What are you up to till then? ",
      timestamp: "10:38 AM",
      type: "text",
    },
    {
      sender: "John Doe",
      message: "Finishing a couple of emails, then heading out. 💻",
      timestamp: "10:39 AM",
      type: "text",
    },
    {
      sender: "You",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=60",
      message: "Working on this mockup meanwhile 🎨",
      timestamp: "10:40 AM",
      type: "image",
    },
    {
      sender: "John Doe",
      message: "Looks amazing! Great work 🔥",
      timestamp: "10:41 AM",
      type: "text",
    },
    {
      sender: "You",
      message: "By the way, any updates on the side project? 🚀",
      timestamp: "10:42 AM",
      type: "text",
    },
    {
      sender: "John Doe",
      message: "Pushed the auth flow last night. 💯",
      timestamp: "10:43 AM",
      type: "text",
    },
    {
      sender: "You",
      message: " 👀 Nice. Want me to review the PR after coffee? ",
      timestamp: "10:44 AM",
      type: "text",
    },
    {
      sender: "John Doe",
      message: "Yes please  📋, branch is feature/auth-flow.",
      timestamp: "10:45 AM",
      type: "text",
    },
    {
      sender: "You",
      message: "See you! ☕️",
      timestamp: "10:56 AM",
      type: "text",
    },
  ],
  img_url:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
};
