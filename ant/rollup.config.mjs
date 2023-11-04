import commonjs from '@rollup/plugin-commonjs' // Convert CommonJS modules to ES6
import css from 'rollup-plugin-css-only'
import vue from 'rollup-plugin-vue' // Handle .vue SFC files
export default {
  input: 'src/index.js', // Path relative to package.json
  output: [
    {
      format: 'es',
      file: 'dist/ant.esm.js',
    },
    {
      name: 'CronAnt',
      format: 'umd',
      file: 'dist/ant.umd.js',
      globals: {
        vue: 'Vue',
        '@vue-js-cron/core': 'CronCore',
      },
    },
  ],
  plugins: [
    css({
      output: 'ant.css',
    }),
    vue({
      css: false, // Dynamically inject css as a <style> tag
      compileTemplate: false, // Explicitly convert template to render function
    }),
    commonjs(),
  ],
}
