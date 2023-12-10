import App from './App.vue'

// 挂载Vuex
import store from './store';
Vue.prototype.$store = store;

// config配置文件
import config from '@/utils/config.js';  
Vue.prototype.$c = config;

// 引入请求对象
import request from '@/utils/request.js'
Vue.prototype.$H = request;

// 引入uview-ui框架
import uView from "uview-ui";
Vue.use(uView);

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {createSSRApp} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
