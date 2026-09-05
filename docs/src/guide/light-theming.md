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

Note: the dark styles are defined for the `ant` theme, the `legacy` theme doesn't provide a
dark variant.

@[code](@/src/.vuepress/components/light-theming.vue)

<light-theming />
