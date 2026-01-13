// app/job/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ExternalLink,
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar,
  Users,
  CheckCircle,
} from "lucide-react";
import JobActions from "@/components/JobActions";

export type dynam = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: dynam) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/job/${id}`);

  if (!res.ok) return notFound();

  const data = await res.json();
  const job = data?.data;

  if (!job) return notFound();

  // Get company initial for avatar
  const companyInitial = job?.company?.name?.charAt(0)?.toUpperCase() || "C";

  // Format salary
  const formatSalary = (salary: number) => {
    if (!salary) return "Competitive Salary";
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
    (job?.company?.name?.charCodeAt(0) || 0) % gradients.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoMnY0aC0yem0tNiA2di00aDJ2NGgtMnptMC02di00aDJ2NGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>

          {/* Job Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Company Logo */}
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center text-white text-3xl font-bold shadow-xl flex-shrink-0`}
            >
              {companyInitial}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {job.category || "Full Time"}
                </span>
                <span className="px-3 py-1 bg-emerald-400/20 text-emerald-100 text-sm font-medium rounded-full">
                  ✓ Actively Hiring
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{job.company?.name || "Company"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatSalary(job.salary)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-shrink-0">
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                Job Description
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
                Requirements
              </h2>
              <ul className="space-y-3">
                {[
                  "Bachelor's degree in a relevant field",
                  "2+ years of professional experience",
                  "Strong communication skills",
                  "Ability to work in a team environment",
                  "Problem-solving mindset",
                ].map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-slate-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Apply Card - Client Component for role-based actions */}
            <JobActions job={job} formatSalary={formatSalary} />

            {/* Job Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Job Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Posted</p>
                    <p className="font-medium text-slate-800">Recently</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Employment Type</p>
                    <p className="font-medium text-slate-800">
                      {job.employment_type || "Full Time"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-medium text-slate-800">
                      {job.location || "Remote"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Category</p>
                    <p className="font-medium text-slate-800">
                      {job.category || "General"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Card */}
            {job.company && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  About the Company
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center text-white text-lg font-bold`}
                  >
                    {companyInitial}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {job.company.name}
                    </p>
                    <p className="text-sm text-slate-500">Technology</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  {job.company.description || "A great company to work for."}
                </p>
                <Link
                  href={`/company/${job.company.id}`}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  View Company Profile →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
