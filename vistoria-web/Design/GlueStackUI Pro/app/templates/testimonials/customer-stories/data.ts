import { Testimonial, Stat } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechFlow Inc.",
    location: "San Francisco, CA",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    testimonial:
      "This platform has completely transformed how our team collaborates. The intuitive design and powerful features have increased our productivity by 40%. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "StartupHub",
    location: "New York, NY",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    testimonial:
      "Outstanding service and support. The team went above and beyond to ensure our migration was seamless. The ROI has been incredible.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Design Lead",
    company: "Creative Solutions",
    location: "Austin, TX",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 2,
    testimonial:
      "The user experience is phenomenal. Clean, modern, and everything just works. Our design team loves the collaboration features.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO",
    company: "InnovateLab",
    location: "Seattle, WA",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    testimonial:
      "Excellent platform with robust security features. The API integration was smooth and the documentation is top-notch. Perfect for enterprise needs.",
    date: "1 week ago",
  },
];

export const stats: Stat[] = [
  {
    value: "10K+",
    label: "Happy Customers",
    imageId:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFwcHklMjBjdXN0b21lcnN8ZW58MHx8MHx8fDA%3D",
  },
  {
    value: "4.9/5",
    label: "Average Rating",
    imageId:
      "https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.webp?a=1&b=1&s=612x612&w=0&k=20&c=vTedWOsRo4-O5hO_ZblfrCYNEHvmdTcU6cPCW8I1u60=",
  },
  {
    value: "99%",
    label: "Customer Satisfaction",
    imageId:
      "https://media.istockphoto.com/id/1402948379/photo/business-man-and-woman-shaking-hands-in-the-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=bzBhg4RsnIW3SHGQe6DEzz06VbIjKsCVAtVamAp3hto=",
  },
  {
    value: "24/7",
    label: "Support Available",
    imageId:
      "https://media.istockphoto.com/id/1458164457/photo/businessman-using-laptop-and-smartphone-with-contact-icons-on-virtual-screen-searching-web.webp?a=1&b=1&s=612x612&w=0&k=20&c=QBNMztJSx7_BIShHAmroLCR7CAff87m1JGd8KOONBY8=",
  },
];
