<script setup>
import PeriodsExample from '../examples/custom-periods.vue'
</script>

# Custom Periods

Pass `periods` to replace the period menu. Each entry has an `id` and a `value` array of field IDs to show in that order. Add `text` to override the menu label.

This example offers daily and monthly schedules. The monthly schedule shows the day of the month, hour, and minute.

<<< ../examples/custom-periods.vue

<PeriodsExample />
