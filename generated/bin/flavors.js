export const core = {
    name: 'Core',
    package: '@vue-js-cron/core',
    dir: 'core',
    component: 'CronCore',
};
export const light = {
    name: 'Light',
    package: '@vue-js-cron/light',
    dir: 'light',
    css: '@vue-js-cron/light/dist/light.css',
    component: 'CronLight',
};
export const ant = {
    name: 'Ant',
    package: '@vue-js-cron/ant',
    dir: 'ant',
    css: '@vue-js-cron/ant/dist/ant.css',
    component: 'CronAnt',
    uses: { 'ant-design-vue': ['default'] },
    // imports: ['ant-design-vue/dist/antd.dark.css'],
};
export const element = {
    name: 'Element Plus',
    package: '@vue-js-cron/element-plus',
    dir: 'element-plus',
    css: '@vue-js-cron/element-plus/dist/element-plus.css',
    component: 'CronElementPlus',
    uses: { 'element-plus': ['default'] },
    imports: ['element-plus/dist/index.css'],
};
export const quasar = {
    name: 'Quasar',
    package: '@vue-js-cron/quasar',
    dir: 'quasar',
    component: 'CronQuasar',
    uses: { quasar: ['Quasar'] },
    imports: ['quasar/src/css/index.sass', '@quasar/extras/material-icons/material-icons.css'],
};
export const vuetify = {
    name: 'Vuetify',
    package: '@vue-js-cron/vuetify',
    dir: 'vuetify',
    css: '@vue-js-cron/vuetify/dist/vuetify.css',
    component: 'CronVuetify',
    imports: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
    setup: async (app) => {
        const { createVuetify } = await import('vuetify');
        const components = await import('vuetify/components');
        const directives = await import('vuetify/directives');
        const vuetify = createVuetify({
            components,
            directives,
            ssr: true,
        });
        app.use(vuetify);
    },
};
export const flavors = [core, light, vuetify, element, ant, quasar];
//# sourceMappingURL=flavors.js.map