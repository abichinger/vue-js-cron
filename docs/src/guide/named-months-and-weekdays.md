# Named months and weekdays

Crontab, Quartz, and Spring accept English month names (`JAN`–`DEC`) and weekday names (`SUN`–`SAT`) in either case, regardless of the display locale. Names work in supported lists, ranges, and steps, such as `JAN,MAR`, `MON-FRI`, and `JAN-MAY/2`. The editor serializes them as numbers.

Set `namedValues: false` to require numeric input.

```vue
<CronLight v-model="expression" :format="{ inherit: 'crontab', namedValues: false }" />
```

The `firstWeekDay` option controls weekday numbering and display order. The `hasSundayAlias` option controls whether the editor accepts the alternate Sunday number.

| `firstWeekDay`            | Display order | Sunday | Alternate Sunday |
| ------------------------- | ------------- | ------ | ---------------- |
| `sun=0` (crontab, Spring) | 0–6           | 0      | 7                |
| `mon=1`                   | 1–7           | 7      | 0                |
| `sun=1` (Quartz)          | 1–7           | 1      | None             |
| `mon=2`                   | 2–7, 1        | 1      | None             |

The alias is enabled by default in crontab and Spring. You can configure it independently of `namedValues`.
