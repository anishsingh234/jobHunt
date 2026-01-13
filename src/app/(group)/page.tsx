import prismaclient from "@/services/prisma";
import Card from "@/components/card";
import { getUserFromCookies } from "@/helper";
import {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Star,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/jobs");
  const data = await res.json();
  const jobs = data?.data || [];

  const user = await getUserFromCookies();

  let appliedJobIds = new Set();
  if (user) {
    const applications = await prismaclient.application.findMany({
      where: { user_id: user.id },
      select: { job_id: true },
    });
    appliedJobIds = new Set(applications.map((a) => a.job_id));
  }

  // Stats for hero section
  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: jobs.length || "500+" },
    { icon: Building2, label: "Companies", value: "200+" },
    { icon: Users, label: "Job Seekers", value: "10K+" },
    { icon: TrendingUp, label: "Hired", value: "5K+" },
  ];

  // Popular categories
  const categories = [
    { name: "Technology", count: 234, icon: "💻" },
    { name: "Marketing", count: 156, icon: "📊" },
    { name: "Design", count: 98, icon: "🎨" },
    { name: "Finance", count: 87, icon: "💰" },
    { name: "Healthcare", count: 76, icon: "🏥" },
    { name: "Education", count: 65, icon: "📚" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoMnY0aC0yem0tNiA2di00aDJ2NGgtMnptMC02di00aDJ2NGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-200 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Over 10,000+ jobs available</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dream Job
              </span>
              <br />
              Start Your Journey Today
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Connect with top companies and discover opportunities that match
              your skills and aspirations. Your next career move is just a click
              away.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="#jobs"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
              >
                Browse Jobs
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/addcompany"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                <Building2 className="w-5 h-5" />
                Post a Job
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Popular Categories
            </h2>
            <p className="text-slate-500 mt-1">
              Explore jobs by category
            </p>
          </div>
          <Link
            href="/search"
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/search?q=${category.name}`}
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all text-center"
            >
              <span className="text-4xl mb-3 block">{category.icon}</span>
              <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {category.count} jobs
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section id="jobs" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Latest Job Openings
            </h2>
            <p className="text-slate-500 mt-1">
              {jobs.length} jobs available today
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Card
                  data={job}
                  userHasApplied={appliedJobIds.has(job.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No jobs available yet
            </h3>
            <p className="text-slate-500 mb-6">
              Be the first to post a job opportunity
            </p>
            <Link
              href="/AddJob"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Post a Job
            </Link>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to take the next step?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their dream jobs
              through JobHunt. Create your profile and start applying today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold border border-white/30 hover:bg-white/20 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">JobHunt</span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link href="/" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-sm">
              © 2026 JobHunt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
