import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          deep: '#08050E',
          surface: '#17131D',
          card: '#120B1E'
        },
        gold: {
          metallic: '#D6A937',
          champagne: '#F3E5AB'
        },
        purple: {
          royal: '#7E22CE',
          electric: '#B99AE8',
          lavender: '#B99AE8'
        },
        ivory: '#F7F4EE',
        jgs: {
          canvas: '#08050E',
          plum: '#17131D',
          'plum-deep': '#17131D',
          'plum-surface': '#211B2A',
          'plum-elevated': '#2C2438',
          surface1: '#17131D',
          surface2: '#1E1826',
          surface3: '#261F30',
          gold: '#D6A937',
          goldLight: '#F3E5AB',
          'gold-light': '#F3E5AB',
          goldDark: '#9A7B1C',
          purple: '#7E22CE',
          'purple-light': '#B99AE8',
          'purple-glow': '#D2BDF5',
          lavender: '#B99AE8',
          ivory: '#F3EFF8',
          'ivory-muted': '#B8AFC7',
          'ivory-faint': '#8E84A4',
          secondary: '#BEB6CE',
          muted: '#8E84A4',
          profit: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      boxShadow: {
        'gold-subtle': '0 0 0 1px rgba(212, 175, 55, 0.18), 0 16px 40px -12px rgba(0, 0, 0, 0.75)',
        'gold-glow': '0 0 28px rgba(214, 169, 55, 0.18)',
        'purple-subtle': '0 0 0 1px rgba(168, 130, 221, 0.16), 0 16px 40px -12px rgba(0, 0, 0, 0.75)'
      }
    }
  },
  plugins: []
};

export default config;
