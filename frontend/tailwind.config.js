/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#007AFF',  // Синий для кнопок (как в iOS)
          secondary: '#34C759',  // Зеленый для доступных дат
          booked: '#FF3B30',  // Красный для забронированных
          pending: '#FFCC00',  // Желтый для pending
          neutral: '#F5F5F5',  // Фон
        },
        fontFamily: {
          body: ['Inter', 'sans-serif'],  // Шрифт как в Figma
        },
        borderRadius: {
          button: '8px',  // Скругленные углы для кнопок
        },
        boxShadow: {
          button: '0 2px 4px rgba(0,0,0,0.1)',  // Тень для кнопок
        },
      },
    },
    plugins: [],
  };