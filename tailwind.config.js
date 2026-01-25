/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1e40af", // Deep blue for better visibility
                "background-light": "#f8fafc",
                "background-dark": "#0f172a",
            },
            fontFamily: {
                display: ["Inter", "Noto Sans JP", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "12px",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
    darkMode: "class",
}
