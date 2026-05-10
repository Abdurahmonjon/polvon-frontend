import { useJobs } from "../contexts/JobContext";
import { JobCard } from "../components/JobCard";
import { Clock } from "lucide-react";

export function RecentJobsPage() {
  const { recentJobs } = useJobs();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl text-gray-900">Recent Jobs</h1>
          </div>
          <p className="text-base text-gray-600">
            Latest job postings from top companies
          </p>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg text-gray-900 mb-2">No jobs available</h3>
            <p className="text-sm text-gray-600">
              Check back later for new opportunities
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
