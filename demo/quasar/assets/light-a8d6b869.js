import{O as fe,w as C,f as w,e as de,a3 as O,a4 as A,ab as V,I as ge,L as P,aa as Y,F as B,a6 as ee,ad as we,K as ke,a2 as Se,b as ae}from"./index-00b8ee8e.js";var Ce=Object.defineProperty,be=(t,e,n)=>e in t?Ce(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,p=(t,e,n)=>(be(t,typeof e!="symbol"?e+"":e,n),n),U=(t=>(t.Empty="empty",t.Value="value",t.Range="range",t.EveryX="everyX",t.Combined="combined",t.NoSpecific="noSpecific",t))(U||{}),T=(t=>(t.Prefix="prefix",t.Suffix="suffix",t.Text="text",t))(T||{});class Me{constructor(e){p(this,"field"),p(this,"itemMap"),this.field=e,this.itemMap=this.field.items.reduce((n,i)=>(n[i.value]=i,n),{})}get id(){return this.field.id}get items(){return this.field.items}get onChange(){return this.field.onChange}get segmentFactories(){return this.field.segmentFactories}get min(){return this.items[0].value}get max(){return this.items[this.items.length-1].value}getItem(e){return this.itemMap[e]}}function Oe(t,e,n=1){const i=[];for(let r=t;r<=e;r+=n)i.push(r);return i}class Ae{constructor(e,n,i=1){return p(this,"start"),p(this,"end"),p(this,"step"),this.start=e,this.end=n,this.step=i,new Proxy(this,{get:function(r,a){const o=typeof a=="string"?parseInt(a):a;return typeof o=="number"&&o>=0&&o<=r.length?r.start+r.step*o:Reflect.get(r,a)}})}get length(){return(this.end-this.start)/this.step+1}[Symbol.iterator](){let e=-1;return{next:()=>({value:this[++e],done:this[e+1]===void 0})}}}function D(t,e,n=r=>r+"",i=r=>r+""){const r=[];for(const a of new Ae(t,e))r.push({text:n(a),alt:i(a),value:a});return r}function We(t){return{secondItems:D(0,59,e=>Z(e,2)),minuteItems:D(0,59,e=>Z(e,2)),hourItems:D(0,23,e=>Z(e,2)),dayItems:D(1,31),monthItems:D(1,12,e=>new Date(2021,e-1,1).toLocaleDateString(t,{month:"long"}),e=>new Date(2021,e-1,1).toLocaleDateString(t,{month:"short"})),dayOfWeekItems:D(0,6,e=>new Date(2021,0,3+e).toLocaleDateString(t,{weekday:"long"}),e=>new Date(2021,0,3+e).toLocaleDateString(t,{weekday:"short"}))}}function Z(t,e){const n=t+"";return n.length<e?new Array(e-n.length).fill("0").join("")+t:n}function z(t){return t&&typeof t=="object"&&!Array.isArray(t)}function te(t,...e){if(!z(t)||e.length===0)return;const n=e.shift();if(z(n))for(const[i,r]of Object.entries(n))z(r)?(z(t[i])||(t[i]={}),te(t[i],n[i])):t[i]=n[i];return e.length>0&&te(t,e),t}function pe(t,...e){if(e.length===0)return t;for(const n of e[0])if(n in t){const i=pe(t[n],...e.slice(1));if(i!==void 0)return i}}function je(t){for(let e=1;e<t.length;e++)if(t[e-1]+1!==t[e])return!1;return!0}function Ee(){throw new Error("not implemented")}function Ie(t,e,n=!0){const i=[];for(let r=0;r<t.length;r+=e){const a=t.slice(r,r+e);for(;n&&a.length<e;)a.push(null);i.push(a)}return i}class H{constructor(e){p(this,"field"),p(this,"type",U.NoSpecific),this.field=e}toCron(){return"?"}toArray(){return[]}get items(){return{}}static fromString(e,n){return e!=="?"?null:new H(n)}}class E{constructor(e){p(this,"field"),p(this,"type",U.Empty),this.field=e}toCron(){return"*"}toArray(){return[]}get items(){return{}}static fromString(e,n){return e!=="*"?null:new E(n)}static fromArray(e,n){const{items:i}=n;if(e.length===0)return new E(n);if(e.length!==i.length)return null;for(const r of i)if(!e.includes(r.value))return null;return je(i.map(r=>r.value))?new E(n):null}}const me=class ne{constructor(e,n,i){p(this,"field"),p(this,"type",U.Range),p(this,"start"),p(this,"end"),this.field=e,this.start=n,this.end=i}toCron(){return`${this.start}-${this.end}`}toArray(){const e=this.start,n=this.end;return Oe(e,n)}get items(){return{start:this.field.itemMap[this.start],end:this.field.itemMap[this.end]}}static fromString(e,n){if(!ne.re.test(e))return null;const{min:i,max:r}=n,a=e.split("-"),o=parseInt(a[0]),s=parseInt(a[1]);return o>s||o<i||s>r?null:new ne(n,o,s)}};p(me,"re",/^\d+-\d+$/);let K=me;const oe=(t,e,n)=>{const i=t*Math.floor(e/t),r=[];for(let a=i;a<=n;a+=t)a>=e&&r.push(a);return r},he=class N{constructor(e,n){p(this,"field"),p(this,"type",U.EveryX),p(this,"every"),this.field=e,this.every=n}toCron(){return`*/${this.every}`}toArray(){const{min:e,max:n}=this.field;return oe(this.every,e,n)}get items(){return{every:this.field.itemMap[this.every]}}static fromString(e,n){if(!N.re.test(e))return null;const[,i]=e.split("/"),r=parseInt(i),{min:a,max:o}=n;return oe(r,a,o).length==0?null:new N(n,r)}static fromArray(e,n){const{min:i,max:r}=n;if(e.length<3)return null;const a=e[1]-e[0];if(a<=1)return null;const o=i%a===0?i:(Math.floor(i/a)+1)*a;if(e.length!==Math.floor((r-o)/a)+1)return null;for(const s of e)if(s%a!==0)return null;return new N(n,a)}};p(he,"re",/^\*\/\d+$/);let G=he;class q{constructor(e,n){p(this,"field"),p(this,"type",U.Value),p(this,"value"),this.field=e,this.value=n}toCron(){return`${this.value}`}toArray(){return[this.value]}get items(){return{value:this.field.itemMap[this.value]}}static fromString(e,n){const{min:i,max:r}=n,a=parseInt(e);return String(a)===e&&a>=i&&a<=r?new q(n,a):null}static fromArray(e,n){const{min:i,max:r}=n;if(e.length!=1)return null;const a=e[0];return a<i||a>r?null:a}}const xe=class J{constructor(e,n=[]){p(this,"field"),p(this,"segments"),this.field=e,this.segments=n}get type(){return this.segments.length==1?this.segments[0].type:U.Range}addSegment(e){this.segments.push(e)}toCron(){return this.segments.map(e=>e.toCron()).join(",")}toArray(){const e=new Set;for(const n of this.segments)n.toArray().forEach(i=>e.add(i));return Array.from(e)}get items(){return Ee()}static fromString(e,n){const i=n.segmentFactories??J.segmentFactories;let r=[];for(const a of e.split(",")){if(a==="*"){r=[new E(n)];break}let o=null;for(const s of i)if(o=s(a,n),o!==null)break;if(o===null)return null;r.push(o)}return new J(n,r)}static fromArray(e,n){const{min:i,max:r}=n,a=e[0],o=e[e.length-1];if(a<i||o>r)return null;const s=[];let l=0;for(let f=0;f<e.length;f++)(e[f+1]===void 0||e[f+1]-e[f]>1)&&(f===l?s.push(new q(n,e[l])):s.push(new K(n,e[l],e[f])),l=f+1);return new J(n,s)}};p(xe,"segmentFactories",[E.fromString,G.fromString,K.fromString,q.fromString]);let re=xe;function se(t,e){return re.fromString(t,e)}function Le(t,e){for(const n of[E.fromArray,G.fromArray,re.fromArray]){const i=n(t,e);if(i!=null)return i}return null}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var Ve=Object.prototype.toString,F=Array.isArray||function(t){return Ve.call(t)==="[object Array]"};function ie(t){return typeof t=="function"}function Te(t){return F(t)?"array":typeof t}function Q(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function le(t,e){return t!=null&&typeof t=="object"&&e in t}function Ue(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var De=RegExp.prototype.test;function Pe(t,e){return De.call(t,e)}var qe=/\S/;function Xe(t){return!Pe(qe,t)}var Fe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function $e(t){return String(t).replace(/[&<>"'`=\/]/g,function(e){return Fe[e]})}var Re=/\s*/,ze=/\s+/,ue=/\s*=/,Ne=/\s*\}/,Je=/#|\^|\/|>|\{|&|=|!/;function Be(t,e){if(!t)return[];var n=!1,i=[],r=[],a=[],o=!1,s=!1,l="",f=0;function h(){if(o&&!s)for(;a.length;)delete r[a.pop()];else a=[];o=!1,s=!1}var y,v,W;function j(b){if(typeof b=="string"&&(b=b.split(ze,2)),!F(b)||b.length!==2)throw new Error("Invalid tags: "+b);y=new RegExp(Q(b[0])+"\\s*"),v=new RegExp("\\s*"+Q(b[1])),W=new RegExp("\\s*"+Q("}"+b[1]))}j(e||M.tags);for(var u=new R(t),c,m,x,I,L,d;!u.eos();){if(c=u.pos,x=u.scanUntil(y),x)for(var g=0,k=x.length;g<k;++g)I=x.charAt(g),Xe(I)?(a.push(r.length),l+=I):(s=!0,n=!0,l+=" "),r.push(["text",I,c,c+1]),c+=1,I===`
`&&(h(),l="",f=0,n=!1);if(!u.scan(y))break;if(o=!0,m=u.scan(Je)||"name",u.scan(Re),m==="="?(x=u.scanUntil(ue),u.scan(ue),u.scanUntil(v)):m==="{"?(x=u.scanUntil(W),u.scan(Ne),u.scanUntil(v),m="&"):x=u.scanUntil(v),!u.scan(v))throw new Error("Unclosed tag at "+u.pos);if(m==">"?L=[m,x,c,u.pos,l,f,n]:L=[m,x,c,u.pos],f++,r.push(L),m==="#"||m==="^")i.push(L);else if(m==="/"){if(d=i.pop(),!d)throw new Error('Unopened section "'+x+'" at '+c);if(d[1]!==x)throw new Error('Unclosed section "'+d[1]+'" at '+c)}else m==="name"||m==="{"||m==="&"?s=!0:m==="="&&j(x)}if(h(),d=i.pop(),d)throw new Error('Unclosed section "'+d[1]+'" at '+u.pos);return Ke(He(r))}function He(t){for(var e=[],n,i,r=0,a=t.length;r<a;++r)n=t[r],n&&(n[0]==="text"&&i&&i[0]==="text"?(i[1]+=n[1],i[3]=n[3]):(e.push(n),i=n));return e}function Ke(t){for(var e=[],n=e,i=[],r,a,o=0,s=t.length;o<s;++o)switch(r=t[o],r[0]){case"#":case"^":n.push(r),i.push(r),n=r[4]=[];break;case"/":a=i.pop(),a[5]=r[2],n=i.length>0?i[i.length-1][4]:e;break;default:n.push(r)}return e}function R(t){this.string=t,this.tail=t,this.pos=0}R.prototype.eos=function(){return this.tail===""};R.prototype.scan=function(t){var e=this.tail.match(t);if(!e||e.index!==0)return"";var n=e[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n};R.prototype.scanUntil=function(t){var e=this.tail.search(t),n;switch(e){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,e),this.tail=this.tail.substring(e)}return this.pos+=n.length,n};function X(t,e){this.view=t,this.cache={".":this.view},this.parent=e}X.prototype.push=function(t){return new X(t,this)};X.prototype.lookup=function(t){var e=this.cache,n;if(e.hasOwnProperty(t))n=e[t];else{for(var i=this,r,a,o,s=!1;i;){if(t.indexOf(".")>0)for(r=i.view,a=t.split("."),o=0;r!=null&&o<a.length;)o===a.length-1&&(s=le(r,a[o])||Ue(r,a[o])),r=r[a[o++]];else r=i.view[t],s=le(i.view,t);if(s){n=r;break}i=i.parent}e[t]=n}return ie(n)&&(n=n.call(this.view)),n};function S(){this.templateCache={_cache:{},set:function(t,e){this._cache[t]=e},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}S.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};S.prototype.parse=function(t,e){var n=this.templateCache,i=t+":"+(e||M.tags).join(":"),r=typeof n<"u",a=r?n.get(i):void 0;return a==null&&(a=Be(t,e),r&&n.set(i,a)),a};S.prototype.render=function(t,e,n,i){var r=this.getConfigTags(i),a=this.parse(t,r),o=e instanceof X?e:new X(e,void 0);return this.renderTokens(a,o,n,t,i)};S.prototype.renderTokens=function(t,e,n,i,r){for(var a="",o,s,l,f=0,h=t.length;f<h;++f)l=void 0,o=t[f],s=o[0],s==="#"?l=this.renderSection(o,e,n,i,r):s==="^"?l=this.renderInverted(o,e,n,i,r):s===">"?l=this.renderPartial(o,e,n,r):s==="&"?l=this.unescapedValue(o,e):s==="name"?l=this.escapedValue(o,e,r):s==="text"&&(l=this.rawValue(o)),l!==void 0&&(a+=l);return a};S.prototype.renderSection=function(t,e,n,i,r){var a=this,o="",s=e.lookup(t[1]);function l(y){return a.render(y,e,n,r)}if(s){if(F(s))for(var f=0,h=s.length;f<h;++f)o+=this.renderTokens(t[4],e.push(s[f]),n,i,r);else if(typeof s=="object"||typeof s=="string"||typeof s=="number")o+=this.renderTokens(t[4],e.push(s),n,i,r);else if(ie(s)){if(typeof i!="string")throw new Error("Cannot use higher-order sections without the original template");s=s.call(e.view,i.slice(t[3],t[5]),l),s!=null&&(o+=s)}else o+=this.renderTokens(t[4],e,n,i,r);return o}};S.prototype.renderInverted=function(t,e,n,i,r){var a=e.lookup(t[1]);if(!a||F(a)&&a.length===0)return this.renderTokens(t[4],e,n,i,r)};S.prototype.indentPartial=function(t,e,n){for(var i=e.replace(/[^ \t]/g,""),r=t.split(`
`),a=0;a<r.length;a++)r[a].length&&(a>0||!n)&&(r[a]=i+r[a]);return r.join(`
`)};S.prototype.renderPartial=function(t,e,n,i){if(n){var r=this.getConfigTags(i),a=ie(n)?n(t[1]):n[t[1]];if(a!=null){var o=t[6],s=t[5],l=t[4],f=a;s==0&&l&&(f=this.indentPartial(a,l,o));var h=this.parse(f,r);return this.renderTokens(h,e,n,f,i)}}};S.prototype.unescapedValue=function(t,e){var n=e.lookup(t[1]);if(n!=null)return n};S.prototype.escapedValue=function(t,e,n){var i=this.getConfigEscape(n)||M.escape,r=e.lookup(t[1]);if(r!=null)return typeof r=="number"&&i===M.escape?String(r):i(r)};S.prototype.rawValue=function(t){return t[1]};S.prototype.getConfigTags=function(t){return F(t)?t:t&&typeof t=="object"?t.tags:void 0};S.prototype.getConfigEscape=function(t){if(t&&typeof t=="object"&&!F(t))return t.escape};var M={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){$.templateCache=t},get templateCache(){return $.templateCache}},$=new S;M.clearCache=function(){return $.clearCache()};M.parse=function(t,e){return $.parse(t,e)};M.render=function(t,e,n,i){if(typeof t!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+Te(t)+'" was given as the first argument for mustache#render(template, view, partials)');return $.render(t,e,n,i)};M.escape=$e;M.Scanner=R;M.Context=X;M.Writer=S;const ce={"*":{prefix:"每",suffix:"",text:"未知","*":{empty:{text:"每 {{field.id}}"},value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"每 {{every.value}}"}},month:{"*":{prefix:"的"},empty:{text:"每月"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"的"},empty:{text:"每日"},value:{text:"{{value.alt}}号"},range:{text:"{{start.alt}}号-{{end.alt}}号"}},dayOfWeek:{"*":{prefix:"的"},empty:{text:"一周的每一天"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},hour:{"*":{prefix:"的"},empty:{text:"每小时"}},minute:{"*":{prefix:":"},empty:{text:"每分钟"}}},minute:{text:"分"},hour:{text:"小时",minute:{"*":{prefix:":",suffix:"分钟"},empty:{text:"每"}}},day:{text:"天"},week:{text:"周",dayOfWeek:{"*":{prefix:"的"},empty:{text:"每天"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}}},month:{text:"月",dayOfWeek:{"*":{prefix:"和"}},day:{"*":{prefix:"的"}}},year:{text:"年",dayOfWeek:{"*":{prefix:"和"}}}},Ge={"*":{prefix:"Hver",suffix:"",text:"Ukendt","*":{empty:{text:"hver {{field.id}}"},value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"hver {{every.value}}"}},month:{"*":{prefix:"i"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"på"}},dayOfWeek:{"*":{prefix:"på"},empty:{text:"hver dag i ugen"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},hour:{"*":{prefix:"klokken"}},minute:{"*":{prefix:":"}}},minute:{text:"Minut"},hour:{text:"Time",minute:{"*":{prefix:"på de(t)",suffix:"minutter"},empty:{text:"hver"}}},day:{text:"Dag"},week:{text:"Uge"},month:{text:"Måned",dayOfWeek:{"*":{prefix:"og"}}},year:{text:"År",dayOfWeek:{"*":{prefix:"og"}}}},Ye={"*":{prefix:"Jede",suffix:"",text:"Unknown","*":{value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"alle {{every.value}}"}},month:{"*":{prefix:"im"},empty:{prefix:"in",text:"jedem Monat"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"den"},empty:{prefix:"an",text:"jedem Tag"},everyX:{prefix:"",text:"alle {{every.value}} Tage"},noSpecific:{prefix:"an",text:"keinem bestimmten Tag"}},dayOfWeek:{"*":{prefix:"am"},empty:{prefix:"an",text:"jedem Wochentag"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{prefix:"und",text:"keinem bestimmten Wochentag"}},hour:{"*":{prefix:"um"},empty:{prefix:"zu",text:"jeder Stunde"},everyX:{prefix:"",text:"alle {{every.value}} Stunden"}},minute:{"*":{prefix:":"},empty:{text:"jede Minute"},everyX:{prefix:"",text:"alle {{every.value}} Minuten"}},second:{"*":{prefix:":"},empty:{text:"jede Sekunde"},everyX:{prefix:"",text:"alle {{every.value}} Sekunden"}}},minute:{text:"Minute"},hour:{text:"Stunde",minute:{"*":{prefix:"zu",suffix:"Minute(n)"},empty:{text:"jeder"}}},day:{prefix:"Jeden",text:"Tag"},week:{text:"Woche"},month:{prefix:"Jedes",text:"Monat"},year:{prefix:"Jedes",text:"Jahr"},"q-second":{text:"Sekunde"},"q-minute":{text:"Minute",second:{"*":{prefix:"und"}}},"q-hour":{text:"Stunde",minute:{"*":{prefix:"und"}},second:{"*":{prefix:"und"}}}},Ze={"*":{prefix:"Every",suffix:"",text:"Unknown","*":{empty:{text:"every {{field.id}}"},value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"every {{every.value}}"}},month:{"*":{prefix:"in"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},day:{"*":{prefix:"on"},noSpecific:{text:"no specific day"}},dayOfWeek:{"*":{prefix:"on"},empty:{text:"every day of the week"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},noSpecific:{text:"no specific day of the week"}},hour:{"*":{prefix:"at"}},minute:{"*":{prefix:":"}},second:{"*":{prefix:":"}}},minute:{text:"Minute"},hour:{text:"Hour",minute:{"*":{prefix:"at",suffix:"minute(s)"},empty:{text:"every"}}},day:{text:"Day"},week:{text:"Week"},month:{text:"Month",dayOfWeek:{"*":{prefix:"and"}}},year:{text:"Year",dayOfWeek:{"*":{prefix:"and"}}},"q-second":{text:"Second"},"q-minute":{text:"Minute",second:{"*":{prefix:"at",suffix:"second(s)"},empty:{text:"every"}}},"q-hour":{text:"Hour",minute:{"*":{prefix:"at"}}}},Qe={"*":{prefix:"todos los",suffix:"",text:"Desconocido","*":{empty:{text:"todos los {{ field.id }}"},value:{text:"{{ value.text }}"},range:{text:"{{ start.text }}-{{ end.text }}"},everyX:{text:"todos/as {{ every.value }}"}},month:{"*":{prefix:"en"},empty:{text:"todos los meses"},value:{text:"{{ value.alt }}"},range:{text:"{{ start.alt }}-{{ end.alt }}"}},day:{"*":{prefix:"en"},empty:{text:"todos los días"},value:{text:"los días {{ value.alt }}"}},dayOfWeek:{"*":{prefix:"de"},empty:{text:"todos los días de la semana"},value:{text:"los {{ value.alt }}"},range:{text:"{{ start.alt }}-{{ end.alt }}"}},hour:{"*":{prefix:"a"},empty:{text:"todas las horas"},value:{text:"las {{ value.text }}"}},minute:{"*":{prefix:":"},empty:{text:"todos los minutos"}}},minute:{prefix:"todos los",text:"minutos"},hour:{prefix:"todas las",text:"horas",minute:{"*":{prefix:"a los",suffix:"minutos"},empty:{text:"todos",prefix:"a",suffix:"los minutos"}}},day:{text:"Días"},week:{text:"Semanas"},month:{text:"Meses",dayOfWeek:{"*":{prefix:"y"}}},year:{text:"años",dayOfWeek:{"*":{prefix:"y"}}}},_e={"*":{prefix:"Todo(a)",suffix:"",text:"Desconhecido","*":{empty:{text:"todo {{field.id}}"},value:{text:"{{value.text}}"},range:{text:"{{start.text}}-{{end.text}}"},everyX:{text:"todo {{every.value}}"}},month:{"*":{prefix:"de"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"},empty:{text:"todo mês"}},day:{"*":{prefix:"no(s) dia(s)"},empty:{text:"todos"}},dayOfWeek:{"*":{prefix:"de"},empty:{text:"todos dias da semana"},value:{text:"{{value.alt}}"},range:{text:"{{start.alt}}-{{end.alt}}"}},hour:{"*":{prefix:"às"},empty:{text:"cada hora"}},minute:{"*":{prefix:":"},empty:{text:"cada minuto"}}},minute:{text:"Minuto"},hour:{text:"Hora",minute:{"*":{prefix:"e",suffix:"minuto(s)"},empty:{text:"cada"}}},day:{text:"Dia"},week:{text:"Semana"},month:{text:"Mês",dayOfWeek:{"*":{prefix:"e de"}}},year:{text:"Ano",dayOfWeek:{"*":{prefix:"e de"}}}},_={empty:{},en:Ze,de:Ye,pt:_e,es:Qe,da:Ge,zh:ce,"zh-cn":ce};class et{constructor(e){p(this,"dict"),this.dict=e}getLocaleStr(...e){const n=e.map(i=>[i,"*"]);return pe(this.dict,...n)||""}render(e,n,i,r,a){const o=this.getLocaleStr(e,n,i,r);return M.render(o,a||{})}}function tt(t,e){const[n]=t.split("-"),i=_[t.toLowerCase()]||_[n.toLowerCase()]||_.en,r=te(i,e||{});return new et(r)}function nt(t){const{period:e,field:n,initialCron:i="*",locale:r}=t,a=w(i),o=w(""),s=w([]),l=w(""),f=w(""),h=w(""),y=u=>{const c=u instanceof re?u.segments:[u];l.value=c.map(m=>r.render(e.value.id,n.id,m.type,T.Text,{field:n,...m.items})).join(","),f.value=r.getLocaleStr(e.value.id,n.id,u.type,T.Prefix),h.value=r.getLocaleStr(e.value.id,n.id,u.type,T.Suffix)},v=u=>{const c=se(u,n);c!=null?(s.value=c.toArray(),y(c)):o.value=`${u} is not a valid cron segment (${n.id})`},W=u=>{if(a.value=="?"&&u.length==0)return;const c=Le(u,n);c!=null?(a.value=c.toCron(),y(c)):o.value=`failed to convert ${u} to cron (${n.id})`};v(i);const j=u=>{const c=Array.from(u).sort((m,x)=>m>x?1:-1);s.value=c};return C(a,u=>{v(u)}),C(s,u=>{W(u)}),C(e,()=>{const u=se(a.value,n);u!=null&&y(u)}),{id:n.id,items:n.items,cron:a,selected:s,error:o,select:j,text:l,prefix:f,suffix:h}}function ve(t,e="*"){return new Array(t).fill(e).join(" ")}function rt(t){return t!==void 0}class it{constructor(){p(this,"locale","en"),p(this,"format","crontab")}initialValue(e,n="*"){return ve(e,n)}fields(e,n){const i=e=="quartz",r=We(n),a=o=>(s,{segmentMap:l})=>{if(s.cron.value=="?")return;const f=l.get(o);f&&(f.cron.value="?")};return[...i?[{id:"second",items:r.secondItems}]:[],{id:"minute",items:r.minuteItems},{id:"hour",items:r.hourItems},{id:"day",items:r.dayItems,onChange:i?a("dayOfWeek"):void 0,segmentFactories:i?[E.fromString,H.fromString,G.fromString,K.fromString,q.fromString]:void 0},{id:"month",items:r.monthItems},{id:"dayOfWeek",items:r.dayOfWeekItems,onChange:i?a("day"):void 0,segmentFactories:i?[E.fromString,H.fromString,G.fromString,K.fromString,q.fromString]:void 0}]}periods(e){const n=e=="quartz",i=n?[{id:"q-second",value:[]}]:[],r=n?["second"]:[],a=n?"q-":"";return[...i,{id:a+"minute",value:[...r]},{id:a+"hour",value:["minute",...r]},{id:"day",value:["hour","minute",...r]},{id:"week",value:["dayOfWeek","hour","minute",...r]},{id:"month",value:["day","dayOfWeek","hour","minute",...r]},{id:"year",value:["month","day","dayOfWeek","hour","minute",...r]}]}}function at(t){const e=new it,n=t.locale??e.locale,i=t.format??e.format,{customLocale:r,fields:a=e.fields(i,n)}=t,o=t.initialValue??e.initialValue(a.length),s=tt(n,r),l=(t.periods??e.periods(i)).map(d=>({...d,text:s.getLocaleStr(d.id,T.Text)})),f=l.find(d=>d.id==t.initialPeriod)??l[l.length-1],h=w(o),y=w(""),v=w(f),W=w(""),j=w(""),u=a.map(d=>nt({field:new Me(d),locale:s,period:v})),c=new Map(u.map(d=>[d.id,d])),m=de(()=>v.value.value.map(d=>{const g=c.get(d);if(rt(g))return g;throw Error("${fieldId} not found")})),x=d=>{if(!d){h.value=ve(a.length);return}const g=d.split(" ");if(g.length!==a.length){y.value="invalid pattern";return}for(let k=0;k<g.length;k++)u[k].cron.value!=g[k]&&(u[k].cron.value=g[k]);y.value=""};x(o);const I=()=>{h.value=u.map(d=>v.value.value.includes(d.id)||d.cron.value=="?"?d.cron.value:"*").join(" ")},L=()=>{W.value=s.getLocaleStr(v.value.id,T.Prefix),j.value=s.getLocaleStr(v.value.id,T.Suffix)};return L(),C(h,x),C(v,()=>{I(),L()}),u.forEach((d,g)=>{C(d.cron,()=>{var k,b;(b=(k=a[g]).onChange)==null||b.call(k,d,{segmentMap:c}),I()}),C(d.error,k=>{y.value=k})}),{cron:h,error:y,segments:u,selected:m,period:{select:d=>{const g=l.map(k=>k.id).indexOf(d);g!=-1&&(v.value=l[g])},selected:v,items:l,prefix:W,suffix:j}}}function ot(t,e,{emit:n}){const i=at(t);return C(e,r=>{r&&(i.cron.value=r)},{immediate:!0}),C(i.cron,r=>{n("update:model-value",r)}),C(i.error,r=>{n("error",r)}),i}const st=()=>({modelValue:{type:String},initialPeriod:{type:String},format:{type:String},locale:{type:String},fields:{type:Array},periods:{type:Array},customLocale:{type:Object},cols:{type:Object,default:()=>({second:5,minute:5,hour:4,day:4})}});function lt(t){const{items:e}=t,n=new Set,i=w(0),r=()=>{i.value=i.value+1},a=l=>{e.indexOf(l)!=-1&&(n.add(l),r())},o=l=>n.has(l),s=l=>{n.delete(l)&&r()};return{values:n,add:a,toggle:l=>{o(l)?s(l):a(l)},has:o,remove:s,clear:()=>{n.clear(),r()},updated:i,equals:l=>{if(l.length!=n.size)return!1;for(const f of l)if(!n.has(f))return!1;return!0}}}function ut(){return{modelValue:{type:[String,Number,Array]},selection:{type:String},clearable:{type:Boolean,default:!1},items:{type:Array,default:()=>[]},multiple:{type:Boolean,default:!1},cols:{type:Number,default:1},itemText:{type:[String,Function],default:"text"},itemValue:{type:[String,Function],default:"value"}}}function ct(t){const{items:e,cols:n=1,multiple:i=!1,itemText:r="text",itemValue:a="value"}=t,o=lt(t),s=i?w([]):w(null),l=w(""),f=c=>{i?o.toggle(c):(o.clear(),o.add(c))},h=c=>typeof a=="function"?a(c):c[a],y=c=>typeof r=="function"?r(c):c[r],v=new Map(e.map(c=>[h(c),c])),W=c=>{o.equals(c)||(o.clear(),c.forEach(m=>f(m)))},j=c=>{c=Array.isArray(c)?c:[c];const m=c.map(x=>v.get(x)).filter(x=>!!x);W(m)};C(o.updated,()=>{const c=Array.from(o.values);s.value=i?c.map(h):h(c[0]),l.value=c.map(y).join(",")});const u=de(()=>i?!Array.isArray(s.value)||s.value.length==0:!!s.value);return{...o,select:f,selected:s,selectedStr:l,itemRows:Ie(e,n),setItems:W,setValues:j,isEmpty:u}}function ft(t,e,{emit:n}){const i=ct(t);return C(i.selected,()=>{n("update:model-value",i.selected.value)}),C(e,r=>{r&&i.setValues(r)},{immediate:!0}),i}const dt=fe({name:"CustomSelect",props:{...ut()},emits:["update:model-value"],setup(t,e){const n=ft(t,()=>t.modelValue,e),i=w(!1),r=()=>{i.value=!1,document.removeEventListener("click",r)};return{...n,menu:i,toggleMenu:()=>{i.value=!i.value,i.value?setTimeout(()=>{document.addEventListener("click",r)},1):document.removeEventListener("click",r)}}}}),ye=(t,e)=>{const n=t.__vccOpts||t;for(const[i,r]of e)n[i]=r;return n},pt={class:"vcron-select-container"},mt={key:0,class:"vcron-select-list"},ht=["onClick"],xt={key:0};function vt(t,e,n,i,r,a){return O(),A("div",pt,[V("span",{class:"vcron-select-input",onClick:e[1]||(e[1]=(...o)=>t.toggleMenu&&t.toggleMenu(...o))},[ge(P(t.selection??t.selectedStr)+" ",1),t.clearable&&!t.isEmpty?(O(),A("span",{key:0,onClick:e[0]||(e[0]=(...o)=>t.clear&&t.clear(...o))},"✕")):Y("",!0)]),t.menu?(O(),A("div",mt,[(O(!0),A(B,null,ee(t.itemRows,(o,s)=>(O(),A("div",{class:"vcron-select-row",key:s},[(O(!0),A(B,null,ee(o,(l,f)=>(O(),A("div",{key:s+"-"+f,class:we(["vcron-select-col",{"vcron-select-selected":t.has(l)}]),onClick:[h=>t.select(l),e[2]||(e[2]=ke(h=>t.multiple?()=>{}:t.toggleMenu(),["stop"]))]},[l?(O(),A("div",xt,P(l.text),1)):Y("",!0)],10,ht))),128))]))),128))])):Y("",!0)])}const yt=ye(dt,[["render",vt]]),gt=()=>({...st()}),wt=fe({name:"CronLight",components:{CustomSelect:yt},emits:["update:model-value","error"],props:gt(),setup(t,e){return ot(t,()=>t.modelValue,e)}}),kt={class:"vcron-editor"},St={class:"vcron-l-spacer"},Ct={class:"vcron-l-spacer"};function bt(t,e,n,i,r,a){const o=Se("custom-select");return O(),A("span",kt,[V("span",null,P(t.period.prefix.value),1),V("div",St,[ae(o,{"model-value":t.period.selected.value.id,"item-value":"id",items:t.period.items,"onUpdate:modelValue":e[0]||(e[0]=s=>t.period.select(s)),cols:t.cols.period||1},null,8,["model-value","items","cols"])]),V("span",null,P(t.period.suffix.value),1),(O(!0),A(B,null,ee(t.selected,s=>(O(),A(B,{key:s.id},[V("span",null,P(s.prefix.value),1),V("div",Ct,[ae(o,{"model-value":s.selected.value,"onUpdate:modelValue":l=>s.select(l),items:s.items,cols:t.cols[s.id]||1,selection:s.text.value,multiple:"",clearable:""},null,8,["model-value","onUpdate:modelValue","items","cols","selection"])]),V("span",null,P(s.suffix.value),1)],64))),128))])}const Mt=ye(wt,[["render",bt]]),At={install:t=>{t.component("CronLight",Mt)}};export{Mt as CronLight,At as CronLightPlugin,gt as cronLightProps,At as default};
