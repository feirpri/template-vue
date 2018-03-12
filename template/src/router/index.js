import Vue from 'vue';
import Router from 'vue-router';
import TestModule from '@/pages/testModule';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: TestModule.index,
    }],
});
