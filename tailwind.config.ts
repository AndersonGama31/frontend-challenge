import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-dark': 'var(--background-dark)',
        'background': 'var(--background)',
        'destructive': 'var(--destructive)',
        'dark': 'var(--dark)',
        'border': 'var(--border)',
        'pink': 'var(--pink)',
        'light-pink': 'var(--light-pink)',
        'light-gray': 'var(--light-gray)',
      },
      borderRadius: {
        'radius-4': 'var(--radius-4)',
        'radius-8': 'var(--radius-8)',
        'radius-10': 'var(--radius-10)',
        'radius-30': 'var(--radius-30)',
        'radius-70': 'var(--radius-70)',
        'radius-100': 'var(--radius-100)',
      },
      lineHeight: {
        sm: 'var(--line-height-sm)',
        base: 'var(--line-height-base)',
        md: 'var(--line-height-md)',
        lg: 'var(--line-height-lg)',
        xl: 'var(--line-height-xl)', 
      },
      breakpoints: {
        sm: 'var(--breakpoint-sm)',
        md: 'var(--breakpoint-md)',
        lg: 'var(--breakpoint-lg)',
        xl: 'var(--breakpoint-xl)',
      }
    },
  },
  plugins: [],
};
export default config;
