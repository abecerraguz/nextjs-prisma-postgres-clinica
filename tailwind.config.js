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

          "primary": "#0284c7",
          "secondary": "#06b6d4",     
          "accent": "#fbbf24",     
          "neutral": "#1f2937",        
          "base-100": "#374151",  
          "info": "#e0e7ff",  
          "success": "#67e8f9",   
          "warning": "#fef08a",    
          "error": "#e11d48",

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
