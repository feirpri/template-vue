import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Components from './components';
import Http from './plugins/http';
import { cachePlugin } from './plugins/http-plugins';

Vue.config.productionTip = false;
Vue.use(Components);
Vue.use(Http, {
    baseUrl: '/api', // axios 配置
});
Vue.http.$use(cachePlugin); // http缓存功能

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
});
