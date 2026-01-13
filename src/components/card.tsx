// @ts-nocheck
"use client";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ArrowRight,
  Bookmark,
  ExternalLink,
  Users,
} from "lucide-react";
import EditBtn from "./editBtn";
import ApplyToJob from "./applyButton";
import DeleteJobButton from "./DeleteOpenings";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import { Company } from "../../generated/prisma";

export default function Card({ data, onDelete, userHasApplied }) {
  const { user } = useContext(UserContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const href = `/job-details/${data?.id}`;

  // Get company initial for avatar
  const companyInitial = data?.company?.name?.charAt(0)?.toUpperCase() || "C";

  // Format salary
  const formatSalary = (salary: number) => {
    if (!salary) return "Competitive";
    if (salary >= 100000) return `$${(salary / 1000).toFixed(0)}K`;
    return `$${salary.toLocaleString()}`;
  };

  // Random gradient for company avatar
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-purple-500",
    "from-rose-500 to-pink-500",
  ];
  const gradientIndex =
    (data?.company?.name?.charCodeAt(0) || 0) % gradients.length;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 hover:-translate-y-1">
      {/* Applied Badge */}
      {userHasApplied && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
          Applied ✓
        </div>
      )}

      {/* Top Row: Company Info */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center text-white text-xl font-bold shadow-lg`}
        >
          {companyInitial}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {data?.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600 truncate">
              {data?.company?.name ?? "Company"}
            </span>
          </div>
        </div>
        {/* Bookmark Button */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked
              ? "bg-indigo-100 text-indigo-600"
              : "hover:bg-slate-100 text-slate-400"
          }`}
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
          />
        </button>
      </div>

      {/* Tags Row */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data?.category && (
          <span className="tag tag-primary">
            <Briefcase className="w-3 h-3" />
            {data.category}
          </span>
        )}
        {data?.employment_type && (
          <span className="tag tag-success">
            <Clock className="w-3 h-3" />
            {data.employment_type}
          </span>
        )}
        {data?.location && (
          <span className="tag tag-info">
            <MapPin className="w-3 h-3" />
            {data.location}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
        {data?.description || "No description available."}
      </p>

      {/* Salary & Apply Through */}
      <div className="flex items-center justify-between mb-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-500" />
          <span className="text-lg font-bold text-slate-800">
            {formatSalary(data?.salary)}
          </span>
          <span className="text-sm text-slate-400">/year</span>
        </div>
        {data?.apply_through && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <ExternalLink className="w-3 h-3" />
            via {data.apply_through}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Owner Controls Row */}
        {user?.company?.id === data?.company_id && (
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
              Your Posting
            </span>
            <Link
              href={`/applicants/${data?.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg text-xs font-semibold transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              Applicants
            </Link>
            <div className="flex gap-2 ml-auto">
              <EditBtn item={data} />
              <DeleteJobButton id={data?.id} />
            </div>
          </div>
        )}

        {/* Main Actions Row */}
        <div className="flex items-center gap-3">
          {/* Show Apply button only for job seekers (users without a company) */}
          {!user?.company && !userHasApplied && data?.id && (
            <ApplyToJob jobId={data.id} />
          )}
          
          <Link
            href={href}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white rounded-xl font-medium text-sm transition-all group/btn"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <p className="flex items-center gap-2">
      {icon}
      <span className="font-semibold text-gray-900">{label}:</span> {value}
    </p>
  );
}
