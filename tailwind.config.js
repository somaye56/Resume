/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx,css}"
  ],
  theme: {
    extend: {
      colors: {
        // پس‌زمینه
        "bg-from": "#D6A99D",
        "bg-via": "#FFF2EF",
        "bg-to": "#ADB2D4",
        "custom-red": "#AF3E3E",
        "custom-brown": "#DA6C6C",

        // متنی
        "text-primary": "#324E2B",
        "text-secondary": "#71543A",
        "text-muted": "#463d3b",

        "card-bg": "#896C6C1A",
        "tag-bg": "#FFF58A80",

        "border-light": "#C9D3C2",
        "border-dark": "#463d3b",
        "shadow-green": "#A2AF9B",
      },
    },

  },
  plugins: [],
};
