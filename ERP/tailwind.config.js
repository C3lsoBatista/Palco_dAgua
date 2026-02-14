import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                inter: ['Inter', 'sans-serif'],
            },
        },
    },

    plugins: [
        forms,
        // Ensina o Tailwind a ler a classe "sidebar-expanded" no Body
        plugin(({ addVariant, e }) => {
            addVariant('sidebar-expanded', ':merge(.sidebar-expanded) &');
        }),
    ],
};