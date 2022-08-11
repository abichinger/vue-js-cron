<template>
  <div>

        <v-toolbar dense class="elevation-0 bg-transparent">
            <v-toolbar-title class="pa-0 ma-0" v-if="title">{{title}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template #activator="{attrs, on}">
                <v-btn v-bind="attrs" v-on="on" icon @click="viewSource = !viewSource">
                    <v-icon>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>View source</span>
            </v-tooltip>

        </v-toolbar>

        <v-expand-transition>
          <div v-show="viewSource" class="source">
            <slot name="source"></slot>
          </div>
        </v-expand-transition>

        <div>
          <slot></slot>
        </div>

    <slot name="code"></slot>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      viewSource: false
    }
  }
}
</script>

<style>
.code-example pre {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.code-example .source {
  margin: 0.2em;
}
.code-example {
  overflow-wrap: unset;
}

</style>
