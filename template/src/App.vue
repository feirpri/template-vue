<template>
    <div id="app">
        <router-view />
        <j-ajax-progress :progress='progress' />
    </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        progress() {
            const length = this.$store.state.ajax.pending.length;
            return length === 0 ? 1 : (1 / length) * 0.2;
        },
    },
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
