<script setup>
import { withBase } from 'vitepress'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const packages = {
  light: 'Light',
  ant: 'Ant Design Vue',
  'element-plus': 'Element Plus',
  'naive-ui': 'Naive UI',
  prime: 'PrimeVue',
  quasar: 'Quasar',
  vuetify: 'Vuetify',
}

const locales = {
  zh: 'Chinese',
  da: 'Danish',
  en: 'English',
  fr: 'French',
  de: 'German',
  he: 'Hebrew',
  hi: 'Hindi',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  pt: 'Portuguese',
  ru: 'Russian',
  es: 'Spanish',
  tg: 'Tajik',
  uk: 'Ukrainian',
}

const flavor = ref('light')
const locale = ref('en')
const format = ref('crontab')
const disabled = ref(false)
const clearable = ref(true)
const frame = ref(null)

const src = computed(() => {
  const params = new URLSearchParams({ locale: locale.value, format: format.value })
  params.set('initial-value', format.value === 'crontab' ? '* * * * *' : '* * * * * ?')
  return withBase(`/demo/${flavor.value}/index.html?${params}`)
})

function syncControls() {
  frame.value?.contentWindow?.postMessage(
    { type: 'updateProps', props: { disabled: disabled.value, clearable: clearable.value } },
    window.location.origin,
  )
}

function onDemoMessage(event) {
  if (
    event.origin === window.location.origin &&
    event.source === frame.value?.contentWindow &&
    event.data?.type === 'cron-demo-ready'
  ) {
    syncControls()
  }
}

watch([disabled, clearable], syncControls)
onMounted(() => window.addEventListener('message', onDemoMessage))
onUnmounted(() => window.removeEventListener('message', onDemoMessage))
</script>

<template>
  <div class="controls">
    <label>
      Package
      <select v-model="flavor">
        <option v-for="(name, id) in packages" :key="id" :value="id">{{ name }}</option>
      </select>
    </label>

    <label>
      Locale
      <select v-model="locale">
        <option v-for="(name, id) in locales" :key="id" :value="id">{{ name }}</option>
      </select>
    </label>

    <label>
      Format
      <select v-model="format">
        <option value="crontab">Crontab</option>
        <option value="quartz">Quartz</option>
        <option value="spring">Spring</option>
      </select>
    </label>

    <label class="toggle"><input v-model="disabled" type="checkbox" /> Disabled</label>
    <label class="toggle"><input v-model="clearable" type="checkbox" /> Clearable</label>
  </div>

  <iframe ref="frame" :src="src" :title="`${packages[flavor]} cron editor`" @load="syncControls" />
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: end;
  margin: 1.5rem 0 1rem;
}

label {
  display: grid;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
}

select {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}

.toggle {
  display: flex;
  align-items: center;
  min-height: 2rem;
}

iframe {
  display: block;
  width: 100%;
  height: 32rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
</style>
