import axios from 'axios';
import store from '@/store';

const defaultConfig = {
    baseUrl: '',
};

/*  config 配置
    request.config: {
        disablePendingStack: Boolean, // 不进入请求队列 => 无全局loading
        disableErrorStack: Boolean, // 不使用错误堆栈 => 禁用全局错误弹框
        requestHook: Function, // 请求之前执行
    }
*/

function responseHandle(response) {
    // 对此接口禁用处理中队列
    if (!response.config.disablePendingStack) {
        store.commit('ajax_pending_pop', {
            response,
        });
    }

    // Success
    if (response.data && response.data.code === 0) {
        return response.data.data || '';
    }

    // Redirect
    if (response.data && response.data.code === 304) {
        window.location.href = response.data.data;
        throw new Error('Url Redirect');
    }

    // 对此接口禁用错误堆栈信息
    if (!response.config.disableErrorStack) {
        store.commit('ajax_error_push', {
            url: response.config.url,
            message: (response.data || {}).message || '',
        });
    }

    const error = new Error([
        'AjaxError: ',
        `${(response.data || {}).message || 'Unknown'}`,
        `(${response.config.url})`,
    ].join(''));
    // 与ErrorHandle中的错误对象保持一致
    error.response = response;
    error.config = response.config;
    throw error; // 向下传递 Error
}
function responseErrorHandle(error) {
    const response = error.response;
    const config = error.config;

    // 接口请求结束，移出pending队列
    if (!config.disablePendingStack) {
        store.commit('ajax_pending_pop', {
            response,
        });
    }
    // 接口出错，移入error队列
    if (!config.disableErrorStack) {
        store.commit('ajax_error_push', {
            url: config.url,
            message: error.message,
        });
    }
    throw new Error(error);
}

function requestHandle(config) {
    // request钩子
    if (config.requestHook && config.requestHook instanceof Function) {
        Object.assign(config, config.requestHook(config) || {});
    }
    if (!config.disablePendingStack) {
        store.commit('ajax_pending_push', {
            config: Object.assign({}, config),
        });
    }
    return config;
}

function getAxiosIns(config = {}) {
    const ins = axios.create(Object.assign(defaultConfig, config));
    ins.interceptors.response.use(responseHandle, responseErrorHandle);
    ins.interceptors.request.use(requestHandle, error => Promise.reject(error));
    return ins;
}

let jHttpIns = {};
class JHttp {
    constructor(config) {
        Object.assign(this, getAxiosIns(Object.assign(JHttp.axiosConfig || {}, config)));
        return this;
    }
    static extend(obj = {}) {
        Object.keys(obj).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(JHttp.prototype, key)) {
                throw new Error(`${key}方法或属性已存在`);
            }
            JHttp.prototype[key] = obj[key];
        });
    }
    static create(config) {
        return new JHttp(config);
    }
    static config(config) {
        JHttp.axiosConfig = config;
        Object.assign(jHttpIns, new JHttp());
    }
}

export default {
    install(Vue, options = {}) {
        Object.assign(defaultConfig, options);

        const VueAlias = Vue;
        jHttpIns = new JHttp();

        VueAlias.prototype.$http = jHttpIns;
        VueAlias.http = jHttpIns;

        /* 插件注入 */
        VueAlias.http.$use = (fn) => {
            fn(JHttp);
        };
    },
};
