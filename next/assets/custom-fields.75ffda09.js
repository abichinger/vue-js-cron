import{_ as i,o as u,c as l,b as m,t as c,a as d,a4 as a,r as p}from"./app.4033451c.js";const{locale:f,util:n}=a,v={data(){const s=f.defaultItems("en");return{value:"* * * * *",error:"",periods:[{id:"year",value:["month","day","hour","minute","second"]},{id:"hour",value:["minute","second"]},{id:"minute",value:["second"]},{id:"second",value:[]}],fields:[{id:"second",items:n.genItems(0,59,e=>n.pad(e,2))},{id:"minute",items:s.minuteItems},{id:"hour",items:s.hourItems},{id:"day",items:s.dayItems},{id:"month",items:s.monthItems}],cols(e){return e==="minute"?5:e==="hour"||e==="day"?4:e==="second"?3:1},customLocale:{"*":{second:{"*":{prefix:":"}}},hour:{minute:{"*":{prefix:"at",suffix:""},empty:{text:"every minute"}}},minute:{second:{"*":{prefix:"at",suffix:"second(s)"},empty:{text:"every"}}},second:{text:"Second"}}}}},x={class:"mb-2"};function _(s,e,y,h,o,g){const r=p("CronLight");return u(),l("div",null,[m("div",x,c(o.value),1),d(r,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=t=>o.value=t),periods:o.periods,fields:o.fields,onError:e[1]||(e[1]=t=>o.error=t),"custom-locale":o.customLocale,cols:o.cols},null,8,["modelValue","periods","fields","custom-locale","cols"])])}var I=i(v,[["render",_],["__file","custom-fields.vue"]]);export{I as default};