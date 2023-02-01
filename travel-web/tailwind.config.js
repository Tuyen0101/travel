module.exports = {
  content: [
    "./projects/travel/src/**/*.{html,ts}",
    "./projects/admin/src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
