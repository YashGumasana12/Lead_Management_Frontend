'use client';

import { useCallback } from 'react';
import { useLeadContext } from '../context/LeadContext';
import { Lead } from '../types/lead';

export const useLeadValidation = () => {
  const { leads } = useLeadContext();

  const isDuplicateEmail = useCallback(
    (email: string, currentLeadId?: string) => {
      return leads.some(
        (lead: Lead) =>
          lead.email.toLowerCase() === email.toLowerCase() &&
          lead._id !== currentLeadId
      );
    },
    [leads]
  );

  return {
    isDuplicateEmail,
  };
}; 