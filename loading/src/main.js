import Vue from 'vue'
import loading from './main.vue'

var showLloadingt = false; // 存储toast显示状态
const LoadingBox = Vue.extend(loading)
loading.install = function (options, type) {
	if ( options === undefined || options === null ) {
		options = {
			content: ''
		}
	}

	let instance = new LoadingBox({
		data: options
	}).$mount()

	document.body.appendChild(instance.$el)

	Vue.nextTick(() => {
		instance.show = true;
	})
}


export default loading