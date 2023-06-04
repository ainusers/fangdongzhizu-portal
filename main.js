import App from './App.vue'
// import Router from './router/index.js'
// import { RouterMount } from 'uni-simple-router'
// 挂载Vuex
import store from './store';  
Vue.prototype.$store = store;

// config配置文件
import config from './utils/request/config.js';  
Vue.prototype.$c = config;

// 引入请求对象
import request from './utils/request/request.js'
Vue.prototype.$H = request;

// 引入uview-ui框架
import uView from "uview-ui";
Vue.use(uView);
// Vue.use(Router)
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store,
})
uni.getStorage({
			key:'token',
			success(res) {
				
				if(res.data){
					uni.switchTab({
						url: '/pages/tabbar/home/home'
					})
				}
			}
		})
app.$mount()
// #endif
// #ifdef H5
	// RouterMount(app,'#app');
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
