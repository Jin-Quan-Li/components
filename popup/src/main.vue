<!--  -->
<template>
    <div class='popup-wrapper' v-show="value" @click.self="handleClick">
        <div :class="[{'popup-content':position === 'center'},{'popup-content-top':position === 'top'},{'popup-content-left':position === 'left'},{'popup-content-right':position === 'right'},{'popup-content-bottom':position === 'bottom'}]" :style="styles">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'LiPopup',
    props:{
        position:{
            type:String,
            default:"center"
        },
        value:{
            type:[Boolean,Array],
            default:() => {
                return false
            }
        },
        styles:{
            type:String,
            default:''
        }
        
    },
    data() {
        return {

        };
    },
    computed: {
        
    },
    watch: {

    },
    methods: {
        handleClick(){
            this.$emit('input',false);
        }
    },
    created() {
        
    },
    mounted() {

    }
}
</script>
<style lang='css' scoped>
.popup-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    animation: animation .3s;
}
@keyframes animation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
/* 默认内容 */
.popup-content {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100px;
    min-height: 100px;
    background: #fff;
    transform: translate(-50%, -50%);
}
/* 左边 */
.popup-content-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: #fff;
    transform: translate(0, 0);
    animation: left .3s;
}
@keyframes left {
    0% {
        transform: translate(-100%, 0);
        -webkit-transform: translate(-100%, 0);
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translate(0, 0);
        -webkit-transform: translate(0,0);
    }
}
/* 上边 */
.popup-content-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 30vh;
    background: #fff;
    transform: translate(0, 0);
    animation: top .3s;
}
@keyframes top {
    0% {
        transform: translate(0, -100%);
        -webkit-transform: translate(0, -100%);
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translate(0, 0);
        -webkit-transform: translate(0,0);
    }
}
/* 右边 */
.popup-content-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: #fff;
    transform: translate(0, 0);
    animation: right .3s;
}
@keyframes right {
    0% {
        transform: translate(100%, 0);
        -webkit-transform: translate(100%,0);
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translate(0, 0);
        -webkit-transform: translate(0,0);
    }
}
/* 下边 */
.popup-content-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 30vh;
    background: #fff;
    transform: translate(0, 0);
    animation: bottom .3s;
}
@keyframes bottom {
    0% {
        transform: translate(0, 100%);
        -webkit-transform: translate(0, 100%);
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translate(0, 0);
        -webkit-transform: translate(0,0);
    }
}
</style>