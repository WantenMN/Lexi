/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        container: "840px",
      },
      width: {
        container: "840px",
      },
    },
  },
  plugins: [],
};
