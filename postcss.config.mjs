// postcss.config.mjs
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: {
    '@tailwindcss/postcss': {
      // এই কনফিগারেশনটি যোগ করুন
      config: {
        content: [
          './pages/**/*.{js,ts,jsx,tsx,mdx}',
          './components/**/*.{js,ts,jsx,tsx,mdx}',
          './app/**/*.{js,ts,jsx,tsx,mdx}', // <-- এই লাইনটি সবচেয়ে গুরুত্বপূর্ণ
          './src/**/*.{js,ts,jsx,tsx,mdx}',
        ],
      },
    },
  },
}