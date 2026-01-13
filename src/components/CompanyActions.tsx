"use client";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";
import Link from "next/link";
import { Plus, Briefcase, Settings, Users } from "lucide-react";
import DeleteCompany from "./deletecompany";

interface CompanyActionsProps {
  companyId: string;
  companyOwnerId: string;
}

export default function CompanyActions({ companyId, companyOwnerId }: CompanyActionsProps) {
  const { user } = useContext(UserContext);

  // Check if current user is the owner
  const isOwner = user?.id === companyOwnerId;

  if (!isOwner) {
    return (
      <Link
        href={`/search?company=${companyId}`}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
      >
        <Briefcase className="w-4 h-4" />
        View All Jobs
      </Link>
    );
  }

  // Owner actions
  return (
    <div className="space-y-3">
      <Link
        href="/AddJob"
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
      >
        <Plus className="w-4 h-4" />
        Post New Job
      </Link>

      <Link
        href={`/company/${companyId}/applicants`}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
      >
        <Users className="w-4 h-4" />
        View All Applicants
      </Link>

      <DeleteCompany id={companyId} />
    </div>
  );
}
