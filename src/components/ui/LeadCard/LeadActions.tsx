"use client";

import React from "react";
import { safariStyles } from "../../../utils/animations";

interface LeadActionsProps {
  leadId: string;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
  showActions: boolean;
  onToggleActions: () => void;
}

export const LeadActions: React.FC<LeadActionsProps> = ({
  leadId,
  onDelete,
  isDeleting,
  showActions,
  onToggleActions,
}) => {
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex-shrink-0 relative dropdown-container ml-3">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleActions();
        }}
        className="p-1.5 rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
        aria-label="Lead options"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M12 5v.01V5zm0 7v.01V12zm0 7v.01V19zm0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {showActions && (
        <div
          onClick={handleMenuClick}
          className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50"
          style={{
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(leadId);
            }}
            disabled={isDeleting}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            {isDeleting ? (
              <div className="flex items-center">
                <div
                  className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full mr-2"
                  style={safariStyles.loadingSpinner}
                />
                Deleting...
              </div>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Lead
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
