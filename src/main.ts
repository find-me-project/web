import type { VNode } from 'vue';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import i18n from './i18n';
import 'toastr/toastr.scss';
import './assets/styles/global.scss';
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false;

new Vue({
  router: router,
  store: store,
  i18n: i18n,
  vuetify: vuetify,
  render: (h): VNode => h(App)
}).$mount('#app');
