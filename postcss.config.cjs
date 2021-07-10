const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    !dev && require('cssnano')({ preset: 'default' }),
  ],
};
