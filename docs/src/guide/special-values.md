<script setup>
import SpecialValuesExample from '../examples/special-values.vue'
</script>

# Special Values

Quartz and Spring support `?` for an unspecified day of the month or week, and the following values in the day-of-month field.

| Value | Meaning                                     |
| ----- | ------------------------------------------- |
| `L`   | Last day of the month                       |
| `L-3` | Three days before the last day of the month |
| `LW`  | Last weekday of the month                   |
| `15W` | Weekday nearest the 15th of the month       |

Select `L` and `LW` in the editor. Supply offsets such as `L-3` and nearest weekdays such as `15W` through `v-model`. Use each special value by itself in its field.

<SpecialValuesExample />

Set `specialDays: false` to disable the day-of-month values, or set `specialDays: true` to enable them for a custom format if your scheduler supports them.

```vue
<CronLight v-model="expression" :format="{ inherit: 'quartz', specialDays: false }" />
```
