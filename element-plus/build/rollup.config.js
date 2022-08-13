import commonjs from '@rollup/plugin-commonjs' // Convert CommonJS modules to ES6
import css from 'rollup-plugin-css-only'
import vue from 'rollup-plugin-vue' // Handle .vue SFC files
export default {
  input: 'src/index.js', // Path relative to package.json
  output: {
    name: 'element_plus',
    exports: 'named'
  },
  plugins: [
    css({
      output: 'element-plus.css'
    }),
    vue({
      css: false, // Dynamically inject css as a <style> tag
      compileTemplate: false // Explicitly convert template to render function
    }),
    commonjs()
  ]
}
