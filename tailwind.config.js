import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"], // Include MDX files
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        search: "var(--bg-search)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        card: "var(--card-bg)",
        hover: "var(--hover)",
      },
      postBackgrounds: {
        pokemon: "url('/images/backgrounds/post-background/pokemon.jpg')",
      },
    },
  },
  plugins: [typography], // Correct ES6 import
};
