/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGray: {
          50: "#F5F6F9",
        },
      },
    },
  },
  keyframes: {
    float: {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-5%)" },
    },
    bounce: {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-2%)" },
    }
  },
  animation: {
    float: "float 2s ease-in-out infinite",
    bubble: "float 3s ease-in-out infinite",
    bounce: "bounce 3s infinite",
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};

