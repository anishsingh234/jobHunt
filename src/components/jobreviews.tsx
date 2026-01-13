// @ts-nocheck
"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MessageSquare,
  Star,
  Send,
  MapPin,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";

export default function JoblistReviewslist({ company, reviews }) {
  const [review, setReview] = useState("");
  const [activeTab, setActiveTab] = useState("jobs");
  const [loading, setLoading] = useState(false);

  async function handleCreateReview() {
    if (!review.trim()) return;
    
    setLoading(true);
    const reviewToSave = {
      content: review,
      company_id: company.id,
    };

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify(reviewToSave),
      });

      const data = await res.json();

      if (data.success) {
        setReview("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating review:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "jobs"
                ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Open Positions
            {company?.jobs?.length > 0 && (
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                {company.jobs.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "reviews"
                ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Reviews
            {reviews?.length > 0 && (
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                {reviews.length}
              </span>
            )}
          </button>
        </div>

        <div className="p-6">
          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-4">
              {company?.jobs?.length > 0 ? (
                company.jobs.map((job, index) => (
                  <Link
                    key={job.id}
                    href={`/job-details/${job.id}`}
                    className="block p-5 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-200 hover:border-indigo-200 transition-all group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {job.location && (
                            <span className="flex items-center gap-1 text-sm text-slate-500">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.location}
                            </span>
                          )}
                          {job.employment_type && (
                            <span className="flex items-center gap-1 text-sm text-slate-500">
                              <Clock className="w-3.5 h-3.5" />
                              {job.employment_type}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500">No open positions at the moment</p>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Add Review Form */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  Share Your Experience
                </h3>
                <textarea
                  placeholder="Write a review about working at this company..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleCreateReview}
                    disabled={loading || !review.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Post Review
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  Employee Reviews
                </h3>
                {reviews?.length > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-xl p-5 border border-slate-200 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {review.user?.email?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-800">
                              {review.user?.email || "Anonymous"}
                            </span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= 4
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {review.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
