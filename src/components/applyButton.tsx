"use client";
import { useState, useContext } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { UserContext } from "@/app/(group)/layout";

export default function ApplyToJob({ jobId }: { jobId: string }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  // Don't show apply button for company owners
  if (user?.company) {
    return null;
  }

  async function handleApply() {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (!confirm("Do you want to apply for this job?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/job/apply/${jobId}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setApplied(true);
      } else {
        alert(data.message || "Failed to apply");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (applied) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-100 text-emerald-700 rounded-xl font-medium text-sm cursor-default"
      >
        <CheckCircle className="w-4 h-4" />
        Applied
      </button>
    );
  }

  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Applying...
        </>
      ) : (
        <>
          <Send className="w-4 h-4" />
          Quick Apply
        </>
      )}
    </button>
  );
}
