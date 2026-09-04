# Special Values

The day of month field of the `quartz` and `spring` format supports the special values `L` and `W`.

| Value | Description                              |
| ----- | ---------------------------------------- |
| `L`   | last day of the month                    |
| `L-3` | 3 days before the last day of the month  |
| `LW`  | last weekday of the month                |
| `15W` | weekday nearest to the 15th of the month |

`L` and `LW` are part of the items of the day field, therefore they can be selected like any
other value. `L-<n>` and `<n>W` are parsed and displayed, but they have to be set through
`v-model`.

Special values can't be combined with other values, e.g. `L,15` is not a valid day of month.

<special-values />

## Other formats

The special values are disabled for the `crontab` format, because
[crontab](https://linux.die.net/man/5/crontab) doesn't support them.
`withSpecialDays` enables them for any format.

@[code](@/src/.vuepress/components/special-values-crontab.vue)

<special-values-crontab />
