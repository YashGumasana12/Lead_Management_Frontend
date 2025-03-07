"use client";

import React from "react";
import { Lead } from "../../../types/lead";
import { getStatusColor } from "./statusUtils";
import { safariStyles } from "../../../utils/animations";

interface LeadStatusProps {
  status: Lead["status"];
  id: string;
  onStatusChange: (id: string, status: Lead["status"]) => Promise<void>;
  isUpdating: boolean;
}

export const LeadStatus: React.FC<LeadStatusProps> = ({
  status,
  id,
  onStatusChange,
  isUpdating,
}) => {
  const statusColors = getStatusColor(status);

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <div
          className={`inline-flex items-center px-3 py-1.5 rounded-full ${statusColors.bg} ${statusColors.text} ${statusColors.border} text-xs font-medium`}
        >
          {statusColors.icon}
          {status}
        </div>
      </div>

      <div className="relative w-full">
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value as Lead["status"])}
          disabled={isUpdating}
          className="w-full appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ WebkitAppearance: "none" }}
        >
          <option value="New">Change to New</option>
          <option value="Engaged">Change to Engaged</option>
          <option value="Proposal Sent">Change to Proposal Sent</option>
          <option value="Closed-Won">Change to Closed-Won</option>
          <option value="Closed-Lost">Change to Closed-Lost</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
          {isUpdating ? (
            <div
              className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"
              style={safariStyles.loadingSpinner}
            />
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
