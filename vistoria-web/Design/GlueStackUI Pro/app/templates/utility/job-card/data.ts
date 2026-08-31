import { Job, FilterOption, Company } from "./types";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Native Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    type: "Full-time",
    postedTime: "2 hours ago",
    description:
      "Looking for an experienced React Native developer to join our mobile team and build cutting-edge applications.",
    companyInitials: "TC",
    companyLogo:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center",
    requirements: [
      "5+ years React Native experience",
      "Strong TypeScript skills",
      "Experience with state management",
      "Knowledge of mobile app deployment",
    ],
    benefits: [
      "Health insurance",
      "401k matching",
      "Flexible work hours",
      "Remote work options",
    ],
    experience: "Senior",
    skills: ["React Native", "TypeScript", "Redux", "Jest", "Firebase"],
  },
  {
    id: "2",
    title: "Mobile UI/UX Designer",
    company: "Design Studio Inc",
    location: "Remote",
    salary: "$90k - $130k",
    type: "Remote",
    postedTime: "5 hours ago",
    description:
      "Create beautiful and intuitive mobile experiences for our growing user base across iOS and Android platforms.",
    companyInitials: "DS",
    companyLogo:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop&crop=center",
    requirements: [
      "3+ years mobile design experience",
      "Proficiency in Figma/Sketch",
      "Portfolio of mobile apps",
      "Understanding of design systems",
    ],
    benefits: [
      "Competitive salary",
      "Health benefits",
      "Professional development",
      "Work from anywhere",
    ],
    experience: "Mid",
    skills: [
      "Figma",
      "Sketch",
      "Adobe Creative Suite",
      "Prototyping",
      "User Research",
    ],
  },
  {
    id: "3",
    title: "Frontend Engineer",
    company: "StartupHub",
    location: "New York, NY",
    salary: "$100k - $140k",
    type: "Full-time",
    postedTime: "1 day ago",
    description:
      "Join our fast-paced startup and help build the future of web applications with modern technologies.",
    companyInitials: "SH",
    companyLogo:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&h=150&fit=crop&crop=center",
    requirements: [
      "3+ years frontend development",
      "React/Vue.js experience",
      "CSS/SCSS proficiency",
      "API integration experience",
    ],
    benefits: [
      "Equity options",
      "Health insurance",
      "Unlimited PTO",
      "Learning budget",
    ],
    experience: "Mid",
    skills: ["React", "Vue.js", "JavaScript", "CSS", "REST APIs"],
  },
  {
    id: "4",
    title: "React Developer (Contract)",
    company: "Global Tech",
    location: "Austin, TX",
    salary: "$80/hour",
    type: "Contract",
    postedTime: "2 days ago",
    description:
      "6-month contract opportunity to work on exciting enterprise-level React projects with a global team.",
    companyInitials: "GT",
    companyLogo:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop&crop=center",
    requirements: [
      "4+ years React experience",
      "Enterprise application experience",
      "Strong problem-solving skills",
      "Ability to work independently",
    ],
    benefits: [
      "Competitive hourly rate",
      "Flexible schedule",
      "Remote work available",
      "Potential for extension",
    ],
    experience: "Senior",
    skills: ["React", "Redux", "TypeScript", "Jest", "Webpack"],
  },
  {
    id: "5",
    title: "Part-time Mobile Developer",
    company: "AppWorks",
    location: "Seattle, WA",
    salary: "$60k - $80k",
    type: "Part-time",
    postedTime: "3 days ago",
    description:
      "Flexible part-time role perfect for developers looking to balance multiple projects or commitments.",
    companyInitials: "AW",
    companyLogo:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop&crop=center",
    requirements: [
      "2+ years mobile development",
      "React Native or Flutter",
      "Good communication skills",
      "Self-motivated",
    ],
    benefits: [
      "Flexible hours",
      "Remote work",
      "Skill development",
      "Networking opportunities",
    ],
    experience: "Mid",
    skills: ["React Native", "Flutter", "JavaScript", "Firebase", "Git"],
  },
  {
    id: "6",
    title: "Full Stack Developer",
    company: "Innovation Labs",
    location: "Boston, MA",
    salary: "$110k - $150k",
    type: "Full-time",
    postedTime: "4 days ago",
    description:
      "Join our innovative team to build scalable web and mobile applications using cutting-edge technologies.",
    companyInitials: "IL",
    companyLogo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center",
    requirements: [
      "4+ years full-stack experience",
      "Node.js and React expertise",
      "Database design skills",
      "Cloud platform experience",
    ],
    benefits: [
      "Comprehensive benefits",
      "401k with matching",
      "Health and dental",
      "Professional development",
    ],
    experience: "Senior",
    skills: ["Node.js", "React", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: "7",
    title: "UI Developer",
    company: "Creative Agency",
    location: "Los Angeles, CA",
    salary: "$85k - $115k",
    type: "Full-time",
    postedTime: "5 days ago",
    description:
      "Create stunning user interfaces for our diverse client portfolio in a creative and collaborative environment.",
    companyInitials: "CA",
    companyLogo:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop&crop=center",
    requirements: [
      "3+ years UI development",
      "HTML/CSS/JavaScript mastery",
      "Design system experience",
      "Client communication skills",
    ],
    benefits: [
      "Creative environment",
      "Health benefits",
      "Flexible schedule",
      "Client interaction",
    ],
    experience: "Mid",
    skills: ["HTML", "CSS", "JavaScript", "Sass", "Design Systems"],
  },
];

export const filterOptions: FilterOption[] = [
  { id: "1", label: "All Jobs", type: "All" },
  { id: "2", label: "Full-time", type: "Full-time" },
  { id: "3", label: "Part-time", type: "Part-time" },
  { id: "4", label: "Contract", type: "Contract" },
  { id: "5", label: "Remote", type: "Remote" },
];

export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center",
    description:
      "Leading technology solutions provider specializing in mobile and web applications.",
    website: "https://techcorp.com",
    size: "201-500",
    industry: "Technology",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Design Studio Inc",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop&crop=center",
    description:
      "Creative design agency focused on user experience and mobile design.",
    website: "https://designstudio.com",
    size: "11-50",
    industry: "Design",
    location: "Remote",
  },
  {
    id: "3",
    name: "StartupHub",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&h=150&fit=crop&crop=center",
    description:
      "Fast-growing startup building innovative web applications for the future.",
    website: "https://startuphub.com",
    size: "11-50",
    industry: "Technology",
    location: "New York, NY",
  },
  {
    id: "4",
    name: "Global Tech",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop&crop=center",
    description:
      "Enterprise technology company providing solutions to global clients.",
    website: "https://globaltech.com",
    size: "500+",
    industry: "Technology",
    location: "Austin, TX",
  },
  {
    id: "5",
    name: "AppWorks",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop&crop=center",
    description:
      "Mobile app development company creating innovative solutions for businesses.",
    website: "https://appworks.com",
    size: "51-200",
    industry: "Technology",
    location: "Seattle, WA",
  },
];

export const jobTypes = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Remote", label: "Remote" },
] as const;

export const experienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead/Principal" },
] as const;

export const salaryRanges = [
  { value: "0-50k", label: "$0 - $50k" },
  { value: "50k-75k", label: "$50k - $75k" },
  { value: "75k-100k", label: "$75k - $100k" },
  { value: "100k-125k", label: "$100k - $125k" },
  { value: "125k-150k", label: "$125k - $150k" },
  { value: "150k+", label: "$150k+" },
] as const;
