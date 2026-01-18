import Card from "@/components/card";
import DeleteCompany from "@/components/deletecompany";
import JoblistReviewslist from "@/components/jobreviews";
import CompanyActions from "@/components/CompanyActions";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Users,
  Briefcase,
  Star,
  ArrowLeft,
  Globe,
  Mail,
  Calendar,
  TrendingUp,
} from "lucide-react";


interface PageProps {
  params: Promise<{ id: string }>;
}

  const { id } = await params;
  let company = null;
  let owner = null;
  let reviews = [];

  try {
    const res = await fetch(`http://localhost:3000/api/company/${id}`);
    const data = await res.json();
    company = data.data?.company;
    owner = data.data?.company?.owner;

    const res2 = await fetch("http://localhost:3000/api/review/" + id);
    const data2 = await res2.json();
    reviews = data2.data || [];
  } catch (err: any) {
    console.error("Error fetching company:", err.message);
  }

  // Get company initial for avatar
  const companyInitial = company?.name?.charAt(0)?.toUpperCase() || "C";

  // Random gradient for company avatar
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-purple-500",
  ];
  const gradientIndex = (company?.name?.charCodeAt(0) || 0) % gradients.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoMnY0aC0yem0tNiA2di00aDJ2NGgtMnptMC02di00aDJ2NGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>

          {/* Company Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Company Logo */}
            <div
              className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${gradients[gradientIndex]} flex items-center justify-center text-white text-4xl font-bold shadow-xl flex-shrink-0 border-4 border-white/20`}
            >
              {companyInitial}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {company?.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Multiple Locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>50-200 employees</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 flex-shrink-0">
              <div className="text-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <p className="text-2xl font-bold text-white">
                  {company?.jobs?.length || 0}
                </p>
                <p className="text-sm text-white/70">Open Jobs</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <p className="text-2xl font-bold text-white flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  4.5
                </p>
                <p className="text-sm text-white/70">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                About {company?.name}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {company?.description ||
                  "A great company to work for. We are always looking for talented individuals to join our team."}
              </p>
            </div>

            {/* Jobs & Reviews */}
            <JoblistReviewslist company={company} reviews={reviews} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Company Info
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Industry</p>
                    <p className="font-medium text-slate-800">Technology</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Company Size</p>
                    <p className="font-medium text-slate-800">50-200</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Founded</p>
                    <p className="font-medium text-slate-800">2020</p>
                  </div>
                </div>

                {owner?.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Contact</p>
                      <p className="font-medium text-slate-800 text-sm truncate max-w-[150px]">
                        {owner.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <CompanyActions companyId={id} companyOwnerId={owner?.id} />
              </div>
            </div>

            {/* Why Work Here */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Why Work Here
              </h3>
              <ul className="space-y-3">
                {[
                  "Competitive salary & benefits",
                  "Remote work options",
                  "Career growth opportunities",
                  "Great team culture",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-slate-600 text-sm"
                  >
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-emerald-600"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
