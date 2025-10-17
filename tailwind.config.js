/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}"
  ],
  theme: {
      colors: {
        bg: {
          from: "var(--color-bg-from)",
          via: "var(--color-bg-via)",
          to: "var(--color-bg-to)",
        },
        custom: {
          red: "var(--color-custom-red)",
          brown: "var(--color-custom-brown)",
          orange: "var(--color-custom-orange)",
          text: "var(--color-custom-text)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        card: {
          bg: "var(--color-card-bg)",
        },
        tag: {
          bg: "var(--color-tag-bg)",
        },
        border: {
          light: "var(--color-border-light)",
          dark: "var(--color-border-dark)",
        },
        shadow: {
          green: "var(--color-shadow-green)",
        },
        light: {
          hover: "var(--color-light-hover)",
        },
      },
 
  },
  plugins: [],
};
