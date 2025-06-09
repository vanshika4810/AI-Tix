/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#2563eb",
          dark: "#3b82f6",
        },
        secondary: {
          light: "#4b5563",
          dark: "#94a3b8",
        },
        background: {
          light: "#f4f5f7",
          dark: "#111827",
        },
        surface: {
          light: "#e5e7eb",
          dark: "#1f2937",
        },
        "role-user": {
          light: "#22c55e",
          dark: "#4ade80",
        },
        "role-moderator": {
          light: "#eab308",
          dark: "#facc15",
        },
        "role-admin": {
          light: "#ef4444",
          dark: "#f87171",
        },
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
