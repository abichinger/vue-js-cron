<template>
  <div class="cron-demo">
    <h1>Vue Cron Light DevSnake - Demo</h1>
    
    <!-- Basic Usage -->
    <div class="section">
      <h3>1. Basic Usage</h3>
      <CronLight 
        v-model="basicCron" 
        @error="handleError"
      />
      <p>Result: <code>{{ basicCron }}</code></p>
    </div>

    <!-- With Custom Columns -->
    <div class="section">
      <h3>2. Custom Column Widths</h3>
      <CronLight 
        v-model="customCron"
        :cols="customCols"
      />
      <p>Result: <code>{{ customCron }}</code></p>
    </div>

    <!-- Disabled State -->
    <div class="section">
      <h3>3. Disabled State</h3>
      <CronLight 
        v-model="disabledCron"
        :disabled="true"
      />
      <p>Result: <code>{{ disabledCron }}</code></p>
    </div>

    <!-- Advanced Usage with Validation -->
    <div class="section">
      <h3>4. With Validation & Events</h3>
      <CronLight 
        v-model="advancedCron"
        @update:model-value="onCronUpdate"
        @update:period="onPeriodUpdate"
        @error="onCronError"
      />
      <div class="info">
        <p>Current: <code>{{ advancedCron }}</code></p>
        <p>Period: {{ currentPeriod }}</p>
        <p>Human Readable: {{ humanReadable }}</p>
        <p v-if="lastError" class="error">Error: {{ lastError }}</p>
      </div>
    </div>

    <!-- Preset Values -->
    <div class="section">
      <h3>5. Preset Values</h3>
      <div class="presets">
        <button 
          v-for="preset in presets" 
          :key="preset.name"
          @click="basicCron = preset.value"
          class="preset-btn"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { CronLight } from 'vue-cron-light-devsnake'
import 'vue-cron-light-devsnake/dist/light.css'

// Reactive data
const basicCron = ref('0 0 * * *')
const customCron = ref('*/5 * * * *')
const disabledCron = ref('0 12 * * 1-5')
const advancedCron = ref('0 9 * * MON-FRI')
const currentPeriod = ref('')
const lastError = ref('')

// Custom column configuration
const customCols = {
  period: 2,
  minute: 3,
  hour: 2,
  day: 2,
  month: 2,
  week: 2
}

// Preset values
const presets = [
  { name: 'Every Minute', value: '* * * * *' },
  { name: 'Every 5 Minutes', value: '*/5 * * * *' },
  { name: 'Every Hour', value: '0 * * * *' },
  { name: 'Daily at 9 AM', value: '0 9 * * *' },
  { name: 'Weekly on Monday', value: '0 9 * * 1' },
  { name: 'Monthly 1st', value: '0 9 1 * *' },
  { name: 'Weekdays 9 AM', value: '0 9 * * 1-5' }
]

// Computed properties
const humanReadable = computed(() => {
  return cronToHuman(advancedCron.value)
})

// Event handlers
const handleError = (error) => {
  console.error('Basic cron error:', error)
}

const onCronUpdate = (value) => {
  console.log('Advanced cron updated:', value)
  lastError.value = ''
}

const onPeriodUpdate = (period) => {
  currentPeriod.value = period
  console.log('Period updated:', period)
}

const onCronError = (error) => {
  lastError.value = error.message || error
  console.error('Advanced cron error:', error)
}

// Helper function to convert cron to human readable
function cronToHuman(cron) {
  const patterns = {
    '* * * * *': 'Every minute',
    '*/5 * * * *': 'Every 5 minutes',
    '0 * * * *': 'Every hour',
    '0 0 * * *': 'Daily at midnight',
    '0 9 * * *': 'Daily at 9:00 AM',
    '0 9 * * 1-5': 'Weekdays at 9:00 AM',
    '0 9 * * MON-FRI': 'Weekdays at 9:00 AM',
    '0 9 1 * *': 'Monthly on the 1st at 9:00 AM'
  }
  
  return patterns[cron] || 'Custom schedule'
}
</script>

<style scoped>
.cron-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

.section h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007cba;
  padding-bottom: 10px;
}

code {
  background: #f1f1f1;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.info {
  margin-top: 15px;
  padding: 15px;
  background: white;
  border-radius: 4px;
  border-left: 4px solid #007cba;
}

.info p {
  margin: 5px 0;
}

.error {
  color: #d32f2f !important;
  font-weight: bold;
}

.presets {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.preset-btn {
  background: #007cba;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.preset-btn:hover {
  background: #005a87;
}

.preset-btn:active {
  background: #004a73;
}

/* Responsive */
@media (max-width: 600px) {
  .cron-demo {
    padding: 10px;
  }
  
  .presets {
    flex-direction: column;
  }
  
  .preset-btn {
    width: 100%;
  }
}
</style>
