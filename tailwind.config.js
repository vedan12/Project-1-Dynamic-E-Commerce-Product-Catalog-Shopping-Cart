/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          50: '#f7f6f3',
          100: '#edebe5',
          200: '#dcd8cc',
          300: '#c0bba8',
          400: '#9b937a',
          500: '#7a7159',
          600: '#5e5644',
          700: '#464035',
          800: '#2e2a22',
          900: '#1b1813',
          950: '#100e0b',
        },
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        sand: {
          50: '#faf8f3',
          100: '#f4efe2',
          200: '#e9e0c9',
          300: '#dacca8',
          400: '#c7b184',
          500: '#b39a68',
        },
        warning: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,14,11,0.04), 0 8px 24px -12px rgba(16,14,11,0.12)',
        'card-hover': '0 4px 8px rgba(16,14,11,0.06), 0 20px 40px -16px rgba(16,14,11,0.22)',
        drawer: '-24px 0 60px -24px rgba(16,14,11,0.4)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'slide-in': 'slide-in 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        'pop': 'pop 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
