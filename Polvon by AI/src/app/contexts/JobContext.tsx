import { createContext, useContext, useState, ReactNode } from "react";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salary: string;
  description: string;
  requirements: string[];
  postedBy: string;
  postedDate: string;
  category: string;
  experience: string;
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id" | "postedDate">) => void;
  getJobById: (id: string) => Job | undefined;
  searchJobs: (query: string, filters?: JobFilters) => Job[];
  recentJobs: Job[];
}

export interface JobFilters {
  type?: string;
  location?: string;
  category?: string;
  experience?: string;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "full-time",
    salary: "$120k - $160k",
    description: "We are looking for an experienced frontend developer to join our team and build amazing user experiences.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Strong CSS skills"],
    postedBy: "employer-1",
    postedDate: "2026-03-27",
    category: "Engineering",
    experience: "Senior",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "DesignHub",
    location: "New York, NY",
    type: "full-time",
    salary: "$100k - $140k",
    description: "Join our design team to create beautiful and intuitive products for millions of users.",
    requirements: ["Figma expertise", "Portfolio required", "3+ years experience"],
    postedBy: "employer-2",
    postedDate: "2026-03-26",
    category: "Design",
    experience: "Mid-level",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Remote",
    type: "remote",
    salary: "$130k - $170k",
    description: "Help us build and maintain scalable cloud infrastructure for our growing platform.",
    requirements: ["AWS/GCP experience", "Kubernetes", "CI/CD pipelines"],
    postedBy: "employer-3",
    postedDate: "2026-03-28",
    category: "Engineering",
    experience: "Senior",
  },
  {
    id: "4",
    title: "Marketing Manager",
    company: "GrowthLabs",
    location: "Austin, TX",
    type: "full-time",
    salary: "$90k - $120k",
    description: "Lead our marketing efforts and drive growth through innovative campaigns.",
    requirements: ["5+ years marketing experience", "Data-driven mindset", "Team leadership"],
    postedBy: "employer-4",
    postedDate: "2026-03-25",
    category: "Marketing",
    experience: "Senior",
  },
  {
    id: "5",
    title: "Junior Software Engineer",
    company: "StartupXYZ",
    location: "Seattle, WA",
    type: "full-time",
    salary: "$70k - $90k",
    description: "Great opportunity for recent graduates to learn and grow in a fast-paced startup environment.",
    requirements: ["Computer Science degree", "Basic programming skills", "Enthusiasm to learn"],
    postedBy: "employer-5",
    postedDate: "2026-03-29",
    category: "Engineering",
    experience: "Entry-level",
  },
  {
    id: "6",
    title: "Content Writer",
    company: "ContentCreators",
    location: "Remote",
    type: "contract",
    salary: "$50 - $80/hour",
    description: "Create engaging content for our blog and marketing materials.",
    requirements: ["Strong writing skills", "SEO knowledge", "Portfolio of work"],
    postedBy: "employer-6",
    postedDate: "2026-03-28",
    category: "Content",
    experience: "Mid-level",
  },
];

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem("jobs");
    return stored ? JSON.parse(stored) : mockJobs;
  });

  const addJob = (jobData: Omit<Job, "id" | "postedDate">) => {
    const newJob: Job = {
      ...jobData,
      id: "job-" + Date.now(),
      postedDate: new Date().toISOString().split("T")[0],
    };
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  const searchJobs = (query: string, filters?: JobFilters) => {
    return jobs.filter((job) => {
      const matchesQuery =
        query === "" ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase());

      const matchesType = !filters?.type || job.type === filters.type;
      const matchesLocation =
        !filters?.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesCategory = !filters?.category || job.category === filters.category;
      const matchesExperience = !filters?.experience || job.experience === filters.experience;

      return matchesQuery && matchesType && matchesLocation && matchesCategory && matchesExperience;
    });
  };

  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, 10);

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        getJobById,
        searchJobs,
        recentJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}
