# Getting Started

The fastest way to get a component, which can generate cron expression, is to install one of the prebuilt components.
For now Vue-js-cron provides a prebuilt component for [Vuetify.js](/guide/getting-started.html#quick-start-vuetify)
If you would like to use a different UI framework, follow the quick start guide on how to use the renderless component.

## Quick Start - Renderless

This guide will explain how to use the renderless component of vue-js-cron.
In this example [Buefy](https://buefy.org/) will be used to render the component, but you should be able to follow along using any UI framework.

<br />
First open up a terminal and run the following command:

<code-group>
<code-block title="YARN" active>
```bash 
yarn add @vue-js-cron/core buefy
```
</code-block>

<code-block title="NPM">
```bash 
npm install @vue-js-cron/core buefy
```
</code-block>
</code-group>

<b-input placeholder="No label"></b-input>

<example-selection-grid />

## Quick Start - Vuetify

Open up a terminal and run the following command:

<code-group>
<code-block title="YARN" active>
```bash 
yarn add @vue-js-cron/vuetify
```
</code-block>

<code-block title="NPM">
```bash 
npm install @vue-js-cron/vuetify
```
</code-block>
</code-group>

<v-app id="app">
<v-card>
<v-card-text>
<CronVuetify></CronVuetify>
</v-card-text>
</v-card>
</v-app>
