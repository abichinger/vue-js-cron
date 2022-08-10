<template>
    <md-table :headers="headers" :items="items" ref="table">

        <template v-for="(_, name) in $slots" v-slot:[name]>
            <slot :name="name"/>
        </template>

    </md-table>
</template>

<script>

export default {
  props: {
    appendItems: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      headers: [
        { name: 'Name', value: 'name' },
        { name: 'Description', value: 'desc' },
        { name: 'Slot Props', value: 'props' }
      ],
      items: [
        { name: 'default', desc: 'used to render the cron editor', props: '`CronState`' },
        ...this.appendItems
      ]
    }
  }
}
</script>
