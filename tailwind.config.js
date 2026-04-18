/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary":          "#0369a1",
          "primary-content":  "#ffffff",
          "secondary":        "#0891b2",
          "secondary-content":"#ffffff",
          "accent":           "#10b981",
          "accent-content":   "#ffffff",
          "neutral":          "#1e3a5f",
          "neutral-content":  "#e2e8f0",
          "base-100":         "#f8fafc",
          "base-200":         "#f1f5f9",
          "base-300":         "#e2e8f0",
          "base-content":     "#1e293b",
          "info":             "#3b82f6",
          "info-content":     "#ffffff",
          "success":          "#22c55e",
          "success-content":  "#ffffff",
          "warning":          "#f59e0b",
          "warning-content":  "#1e293b",
          "error":            "#ef4444",
          "error-content":    "#ffffff",
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        'white-transparent': '#ffffff29',
      },
    }
  }
}
