<template>
  <v-app>

    <v-card class="code-example">
        <v-toolbar dense class="elevation-1">
            <v-toolbar-title v-if="title">{{title}}</v-toolbar-title>

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

        <v-card-text>
          <slot></slot>
        </v-card-text>
    </v-card>

    <v-card-text>

    </v-card-text>
    <slot name="code"></slot>

  </v-app>
</template>

<script>
export default {
  props: {
      title: {
          type: String,
          default: ''
      }
  },
  data() {
    return {
      viewSource: false
    }
  },
}
</script>

<style>
.code-example pre {
  margin: 0 !important;
}
.code-example .source {
  margin: 0.2em;
}
.code-example {
  overflow-wrap: unset;
}

</style>
