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
      colors: {
        'custom-green': '#C1FD35', // Color para el botón Crear cuenta
        'custom-hover-green': '#A0E529', // Color para el hover del botón Crear cuenta
        'backgroundNavbar' : '#201F22',
        'backgroundFooter' : '#3A393E',

      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        '2xl': '44px',
        xl: '26px',
        lg: '22px',
        md: '18px',
        sm: '16px',
        xs: '14px',
      },
    },
  },
  plugins: [],

};
export default config;
