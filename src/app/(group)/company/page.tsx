import prismaclient from "@/services/prisma";
import Link from "next/link";
import { Building2, Users, ArrowRight, MapPin, Globe } from "lucide-react";

export default async function Page() {
  const companies = await prismaclient.company.findMany({
    where: {},
    include: {
      owner: true,
      Job: true,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Browse Companies</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Companies
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Explore top companies and find your next career opportunity
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{companies.length}</div>
                <div className="text-sm text-indigo-200">Companies</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {companies.reduce((acc, comp) => acc + (comp.Job?.length || 0), 0)}
                </div>
                <div className="text-sm text-indigo-200">Open Positions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {companies.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Building2 className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No Companies Yet
            </h3>
            <p className="text-slate-500 mb-6">
              Be the first to add a company to our platform
            </p>
            <Link
              href="/addcompany"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Add Company
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((comp) => (
              <Link
                key={comp.id}
                href={`/company/${comp.id}`}
                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
              >
                {/* Company Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {comp.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                      {comp.name}
                    </h3>
                    {comp.website && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                        <Globe className="w-3.5 h-3.5" />
                        <span className="truncate">{comp.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {comp.description || "No description available"}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    {comp.location && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{comp.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium">
                      <Users className="w-3.5 h-3.5" />
                      <span>{comp.Job?.length || 0} jobs</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
