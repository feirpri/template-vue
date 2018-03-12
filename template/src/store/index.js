import Vue from 'vue';
import Vuex from 'vuex';

import ajax from './ajax';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        ajax,
    },
});

export default store;
