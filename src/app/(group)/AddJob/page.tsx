"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  MapPin,
  DollarSign,
  Clock,
  ExternalLink,
  Layers,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function AddJobPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [Name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [location, setlocation] = useState("");
  const [type, settype] = useState("");
  const [Apply, setApply] = useState("");
  const [salary, setsalary] = useState<number>(0);
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setloading(true);
    setSuccess(false);

    try {
      const data = {
        title: Name,
        description: description,
        location: location,
        salary: salary,
        apply_through: Apply,
        category: category,
        employment_type: type,
        company_id: user?.company?.id,
      };

      const res = await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const resdata = await res.json();

      if (res.ok && resdata.success) {
        setSuccess(true);
        // Redirect to company page after 1.5 seconds
        setTimeout(() => {
          router.push(`/company/${user?.company?.id}`);
        }, 1500);
      } else {
        alert("Failed to add job: " + (resdata.message || "Unknown error"));
      }
    } catch (error: any) {
      console.log("Error while submitting job:", error.message);
      alert("Something went wrong. Please try again later.");
    } finally {
      setloading(false);
    }
  }

  // If user doesn't have a company
  if (!user?.company) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">
            Company Required
          </h1>
          <p className="text-slate-500 mb-6">
            You need to create a company profile before posting jobs.
          </p>
          <Link
            href="/addcompany"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Create Company
          </Link>
        </div>
      </div>
    );
  }

  const jobTypes = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
    { value: "Remote", label: "Remote" },
  ];

  const categories = [
    "Technology",
    "Marketing",
    "Design",
    "Sales",
    "Finance",
    "Healthcare",
    "Education",
    "Engineering",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Post a New Job
              </h1>
              <p className="text-slate-500">
                Fill in the details to attract the best candidates
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Job posted successfully!</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Job Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Employment Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  required
                >
                  <option value="">Select type</option>
                  {jobTypes.map((jt) => (
                    <option key={jt.value} value={jt.value}>
                      {jt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  placeholder="e.g. New York, NY or Remote"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Annual Salary (USD)
                </label>
                <input
                  type="number"
                  value={salary || ""}
                  onChange={(e) => setsalary(parseInt(e.target.value) || 0)}
                  placeholder="e.g. 85000"
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-indigo-600" />
              Application Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Apply Through (URL or Platform)
              </label>
              <input
                type="text"
                value={Apply}
                onChange={(e) => setApply(e.target.value)}
                placeholder="e.g. LinkedIn, company careers page URL, or email"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/"
              className="px-6 py-3 text-slate-600 font-medium hover:text-slate-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Post Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
