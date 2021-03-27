const sveltePreprocess = require('svelte-preprocess');
const vercel = require('@sveltejs/adapter-vercel');
const pkg = require('./package.json');
const { resolve } = require("path");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  preprocess: [
    sveltePreprocess({
      defaults: {
        style: 'postcss'
      },
      postcss: true
    })
  ],
  kit: {
    adapter: vercel(),
    target: '#svelte', // hydrate the <div id="svelte"> element in src/app.html
    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {})
      },
      resolve: {
        alias: {
          $components: resolve(__dirname, './src/components'),
          $stores: resolve(__dirname, './src/stores')
        }
      }
    }
  }
};
