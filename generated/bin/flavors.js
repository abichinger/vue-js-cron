const core = {
    name: 'Core',
    description: 'renderless cron editor',
    package: '@vue-js-cron/core',
    dir: 'core',
    component: 'CronCore',
    componentHypen: 'cron-core',
    example: '../.vuepress/components/get-started-renderless.vue',
};
const light = {
    name: 'Light',
    description: 'lightweight cron editor without external dependencies',
    package: '@vue-js-cron/light',
    dir: 'light',
    css: '@vue-js-cron/light/dist/light.css',
    component: 'CronLight',
    componentHypen: 'cron-light',
    example: '../.vuepress/components/get-started-light.vue',
};
const ant = {
    name: 'Ant',
    description: 'cron editor for [Ant Design Vue](https://antdv.com/)',
    package: '@vue-js-cron/ant',
    dir: 'ant',
    css: '@vue-js-cron/ant/dist/ant.css',
    component: 'CronAnt',
    componentHypen: 'cron-ant',
    uses: { 'ant-design-vue': ['default'] },
    requirements: [{ name: 'Ant Design Vue', url: 'https://www.antdv.com/components/overview/' }],
    example: '../.vuepress/components/get-started-ant.vue',
};
const element = {
    name: 'Element Plus',
    description: 'cron editor for [Element Plus](https://element-plus.org/en-US/)',
    package: '@vue-js-cron/element-plus',
    dir: 'element-plus',
    css: '@vue-js-cron/element-plus/dist/element-plus.css',
    component: 'CronElementPlus',
    componentHypen: 'cron-element-plus',
    uses: { 'element-plus': ['default'] },
    imports: ['element-plus/dist/index.css'],
    requirements: [{ name: 'Element Plus', url: 'https://element-plus.org/en-US/' }],
    example: '../.vuepress/components/get-started-element.vue',
};
const quasar = {
    name: 'Quasar',
    description: 'cron editor for [Quasar](https://quasar.dev/)',
    package: '@vue-js-cron/quasar',
    dir: 'quasar',
    component: 'CronQuasar',
    componentHypen: 'cron-quasar',
    uses: { quasar: ['Quasar'] },
    imports: ['quasar/src/css/index.sass', '@quasar/extras/material-icons/material-icons.css'],
    requirements: [{ name: 'Quasar', url: 'https://quasar.dev/start' }],
};
const vuetify = {
    name: 'Vuetify',
    description: 'cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)',
    package: '@vue-js-cron/vuetify',
    dir: 'vuetify',
    css: '@vue-js-cron/vuetify/dist/vuetify.css',
    component: 'CronVuetify',
    componentHypen: 'cron-vuetify',
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
    requirements: [{ name: 'Vuetify', url: 'https://next.vuetifyjs.com/en/' }],
    example: '../.vuepress/components/get-started-vuetify.vue',
};
const naiveUI = {
    name: 'Naive UI',
    description: 'cron editor for [Naive UI](https://www.naiveui.com)',
    package: '@vue-js-cron/naive-ui',
    dir: 'naive-ui',
    css: '@vue-js-cron/naive-ui/dist/naive-ui.css',
    component: 'CronNaive',
    componentHypen: 'cron-naive',
    uses: { 'naive-ui': ['default'] },
    requirements: [
        { name: 'Naive UI', url: 'https://www.naiveui.com/en-US/os-theme/docs/installation' },
    ],
    example: '../.vuepress/components/get-started-naive-ui.vue',
};
const prime = {
    name: 'PrimeVue',
    description: 'cron editor for [PrimeVue](https://primevue.org/)',
    package: '@vue-js-cron/prime',
    dir: 'prime',
    css: '@vue-js-cron/prime/dist/prime.css',
    component: 'CronPrime',
    componentHypen: 'cron-prime',
    imports: ['primeicons/primeicons.css'],
    requirements: [{ name: 'PrimeVue', url: 'https://primevue.org/setup/' }],
};
export const flavors = [core, light, ant, element, naiveUI, prime, quasar, vuetify].map((f) => {
    const packageName = f.package.replace(/[-@/]/g, '_');
    f.api = [
        {
            name: `${f.component} API`,
            url: `/typedoc/classes/${packageName}.${f.component}`,
        },
        {
            name: `${f.component}Props API`,
            url: `/typedoc/interfaces/${packageName}.${f.component}Props`,
        },
    ];
    return f;
});
//# sourceMappingURL=flavors.js.map