import { Link } from "react-router";
import { MapPin, Clock, Briefcase, DollarSign } from "lucide-react";
import { Job } from "../contexts/JobContext";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const getTypeColor = (type: string) => {
    const colors = {
      "full-time": "bg-green-100 text-green-800",
      "part-time": "bg-yellow-100 text-yellow-800",
      contract: "bg-purple-100 text-purple-800",
      remote: "bg-blue-100 text-blue-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Link
      to={`/job/${job.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg text-gray-900 mb-1">{job.title}</h3>
          <p className="text-base text-gray-700">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs ${getTypeColor(job.type)}`}>
          {job.type}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4" />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
