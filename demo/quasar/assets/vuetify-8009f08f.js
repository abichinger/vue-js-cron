import{H as j,G as B,Q as F,Z as G}from"./core-1caf7de4.js";import{O as H,a2 as o,a3 as a,a7 as c,ah as L,a5 as t,b as i,K as N,I as n,L as p,m as U,a4 as m,F as y,a6 as V,aa as d,a8 as z,a9 as E}from"./index-00b8ee8e.js";const I={inheritAttrs:!1,name:"CustomSelect",props:{...F(),menuProps:{type:Object,default:()=>{}},chipProps:{type:Object,default:()=>{}}},emits:["update:model-value"],setup(e,s){return G(e,()=>e.modelValue,s)}},P=(e,s)=>{const u=e.__vccOpts||e;for(const[k,x]of s)u[k]=x;return u};function M(e,s,u,k,x,_){const r=o("v-icon"),f=o("v-list-item"),C=o("v-col"),l=o("v-row"),h=o("v-list"),w=o("v-menu"),b=o("v-chip");return a(),c(b,z(E(u.chipProps)),L({default:t(()=>[n(" "+p(e.selection??e.selectedStr)+" ",1),i(w,U({activator:"parent"},u.menuProps),{default:t(()=>[i(h,{class:"pa-0 ma-0"},{default:t(()=>[(a(!0),m(y,null,V(e.itemRows,(g,O)=>(a(),c(l,{key:O,"no-gutters":""},{default:t(()=>[(a(!0),m(y,null,V(g,(v,S)=>(a(),c(C,{key:S},{default:t(()=>[v?(a(),c(f,{key:0,class:"vcron-v-item",onClick:D=>e.select(v),active:e.has(v)},{default:t(()=>[n(p(v.text),1)]),_:2},1032,["onClick","active"])):d("",!0)]),_:2},1024))),128))]),_:2},1024))),128))]),_:1})]),_:1},16)]),_:2},[e.clearable&&!e.isEmpty?{name:"append",fn:t(()=>[i(r,{size:"small",icon:"mdi-close",onClick:s[0]||(s[0]=N(g=>e.clear(),["stop"]))})]),key:"0"}:void 0]),1040)}const Q=P(I,[["render",M]]),R=()=>({chipProps:{type:Object,default(){return{}}},...j()}),T=H({name:"CronVuetify",components:{CustomSelect:Q},props:R(),emits:["update:model-value","error"],setup(e,s){return B(e,()=>e.modelValue,s)}}),Z={style:{display:"inline-block"}};function q(e,s,u,k,x,_){const r=o("v-col"),f=o("custom-select"),C=o("v-row");return a(),m("div",Z,[i(C,{align:"baseline",dense:""},{default:t(()=>[e.period.prefix.value?(a(),c(r,{key:0,class:"flex-grow-0"},{default:t(()=>[n(p(e.period.prefix.value),1)]),_:1})):d("",!0),i(r,{cols:"auto"},{default:t(()=>[i(f,{"model-value":e.period.selected.value.id,"item-value":"id",items:e.period.items,"onUpdate:modelValue":s[0]||(s[0]=l=>e.period.select(l)),"chip-props":e.chipProps},null,8,["model-value","items","chip-props"])]),_:1}),e.period.suffix.value?(a(),c(r,{key:1,class:"flex-grow-0"},{default:t(()=>[n(p(e.period.suffix.value),1)]),_:1})):d("",!0),(a(!0),m(y,null,V(e.selected,l=>(a(),m(y,{key:l.id},[l.prefix.value?(a(),c(r,{key:0,class:"flex-grow-0"},{default:t(()=>[n(p(l.prefix.value),1)]),_:2},1024)):d("",!0),i(r,{cols:"auto"},{default:t(()=>[i(f,{"model-value":l.selected.value,"onUpdate:modelValue":h=>l.select(h),items:l.items,cols:e.cols[l.id]||1,selection:l.text.value,multiple:"",clearable:"","chip-props":e.chipProps,"menu-props":{closeOnContentClick:!1}},null,8,["model-value","onUpdate:modelValue","items","cols","selection","chip-props"])]),_:2},1024),l.suffix.value?(a(),c(r,{key:1,class:"flex-grow-0"},{default:t(()=>[n(p(l.suffix.value),1)]),_:2},1024)):d("",!0)],64))),128))]),_:1})])}const A=P(T,[["render",q]]),W={install:e=>{e.component("CronVuetify",A)}};export{A as CronVuetify,W as CronVuetifyPlugin,R as cronVuetifyProps,W as default};
