<template>
	<div :class="['wrapper',{'wrapper-success':type === 'success' },{'wrapper-ordinary':type === 'none' }]" v-if="visible">
		<div class="toast-success" v-show="type === 'success' ">√</div>
		<div class="toast-wrapper">
			<div>{{content}}</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "LiToast",
    data() {
		return {
			content: '',
			duration: 3000,
			visible: false,
			type:'none'//'success','warning','error'
		}
    },
    mounted() {
      	this.close()
    },
    methods: {
		close() {
			window.setTimeout(() =>{
				this.visible = false
			}, this.duration);
		}
    }
  }
</script>
<style lang='css' scoped>
.wrapper {
	position: fixed;
	top: 50%;
	left: 50%;
	background: rgba(0,0,0,0.8);
	border-radius: 3px;
    -webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	color: #fff;
	font-size: 14px;
}
/* 普通按钮 */
.wrapper-ordinary .toast-wrapper {
	display: flex;
	max-width: 200px;
	justify-content: center;
	align-items: center;
	padding: 3px 10px;
	min-height: 20px;
	color: #fff;
	font-size: 12px;
}
.wrapper-ordinary .toast-wrapper div {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	word-break:break-all;
}
/* 成功按钮 */
.wrapper-success {
	width: 120px;
	height: 120px;
	border-radius: 6px;
}
.wrapper-success .toast-success {
	font-size: 60px;
	color: #fff;
	font-weight: bold;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
.wrapper-success .toast-wrapper {
	height: 20px;
	margin-top: 12px;
	padding: 0 3px;
	text-align: center;
	word-break:break-all;
	overflow: hidden;
}
</style>