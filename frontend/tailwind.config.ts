// frontend/tailwind.config.ts
import { defineConfig } from 'tailwindcss'

export default defineConfig({
  // darkMode: 'selector', // replaces 'class'
  theme: {
    // define tokens directly
    colors: {
      primary: '#3b82f6',
      surface: '#ffffff',
      background: '#f9fafb',
      border: '#e5e7eb',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Poppins', 'sans-serif'],
    },
    boxShadow: {
      soft: '0 2px 10px rgba(0,0,0,0.05)',
    },
    borderRadius: {
      xl: '1rem',
    },
  },

  // Built-in plugin short-form
  plugins: {
    forms: true,
    typography: true,
    aspectRatio: true,
  },

  // content scanning is automatic in v4
})
