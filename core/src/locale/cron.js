
let cron = {
    any: '*',
    every: '*/{{interval}}',
    range: '{{start}}-{{end}}',
    value: '{{value}}',

    //values: new Range() 
}


export default {
    any: 'every {{name}}',
    every: 'every {{interval}}',
    range: '{{start}}-{{end}}',
    value: '{{value}}'

    //values: ['']
}