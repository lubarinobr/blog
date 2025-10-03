/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Charter', 'Georgia', 'serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            fontSize: '1.125rem',
            lineHeight: '1.75',
            h1: {
              fontSize: '2.5rem',
              fontWeight: '700',
              lineHeight: '1.2',
              marginTop: '3rem',
              marginBottom: '2rem',
            },
            h2: {
              fontSize: '2.25rem',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '3rem',
              marginBottom: '1.5rem',
            },
            h3: {
              fontSize: '1.875rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            p: {
              marginTop: '0',
              marginBottom: '2rem',
              fontSize: '1.25rem',
              lineHeight: '1.8',
            },
            strong: {
              fontWeight: '600',
              color: '#111827',
            },
            blockquote: {
              borderLeftWidth: '4px',
              borderLeftColor: '#3b82f6',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              color: '#6b7280',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontSize: '1.125rem',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              overflowX: 'auto',
            },
            ul: {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            ol: {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            li: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              fontSize: '1.25rem',
              lineHeight: '1.8',
            },
          },
        },
        dark: {
          css: {
            color: '#d1d5db',
            h1: {
              color: '#ffffff',
            },
            h2: {
              color: '#ffffff',
            },
            h3: {
              color: '#ffffff',
            },
            strong: {
              color: '#ffffff',
            },
            blockquote: {
              color: '#9ca3af',
            },
            code: {
              backgroundColor: '#374151',
              color: '#e5e7eb',
            },
            pre: {
              backgroundColor: '#374151',
              color: '#e5e7eb',
            },
          },
        },
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
