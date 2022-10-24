![Vue.js Cron Vuetify Hero](https://raw.githubusercontent.com/abichinger/vue-js-cron/main/assets/vue-js-cron-hero.png)

<p align="center">
    <em>generate cron expressions using vue.js</em>
</p>

<p align="center">
{%- for p in packages %}
{%- if loop.index != 1 %} | {%- endif %}
<a href="https://www.npmjs.com/package/{{ p.json.name }}">{{p.name}}</a>
{%- endfor %}
</p>

## Usage - {{ entry.name }}

[Demo](https://abichinger.github.io/vue-js-cron/demo.html)

[Get Started](https://abichinger.github.io/vue-js-cron/guide/getting-started.html#{{ entry.anchor }})

[API - cron-{{ entry.dir }}](https://abichinger.github.io/vue-js-cron/api/{{ entry.dir }}.html)

## Attribution

This component is inspired by [react-js-cron](https://github.com/xrutayisire/react-js-cron) and [jqcron](https://github.com/arnapou/jqcron)