// This file centralizes the API URL configuration.
// It uses Vite's environment variables to switch between development and production.

// In development (`npm run dev`), import.meta.env.PROD will be false.
// In production (`npm run build`), import.meta.env.PROD will be true.

const isProd = import.meta.env.PROD || window.location.hostname !== "localhost";

export const API_URL = isProd
  ? "https://goayellowpages.onrender.com"
  : "http://localhost:5001";
