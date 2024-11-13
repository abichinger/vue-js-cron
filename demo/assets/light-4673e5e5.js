import{d as pe,w as S,m as k,h as ce,X as W,Y as q,a6 as V,I as ke,a1 as P,a4 as Q,ac as ae,F as H,$ as ee,G as we,W as Se,j as se}from"./setup-26735872.js";var be=Object.defineProperty,Ce=(t,e,r)=>e in t?be(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,c=(t,e,r)=>(Ce(t,typeof e!="symbol"?e+"":e,r),r),L=(t=>(t.Empty="empty",t.Value="value",t.Range="range",t.EveryX="everyX",t.Combined="combined",t.NoSpecific="noSpecific",t))(L||{}),I=(t=>(t.Prefix="prefix",t.Suffix="suffix",t.Text="text",t))(I||{});class Oe{constructor(e){c(this,"field"),c(this,"itemMap"),this.field=e,this.itemMap=this.field.items.reduce((r,i)=>(r[i.value]=i,r),{})}get id(){return this.field.id}get items(){return this.field.items}get onChange(){return this.field.onChange}get segmentFactories(){return this.field.segmentFactories}get min(){return this.items[0].value}get max(){return this.items[this.items.length-1].value}getItem(e){return this.itemMap[e]}}function Xe(t,e,r=1){const i=[];for(let n=t;n<=e;n+=r)i.push(n);return i}class We{constructor(e,r,i=1){return c(this,"start"),c(this,"end"),c(this,"step"),this.start=e,this.end=r,this.step=i,new Proxy(this,{get:function(n,a){const o=typeof a=="string"?parseInt(a):a;return typeof o=="number"&&o>=0&&o<=n.length?n.start+n.step*o:Reflect.get(n,a)}})}get length(){return(this.end-this.start)/this.step+1}[Symbol.iterator](){let e=-1;return{next:()=>({value:this[++e],done:this[e+1]===void 0})}}}function T(t,e,r=n=>n+"",i=n=>n+""){const n=[];for(const a of new We(t,e))n.push({text:r(a),alt:i(a),value:a});return n}function qe(t,e="crontab"){const r=(n,a=!1)=>new Date(2021,n-1,1).toLocaleDateString(t,{month:a?"short":"long"}),i=(n,a=!1)=>new Date(2021,0,3+n).toLocaleDateString(t,{weekday:a?"short":"long"});return{secondItems:T(0,59,n=>Z(n,2)),minuteItems:T(0,59,n=>Z(n,2)),hourItems:T(0,23,n=>Z(n,2)),dayItems:T(1,31),monthItems:T(1,12,r,n=>r(n,!0)),dayOfWeekItems:e==="crontab"?T(0,6,i,n=>i(n,!0)):T(1,7,n=>i(n-1),n=>i(n-1,!0))}}function Z(t,e){const r=t+"";return r.length<e?new Array(e-r.length).fill("0").join("")+t:r}function z(t){return t&&typeof t=="object"&&!Array.isArray(t)}function te(t,...e){if(!z(t)||e.length===0)return;const r=e.shift();if(z(r))for(const[i,n]of Object.entries(r))z(n)?(z(t[i])||(t[i]={}),te(t[i],r[i])):t[i]=r[i];return e.length>0&&te(t,e),t}function de(t,...e){if(e.length===0)return t;for(const r of e[0])if(r in t){const i=de(t[r],...e.slice(1));if(i!==void 0)return i}}function je(t){for(let e=1;e<t.length;e++)if(t[e-1]+1!==t[e])return!1;return!0}function Me(){throw new Error("not implemented")}function Ae(t,e,r=!0){const i=[];for(let n=0;n<t.length;n+=e){const a=t.slice(n,n+e);for(;r&&a.length<e;)a.push(null);i.push(a)}return i}class J{constructor(e){c(this,"field"),c(this,"type",L.NoSpecific),this.field=e}toCron(){return"?"}toArray(){return[]}get items(){return{}}static fromString(e,r){return e!=="?"?null:new J(r)}}class A{constructor(e){c(this,"field"),c(this,"type",L.Empty),this.field=e}toCron(){return"*"}toArray(){return[]}get items(){return{}}static fromString(e,r){return e!=="*"?null:new A(r)}static fromArray(e,r){const{items:i}=r;if(e.length===0)return new A(r);if(e.length!==i.length)return null;for(const n of i)if(!e.includes(n.value))return null;return je(i.map(n=>n.value))?new A(r):null}}const me=class re{constructor(e,r,i){c(this,"field"),c(this,"type",L.Range),c(this,"start"),c(this,"end"),this.field=e,this.start=r,this.end=i}toCron(){return`${this.start}-${this.end}`}toArray(){const e=this.start,r=this.end;return Xe(e,r)}get items(){return{start:this.field.itemMap[this.start],end:this.field.itemMap[this.end]}}static fromString(e,r){if(!re.re.test(e))return null;const{min:i,max:n}=r,a=e.split("-"),o=parseInt(a[0]),s=parseInt(a[1]);return o>s||o<i||s>n?null:new re(r,o,s)}};c(me,"re",/^\d+-\d+$/);let Y=me;const oe=(t,e,r)=>{const i=[];for(let n=e;n<=r;n+=t)i.push(n);return i},ve=class N{constructor(e,r,i,n){c(this,"field"),c(this,"type",L.EveryX),c(this,"every"),c(this,"start"),c(this,"end"),this.field=e,this.every=r,this.start=i??e.min,this.end=n??e.max}toCron(){return this.start==this.field.min&&this.end==this.field.max?`*/${this.every}`:`${this.start}-${this.end}/${this.every}`}toArray(){return oe(this.every,this.start,this.end)}get items(){return{every:this.field.itemMap[this.every],start:this.field.itemMap[this.start],end:this.field.itemMap[this.end]}}static fromString(e,r){if(!N.re.test(e))return null;const[i,n]=e.split("/"),a=parseInt(n);if(a>r.items.length)return null;const o=e.split("-").map(x=>parseInt(x)),s=i=="*"?r.min:o[0],l=i=="*"?r.max:o[1];return oe(a,s,l).length==0?null:new N(r,a,s,l)}static fromArray(e,r){const{min:i,max:n}=r;if(e.length<3)return null;const a=e[1]-e[0];if(a<=1||e[0]!=i)return null;const o=e[e.length-1];if(n-o>=a)return null;for(let s=2;s<e.length;s++)if(e[s]-e[s-1]!=a)return null;return new N(r,a,i,n)}};c(ve,"re",/^(\*|\d+-\d+)\/\d+$/);let G=ve;class U{constructor(e,r){c(this,"field"),c(this,"type",L.Value),c(this,"value"),this.field=e,this.value=r}toCron(){return`${this.value}`}toArray(){return[this.value]}get items(){return{value:this.field.itemMap[this.value]}}static fromString(e,r){const{min:i,max:n}=r,a=parseInt(e);return String(a)===e&&a>=i&&a<=n?new U(r,a):null}static fromArray(e,r){const{min:i,max:n}=r;if(e.length!=1)return null;const a=e[0];return a<i||a>n?null:a}}const ye=class B{constructor(e,r=[]){c(this,"field"),c(this,"segments"),this.field=e,this.segments=r}get type(){return this.segments.length==1?this.segments[0].type:L.Range}addSegment(e){this.segments.push(e)}toCron(){return this.segments.map(e=>e.toCron()).join(",")}toArray(){const e=new Set;for(const r of this.segments)r.toArray().forEach(i=>e.add(i));return Array.from(e)}get items(){return Me()}static fromString(e,r){const i=r.segmentFactories??B.segmentFactories;let n=[];for(const a of e.split(",")){if(a==="*"){n=[new A(r)];break}let o=null;for(const s of i)if(o=s(a,r),o!==null)break;if(o===null)return null;n.push(o)}return new B(r,n)}static fromArray(e,r){const{min:i,max:n}=r,a=e[0],o=e[e.length-1];if(a<i||o>n)return null;const s=[];let l=0;for(let x=0;x<e.length;x++)(e[x+1]===void 0||e[x+1]-e[x]>1)&&(x===l?s.push(new U(r,e[l])):s.push(new Y(r,e[l],e[x])),l=x+1);return new B(r,s)}};c(ye,"segmentFactories",[A.fromString,G.fromString,Y.fromString,U.fromString]);let ne=ye;function le(t,e){return ne.fromString(t,e)}function Ee(t,e){for(const r of[A.fromArray,G.fromArray,ne.fromArray]){const i=r(t,e);if(i!=null)return i}return null}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var Te=Object.prototype.toString,D=Array.isArray||function(t){return Te.call(t)==="[object Array]"};function ie(t){return typeof t=="function"}function Ve(t){return D(t)?"array":typeof t}function K(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function ue(t,e){return t!=null&&typeof t=="object"&&e in t}function Ie(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var Le=RegExp.prototype.test;function Pe(t,e){return Le.call(t,e)}var Ue=/\S/;function $e(t){return!Pe(Ue,t)}var De={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function Fe(t){return String(t).replace(/[&<>"'`=\/]/g,function(e){return De[e]})}var Re=/\s*/,ze=/\s+/,fe=/\s*=/,Ne=/\s*\}/,Be=/#|\^|\/|>|\{|&|=|!/;function He(t,e){if(!t)return[];var r=!1,i=[],n=[],a=[],o=!1,s=!1,l="",x=0;function v(){if(o&&!s)for(;a.length;)delete n[a.pop()];else a=[];o=!1,s=!1}var y,h,M;function j(O){if(typeof O=="string"&&(O=O.split(ze,2)),!D(O)||O.length!==2)throw new Error("Invalid tags: "+O);y=new RegExp(K(O[0])+"\\s*"),h=new RegExp("\\s*"+K(O[1])),M=new RegExp("\\s*"+K("}"+O[1]))}j(e||X.tags);for(var u=new R(t),d,f,m,C,E,p;!u.eos();){if(d=u.pos,m=u.scanUntil(y),m)for(var g=0,w=m.length;g<w;++g)C=m.charAt(g),$e(C)?(a.push(n.length),l+=C):(s=!0,r=!0,l+=" "),n.push(["text",C,d,d+1]),d+=1,C===`
`&&(v(),l="",x=0,r=!1);if(!u.scan(y))break;if(o=!0,f=u.scan(Be)||"name",u.scan(Re),f==="="?(m=u.scanUntil(fe),u.scan(fe),u.scanUntil(h)):f==="{"?(m=u.scanUntil(M),u.scan(Ne),u.scanUntil(h),f="&"):m=u.scanUntil(h),!u.scan(h))throw new Error("Unclosed tag at "+u.pos);if(f==">"?E=[f,m,d,u.pos,l,x,r]:E=[f,m,d,u.pos],x++,n.push(E),f==="#"||f==="^")i.push(E);else if(f==="/"){if(p=i.pop(),!p)throw new Error('Unopened section "'+m+'" at '+d);if(p[1]!==m)throw new Error('Unclosed section "'+p[1]+'" at '+d)}else f==="name"||f==="{"||f==="&"?s=!0:f==="="&&j(m)}if(v(),p=i.pop(),p)throw new Error('Unclosed section "'+p[1]+'" at '+u.pos);return Ye(Je(n))}function Je(t){for(var e=[],r,i,n=0,a=t.length;n<a;++n)r=t[n],r&&(r[0]==="text"&&i&&i[0]==="text"?(i[1]+=r[1],i[3]=r[3]):(e.push(r),i=r));return e}function Ye(t){for(var e=[],r=e,i=[],n,a,o=0,s=t.length;o<s;++o)switch(n=t[o],n[0]){case"#":case"^":r.push(n),i.push(n),r=n[4]=[];break;case"/":a=i.pop(),a[5]=n[2],r=i.length>0?i[i.length-1][4]:e;break;default:r.push(n)}return e}function R(t){this.string=t,this.tail=t,this.pos=0}R.prototype.eos=function(){return this.tail===""};R.prototype.scan=function(t){var e=this.tail.match(t);if(!e||e.index!==0)return"";var r=e[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};R.prototype.scanUntil=function(t){var e=this.tail.search(t),r;switch(e){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,e),this.tail=this.tail.substring(e)}return this.pos+=r.length,r};function $(t,e){this.view=t,this.cache={".":this.view},this.parent=e}$.prototype.push=function(t){return new $(t,this)};$.prototype.lookup=function(t){var e=this.cache,r;if(e.hasOwnProperty(t))r=e[t];else{for(var i=this,n,a,o,s=!1;i;){if(t.indexOf(".")>0)for(n=i.view,a=t.split("."),o=0;n!=null&&o<a.length;)o===a.length-1&&(s=ue(n,a[o])||Ie(n,a[o])),n=n[a[o++]];else n=i.view[t],s=ue(i.view,t);if(s){r=n;break}i=i.parent}e[t]=r}return ie(r)&&(r=r.call(this.view)),r};function b(){this.templateCache={_cache:{},set:function(t,e){this._cache[t]=e},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}b.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};b.prototype.parse=function(t,e){var r=this.templateCache,i=t+":"+(e||X.tags).join(":"),n=typeof r<"u",a=n?r.get(i):void 0;return a==null&&(a=He(t,e),n&&r.set(i,a)),a};b.prototype.render=function(t,e,r,i){var n=this.getConfigTags(i),a=this.parse(t,n),o=e instanceof $?e:new $(e,void 0);return this.renderTokens(a,o,r,t,i)};b.prototype.renderTokens=function(t,e,r,i,n){for(var a="",o,s,l,x=0,v=t.length;x<v;++x)l=void 0,o=t[x],s=o[0],s==="#"?l=this.renderSection(o,e,r,i,n):s==="^"?l=this.renderInverted(o,e,r,i,n):s===">"?l=this.renderPartial(o,e,r,n):s==="&"?l=this.unescapedValue(o,e):s==="name"?l=this.escapedValue(o,e,n):s==="text"&&(l=this.rawValue(o)),l!==void 0&&(a+=l);return a};b.prototype.renderSection=function(t,e,r,i,n){var a=this,o="",s=e.lookup(t[1]);function l(y){return a.render(y,e,r,n)}if(s){if(D(s))for(var x=0,v=s.length;x<v;++x)o+=this.renderTokens(t[4],e.push(s[x]),r,i,n);else if(typeof s=="object"||typeof s=="string"||typeof s=="number")o+=this.renderTokens(t[4],e.push(s),r,i,n);else if(ie(s)){if(typeof i!="string")throw new Error("Cannot use higher-order sections without the original template");s=s.call(e.view,i.slice(t[3],t[5]),l),s!=null&&(o+=s)}else o+=this.renderTokens(t[4],e,r,i,n);return o}};b.prototype.renderInverted=function(t,e,r,i,n){var a=e.lookup(t[1]);if(!a||D(a)&&a.length===0)return this.renderTokens(t[4],e,r,i,n)};b.prototype.indentPartial=function(t,e,r){for(var i=e.replace(/[^ \t]/g,""),n=t.split(`
`),a=0;a<n.length;a++)n[a].length&&(a>0||!r)&&(n[a]=i+n[a]);return n.join(`
`)};b.prototype.renderPartial=function(t,e,r,i){if(r){var n=this.getConfigTags(i),a=ie(r)?r(t[1]):r[t[1]];if(a!=null){var o=t[6],s=t[5],l=t[4],x=a;s==0&&l&&(x=this.indentPartial(a,l,o));var v=this.parse(x,n);return this.renderTokens(v,e,r,x,i)}}};b.prototype.unescapedValue=function(t,e){var r=e.lookup(t[1]);if(r!=null)return r};b.prototype.escapedValue=function(t,e,r){var i=this.getConfigEscape(r)||X.escape,n=e.lookup(t[1]);if(n!=null)return typeof n=="number"&&i===X.escape?String(n):i(n)};b.prototype.rawValue=function(t){return t[1]};b.prototype.getConfigTags=function(t){return D(t)?t:t&&typeof t=="object"?t.tags:void 0};b.prototype.getConfigEscape=function(t){if(t&&typeof t=="object"&&!D(t))return t.escape};var X={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){F.templateCache=t},get templateCache(){return F.templateCache}},F=new b;X.clearCache=function(){return F.clearCache()};X.parse=function(t,e){return F.parse(t,e)};X.render=function(t,e,r,i){if(typeof t!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+Ve(t)+'" was given as the first argument for mustache#render(template, view, partials)');return F.render(t,e,r,i)};X.escape=Fe;X.Scanner=R;X.Context=$;X.Writer=b;const xe={"*":{prefix:"每",suffix:"",text:"未知","*":{empty:{text:"每 {{field.id}}"},value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"每 {{every.value}}"}},month:{"*":{prefix:"的"},empty:{text:"每月"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"的"},empty:{text:"每日"},value:{text:"{{value.alt}}号"},range:{text:"{{start.alt}}号-{{end.alt}}号"}},dayOfWeek:{"*":{prefix:"的"},empty:{text:"一周的每一天"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},hour:{"*":{prefix:"的"},empty:{text:"每小时"}},minute:{"*":{prefix:":"},empty:{text:"每分钟"}},second:{"*":{prefix:":"},empty:{text:"每秒"}}},minute:{text:"分"},hour:{text:"小时",minute:{"*":{prefix:":",suffix:"分钟"},empty:{text:"每"}}},day:{text:"天"},week:{text:"周",dayOfWeek:{"*":{prefix:"的"},empty:{text:"每天"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}}},month:{text:"月",dayOfWeek:{"*":{prefix:"和"}},day:{"*":{prefix:"的"}}},year:{text:"年",dayOfWeek:{"*":{prefix:"和"}}},"q-second":{text:"秒"},"q-minute":{text:"分钟",second:{"*":{prefix:":",suffix:"秒"},empty:{text:"每"}}},"q-hour":{text:"小时",minute:{"*":{prefix:":"}}}},Ge={"*":{prefix:"Hver",suffix:"",text:"Ukendt","*":{empty:{text:"hver {{field.id}}"},value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"hver {{every.value}}"}},month:{"*":{prefix:"i"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"på"}},dayOfWeek:{"*":{prefix:"på"},empty:{text:"hver dag i ugen"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},hour:{"*":{prefix:"klokken"}},minute:{"*":{prefix:":"}}},minute:{text:"Minut"},hour:{text:"Time",minute:{"*":{prefix:"på de(t)",suffix:"minutter"},empty:{text:"hver"}}},day:{text:"Dag"},week:{text:"Uge"},month:{text:"Måned",dayOfWeek:{"*":{prefix:"og"}}},year:{text:"År",dayOfWeek:{"*":{prefix:"og"}}}},Qe={"*":{prefix:"Jede",suffix:"",text:"Unknown","*":{value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"alle {{every.value}}"}},month:{"*":{prefix:"im"},empty:{prefix:"in",text:"jedem Monat"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"den"},empty:{prefix:"an",text:"jedem Tag"},everyX:{prefix:"",text:"alle {{every.value}} Tage"},noSpecific:{prefix:"an",text:"keinem bestimmten Tag"}},dayOfWeek:{"*":{prefix:"am"},empty:{prefix:"an",text:"jedem Wochentag"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{prefix:"und",text:"keinem bestimmten Wochentag"}},hour:{"*":{prefix:"um"},empty:{prefix:"zu",text:"jeder Stunde"},everyX:{prefix:"",text:"alle {{every.value}} Stunden"}},minute:{"*":{prefix:":"},empty:{text:"jede Minute"},everyX:{prefix:"",text:"alle {{every.value}} Minuten"}},second:{"*":{prefix:":"},empty:{text:"jede Sekunde"},everyX:{prefix:"",text:"alle {{every.value}} Sekunden"}}},minute:{text:"Minute"},hour:{text:"Stunde",minute:{"*":{prefix:"zu",suffix:"Minute(n)"},empty:{text:"jeder"}}},day:{prefix:"Jeden",text:"Tag"},week:{text:"Woche"},month:{prefix:"Jedes",text:"Monat"},year:{prefix:"Jedes",text:"Jahr"},"q-second":{text:"Sekunde"},"q-minute":{text:"Minute",second:{"*":{prefix:"und"}}},"q-hour":{text:"Stunde",minute:{"*":{prefix:"und"}},second:{"*":{prefix:"und"}}}},Ze={"*":{prefix:"Every",suffix:"",text:"Unknown","*":{empty:{text:"every {{field.id}}"},value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"every {{every.value}}"}},month:{"*":{prefix:"in"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"on"},noSpecific:{text:"no specific day"}},dayOfWeek:{"*":{prefix:"on"},empty:{text:"every day of the week"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{text:"no specific day of the week"}},hour:{"*":{prefix:"at"}},minute:{"*":{prefix:":"}},second:{"*":{prefix:":"}}},minute:{text:"Minute"},hour:{text:"Hour",minute:{"*":{prefix:"at",suffix:"minute(s)"},empty:{text:"every"}}},day:{text:"Day"},week:{text:"Week"},month:{text:"Month",dayOfWeek:{"*":{prefix:"and"}}},year:{text:"Year",dayOfWeek:{"*":{prefix:"and"}}},"q-second":{text:"Second"},"q-minute":{text:"Minute",second:{"*":{prefix:"at",suffix:"second(s)"},empty:{text:"every"}}},"q-hour":{text:"Hour",minute:{"*":{prefix:"at"}}}},Ke={"*":{prefix:"todos los",suffix:"",text:"Desconocido","*":{empty:{text:"todos los {{ field.id }}"},value:{text:"{{ value.text }}"},range:{text:"{{ start.text }}-{{ end.text }}"},everyX:{text:"todos/as {{ every.value }}"}},month:{"*":{prefix:"en"},empty:{text:"todos los meses"},value:{text:"{{ value.alt }}"},range:{text:"{{ start.alt }}-{{ end.alt }}"}},day:{"*":{prefix:"en"},empty:{text:"todos los días"},value:{text:"los días {{ value.alt }}"}},dayOfWeek:{"*":{prefix:"de"},empty:{text:"todos los días de la semana"},value:{text:"los {{ value.alt }}"},range:{text:"{{ start.alt }}-{{ end.alt }}"}},hour:{"*":{prefix:"a"},empty:{text:"todas las horas"},value:{text:"las {{ value.text }}"}},minute:{"*":{prefix:":"},empty:{text:"todos los minutos"}}},minute:{prefix:"todos los",text:"minutos"},hour:{prefix:"todas las",text:"horas",minute:{"*":{prefix:"a los",suffix:"minutos"},empty:{text:"todos",prefix:"a",suffix:"los minutos"}}},day:{text:"Días"},week:{text:"Semanas"},month:{text:"Meses",dayOfWeek:{"*":{prefix:"y"}}},year:{text:"años",dayOfWeek:{"*":{prefix:"y"}}}},_e={"*":{prefix:"Toutes",suffix:"",text:"Inconnu","*":{value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"tous les {{every.value}}"}},month:{"*":{prefix:"en"},empty:{prefix:"en",text:"tous les mois"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"le"},empty:{prefix:"à",text:"tous les jours"},everyX:{prefix:"",text:"tous les {{every.value}} jours"},noSpecific:{prefix:"à",text:"aucun jour particulier"}},dayOfWeek:{"*":{prefix:"le"},empty:{prefix:"à",text:"tous les jours de la semaine"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{prefix:"et",text:"aucun jour de la semaine particulier"}},hour:{"*":{prefix:"à"},empty:{prefix:"à",text:"toutes les heures"},everyX:{prefix:"",text:"toutes les {{every.value}} heures"}},minute:{"*":{prefix:":"},empty:{text:"toutes les minutes"},everyX:{prefix:"",text:"toutes les {{every.value}} minutes"}},second:{"*":{prefix:":"},empty:{text:"toutes les secondes"},everyX:{prefix:"",text:"toutes les {{every.value}} secondes"}}},minute:{text:"Minute"},hour:{text:"Heure",minute:{"*":{prefix:"à",suffix:"minute(s)"},empty:{text:"toutes"}}},day:{prefix:"Tous",text:"Jour"},week:{text:"Semaine"},month:{prefix:"Tous",text:"Mois"},year:{prefix:"Tous",text:"Année"},"q-second":{text:"Seconde"},"q-minute":{text:"Minute",second:{"*":{prefix:"et"}}},"q-hour":{text:"Heure",minute:{"*":{prefix:"et"}},second:{"*":{prefix:"et"}}}},et={"*":{prefix:"בכל",suffix:"",text:"לא ידוע","*":{value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"כל {{every.value}}"}},month:{"*":{prefix:"ב"},empty:{text:"כל חודש"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"ב"},empty:{text:"כל יום"},value:{text:"יום {{value.alt}} לחודש"},noSpecific:{text:"ללא יום מוגדר"}},dayOfWeek:{"*":{prefix:"ב"},empty:{text:"כל יום מימות השבוע"},value:{text:"ימי {{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{text:"ללא יום בשבוע מוגדר"}},hour:{"*":{prefix:"ב"},empty:{text:"כל שעה"},value:{text:"שעה {{value.text}}"}},minute:{"*":{prefix:":"},empty:{text:"כל דקה"}},second:{"*":{prefix:":"},empty:{text:"כל שניה"}}},minute:{text:"דקה"},hour:{text:"שעה",minute:{"*":{prefix:"ב",suffix:"דקות"},empty:{text:"כל"}}},day:{text:"יום"},week:{text:"שבוע"},month:{text:"חודש",dayOfWeek:{"*":{prefix:"ו"}}},year:{text:"שנה",dayOfWeek:{"*":{prefix:"ו"}}},"q-second":{text:"שניה"},"q-minute":{text:"דקה",second:{"*":{prefix:"ב",suffix:"שניות"},empty:{text:"כל"}}},"q-hour":{text:"שעה",minute:{"*":{prefix:"ב"}}}},tt={"*":{prefix:"हर",suffix:"",text:"अज्ञात","*":{value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"{{every.value}} हर"}},month:{"*":{prefix:"में"},empty:{prefix:"के",text:"हर महीने"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"के"},empty:{prefix:"पर",text:"हर दिन"},everyX:{prefix:"",text:"{{every.value}} दिन हर"},noSpecific:{prefix:"पर",text:"कोई विशेष दिन नहीं"}},dayOfWeek:{"*":{prefix:"पर"},empty:{prefix:"पर",text:"हर सप्ताह"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{prefix:"और",text:"कोई विशेष सप्ताह नहीं"}},hour:{"*":{prefix:"को"},empty:{prefix:"पर",text:"हर घंटे"},everyX:{prefix:"",text:"{{every.value}} घंटे हर"}},minute:{"*":{prefix:":"},empty:{text:"हर मिनट"},everyX:{prefix:"",text:"{{every.value}} मिनट हर"}},second:{"*":{prefix:":"},empty:{text:"हर सेकंड"},everyX:{prefix:"",text:"{{every.value}} सेकंड हर"}}},minute:{text:"मिनट"},hour:{text:"घंटा",minute:{"*":{prefix:"पर",suffix:"मिनट"},empty:{text:"हर"}}},day:{prefix:"हर",text:"दिन"},week:{text:"सप्ताह"},month:{prefix:"हर",text:"महीना"},year:{prefix:"हर",text:"साल"},"q-second":{text:"सेकंड"},"q-minute":{text:"मिनट",second:{"*":{prefix:"और"}}},"q-hour":{text:"घंटा",minute:{"*":{prefix:"और"}},second:{"*":{prefix:"और"}}}},rt={"*":{prefix:"毎",suffix:"",text:"不明","*":{value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"{{every.value}}ごとに"}},month:{"*":{prefix:"に"},empty:{prefix:"の",text:"毎月"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"の"},empty:{prefix:"に",text:"毎日"},everyX:{prefix:"",text:"{{every.value}}日ごとに"},noSpecific:{prefix:"に",text:"特定の日はなし"}},dayOfWeek:{"*":{prefix:"の"},empty:{prefix:"に",text:"毎週"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{prefix:"と",text:"特定の曜日はなし"}},hour:{"*":{prefix:"の"},empty:{prefix:"に",text:"毎時"},everyX:{prefix:"",text:"{{every.value}}時間ごとに"}},minute:{"*":{prefix:":"},empty:{text:"毎分"},everyX:{prefix:"",text:"{{every.value}}分ごとに"}},second:{"*":{prefix:":"},empty:{text:"毎秒"},everyX:{prefix:"",text:"{{every.value}}秒ごとに"}}},minute:{text:"分"},hour:{text:"時",minute:{"*":{prefix:"に",suffix:"分"},empty:{text:"毎"}}},day:{prefix:"毎",text:"日"},week:{text:"週"},month:{prefix:"毎",text:"月"},year:{prefix:"毎",text:"年"},"q-second":{text:"秒"},"q-minute":{text:"分",second:{"*":{prefix:"と"}}},"q-hour":{text:"時",minute:{"*":{prefix:"と"}},second:{"*":{prefix:"と"}}}},nt={"*":{prefix:"매",suffix:"",text:"알 수 없음","*":{value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"{{every.value}}마다"}},month:{"*":{prefix:"에"},empty:{prefix:"의",text:"매월"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"의"},empty:{prefix:"에",text:"매일"},everyX:{prefix:"",text:"{{every.value}}일마다"},noSpecific:{prefix:"에",text:"특정한 날 없음"}},dayOfWeek:{"*":{prefix:"의"},empty:{prefix:"에",text:"매주"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{prefix:"과",text:"특정한 요일 없음"}},hour:{"*":{prefix:"의"},empty:{prefix:"에",text:"매시"},everyX:{prefix:"",text:"{{every.value}}시간마다"}},minute:{"*":{prefix:":"},empty:{text:"매분"},everyX:{prefix:"",text:"{{every.value}}분마다"}},second:{"*":{prefix:":"},empty:{text:"매초"},everyX:{prefix:"",text:"{{every.value}}초마다"}}},minute:{text:"분"},hour:{text:"시",minute:{"*":{prefix:"에",suffix:"분"},empty:{text:"매"}}},day:{prefix:"매",text:"일"},week:{text:"주"},month:{prefix:"매",text:"월"},year:{prefix:"매",text:"년"},"q-second":{text:"초"},"q-minute":{text:"분",second:{"*":{prefix:"와"}}},"q-hour":{text:"시",minute:{"*":{prefix:"와"}},second:{"*":{prefix:"와"}}}},it={"*":{prefix:"Todo(a)",suffix:"",text:"Desconhecido","*":{empty:{text:"todo {{field.id}}"},value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"todo {{every.value}}"}},month:{"*":{prefix:"de"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},empty:{text:"todo mês"}},day:{"*":{prefix:"no(s) dia(s)"},empty:{text:"todos"}},dayOfWeek:{"*":{prefix:"de"},empty:{text:"todos dias da semana"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},hour:{"*":{prefix:"às"},empty:{text:"cada hora"}},minute:{"*":{prefix:":"},empty:{text:"cada minuto"}}},minute:{text:"Minuto"},hour:{text:"Hora",minute:{"*":{prefix:"e",suffix:"minuto(s)"},empty:{text:"cada"}}},day:{text:"Dia"},week:{text:"Semana"},month:{text:"Mês",dayOfWeek:{"*":{prefix:"e de"}}},year:{text:"Ano",dayOfWeek:{"*":{prefix:"e de"}}}},at={"*":{prefix:"Каждый",suffix:"",text:"Неизвестно","*":{value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"каждый {{every.value}}"}},month:{"*":{prefix:"в"},empty:{prefix:"в",text:"каждом месяце"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"в"},empty:{prefix:"в",text:"каждый день"},everyX:{prefix:"",text:"каждые {{every.value}} дня"},noSpecific:{prefix:"в",text:"нет определенного дня"}},dayOfWeek:{"*":{prefix:"по"},empty:{prefix:"по",text:"каждому дню недели"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{prefix:"и",text:"нет определенного дня недели"}},hour:{"*":{prefix:"в"},empty:{prefix:"в",text:"каждый час"},everyX:{prefix:"",text:"каждые {{every.value}} часа"}},minute:{"*":{prefix:":"},empty:{text:"каждую минуту"},everyX:{prefix:"",text:"каждые {{every.value}} минуты"}},second:{"*":{prefix:":"},empty:{text:"каждую секунду"},everyX:{prefix:"",text:"каждые {{every.value}} секунды"}}},minute:{text:"Минута"},hour:{text:"Час",minute:{"*":{prefix:"в",suffix:"минут(а/ы)"},empty:{text:"каждый"}}},day:{prefix:"Каждый",text:"День"},week:{text:"Неделя"},month:{prefix:"Каждый",text:"Месяц"},year:{prefix:"Каждый",text:"Год"},"q-second":{text:"Секунда"},"q-minute":{text:"Минута",second:{"*":{prefix:"и"}}},"q-hour":{text:"Час",minute:{"*":{prefix:"и"}},second:{"*":{prefix:"и"}}}},_={empty:{},en:Ze,de:Qe,pt:it,es:Ke,da:Ge,zh:xe,"zh-cn":xe,he:et,ru:at,fr:_e,hi:tt,ja:rt,ko:nt};class st{constructor(e){c(this,"dict"),this.dict=e}getLocaleStr(...e){const r=e.map(i=>[i,"*"]);return de(this.dict,...r)||""}render(e,r,i,n,a){const o=this.getLocaleStr(e,r,i,n);return X.render(o,a||{})}}function ot(t,e){const[r]=t.split("-"),i=_[t.toLowerCase()]||_[r.toLowerCase()]||_.en,n=te(i,e||{});return new st(n)}function lt(t){const{period:e,field:r,initialCron:i="*",locale:n}=t,a=k(i),o=k(""),s=k([]),l=k(""),x=k(""),v=k(""),y=u=>{const d=u instanceof ne?u.segments:[u];l.value=d.map(f=>n.render(e.value.id,r.id,f.type,I.Text,{field:r,...f.items})).join(","),x.value=n.getLocaleStr(e.value.id,r.id,u.type,I.Prefix),v.value=n.getLocaleStr(e.value.id,r.id,u.type,I.Suffix)},h=u=>{const d=le(u,r);d!=null?(s.value=d.toArray(),y(d)):o.value=`${u} is not a valid cron segment (${r.id})`},M=u=>{if(a.value=="?"&&u.length==0)return;const d=Ee(u,r);d!=null?(a.value=d.toCron(),y(d)):o.value=`failed to convert ${u} to cron (${r.id})`};h(i);const j=u=>{const d=Array.from(u).sort((f,m)=>f>m?1:-1);s.value=d};return S(a,u=>{h(u)}),S(s,u=>{M(u)}),S(e,()=>{const u=le(a.value,r);u!=null&&y(u)}),{id:r.id,items:r.items,cron:a,selected:s,error:o,select:j,text:l,prefix:x,suffix:v}}function he(t,e="*"){return new Array(t).fill(e).join(" ")}function ut(t){return t!==void 0}class ft{constructor(){c(this,"locale","en"),c(this,"format","crontab")}initialValue(e,r="*"){return he(e,r)}fields(e,r){const i=e=="quartz",n=qe(r,e),a=o=>(s,{segmentMap:l})=>{if(s.cron.value=="?")return;const x=l.get(o);x&&(x.cron.value="?")};return[...i?[{id:"second",items:n.secondItems}]:[],{id:"minute",items:n.minuteItems},{id:"hour",items:n.hourItems},{id:"day",items:n.dayItems,onChange:i?a("dayOfWeek"):void 0,segmentFactories:i?[A.fromString,J.fromString,G.fromString,Y.fromString,U.fromString]:void 0},{id:"month",items:n.monthItems},{id:"dayOfWeek",items:n.dayOfWeekItems,onChange:i?a("day"):void 0,segmentFactories:i?[A.fromString,J.fromString,G.fromString,Y.fromString,U.fromString]:void 0}]}periods(e){const r=e=="quartz",i=r?[{id:"q-second",value:[]}]:[],n=r?["second"]:[],a=r?"q-":"";return[...i,{id:a+"minute",value:[...n]},{id:a+"hour",value:["minute",...n]},{id:"day",value:["hour","minute",...n]},{id:"week",value:["dayOfWeek","hour","minute",...n]},{id:"month",value:["day","dayOfWeek","hour","minute",...n]},{id:"year",value:["month","day","dayOfWeek","hour","minute",...n]}]}}function xt(t,e,r){const i=e.split(" ");if(i.length!==r.length)return;const n=r.filter((a,o)=>!["*","?"].includes(i[o])).map(a=>a.id);return t.find(a=>{const o=new Set(a.value);return n.every(s=>o.has(s))})}function pt(t){const e=new ft,r=t.locale??e.locale,i=t.format??e.format,{customLocale:n,fields:a=e.fields(i,r)}=t,o=t.initialValue??e.initialValue(a.length),s=ot(r,n),l=(t.periods??e.periods(i)).map(p=>({...p,text:p.text??s.getLocaleStr(p.id,I.Text)})),x=(t.initialPeriod?l.find(p=>p.id==t.initialPeriod):void 0)??xt([...l].reverse(),o,a)??l[l.length-1],v=k(o),y=k(""),h=k(x),M=k(""),j=k(""),u=a.map(p=>lt({field:new Oe(p),locale:s,period:h})),d=new Map(u.map(p=>[p.id,p])),f=ce(()=>h.value.value.map(p=>{const g=d.get(p);if(ut(g))return g;throw Error("${fieldId} not found")})),m=p=>{if(!p){v.value=he(a.length);return}const g=p.split(" ");if(g.length!==a.length){y.value="invalid pattern";return}for(let w=0;w<g.length;w++)u[w].cron.value!=g[w]&&(u[w].cron.value=g[w]);y.value=""};m(o);const C=()=>{v.value=u.map(p=>h.value.value.includes(p.id)||p.cron.value=="?"?p.cron.value:"*").join(" ")},E=()=>{M.value=s.getLocaleStr(h.value.id,I.Prefix),j.value=s.getLocaleStr(h.value.id,I.Suffix)};return E(),S(v,m),S(h,()=>{C(),E()}),u.forEach((p,g)=>{S(p.cron,()=>{var w,O;(O=(w=a[g]).onChange)==null||O.call(w,p,{segmentMap:d}),C()}),S(p.error,w=>{y.value=w})}),{cron:v,error:y,segments:u,selected:f,period:{select:p=>{const g=l.map(w=>w.id).indexOf(p);g!=-1&&(h.value=l[g])},selected:h,items:l,prefix:M,suffix:j}}}function ct(t,{emit:e}){const r={...t,initialValue:t.modelValue,initialPeriod:t.period},i=pt(r);return S(()=>t.modelValue,n=>{n&&(i.cron.value=n)}),S(()=>t.period,n=>{n&&i.period.select(n)}),S(i.cron,n=>{e("update:model-value",n)}),S(i.period.selected,n=>{e("update:period",n.id)}),S(i.error,n=>{e("error",n)}),i}const dt=()=>({modelValue:{type:String},period:{type:String},format:{type:String},locale:{type:String},fields:{type:Array},periods:{type:Array},customLocale:{type:Object},cols:{type:Object,default:()=>({second:5,minute:5,hour:4,day:4})},disabled:{type:Boolean,default:!1}});function mt(t){const{items:e}=t,r=new Set,i=k(0),n=()=>{i.value=i.value+1},a=l=>{e.indexOf(l)!=-1&&(r.add(l),n())},o=l=>r.has(l),s=l=>{r.delete(l)&&n()};return{values:r,add:a,toggle:l=>{o(l)?s(l):a(l)},remove:s,clear:()=>{r.clear(),n()},updated:i,equals:l=>{if(l.length!=r.size)return!1;for(const x of l)if(!r.has(x))return!1;return!0}}}function vt(){return{modelValue:{type:[String,Number,Array]},selection:{type:String},clearable:{type:Boolean,default:!1},items:{type:Array,default:()=>[]},multiple:{type:Boolean,default:!1},cols:{type:Number,default:1},itemText:{type:[String,Function],default:"text"},itemValue:{type:[String,Function],default:"value"},disabled:{type:Boolean,default:!1}}}function yt(t){const{items:e,cols:r=1,multiple:i=!1,itemText:n="text",itemValue:a="value"}=t,o=mt(t),s=i?k([]):k(null),l=k(""),x=f=>{i?o.toggle(f):(o.clear(),o.add(f))},v=f=>{if(f===null)return!1;const m=y(f);return Array.isArray(s.value)?s.value.includes(m):s.value===m},y=f=>typeof a=="function"?a(f):f[a],h=f=>typeof n=="function"?n(f):f[n],M=new Map(e.map(f=>[y(f),f])),j=f=>{o.equals(f)||(o.clear(),f.forEach(m=>x(m)))},u=f=>{f=Array.isArray(f)?f:[f];const m=f.map(C=>M.get(C)).filter(C=>!!C);j(m)};S(o.updated,()=>{const f=Array.from(o.values);s.value=i?f.map(y):y(f[0]),l.value=f.map(h).join(",")});const d=ce(()=>i?!Array.isArray(s.value)||s.value.length==0:!!s.value);return{...o,select:x,selected:s,selectedStr:l,itemRows:Ae(e,r),setItems:j,setValues:u,isEmpty:d,has:v}}function ht(t,e,{emit:r}){const i=yt(t);return S(i.selected,()=>{r("update:model-value",i.selected.value)}),S(e,n=>{n&&i.setValues(n)},{immediate:!0}),i}const gt=pe({name:"CustomSelect",props:{...vt()},emits:["update:model-value"],setup(t,e){const r=ht(t,()=>t.modelValue,e),i=k(!1),n=()=>{i.value=!1,document.removeEventListener("click",n)};return{...r,menu:i,toggleMenu:()=>{i.value=!i.value,i.value?setTimeout(()=>{document.addEventListener("click",n)},1):document.removeEventListener("click",n)}}}}),ge=(t,e)=>{const r=t.__vccOpts||t;for(const[i,n]of e)r[i]=n;return r},kt={class:"vcron-select-container"},wt={key:0,class:"vcron-select-list"},St=["onClick"],bt={key:0};function Ct(t,e,r,i,n,a){return W(),q("div",kt,[V("span",{class:ae(["vcron-select-input",{"vcron-select-disabled":t.disabled}]),onClick:e[1]||(e[1]=()=>{t.disabled||t.toggleMenu()})},[ke(P(t.selection??t.selectedStr)+" ",1),t.clearable&&!t.isEmpty?(W(),q("span",{key:0,onClick:e[0]||(e[0]=(...o)=>t.clear&&t.clear(...o))},"✕")):Q("",!0)],2),t.menu?(W(),q("div",wt,[(W(!0),q(H,null,ee(t.itemRows,(o,s)=>(W(),q("div",{class:"vcron-select-row",key:s},[(W(!0),q(H,null,ee(o,(l,x)=>(W(),q("div",{key:s+"-"+x,class:ae(["vcron-select-col",{"vcron-select-selected":t.has(l)}]),onClick:[v=>t.select(l),e[2]||(e[2]=we(v=>t.multiple?()=>{}:t.toggleMenu(),["stop"]))]},[l?(W(),q("div",bt,P(l.text),1)):Q("",!0)],10,St))),128))]))),128))])):Q("",!0)])}const Ot=ge(gt,[["render",Ct]]),Xt=()=>({...dt()}),Wt=pe({name:"CronLight",components:{CustomSelect:Ot},emits:["update:model-value","update:period","error"],props:Xt(),setup(t,e){return ct(t,e)}}),qt={class:"vcron-editor"},jt={class:"vcron-l-spacer"},Mt={class:"vcron-l-spacer"};function At(t,e,r,i,n,a){const o=Se("custom-select");return W(),q("span",qt,[V("span",null,P(t.period.prefix.value),1),V("div",jt,[se(o,{"model-value":t.period.selected.value.id,"item-value":"id",items:t.period.items,"onUpdate:modelValue":e[0]||(e[0]=s=>t.period.select(s)),cols:t.cols.period||1,disabled:t.disabled},null,8,["model-value","items","cols","disabled"])]),V("span",null,P(t.period.suffix.value),1),(W(!0),q(H,null,ee(t.selected,s=>(W(),q(H,{key:s.id},[V("span",null,P(s.prefix.value),1),V("div",Mt,[se(o,{"model-value":s.selected.value,"onUpdate:modelValue":l=>s.select(l),items:s.items,cols:t.cols[s.id]||1,selection:s.text.value,multiple:"",clearable:"",disabled:t.disabled},null,8,["model-value","onUpdate:modelValue","items","cols","selection","disabled"])]),V("span",null,P(s.suffix.value),1)],64))),128))])}const Et=ge(Wt,[["render",At]]),Vt={install:t=>{t.component("CronLight",Et)}};export{Et as CronLight,Vt as CronLightPlugin,Xt as cronLightProps,Vt as default};