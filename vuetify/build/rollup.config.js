import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import css from 'rollup-plugin-css-only'
export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'vuetify',
        exports: 'named',
    },
    plugins: [
        css(),
        vue({
            css: false, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        commonjs(),
        /*buble({
            objectAssign: 'Object.assign',
            transforms: {
                forOf: false
            }
        }), // Transpile to ES5*/
    ],
};