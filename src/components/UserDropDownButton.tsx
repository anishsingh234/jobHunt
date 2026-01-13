import { UserContext } from "@/app/(group)/layout";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Plus,
  Building2,
  FileText,
  LogIn,
  ChevronDown,
  LogOut,
  Settings,
  Loader2,
} from "lucide-react";

export default function UserDropDownButton() {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/current-user", {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (data.success) {
        setUser(null);
        setIsOpen(false);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        {user && (
          <span className="text-sm font-medium text-slate-700 hidden md:block max-w-[100px] truncate">
            {user.email?.split("@")[0]}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden animate-fade-in">
            {user && (
              <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                <p className="text-sm font-semibold text-slate-800">
                  {user.email}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {user.company ? "Company Account" : "Job Seeker"}
                </p>
              </div>
            )}

            <div className="p-2">
              {user ? (
                <>
                  {/* Company Owner Options */}
                  {user?.company && (
                    <>
                      <Link
                        href="/AddJob"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <Plus className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-medium">Post a Job</span>
                      </Link>

                      <Link
                        href={`/company/${user.company.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium">My Company</span>
                      </Link>
                    </>
                  )}

                  {/* Job Seeker Options */}
                  {!user?.company && (
                    <>
                      <Link
                        href="/applied-jobs"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="font-medium">My Applications</span>
                      </Link>

                      <Link
                        href="/addcompany"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium">Start Hiring</span>
                      </Link>
                    </>
                  )}

                  <div className="border-t border-slate-100 my-2" />

                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      {loggingOut ? (
                        <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <span className="font-medium">{loggingOut ? "Signing Out..." : "Sign Out"}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <LogIn className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="font-medium">Sign In</span>
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-medium">Create Account</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
