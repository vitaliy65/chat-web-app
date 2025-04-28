/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        channels: 'var(--channelsBackground)',
        friends: 'var(--friendsBackground)',
        friend_list_bg: 'var(--friendListBackground)',
        main: 'var(--mainBackground)',
        mainText: 'var(--mainText)',
      },
    },
  },
  plugins: [],
};
