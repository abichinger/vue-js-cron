
<template>
    <CronCore v-bind="$attrs" @input="$emit('input', $event)" @error="$emit('error', $event)" :enableEveryAt="enableEveryAt">
        <template #default="{fields, period}">
            <v-row align="baseline" dense>
                <v-col v-if="period.prefix" class="flex-grow-0">{{period.prefix}}</v-col>
                <v-col cols="auto">
                    <custom-select 
                        v-bind="period.attrs" 
                        :items="period.items" 
                        v-on="period.events" 
                        item-value="id"
                        :menu-props="menuProps || { offsetY: true }"
                        :chipProps="chipProps" />
                </v-col>
                <v-col v-if="period.suffix" class="flex-grow-0">{{period.suffix}}</v-col>
                
                
                <template v-for="f in fields">
                    <v-col v-if="f.prefix" class="flex-grow-0" :key="f.id+'-prefix'">{{f.prefix}}</v-col>
                    <v-col cols="auto" :key="f.id">
                        <custom-select 
                            v-bind="f.attrs" 
                            v-on="f.events" 
                            :cols="cols(f.id)"
                            :items="f.items" 
                            :selection="f.selectedStr" 
                            multiple 
                            :menu-props="menuProps || { offsetY: true, closeOnContentClick: false }"
                            :chipProps="chipProps"
                            :clearable="true" />
                    </v-col>
                    <v-col v-if="f.suffix" class="flex-grow-0" :key="f.id+'-suffix'">{{f.suffix}}</v-col>
                </template>
            </v-row>
            
        </template>
    </CronCore>
</template>

<script>
import CronCore from '@vue-js-cron/core'
import CustomSelect from './components/CustomSelect.vue'

export default {
    name: "VueCronEditor",
    components:{
        'CronCore': CronCore.component,
        CustomSelect
    },
    props: {
        chipProps: {
            type: Object,
            default() {
                return {}
            }
        },
        menuProps: {
            type: Object,
            default() {
                return null
            }
        },
        cols: {
            type: Function,
            default(fieldId) {
                if (fieldId === 'minute') return 5
                else if (fieldId === 'hour') return 4
                else if (fieldId === 'day') return 4
                else return 1
            }
        },
      enableEveryAt: {
          type: Boolean,
          default: false
      }
    }
}
</script>

<style lang="css">

.v-select.fit {
  width: min-content;
}
.v-select.fit  .v-select__selection--comma {
    text-overflow: unset;
}
.v-select.fit  .v-input__prepend-inner {
    white-space: nowrap;
    align-items: center;

}
.v-select.fit  .v-input__prepend-inner div {
    min-height: 10px;
    line-height: 26px;
}



</style>