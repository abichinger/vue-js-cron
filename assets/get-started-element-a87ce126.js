import{_ as n,M as s,p as l,q as p,N as a,R as u,v as m}from"./framework-c04be308.js";const c={data(){return{value:"* * * * *",error:""}}},_={class:"text-lightest pt-2"};function i(d,e,v,f,t,x){const r=s("cron-element-plus");return l(),p("div",null,[a(r,{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=o=>t.value=o),"button-props":{type:"primary"},onError:e[1]||(e[1]=o=>t.error=o)},null,8,["modelValue"]),u("p",_,"cron expression: "+m(t.value),1)])}const g=n(c,[["render",i],["__file","get-started-element.vue"]]);export{g as default};