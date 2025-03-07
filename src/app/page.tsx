"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { LeadList } from "@/components/LeadList";
import { useLeadContext } from "@/context/LeadContext";

export default function Home() {
  const { createLead } = useLeadContext();
  const [error, setError] = useState<string | null>(null);
  const [showErrorBanner, setShowErrorBanner] = useState(false);

  const handleAddLead = async (lead: any) => {
    try {
      await createLead(lead);
      setError(null);
    } catch (error) {
      // Parse the error message to make it user-friendly
      let errorMessage = "Failed to create lead";
      if (error instanceof Error) {
        if (error.message.includes("email already exists")) {
          errorMessage = "A lead with this email address already exists";
        } else {
          errorMessage = error.message;
        }
      }
      setError(errorMessage);
      setShowErrorBanner(true);
      setTimeout(() => setShowErrorBanner(false), 5000);
      throw error; // Re-throw to handle in the form
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {showErrorBanner && error && (
          <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 bg-white border-l-4 border-red-500 shadow-lg rounded-lg p-4 z-50 animate-slideDown">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 w-full">
                <div className="mt-1 text-sm text-gray-700">
                  <p>{error}</p>
                </div>
              </div>
              <button
                type="button"
                className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600"
                onClick={() => setShowErrorBanner(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <svg
              className="h-12 w-12 text-blue-600 mb-2 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Lead Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track, manage, and convert your leads efficiently with this elegant
            dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Lead
              </h2>
              <LeadForm onSubmit={handleAddLead} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Your Leads
              </h2>
              <LeadList />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Lead Management System. All rights
            reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
