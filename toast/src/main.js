import Vue from 'vue'
import Toast from './main.vue'

var showToast = false; // 存储toast显示状态
const ToastBox = Vue.extend(Toast)
Toast.install = function (options, type) {
	if ( options === undefined || options === null ) {
		options = {
			content: ''
		}
	} else if (typeof options === 'string' || typeof options === 'number') {
		options = {
			content: options
		}
		if (type != undefined && options != null) {
			options.type = type;
		}
	}

	let instance = new ToastBox({
		data: options
	}).$mount()

	document.body.appendChild(instance.$el)

	Vue.nextTick(() => {
		instance.visible = true;
	})
}

export default Toast