import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          green: '#1a3c34',
        },
        gold: {
          accent: '#c5a059',
        },
        soft: {
          white: '#ffffff',
        },
        text: {
          dark: '#2c2c2c',
          mid: '#444',
          light: '#777',
        },
        bg: {
          light: '#fdfdfd',
        },
        green: {
          mid: '#2d6a35',
          light: '#4a9b52',
          pale: '#c8e6ca',
          mist: '#f0f7f0',
        },
        warm: {
          white: '#ffffff',
        },
        brown: '#5c3d1e',
        border: 'rgba(45,106,53,0.15)',
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2d6a35 0%, #1a3a1f 60%, #0d2410 100%)',
      },
    },
  },
  plugins: [],
}
export default config
