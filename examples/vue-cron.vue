<template>
    <div>
        Cron: <input :value="value" @change="value = $event.target.value" type="text" />
        <VueCronCore v-model="value">
            <template #default="p">
                <div>
                    <span>
                        Every:
                        <select @input="p.periodEvents.input(JSON.parse($event.target.value))">
                            <option v-for="item in p.periodData.items" :key="item.text" :value="JSON.stringify(item.value)">{{item.text}}</option>
                        </select>
                    </span>

                    
                    <template v-for="f in p.fields">
                        <span :key="f.id">
                            {{f.id}}:
                            <select @input="f.events.input(getSelected($event.target))" multiple>
                                <option v-for="item in f.items" :key="item.value" :value="item.value">{{item.text}}</option>
                            </select>
                        </span>
                    </template>

                    <div>-</div>
                    
                    <div>error:{{p.error}}</div>
                    <div>period:{{p.periodAttrs.value}}</div>
                    <div v-for="f in p.fields" :key="'div'+f.id">{{f.id}}: {{f.attrs.value}}, {{f.cron}}, {{f.selectedStr}}</div>
                </div>
            </template>
        </VueCronCore>
    </div>
</template>

<style scoped>

select[multiple] {
    height: 200px;
}

</style>

<script>
import VueCronCore from '../src/core'

export default {
    components: {
        VueCronCore
    },
    props: {

    },
    data(){
        return {
            value: '* * * * *'
        }
    },

    computed: {
        
    },
    
    watch: {
        
    },

    methods: {
        getSelected(select){
            let options = select && select.options;
            return Array.from(options).filter((opt) => opt.selected).map((opt) => opt.value)
        },
    }
}
</script>