<script setup>
import FieldsExample from '../examples/custom-fields.vue'
</script>

# Custom Cron Expressions

Use `format` to select `crontab` (the default), `quartz`, or `spring`. Pass an object to override an option while keeping the chosen preset.

```vue
<CronLight v-model="expression" :format="{ inherit: 'crontab', seconds: true }" />
```

For a different expression layout, pass `fields` in the order they should appear in the expression. Each field needs an `id` and a list of allowed `items`. Pass matching `periods` to control which fields the editor shows.

This example produces a two-field expression with hours first and minutes second.

<<< ../examples/custom-fields.vue

<FieldsExample />
