
<template>
    <CronCore v-bind="$attrs" @input="$emit('input', $event)" @error="$emit('error', $event)">
        <template #default="{fields, period}">
            
            <span class="vcron-editor">
                <span>{{period.prefix}}</span>
                <custom-select v-bind="period.attrs" v-on="period.events" :items="period.items" item-value="id" :cols="cols('period')" :width="width('period')" />
                <span>{{period.suffix}}</span>
            
            
                <template v-for="f in fields">
                    <span :key="f.id+'prefix'">{{f.prefix}}</span>
                    <custom-select v-bind="f.attrs" v-on="f.events" :items="f.items" :key="f.id" :cols="cols(f.id)" :width="width(f.id)" multiple>{{f.selectedStr}}</custom-select>
                    <span :key="f.id+'suffix'">{{f.suffix}}</span>
                </template>

            </span>
            
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
    props:{
        cols: {
            type: Function,
            default: (fieldId) => {

                if(fieldId == 'minute') return 5
                else if (fieldId == 'hour') return 4
                else if (fieldId == 'day') return 4
                else return 1
                
            }
        },
        width: {
            type: Function,
            default: (fieldId) => {
                if(fieldId == 'minute') return '10em'
                else if (fieldId == 'hour') return '8em'
                else if (fieldId == 'day') return '8em'
                else return 'unset'
            }
        }
    }   
}
</script>