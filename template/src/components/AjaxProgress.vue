<template>
    <transition name="ajax-progress-fade">
        <div class="ajax-progress" v-show="progress && progress < 1">
            <div class="ajax-progress__bar" :style="{width: progress * 100 + '%'}"></div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'j-ajax-progress',
    props: {
        progress: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<style type="text/css">
.ajax-progress{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 0.3rem;
    z-index: 10000;
}
.ajax-progress__bar{
    background-color: rgba(255, 0, 0, 0.7);
    height: 2px;
    box-shadow: 0 0 6px rgba(255, 0, 0, 0.7);
    width: 0;
    transition: 0.1s;
}
.ajax-progress-fade-enter-active{
    transition: opacity 0.1s;
}
.ajax-progress-fade-leave-active {
    transition: opacity 0.5s
}
.ajax-progress-fade-enter, .ajax-progress-fade-leave-active {
    opacity: 0
}
</style>
