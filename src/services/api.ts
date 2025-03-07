import { Lead } from "../types/lead";
import { API_ENDPOINTS } from "../config/constants";

class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "APIError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new APIError(`API Error: ${errorText}`, response.status);
  }
  return response.json();
}

export const api = {
  leads: {
    getAll: async (): Promise<Lead[]> => {
      const response = await fetch(API_ENDPOINTS.LEADS);
      return handleResponse<Lead[]>(response);
    },

    create: async (data: Partial<Lead>): Promise<Lead> => {
      const response = await fetch(API_ENDPOINTS.LEADS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse<Lead>(response);
    },

    update: async (id: string, data: Partial<Lead>): Promise<Lead> => {
      const response = await fetch(API_ENDPOINTS.LEAD(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse<Lead>(response);
    },

    delete: async (id: string): Promise<void> => {
      const response = await fetch(API_ENDPOINTS.LEAD(id), {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new APIError(`Failed to delete lead: ${errorText}`, response.status);
      }
    },
  },
}; 