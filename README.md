# Lead Management System - Frontend

A modern React application for managing leads.

## Quick Start 🚀

1. Install dependencies:

```bash
npm i
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Important Notes ⚠️

- Make sure the backend server is running first (see backend README)
- Backend should be running on port 5000

## Features ✨

- Create and manage leads
- Real-time form validation
- Responsive design
- Status management
- Email validation

## Prerequisites

- Node.js 16.x or later
- npm or yarn package manager
- Backend server running (see backend README)

## Configuration

1. Make sure the backend URL is correctly set in `src/config/constants.ts`:
   ```typescript
   export const BACKEND_URL = "http://localhost:5000/api";
   ```
   Adjust this URL if your backend is running on a different port.

## Project Structure

```
frontend/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── context/      # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API services
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── public/           # Static files
└── package.json      # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Browser Support

The application supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Make sure the backend server is running before starting the frontend
- The application uses environment variables for configuration
- For development, the application expects the backend to be running on port 5000
