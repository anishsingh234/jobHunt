"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserContext } from "@/app/(group)/layout";
import {
  Briefcase,
  Users,
  Mail,
  Calendar,
  Trash2,
  ArrowLeft,
  Loader2,
  UserX,
  CheckCircle,
} from "lucide-react";

interface Applicant {
  id: string;
  appliedAt: string;
  status: string;
  user: {
    id: string;
    email: string;
  };
}

interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    ownerId: string;
  };
}

export default function ApplicantsPage() {
  const { id: jobId } = useParams();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job details
        const jobRes = await fetch(`/api/job/${jobId}`);
        if (!jobRes.ok) throw new Error("Failed to fetch job");
        const jobResponse = await jobRes.json();
        
        if (!jobResponse.success || !jobResponse.data) {
          setError("Job not found");
          setLoading(false);
          return;
        }
        
        const jobData = jobResponse.data;
        setJob(jobData);

        // Check if user owns this job's company
        // Compare user's company id with job's company_id field
        if (user?.company?.id !== jobData.company_id) {
          setError("You can only view applicants for your own jobs");
          setLoading(false);
          return;
        }

        // Fetch applicants
        const applicantsRes = await fetch(`/api/applicants/${jobId}`);
        if (!applicantsRes.ok) throw new Error("Failed to fetch applicants");
        const applicantsData = await applicantsRes.json();
        setApplicants(applicantsData);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [jobId, user]);

  const handleDelete = async (applicationId: string) => {
    if (!confirm("Are you sure you want to remove this applicant?")) return;

    setDeletingId(applicationId);
    try {
      const res = await fetch(`/api/applicants/${applicationId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplicants((prev) => prev.filter((a) => a.id !== applicationId));
      } else {
        alert("Failed to remove applicant");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to remove applicant");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-red-500 text-lg">{error}</div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {job?.title}
                </h1>
                <p className="text-gray-500">{job?.company?.name}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span className="font-medium">
                {applicants.length} Applicant{applicants.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Applicants List */}
        {applicants.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <UserX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Applicants Yet
            </h2>
            <p className="text-gray-500">
              When people apply for this job, they&apos;ll appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {applicant.user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {applicant.user.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Applied{" "}
                            {new Date(applicant.appliedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="capitalize">{applicant.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(applicant.id)}
                    disabled={deletingId === applicant.id}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Remove applicant"
                  >
                    {deletingId === applicant.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
