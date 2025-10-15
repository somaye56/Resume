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
 
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1100px",
        },
        
      },
      colors: {
        // رنگ‌های اصلی پس‌زمینه
        "bg-from": "#D6A99D",
        "bg-via": "#FFF2EF",
        "bg-to": "#ADB2D4",
        "custom-red": "#AF3E3E",
        "custom-brown": "#DA6C6C",

        //  رنگ‌های متنی
        "text-primary": "#324E2B",
        "text-secondary": "#71543A",
        "text-muted": "#463d3b",


        "card-bg": "#896C6C1A",
        "tag-bg": "#FFF58A80",


        "border-light": "#C9D3C2",
        "border-dark": "#463d3b",
        "shadow-green": "#A2AF9B",

    
      },
      
      backgroundImage: {
        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)",
      },
      
    },

  },
  plugins: [],
};
