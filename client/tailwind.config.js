/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        primaryBlack: '#181818',
        secondaryBlack: '#1E1E1E',
        primaryWhite: '#CBE4DE',
        primaryGreen: '#538787'
      },
    },
  },
  plugins: [],
}
