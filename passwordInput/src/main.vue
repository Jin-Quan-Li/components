<template>
    <div class='wrapper' @click="()=>{ this.$emit('click') }">
        <div class="wrapper-password">
            <ul>
                <li class="wrapper-item" v-for="(item,index) in length" :key="index">
                    <i v-show="password.length >= index + 1"></i>
                    <div class="input-cursor" v-show="index === password.length"></div>
                </li>
            </ul>
            <div class="input-info">{{info}}</div>
        </div>
    </div>
</template>

<script>

export default {
    name:'LiPasswordInput',
    props:{
        length:{
            type:Number,
            default:6
        },
        value:{
            type:[String,Number],
            default:''
        },
        info:{
            type:String,
            default:"密码为6位数"
        }
    },
    data() {
        return {

        };
    },
    computed: {
        password() {
            return  [...this.value.substring(0,this.length).toString()]
        }
    },
    watch: {
        'value'(newVal,oldVal){
            if( newVal != oldVal ) {
                this.$emit('focus',this.value.substring(0,this.length))
            }
        }
    },
    methods: {

    },
    created() {

    },
    mounted() {

    }
}
</script>
<style lang='css' scoped>
* {
    box-sizing: border-box;
}
.wrapper {
    background: #fafafa;
}
.wrapper-password {
    margin: 0 16px;
    background: #fff;
}
.wrapper-password ul {
    display: flex;
    justify-content: center;
    height: 50px;
    list-style:none
}
.wrapper-password ul li {
    position: relative;
}
.wrapper-password ul li::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #ebedf0;
    border-left-width: 1px;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
}
.wrapper-password ul li:first-child::after {
    border: 0;
}
.wrapper-password .wrapper-item {
    flex: 1;
    height: 100%;
    position: relative;
    text-align: center;
    line-height: 50px;
}
.wrapper-password .wrapper-item i {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 100%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.input-cursor {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 40%;
    background-color: #323233;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-animation: cursor 1s infinite;
    animation: cursor 1s infinite;
}
@keyframes cursor {
    0%, 100% {
        background-color: #323233;
        opacity: 1;
    }
    50% {
        opacity: 0;
        background-color: #333;
    }
}
.input-info {
    padding-top: 16px;
    font-size: 14px;
    text-align: center;
    color: #969799;
    background: #fafafa;
}
</style>


