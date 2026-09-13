# Theming - Light

## Themes

`CronLight` ships two themes, which are selected with the `theme` prop.

| value | description |
| -------- | -------------------------------------------------------------- |
| `ant` | default theme, inspired by [Ant Design Vue](https://antdv.com/) |
| `legacy` | the styles used before the `ant` theme was introduced |

```vue
<template>
  <cron-light v-model="value" theme="legacy" />
</template>
```

## Dark mode

Dark mode is activated by adding the `dark` class to any parent element.

```html
<body class="dark">
  <cron-light v-model="value" />
</body>
```

@[code](@/src/.vuepress/components/light-theming.vue)

Use the toggle at the top-right to switch between light and dark mode.
<br/><br/>

<light-theming />
