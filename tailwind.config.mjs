import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
              primary:  '#FFFFFF',
              secondary: '#F7931D',
              accent: '#EC008B'
            },
            fontFamily: {
                // Für Überschriften: Montserrat
                headline: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
                // Für Fließtext: Roboto
                body: ['"Roboto"', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(90deg, #F7931D 0%, #EC008B 33%, #91268F 66%, #2A388F 100%)',
            }
        },
    },
    plugins: [],
};