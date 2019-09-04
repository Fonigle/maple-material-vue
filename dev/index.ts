import 'reflect-metadata';

import Vue from 'vue';

import App from './app.vue';

import MapleMaterialVue from '@/index';
Vue.use(MapleMaterialVue);

import '../_intermediate/iconfonts/maple-icon.scss';


const vm = new Vue({
    el: '#app',
    render: h => h(App),
});
