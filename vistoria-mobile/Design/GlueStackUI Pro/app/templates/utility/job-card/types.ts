export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  postedTime: string;
  description: string;
  companyInitials: string;
  companyLogo?: string;
  requirements?: string[];
  benefits?: string[];
  experience?: string;
  skills?: string[];
}

export interface FilterOption {
  id: string;
  label: string;
  type: Job["type"] | "All";
}

export interface JobApplication {
  jobId: string;
  userId: string;
  appliedDate: string;
  status: "pending" | "reviewed" | "interview" | "rejected" | "accepted";
  coverLetter?: string;
  resumeUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  size: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
  industry: string;
  location: string;
}

export interface JobSearchFilters {
  query: string;
  location: string;
  jobType: Job["type"] | "All";
  salaryRange: {
    min: number;
    max: number;
  };
  experience: "entry" | "mid" | "senior" | "lead" | "All";
  remote: boolean;
}

export interface SavedJob {
  jobId: string;
  userId: string;
  savedDate: string;
  notes?: string;
}
