import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D9251D',
          yellow: '#FFC72C',
          dark: '#1A1A1A',
          light: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

