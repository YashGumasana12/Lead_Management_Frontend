import React from "react";
import { Lead } from "../../../types/lead";
import { LeadStatus } from "./LeadStatus";
import { safariStyles } from "../../../utils/animations";
import { LeadActions } from "./LeadActions";
import { LeadEmail } from "./LeadEmail";

interface LeadCardProps {
  lead: Lead;
  index: number;
  onStatusChange: (id: string, status: Lead["status"]) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isUpdating: boolean;
  isDeleting: boolean;
  showActions: boolean;
  onToggleActions: () => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  index,
  onStatusChange,
  onDelete,
  isUpdating,
  isDeleting,
  showActions,
  onToggleActions,
}) => {
  return (
    <div
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out overflow-hidden"
      style={safariStyles.cardAnimation(index)}
    >
      <div className="p-5 border-b border-gray-50">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 truncate">
              {lead.name}
            </h3>
            <LeadEmail email={lead.email} leadId={lead._id!} />
          </div>

          <LeadActions
            leadId={lead._id!}
            onDelete={onDelete}
            isDeleting={isDeleting}
            showActions={showActions}
            onToggleActions={onToggleActions}
          />
        </div>
      </div>

      <div className="p-5">
        <LeadStatus
          status={lead.status}
          id={lead._id!}
          onStatusChange={onStatusChange}
          isUpdating={isUpdating}
        />

        <div className="text-sm text-gray-500 flex items-center mt-4">
          <svg
            className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Added on {new Date(lead.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
