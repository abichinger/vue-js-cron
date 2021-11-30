
<template>
    <CronCore :value="value" @input="$emit('input', $event)">
        <template #default="{fields, periodEvents, periodAttrs, periodData}">
            <v-row align="baseline" dense>
                <v-col v-if="periodData.prefix" class="flex-grow-0">{{periodData.prefix}}</v-col>
                <v-col cols="auto">
                    <v-select class="fit" v-bind="periodAttrs" :items="periodData.items" @input="periodEvents.input" return-object dense></v-select>
                </v-col>
                <v-col v-if="periodData.suffix" class="flex-grow-0">{{periodData.suffix}}</v-col>
                
                
                <template v-for="f in fields">
                    <v-col v-if="f.prefix" class="flex-grow-0" :key="f.id+'-prefix'">{{f.prefix}}</v-col>
                    <v-col cols="auto" :key="f.id">
                        <v-select class="fit" v-bind="f.attrs" v-on="f.events" :items="f.items" multiple eager dense :menu-props="{ auto: false, offsetY: true }">
                            <template #prepend-inner>
                                <div>{{f.selectedStr}}</div>
                            </template>
                            <template #selection>
                                
                            </template>
                            <!--<template #item="{item, attrs, on}">
                                <div v-bind="attrs" v-on="on">{{item.text}}</div>
                            </template>-->
                        </v-select>
                    </v-col>
                    <v-col v-if="f.suffix" class="flex-grow-0" :key="f.id+'-suffix'">{{f.suffix}}</v-col>
                </template>
            </v-row>
            
        </template>
    </CronCore>
</template>

<script>
import CronCore from '@vue-js-cron/core'

export default {
    name: "VueCronEditor",
    components:{
        'CronCore': CronCore.component,
    },
    props: {
        value: {
            type: String,
            default: '* * * * *'
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