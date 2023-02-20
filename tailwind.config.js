/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './stories/**/*.{js,ts,jsx,tsx}',
    './apps/metrics/pages/**/*.{js,ts,jsx,tsx}',
    './apps/metrics/components/**/*.{js,ts,jsx,tsx}',
    './apps/metrics/hocs/**/*.{js,ts,jsx,tsx}',
    './apps/metrics/utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
