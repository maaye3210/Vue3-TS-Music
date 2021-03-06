module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                '112': '28rem',
                '128': '32rem',
                '144': '36rem',
            },
            important: true,
        },
    },
    plugins: [],
}
