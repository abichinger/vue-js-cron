<template>
  <table>
    <tr>
      <th v-for="header in headers" :key="header.value">{{header.name}}</th>
    </tr>
    <tr v-for="item, i in items" :key="i">
      <td v-for="header, j in headers" :key="j">
        <slot :name="'r'+i+'c'+j">
          <span v-html="renderMd(item[header.value])" />
        </slot>
      </td>
    </tr>
  </table>
</template>

<script>
import markdownIt from 'markdown-it/dist/markdown-it'

export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    renderMd (mdStr) {
      // eslint-disable-next-line
      const md = new markdownIt({
        html: true
      })
      return md.render(mdStr)
    }
  }
}
</script>
