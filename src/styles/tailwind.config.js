module.exports = { content: ['./src/**/*.{js,jsx}'], theme: { extend: {} }, plugins: [] };

module.exports = {
    content: [
      './index.html',
      './src/**/*.{html,js,jsx,ts,tsx}', // Add other directories where Tailwind classes might be used
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }

module.exports = {
    content: [
      "./src/**/*.{html,js}", // Adjust based on your project structure
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1D4ED8', // Custom blue
        },
      },
    },
    plugins: [],
  }
  
  