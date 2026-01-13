"use client";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";
import Link from "next/link";
import {
  ExternalLink,
  Bookmark,
  Edit3,
  Trash2,
  AlertCircle,
} from "lucide-react";
import EditBtn from "./editBtn";
import DeleteJobButton from "./DeleteOpenings";

interface JobActionsProps {
  job: any;
  formatSalary: (salary: number) => string;
}

export default function JobActions({ job, formatSalary }: JobActionsProps) {
  const { user } = useContext(UserContext);

  // Check if user is the owner of this job's company
  const isOwner = user?.company?.id === job?.company_id;
  // Check if user is a job seeker (has no company)
  const isJobSeeker = user && !user.company;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
      <div className="text-center mb-6">
        <p className="text-sm text-slate-500 mb-1">Annual Salary</p>
        <p className="text-3xl font-bold text-slate-800">
          {formatSalary(job.salary)}
        </p>
      </div>

      {/* Owner View */}
      {isOwner && (
        <>
          <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <div className="flex items-center gap-2 text-purple-700 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="font-semibold text-sm">Your Job Posting</span>
            </div>
            <p className="text-sm text-purple-600">
              This is a job you posted. You can edit or delete it below.
            </p>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <EditBtn item={job} />
            </div>
            <DeleteJobButton id={job.id} />
          </div>

          <Link
            href={`/applicants/${job.id}`}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all mb-4"
          >
            View Applicants
          </Link>
        </>
      )}

      {/* Job Seeker View */}
      {isJobSeeker && (
        <a
          href={job.apply_through || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all mb-4"
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </a>
      )}

      {/* Not logged in or company owner viewing other jobs */}
      {!user && (
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all mb-4"
        >
          Login to Apply
        </Link>
      )}

      {/* Company owner viewing someone else's job */}
      {user?.company && !isOwner && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-2 text-amber-700 mb-1">
            <AlertCircle className="w-4 h-4" />
            <span className="font-semibold text-sm">Company Account</span>
          </div>
          <p className="text-sm text-amber-600">
            As a company owner, you cannot apply for jobs. Switch to a job seeker account to apply.
          </p>
        </div>
      )}

      <button className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
        <Bookmark className="w-4 h-4" />
        Save for Later
      </button>

      <div className="mt-6 pt-6 border-t border-slate-100">
        <p className="text-sm text-slate-500 text-center">
          Apply via{" "}
          <span className="font-medium text-indigo-600">
            {job.apply_through || "Company Website"}
          </span>
        </p>
      </div>
    </div>
  );
}
