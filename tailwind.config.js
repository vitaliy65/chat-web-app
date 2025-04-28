/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
