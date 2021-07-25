module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    // purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}

// tailwind.config.js
// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter var', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   // ...
// }

// module.exports = {
//     mode: "jit", // < ------------add this for immediate compile
//     purge: ["./src/**/*.html", "./src/**/*.js"], // < --- give here your source files
//     darkMode: false, // or 'media' or 'class'
//     theme: {
//         extend: {},
//     },
//     variants: {
//         extend: {},
//     },
//     plugins: [],
// };