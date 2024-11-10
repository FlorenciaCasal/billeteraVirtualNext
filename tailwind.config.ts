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
        'fondo-home-mobile': "url('/img/fondoHomeMobile.png')",
      },
      screens: {
        'xs': '375px', 
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
      'mlg': '22px',
      'mmlg': '24px',
      xl: '27px',
      'mxl': '28px',
      'mmxl': '30px',
      '2xl': '34px',
      'm2xl': '38px',
      '3xl': '40px',
      'm3xl': '42px',
      '4xl': '48px',
    },
  },
  },
  plugins: [],

};
export default config;
