/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blueColor: '#5870D2',
        primaryColor: '#D25858',
        tealColor: '#047C6F',
        textColor: '#4C4F4E',
        errorColor: '#ff4d4f',
        orange: '#fed8b1',
        menuColor: '#697374',
        lightTextColor: '#BEC2C1',
        lightBlueColor: '#E9F1FA',
        dashboardCardColor: '#FBFDFF',
        whiteColor: '#fff',
        fadedTealColor: '#81bdb6',
        borderColor: '#cecdd3',
        lightTealColor: '#EBF7F6',
        skylightBlueColor: '#3B82F6',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      fontSize: {
        body: '1.6rem',
        bodyMedium: '1.8rem',
        smallBody: '1.4rem',
        subHeading: '3.0rem',
        smallSubHeading: '2.0rem',
        subHeading2: '2.4rem',
        tabs: '1.6rem',
        heading: '4.0rem',
      },
    },
  },
  plugins: [],
};
