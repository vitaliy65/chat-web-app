module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Убедитесь, что пути к вашим файлам указаны правильно
  ],
  theme: {
    extend: {
      colors: {
        channels: 'var(--channelsBackground)',
        friends: 'var(--friendsBackground)',
        main: 'var(--mainBackground)',
      },
    },
  },
  plugins: [],
};
