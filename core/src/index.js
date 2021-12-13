// Import vue component
import util from './util'
import locale from './locale'
import component from './core.vue';

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('CronCore', component);
}

// Create module definition for Vue.use()
const plugin = {
	install,
	component,
	util,
	locale
};

// Auto-install when vue is found (eg. in browser via <script> tag)
/*let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}*/

// To allow use as module (npm/webpack/etc.) export component
export default plugin;