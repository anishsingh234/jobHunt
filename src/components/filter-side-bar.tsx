"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Briefcase, ExternalLink, MapPin, Filter, RotateCcw } from "lucide-react";

interface FilterSidebarProps {
  onApply?: () => void;
}

export default function FilterSidebar({ onApply }: FilterSidebarProps) {
  const router = useRouter();
  const searchparams = useSearchParams();
  const q = searchparams.get("q") || "";
  const jt = searchparams.get("jt") || "Full Time";
  const ap = searchparams.get("ap") || "LinkedIn";

  const [type, settype] = useState(jt);
  const [apply, setapply] = useState(ap);

  const jobTypes = [
    { value: "Full Time", label: "Full Time", icon: "💼" },
    { value: "Part Time", label: "Part Time", icon: "⏰" },
    { value: "Contract", label: "Contract", icon: "📝" },
    { value: "Remote", label: "Remote", icon: "🏠" },
    { value: "Internship", label: "Internship", icon: "🎓" },
  ];

  const applyThrough = [
    { value: "LinkedIn", label: "LinkedIn", color: "bg-blue-100 text-blue-700" },
    { value: "Google", label: "Google", color: "bg-red-100 text-red-700" },
    { value: "Github", label: "GitHub", color: "bg-slate-100 text-slate-700" },
    { value: "Indeed", label: "Indeed", color: "bg-purple-100 text-purple-700" },
    { value: "Company", label: "Company Site", color: "bg-emerald-100 text-emerald-700" },
  ];

  function handlesubmit() {
    const url = `/search?q=${q}&jt=${type}&ap=${apply}`;
    router.push(url);
    onApply?.();
  }

  function handleReset() {
    settype("Full Time");
    setapply("LinkedIn");
    router.push(`/search?q=${q}`);
    onApply?.();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          Filters
        </h2>
        <button
          onClick={handleReset}
          className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Job Type Filter */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-500" />
          Job Type
        </h3>
        <div className="space-y-2">
          {jobTypes.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                type === option.value
                  ? "bg-indigo-50 border-2 border-indigo-300"
                  : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
              }`}
            >
              <input
                type="radio"
                name="jobType"
                value={option.value}
                checked={type === option.value}
                onChange={(e) => settype(e.target.value)}
                className="sr-only"
              />
              <span className="text-lg">{option.icon}</span>
              <span
                className={`text-sm font-medium ${
                  type === option.value ? "text-indigo-700" : "text-slate-600"
                }`}
              >
                {option.label}
              </span>
              {type === option.value && (
                <div className="ml-auto w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Apply Through Filter */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-indigo-500" />
          Apply Through
        </h3>
        <div className="space-y-2">
          {applyThrough.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                apply === option.value
                  ? "bg-indigo-50 border-2 border-indigo-300"
                  : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
              }`}
            >
              <input
                type="radio"
                name="applyThrough"
                value={option.value}
                checked={apply === option.value}
                onChange={(e) => setapply(e.target.value)}
                className="sr-only"
              />
              <span
                className={`px-2 py-1 rounded-lg text-xs font-semibold ${option.color}`}
              >
                {option.label}
              </span>
              {apply === option.value && (
                <div className="ml-auto w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range (Visual only) */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <span className="text-indigo-500">💰</span>
          Salary Range
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-slate-600">
            <span>$0</span>
            <span>$200K+</span>
          </div>
          <input
            type="range"
            min="0"
            max="200000"
            defaultValue="100000"
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-center text-sm font-medium text-indigo-600">
            Up to $100,000
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handlesubmit}
        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
      >
        <Filter className="w-4 h-4" />
        Apply Filters
      </button>
    </div>
  );
}
