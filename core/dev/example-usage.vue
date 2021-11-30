<template>
    <div id="app">
        Cron: <input :value="value" @change="value = $event.target.value" type="text" />
        <VueCronCore v-model="value">
            <template #default="{period, error, fields}">
                <div>
                    <span>
                        {{period.prefix}}:
                        <select @input="period.events.input(JSON.parse($event.target.value))">
                            <option v-for="item in period.items" :key="item.text" :value="JSON.stringify(item)">{{item.text}}</option>
                        </select>
                    </span>

                    
                    <template v-for="f in fields">
                        <span :key="f.id">
                            {{f.prefix}}
                            <select @input="f.events.input(getSelected($event.target))" multiple>
                                <option v-for="item in f.items" :key="item.value" :value="item.value">{{item.text}}</option>
                            </select>
                            {{f.suffix}}
                        </span>
                    </template>

                    <div>-</div>
                    
                    <div>error:{{error}}</div>
                    <div>period:{{period.attrs.value}}</div>
                    <div v-for="f in fields" :key="'div'+f.id">{{f.id}}: {{f.attrs.value}}, {{f.cron}}, {{f.selectedStr}}</div>
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