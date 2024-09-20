import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../public/img/**/*.png",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fondo-home': "url('/img/fondoHome.png')",
      },
      screens: {
        'custom-md': '940px', 
      },
    
    colors: {
      'crearCuentaNavbar': '#C1FD35', 
      'hoverButtonGreen': '#A0E529', 
      'hoverButtonBlack': '#6B7280',
      'backgroundNavbar': '#201F22',
      'backgroundFooter': '#3A393E',
      'crearCuentaLogin': '#CECECE',
      'error': '#DA0000'
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    },
    fontSize: {
      xs: '14px',
      'msj': '15px',
      sm: '16px',
      md: '18px',
      lg: '20px',
      xl: '26px',
      '2xl': '34px',
      '3xl': '40px',
      '4xl': '48px',
      '5xl': '64px'
    },
  },
  },
  plugins: [],

};
export default config;
