// @ts-nocheck
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";

export default function DeleteCompany({ id }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/company/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        router.push("/");
        router.refresh();
      } else {
        alert(data.message || "Failed to delete company");
      }
    } catch (err) {
      console.log("Error deleting company:", err);
      alert("Error occurred");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  }

  if (showConfirm) {
    return (
      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-red-800">Delete Company?</h4>
            <p className="text-sm text-red-600">
              This action cannot be undone. All jobs will be removed.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Yes, Delete
              </>
            )}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={loading}
            className="flex-1 py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 rounded-lg font-medium text-sm border border-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium text-sm border border-red-200 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      Delete Company
    </button>
  );
}
