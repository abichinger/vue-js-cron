import{_ as o,M as p,p as r,q as l,Q as i,R as n,t as s,N as e,a1 as t}from"./framework-bdb2dae7.js";const c={},u=n("h1",{id:"getting-started-ant",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#getting-started-ant","aria-hidden":"true"},"#"),s(" Getting Started - Ant")],-1),d=n("p",null,"The fastest way to get started, is to use one of the prebuilt components.",-1),v=n("li",null,[n("a",{href:"./getting-started-core"},"cron-core"),s(" - renderless cron editor")],-1),k=n("li",null,[n("a",{href:"./getting-started-light"},"cron-light"),s(" - lightweight cron editor without external dependencies")],-1),m={href:"https://antdv.com/",target:"_blank",rel:"noopener noreferrer"},g=n("a",{href:"./getting-started-element-plus"},"cron-element-plus",-1),h={href:"https://element-plus.org/en-US/",target:"_blank",rel:"noopener noreferrer"},_=n("a",{href:"./getting-started-naive-ui"},"cron-naive",-1),b={href:"https://www.naiveui.com",target:"_blank",rel:"noopener noreferrer"},f=n("a",{href:"./getting-started-prime"},"cron-prime",-1),y={href:"https://primevue.org/",target:"_blank",rel:"noopener noreferrer"},x=n("a",{href:"./getting-started-quasar"},"cron-quasar",-1),q={href:"https://quasar.dev/",target:"_blank",rel:"noopener noreferrer"},w=n("a",{href:"./getting-started-vuetify"},"cron-vuetify",-1),A={href:"https://next.vuetifyjs.com/en/",target:"_blank",rel:"noopener noreferrer"},j=n("h2",{id:"requirements",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#requirements","aria-hidden":"true"},"#"),s(" Requirements")],-1),C=n("p",null,"Make sure to install and setup all requirements.",-1),P={href:"https://www.antdv.com/components/overview/",target:"_blank",rel:"noopener noreferrer"},V=t(`<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2><p>Open up a terminal and run the following command:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> @vue-js-cron/ant
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>or</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @vue-js-cron/ant
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then you need to register the component</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">&#39;@vue-js-cron/ant/dist/ant.css&#39;</span>

<span class="token comment">// registers the component globally</span>
<span class="token comment">// registered name: CronAnt</span>
<span class="token keyword">import</span> CronAntPlugin <span class="token keyword">from</span> <span class="token string">&#39;@vue-js-cron/ant&#39;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>CronAntPlugin<span class="token punctuation">)</span>

<span class="token comment">// alternatively you can also register the component yourself</span>
<span class="token comment">// https://vuejs.org/guide/components/registration.html</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CronAnt <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue-js-cron/ant&#39;</span>
app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;CronAnt&#39;</span><span class="token punctuation">,</span> CronAnt<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Done! 🚀</p><br><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>`,10),I={href:"https://abichinger.github.io/vue-js-cron/typedoc/classes/_vue_js_cron_ant.CronAnt",target:"_blank",rel:"noopener noreferrer"},N={href:"https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_ant.CronAntProps",target:"_blank",rel:"noopener noreferrer"},E=t(`<h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>cron-ant</span>
      <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>value<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">:button-props</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ type: &#39;primary&#39;, shape: &#39;round&#39;, style: {backgroundColor: &#39;#0277BD&#39;} }<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">@error</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>error=$event<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text-lightest pt-2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>cron expression: {{value}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;* * * * *&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">error</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function B(D,S){const a=p("ExternalLinkIcon");return r(),l("div",null,[i(" Generated file "),u,d,n("ul",null,[v,k,n("li",null,[s("cron-ant - cron editor for "),n("a",m,[s("Ant Design Vue"),e(a)])]),n("li",null,[g,s(" - cron editor for "),n("a",h,[s("Element Plus"),e(a)])]),n("li",null,[_,s(" - cron editor for "),n("a",b,[s("Naive UI"),e(a)])]),n("li",null,[f,s(" - cron editor for "),n("a",y,[s("PrimeVue"),e(a)])]),n("li",null,[x,s(" - cron editor for "),n("a",q,[s("Quasar"),e(a)])]),n("li",null,[w,s(" - cron editor for "),n("a",A,[s("Vuetify.js"),e(a)])])]),j,C,n("ul",null,[n("li",null,[n("a",P,[s("Ant Design Vue"),e(a)])])]),V,n("p",null,[n("a",I,[s("CronAnt API"),e(a)])]),n("p",null,[n("a",N,[s("CronAntProps API"),e(a)])]),E])}const G=o(c,[["render",B],["__file","getting-started-ant.html.vue"]]);export{G as default};