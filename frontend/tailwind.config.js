/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0A66C2',
                secondary: '#FFFFFF',
                dark: '#1e1e1e',
                background: '#faf9f9',
            },
        },
    },
    plugins: [],
};