<template>
  <table>
    <tr>
      <th v-for="header in headers" :key="header.value">{{header.name}}</th>
    </tr>
    <tr v-for="item, i in items" :key="i">
      <template v-for="header, j in headers">
        <td :key="j">
          <slot :name="'r'+i+'c'+j">
            <span v-html="renderMd(item[header.value])" />
          </slot>
        </td>
      </template>
      
    </tr>
  </table>
</template>

<script>
import markdownIt from 'markdown-it/dist/markdown-it';

export default {
  props:{
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods:{
    renderMd(mdStr){
      let md = new markdownIt({ 
        html: true,
      })
      return md.render(mdStr)
    }
  }
}
</script>
