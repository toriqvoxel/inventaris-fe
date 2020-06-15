import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueRouter from 'vue-router';
import './assets/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Paginate from 'vuejs-paginate';
import Tpaginate from './components/Partials/Paginate.vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue, {
    bootstrapCSS: false,
    bootstrapVueCSS: false
});
Vue.use(IconsPlugin);
Vue.component('paginate', Paginate)
Vue.component('Tpaginate', Tpaginate)

axios.defaults.baseURL = "http://localhost:1339/"
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token ? token : '';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
