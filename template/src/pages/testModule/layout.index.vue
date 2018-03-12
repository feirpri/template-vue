<template>
    <div class="test">
        <h1>Welcome~</h1>
        <div class="test-links">
            <label>参考文档: </label>
            <ul>
                <li><a  target="_blank" href="https://github.com/vuejs-templates/webpack/blob/develop/docs/proxy.md">环境配置---反向代理</a></li>
                <li><a  target="_blank" href="https://cn.vuejs.org/v2/guide/">框架：Vue2.x</a></li>
                <li><a  target="_blank" href="https://router.vuejs.org/zh-cn/">路由管理：VueRouter</a></li>
                <li><a  target="_blank" href="https://vuex.vuejs.org/zh-cn/intro.html">状态管理：Vuex</a></li>
                <li><a  target="_blank" href="https://github.com/axios/axios">ajax功能：axios</a></li>
                <li><a  target="_blank" href="https://github.com/RasCarlito/axios-cache-adapter">ajax缓存：axios-cache-adapter</a></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">

export default {
    name: 'testPage',
};
</script>

<style type="text/css">
.test h1{
    font-size: 40px;
}
.test-links{
    border: 1px solid #42b983;
    width: 300px;
    margin: 20px auto 0;
    text-align: left;
    padding: 20px;
}
.test-links ul{
    padding: 0;
}
.test-links li{
    display: block;
    line-height: 1.8;
}
.test-links a{
    color: #42b983;
}
</style>
