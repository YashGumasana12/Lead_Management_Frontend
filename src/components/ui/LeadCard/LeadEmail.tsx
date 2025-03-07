import React from "react";
import { useLeadValidation } from "../../../hooks/useLeadValidation";

interface LeadEmailProps {
  email: string;
  leadId: string;
}

export const LeadEmail: React.FC<LeadEmailProps> = ({ email, leadId }) => {
  const { isDuplicateEmail } = useLeadValidation();
  const isDuplicate = isDuplicateEmail(email, leadId);

  return (
    <div className="flex items-center mt-1 text-gray-500">
      <svg
        className="w-4 h-4 mr-1.5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <a
        href={`mailto:${email}`}
        className={`text-sm hover:text-blue-600 transition-colors truncate ${
          isDuplicate ? "text-red-500 font-medium" : ""
        }`}
        title={isDuplicate ? "Duplicate email detected" : undefined}
      >
        {email}
        {isDuplicate && (
          <span className="ml-2 text-xs text-red-500">(Duplicate)</span>
        )}
      </a>
    </div>
  );
};
