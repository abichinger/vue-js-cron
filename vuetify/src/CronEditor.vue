
<template>
    <CronCore v-bind="$attrs" @input="$emit('input', $event)" @error="$emit('error', $event)">
        <template #default="{fields, period}">
            <v-row align="baseline" dense>
                <v-col v-if="period.prefix" class="flex-grow-0">{{period.prefix}}</v-col>
                <v-col cols="auto">
                    <v-select class="fit" v-bind="period.attrs" :items="period.items" @input="period.events.input" item-value="id" dense></v-select>
                </v-col>
                <v-col v-if="period.suffix" class="flex-grow-0">{{period.suffix}}</v-col>
                
                
                <template v-for="f in fields">
                    <v-col v-if="f.prefix" class="flex-grow-0" :key="f.id+'-prefix'">{{f.prefix}}</v-col>
                    <v-col cols="auto" :key="f.id">
                        <v-select class="fit" v-bind="f.attrs" v-on="f.events" :items="f.items" multiple dense :menu-props="{ auto: false, offsetY: true }">
                            <template #prepend-inner>
                                <div>{{f.selectedStr}}</div>
                            </template>
                            <template #selection>
                                
                            </template>
                            <template #item="{item, attrs}">
                                <v-list-item-title v-bind="attrs">{{item.text}}</v-list-item-title>
                            </template>
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