import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSweetAlert from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueCarousel from 'vue-carousel'

Vue.use(VueSweetAlert)
Vue.use(VueCarousel)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error.response;
  }
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
