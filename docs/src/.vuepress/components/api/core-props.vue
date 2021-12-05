<template>
    <md-table :headers="headers" :items="items" ref="table">
        
        <template v-for="(_, name) in $slots" v-slot:[name]>
            <slot :name="name"/>
        </template>

    </md-table>
</template>

<script>

export default {
    props:{
        appendItems: {
            type: Array,
            default: () => []
        }
    },
    data: function(){

        return {
            headers: [
                {name:'Name', value: 'name'},
                {name:'Type', value: 'type'},
                {name:'Default', value: 'default'},
                {name:'Description', value: 'desc'},
            ],
            items: [
                {name: 'value', type:"`string`", default: 'required', desc: 'the current cron expression'},
                {name: 'fields', type:"`Field[]`", default: '...', desc: 'each field defines on position of the cron expression'},
                {name: 'periods', type:"`Period[]`", default: '...', desc: 'the `value` porperty of a period determines which fields are visible'},
                {name: 'locale', type:"`string`", default: '`"en"`', desc: ''},
                {name: 'custom-locale', type:"`Locale`", default: '...', desc: ''},
                ...this.appendItems
            ]
        }
    }
}
</script>
