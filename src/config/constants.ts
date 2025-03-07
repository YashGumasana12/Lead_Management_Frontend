export const BACKEND_URL = "http://localhost:5000/api";

// Add other common configuration values here
export const API_ENDPOINTS = {
  LEADS: `${BACKEND_URL}/leads`,
  LEAD: (id: string) => `${BACKEND_URL}/leads/${id}`,
} as const; 