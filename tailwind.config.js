/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        washi: '#F7F1E5',
        paper: '#FBF8F1',
        sumi: '#1F1B18',
        'ink-muted': '#5F5750',
        gold: '#C9A646',
        indigo: '#243B53',
        vermilion: '#B14A36',
      },
      backgroundColor: {
        washi: '#F7F1E5',
        paper: '#FBF8F1',
      },
      textColor: {
        sumi: '#1F1B18',
        'ink-muted': '#5F5750',
      },
      borderColor: {
        line: 'rgba(31, 27, 24, 0.12)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(31, 27, 24, 0.08)',
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '21': '5.25rem',
        '34': '8.5rem',
        '55': '13.75rem',
        '89': '22.25rem',
      },
      lineHeight: {
        'relaxed-jp': '1.618',
      },
    },
  },
  plugins: [],
}
