'use client';

import { useState, useCallback } from 'react';
import { Lead } from '../types/lead';

export const useLeadActions = (
  onUpdateLead: (id: string, data: Partial<Lead>) => Promise<void>,
  onDeleteLead: (id: string) => Promise<void>
) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<Lead["status"] | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showActionsId, setShowActionsId] = useState<string | null>(null);

  const handleStatusChange = useCallback(async (id: string, newStatus: Lead["status"]) => {
    setEditingId(id);
    setEditStatus(newStatus);
    setUpdatingId(id);

    try {
      await onUpdateLead(id, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setEditingId(null);
      setEditStatus(null);
      setUpdatingId(null);
    }
  }, [onUpdateLead]);

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setDeletingId(id);
      try {
        await onDeleteLead(id);
      } catch (error) {
        console.error("Error deleting lead:", error);
      } finally {
        setDeletingId(null);
      }
    }
  }, [onDeleteLead]);

  const toggleActions = useCallback((id: string) => {
    setShowActionsId(prev => prev === id ? null : id);
  }, []);

  return {
    editingId,
    editStatus,
    updatingId,
    deletingId,
    showActionsId,
    handleStatusChange,
    handleDelete,
    toggleActions,
    setShowActionsId,
  };
}; 