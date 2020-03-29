<!--  -->
<template>
    <div class="wrapper" v-if="keyboardShow">
        <div class="keyboard-title" v-show="titleShow">
            <div>{{title}}</div>
            <span @click="()=>{ this.$emit('blur') }">完成</span>
        </div>
        <div class='number-keyboard'>
            <div @click="handleChange(item)" :class="['number-keyboard-item',{blank:item.id === 10 || item.id === 12},{delete:item.id === 12}]" v-for="(item,index) in keyboard"  :key="index">{{item.text}}</div>
        </div>
    </div>
</template>

<script>
/**
 * @param {Boolean} titleShow  是否显示标题
 * @param {String} extraKey  设置左下角按键内容
 * @param {Number} length  输入长度
 * @param {Boolean} keyboardShow  是否显示键盘
 * @param {String} title  设置键盘标题
 * 回调函数
 * @param { function } blur 输入完成或者点击完成按钮的回调
 * @param { function } input 点击键盘的回调
 */
export default {
    name:'LiNumberKeyboard',
    props:{
        titleShow:{
            type:Boolean,
            default:true
        },
        extraKey:{
            type:String,
            default:'.'
        },
        length:{
            type:Number,
            default:6
        },
        keyboardShow:{
            type:Boolean,
            value:false
        },
        title:{
            type:String,
            default:""
        }
    },
    data() {
        return {
            keyboard:[
                {
                    id:1,
                    text:1
                },
                {
                    id:2,
                    text:2
                },
                {
                    id:3,
                    text:3
                },
                {
                    id:4,
                    text:4
                },
                {
                    id:5,
                    text:5
                },
                {
                    id:6,
                    text:6
                },
                {
                    id:7,
                    text:7
                },
                {
                    id:8,
                    text:8
                },
                {
                    id:9,
                    text:9
                },
                {
                    id:10,
                    text:this.extraKey
                },
                {
                    id:11,
                    text:0
                },
                {
                    id:12,
                    text:'删除'
                },
            ],
            value:''
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        handleChange(item) {
            if( item.id === 10 && item.text ) {
                this.value+=item.text.toString()
            }else if( item.id === 12 ) {
                this.value = this.value.substr(0, this.value.length - 1)
            }else if( this.value.length <= this.length - 1 ) {
                this.value+=item.text.toString()
            }
            if( this.value.length === this.length ) {
                this.$emit('blur')
            }
            this.$emit('input',this.value)
        }
    },
    created() {

    },
    mounted() {

    }
}
</script>
<style lang='css' scoped>
.wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    animation: animation .3s;
}
@keyframes animation {
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
.number-keyboard {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.number-keyboard-item {
    position: relative;
    flex: 33.333% 0 0;
    height: 54px;
    font-size: 24px;
    line-height: 54px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
}
.number-keyboard-item::after {
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
    border-top-width: 1px;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
}
.blank {
    background: #ebedf0;
}
.delete {
    font-size: 16px;
}
/* 键盘标题 */
.keyboard-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
}
.keyboard-title div {
    flex: 1;
    text-align: center;
    color: #646566;
    font-size: 14px;
}
.keyboard-title span {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 16px;
    color: #1989fa;
    font-size: 14px;
    cursor: pointer;
}
</style>