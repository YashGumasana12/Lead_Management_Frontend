"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Lead } from "../types/lead";
import { api } from "../services/api";

interface LeadContextType {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  isLoading: boolean;
  error: string | null;
  refetchLeads: () => Promise<void>;
  createLead: (data: Partial<Lead>) => Promise<Lead>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const useLeadContext = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeadContext must be used within a LeadProvider");
  }
  return context;
};

interface LeadProviderProps {
  children: React.ReactNode;
}

// Helper function to parse API error messages
const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    try {
      const parsedError = JSON.parse(error.message);
      if (parsedError.message) {
        if (parsedError.message.includes("email already exists")) {
          return "A lead with this email address already exists";
        }
        return parsedError.message;
      }
    } catch {
      // If JSON parsing fails, use the original error message
      return error.message;
    }
  }
  return "An unexpected error occurred";
};

export const LeadProvider: React.FC<LeadProviderProps> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching leads from backend...");
      const data = await api.leads.getAll();
      console.log("Fetched leads:", data);
      setLeads(data);
    } catch (err) {
      console.error("Error fetching leads:", err);
      const errorMessage = parseErrorMessage(err);
      setError(errorMessage);
      setLeads([]); // Reset leads on error
    } finally {
      setIsLoading(false);
    }
  };

  const createLead = async (data: Partial<Lead>) => {
    try {
      console.log("Creating new lead:", data);
      const newLead = await api.leads.create(data);
      console.log("Created lead:", newLead);

      // Update the leads list with the new lead at the beginning
      setLeads((currentLeads) => [newLead, ...currentLeads]);

      return newLead;
    } catch (err) {
      console.error("Error creating lead:", err);
      const errorMessage = parseErrorMessage(err);
      throw new Error(errorMessage); // Re-throw with user-friendly message
    }
  };

  // Initial fetch
  useEffect(() => {
    console.log("LeadProvider mounted, fetching leads...");
    fetchLeads();
  }, []);

  const value = {
    leads,
    setLeads,
    isLoading,
    error,
    refetchLeads: fetchLeads,
    createLead,
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};
