// @ts-nocheck
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/(group)/layout";
import UserDropDownButton from "./UserDropDownButton";
import { Search, Briefcase, Sparkles } from "lucide-react";

export default function Header() {
  const { user } = useContext(UserContext);
  const [query, setquery] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const Router = useRouter();

  const getData = () => {
    if (query.trim()) {
      Router.push(`/search?q=${query}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function getsuggestions() {
      const res = await fetch(
        `http://localhost:3000/api/search/suggestion?q=${query}`
      );
      const data = await res.json();
      if (data.success) {
        setsuggestions(data.suggestions);
      } else {
        setsuggestions([]);
      }
    }

    if (query.trim()) {
      getsuggestions();
    } else {
      setsuggestions([]);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      getData();
    }
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg shadow-slate-200/50"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                JobHunt
              </span>
              <span className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
                Find Your Dream Job
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl mx-4 lg:mx-8 hidden sm:block">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-opacity" />
              <div className="relative flex items-center bg-slate-100 rounded-xl overflow-hidden border-2 border-transparent focus-within:border-indigo-500 focus-within:bg-white transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-4" />
                <input
                  value={query}
                  onChange={(e) => setquery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  className="w-full px-4 py-3 text-sm bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
                />
                <button
                  onClick={getData}
                  className="m-1.5 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-200 transition-all"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute w-full bg-white shadow-xl shadow-slate-200/50 mt-2 rounded-xl max-h-72 overflow-y-auto border border-slate-100 z-50 animate-fade-in">
                <div className="p-2">
                  {suggestions.map((elem, index) => (
                    <div
                      key={elem?.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 cursor-pointer rounded-lg transition-colors"
                      onClick={() => {
                        setquery(elem.title);
                        setsuggestions([]);
                        Router.push(`/search?q=${elem.title}`);
                      }}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {elem?.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {elem?.company?.name || "Multiple companies"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Post Job Button - Hidden on mobile */}
            {user?.company && (
              <Link
                href="/AddJob"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Post a Job
              </Link>
            )}
            <UserDropDownButton />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-4">
          <div className="relative flex items-center bg-slate-100 rounded-xl overflow-hidden">
            <Search className="w-5 h-5 text-slate-400 ml-4" />
            <input
              value={query}
              onChange={(e) => setquery(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Search jobs..."
              className="w-full px-4 py-3 text-sm bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
