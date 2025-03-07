"use client";

import React, { useEffect } from "react";
import { useLeadContext } from "../context/LeadContext";
import { useLeadActions } from "../hooks/useLeadActions";
import { LeadCard } from "./ui/LeadCard/LeadCard";
import { api } from "../services/api";

export const LeadList: React.FC = () => {
  const { leads, isLoading, error, refetchLeads } = useLeadContext();
  const {
    editingId,
    updatingId,
    deletingId,
    showActionsId,
    handleStatusChange,
    handleDelete,
    toggleActions,
    setShowActionsId,
  } = useLeadActions(
    async (id, data) => {
      await api.leads.update(id, data);
      await refetchLeads(); // Refresh the list after update
    },
    async (id) => {
      await api.leads.delete(id);
      await refetchLeads(); // Refresh the list after delete
    }
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setShowActionsId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowActionsId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 rounded-lg bg-red-50">
        {error}
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        No leads found. Start by adding a new lead.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leads.map((lead, index) => (
        <LeadCard
          key={lead._id || `lead-${index}`}
          lead={lead}
          index={index}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          isUpdating={updatingId === lead._id}
          isDeleting={deletingId === lead._id}
          showActions={showActionsId === lead._id}
          onToggleActions={() => toggleActions(lead._id!)}
        />
      ))}
    </div>
  );
};
