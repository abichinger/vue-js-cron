import{c as k,a as I,b as L,d as T,e as $,f as R,g as j,D as h,h as D,T as b,I as g,L as p,i as x,j as C}from"./layout-b008e17c.js";import{u as F,k as G,l as H,m as J,n as K,o as M,p as P}from"./layout-b008e17c.js";import{m as N,I as A}from"./helpers-90d98a5c.js";import{n as B,r as E}from"./index-00b8ee8e.js";function O(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{blueprint:c,...a}=i,t=N(c,a),{aliases:o={},components:u={},directives:d={}}=t,f=k(t.defaults),r=I(t.display,t.ssr),l=L(t.theme),v=T(t.icons),m=$(t.locale),y=R(t.date,m);return{install:e=>{for(const s in d)e.directive(s,d[s]);for(const s in u)e.component(s,u[s]);for(const s in o)e.component(s,j({...o[s],name:s,aliasName:o[s].name}));if(l.install(e),e.provide(h,f),e.provide(D,r),e.provide(b,l),e.provide(g,v),e.provide(p,m),e.provide(x,y),A&&t.ssr)if(e.$nuxt)e.$nuxt.hook("app:suspense:resolve",()=>{r.update()});else{const{mount:s}=e;e.mount=function(){const S=s(...arguments);return B(()=>r.update()),e.mount=s,S}}C.reset(),e.mixin({computed:{$vuetify(){return E({defaults:n.call(this,h),display:n.call(this,D),theme:n.call(this,b),icons:n.call(this,g),locale:n.call(this,p),date:n.call(this,x)})}}})},defaults:f,display:r,theme:l,icons:v,locale:m,date:y}}const U="3.4.0";O.version=U;function n(i){var t,o;const c=this.$,a=((t=c.parent)==null?void 0:t.provides)??((o=c.vnode.appContext)==null?void 0:o.provides);if(a&&i in a)return a[i]}export{O as createVuetify,F as useDate,G as useDefaults,H as useDisplay,J as useLayout,K as useLocale,M as useRtl,P as useTheme,U as version};
