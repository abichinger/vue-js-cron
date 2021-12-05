<template>
    <md-table :headers="headers" :items="items"></md-table>
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
                {name:'Description', value: 'desc'},
            ],
            items: [
                {name: 'input', desc: `emitted when the cron expression changed`},
                {name: 'error', desc: `emitted when the cron expression is invalid`},
                ...this.appendItems
            ]
        }
    }
}
</script>
