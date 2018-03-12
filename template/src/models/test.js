import Vue from 'vue';

export default class Test {
    contructor(name = '') {
        this.name = name;
    }
    static loadServerData(disableErrorStack) {
        return Vue.http.useCache(/* 缓存配置, 默认缓存15分钟 */).get('v1/test', {
            disableErrorStack, // 不进入接口错误堆栈
            disablePendingStack, // 不显示loading交互
        });
    }
}
