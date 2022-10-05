module.exports = {
    purge: ['./components/**/*.{js,ts,jsx,tsx}', './containers/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}',],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                140: '35rem',
            },
            'min-h': {
                24: '6rem',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
