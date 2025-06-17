/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#0ea5e9',
        'cyber-cyan': '#06b6d4',
        background: '#ffffff',
        foreground: '#020817',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#2563eb',
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#f8fafc',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#1e293b',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#f8fafc',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#1e293b',
        },
      },
    },
  },
  plugins: [],
}
