import Card from "@/components/card";
import { Search, Briefcase, TrendingUp } from "lucide-react";

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; jt?: string; ap?: string }> }) {
  const params = await searchParams;
  const q = params?.q;
  const jt = params?.jt || "Full Time";
  const ap = params?.ap || "LinkedIn";

  const res = await fetch(
    `http://localhost:3000/api/search?q=${q}&jt=${jt}&ap=${ap}`
  );
  const data = await res.json();
  const jobs = data.data || [];

  return (
    <div>
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5 text-indigo-600" />
          <h1 className="text-2xl font-bold text-slate-800">
            Search Results
          </h1>
        </div>
        <p className="text-slate-500">
          {q ? (
            <>
              Showing results for{" "}
              <span className="font-semibold text-indigo-600">"{q}"</span>
            </>
          ) : (
            "Browse all available jobs"
          )}
        </p>

        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-sm text-slate-500">Active filters:</span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
            {jt}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
            via {ap}
          </span>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-600">
          <span className="font-bold text-slate-800">{jobs.length}</span> jobs
          found
        </p>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <TrendingUp className="w-4 h-4" />
          Sorted by relevance
        </div>
      </div>

      {/* Results Grid */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job, idx) => (
            <div
              key={job.id}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <Card data={job} userHasApplied={false} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            No jobs found
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            We couldn't find any jobs matching your search criteria. Try
            adjusting your filters or search for something else.
          </p>
        </div>
      )}
    </div>
  );
}
