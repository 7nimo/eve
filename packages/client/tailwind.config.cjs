/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        'background': '#282c34',
        'foreground': '#bbc2cf',
        'normal-black':   '#1c1f24',
        'normal-red':     '#ff6c6b',
        'normal-green':   '#98be65',
        'normal-yellow':  '#da8548',
        'normal-blue':    '#51afef',
        'normal-magenta': '#c678dd',
        'normal-cyan':    '#5699af',
        'normal-white':   '#202328',
        'bright-black':   '#5b6268',
        'bright-red':     '#da8548',
        'bright-green':   '#4db5bd',
        'bright-yellow':  '#ecbe7b',
        'bright-blue':    '#3071db',
        'bright-magenta': '#a9a1e1',
        'bright-cyan':    '#46d9ff',
        'bright-white':   '#dfdfdf',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
