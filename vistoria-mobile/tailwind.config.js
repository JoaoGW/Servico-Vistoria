/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        vistoria: {
          fundo: 'rgb(var(--color-vistoria-fundo) / <alpha-value>)',
          superficie: 'rgb(var(--color-vistoria-superficie) / <alpha-value>)',
          titulo: 'rgb(var(--color-vistoria-titulo) / <alpha-value>)',
          marca: 'rgb(var(--color-vistoria-marca) / <alpha-value>)',
          'marca-pressionada': 'rgb(var(--color-vistoria-marca-pressionada) / <alpha-value>)',
          auxiliar: 'rgb(var(--color-vistoria-auxiliar) / <alpha-value>)',
          borda: 'rgb(var(--color-vistoria-borda) / <alpha-value>)',
        },
        typography: {
          700: 'rgb(var(--color-typography-700) / <alpha-value>)',
        },
        indicator: {
          info: 'rgb(var(--color-indicator-info) / <alpha-value>)',
        },
      },
      fontFamily: {
        body: undefined,
      },
    },
  },
}
