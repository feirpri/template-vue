import AjaxProgress from './AjaxProgress';

const components = [
    AjaxProgress,
];

function install(Vue) {
    components.forEach((item) => {
        Vue.component(item.name, item);
    });
}

export default {
    install,
};
