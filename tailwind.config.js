/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        "light-bg": "#ffffff",
        "light-bg-secondary": "#f5f5f5",
        "light-text": "#1a1a1a",
        "light-text-secondary": "#666666",
        "light-border": "#e0e0e0",
        "light-card": "#ffffff",

        // Dark mode colors
        "dark-bg": "#0b1024",
        "dark-bg-secondary": "#141b33",
        "dark-text": "#eef0f6",
        "dark-text-secondary": "#a8afc9",
        "dark-border": "#212947",
        "dark-card": "#1a2342",
      },
      transitionDuration: {
        theme: "300ms",
      },
    },
  },
  plugins: [],
};
