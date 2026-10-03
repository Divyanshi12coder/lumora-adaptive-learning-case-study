/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { 50: "#FFFDF7", 100: "#FFF9EA", 200: "#FFF2CC", 300: "#FFE7A3", 400: "#F8D570", 500: "#E9B949", 600: "#A0711C" },
        maroon: {
          50: "#FBF2F3", 100: "#F4DCE0", 200: "#E6B5BC", 300: "#CF8591", 400: "#AE4F5E",
          500: "#8E2F3F", 600: "#772233", 700: "#5F1A29", 800: "#46121E", 900: "#2C0B13", 950: "#1C070C",
        },
        sand: { 50: "#FAF7F2", 100: "#F2ECE3", 200: "#E5DCCF", 300: "#CDC0AF", 400: "#A39584", 500: "#76695C", 600: "#5A4F45" },
        cocoa: { DEFAULT: "#3A1F1C", soft: "#5B3A35" },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Lexend", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(58,31,28,0.06), 0 8px 24px -12px rgba(58,31,28,0.18)",
        lift: "0 2px 4px rgba(58,31,28,0.06), 0 24px 48px -20px rgba(119,34,51,0.38)",
        glow: "0 0 0 6px rgba(248,213,112,0.35)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        dash: { to: { strokeDashoffset: "-40" } },
        spinslow: { to: { transform: "rotate(360deg)" } },
        pulseglow: { "0%,100%": { opacity: "0.45" }, "50%": { opacity: "0.9" } },
        gradient: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        dash: "dash 1.6s linear infinite",
        "spin-slow": "spinslow 60s linear infinite",
        "spin-slower": "spinslow 90s linear infinite reverse",
        orbit: "spinslow 140s linear infinite",
        "orbit-rev": "spinslow 140s linear infinite reverse",
        pulseglow: "pulseglow 3.5s ease-in-out infinite",
        gradient: "gradient 12s ease infinite",
      },
    },
  },
  plugins: [],
};
