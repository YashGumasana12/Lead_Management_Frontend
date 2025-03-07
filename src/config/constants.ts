const getBackendUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  // Default to localhost in development
  return process.env.NODE_ENV === 'production' 
    ? 'https://lead-management-backend-psi.vercel.app/api'  // Your actual Vercel backend URL
    : 'http://localhost:5000/api';
};

export const BACKEND_URL = getBackendUrl();

// Add other common configuration values here
export const API_ENDPOINTS = {
  LEADS: `${BACKEND_URL}/leads`,
  LEAD: (id: string) => `${BACKEND_URL}/leads/${id}`,
} as const; 