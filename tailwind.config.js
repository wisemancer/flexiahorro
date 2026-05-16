/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Colores del tema base — sobreescritos por variables CSS del tenant
        brand: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          surface: 'var(--color-surface)',
          bg: 'var(--color-bg)',
        },
        choco: {
          gold: '#FFD700',
          glow: '#FFA500',
        },
      },
      fontFamily: {
        game: ['var(--font-game)', 'system-ui', 'sans-serif'],
        ui: ['var(--font-ui)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'chest-open': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '30%': { transform: 'scale(1.15) rotate(-3deg)' },
          '60%': { transform: 'scale(1.2) rotate(3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'points-rain': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px var(--color-accent)' },
          '50%': { boxShadow: '0 0 24px var(--color-accent)' },
        },
        hibernate: {
          '0%': { filter: 'saturate(1) brightness(1)' },
          '100%': { filter: 'saturate(0.2) brightness(0.5)' },
        },
        awaken: {
          '0%': { filter: 'saturate(0.2) brightness(0.5)' },
          '100%': { filter: 'saturate(1) brightness(1)' },
        },
      },
      animation: {
        'chest-open': 'chest-open 0.6s ease-in-out',
        'points-rain': 'points-rain 1.2s ease-in-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        hibernate: 'hibernate 1s ease-in-out forwards',
        awaken: 'awaken 1.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
