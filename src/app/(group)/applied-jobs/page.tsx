import React from "react";
import { getUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default async function Page() {
  const user = await getUserFromCookies();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">
            Sign in Required
          </h1>
          <p className="text-slate-500 mb-6">
            Please sign in to view your job applications.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const applications = await prismaclient.application.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  // Format salary
  const formatSalary = (salary: number) => {
    if (!salary) return "Competitive";
    return `$${salary.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                My Applications
              </h1>
              <p className="text-slate-500">
                Track and manage your job applications
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-3xl font-bold text-slate-800">
              {applications.length}
            </p>
            <p className="text-sm text-slate-500">Total Applied</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-3xl font-bold text-emerald-600">
              {applications.length}
            </p>
            <p className="text-sm text-slate-500">Active</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-3xl font-bold text-amber-600">0</p>
            <p className="text-sm text-slate-500">In Review</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <p className="text-3xl font-bold text-indigo-600">0</p>
            <p className="text-sm text-slate-500">Interviews</p>
          </div>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No applications yet
            </h3>
            <p className="text-slate-500 mb-6">
              Start exploring jobs and apply to positions that match your skills
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
            >
              Browse Jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((appl, index) => {
              const job = appl.job;
              const company = job?.company;

              // Random gradient for company avatar
              const gradients = [
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-orange-500 to-red-500",
                "from-green-500 to-emerald-500",
                "from-indigo-500 to-purple-500",
              ];
              const gradientIndex =
                (company?.name?.charCodeAt(0) || 0) % gradients.length;
              const companyInitial =
                company?.name?.charAt(0)?.toUpperCase() || "C";

              return (
                <div
                  key={appl.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Company Logo */}
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0`}
                    >
                      {companyInitial}
                    </div>

                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h2 className="text-xl font-bold text-slate-800 mb-1">
                            {job?.title}
                          </h2>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Building2 className="w-4 h-4" />
                            <span>{company?.name}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Applied
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-3 mt-4">
                        {job?.location && (
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            {job.location}
                          </div>
                        )}
                        {job?.employment_type && (
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {job.employment_type}
                          </div>
                        )}
                        {job?.salary && (
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <DollarSign className="w-4 h-4 text-slate-400" />
                            {formatSalary(job.salary)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 flex-shrink-0">
                      <Link
                        href={`/job-details/${job?.id}`}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white rounded-xl font-medium text-sm transition-all flex items-center gap-2"
                      >
                        View Job
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
