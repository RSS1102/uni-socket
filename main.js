import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// vant
import uView from 'uview-ui'
Vue.use(uView)
// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		}
		// 其他组件属性配置
		// ......
	}
})


import store from './store/index'
import VueSocketIO from 'vue-socket.io'
Vue.use(
    new VueSocketIO({
        debug: false, // debug调试，生产建议关闭
        connection: "http://localhost:3000",
        options: { //Optional options, 
            autoConnect: false, //关闭自动连接，在用户登录后在连接。
        }
    })
);


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})


app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
