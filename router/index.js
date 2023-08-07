import Vue from 'vue'
import store from '../store/index.js'
import Router from 'uni-simple-router'
import pages from '../pages.js'
import {getStoreData} from '../utils/utils.js'
Vue.use(Router)

const myRouter=pages().pages.map(item=>({
	path:`/${item.path}`,
	meta:item.meta||{}
}))
//初始化
const router=new Router({
	routes:myRouter
})
//全局路由守卫
router.beforeEach((to,from,next)=>{
		getStoreData('token')
		let token=store.state.token
		if(to.path.indexOf('login')!=-1&&token){ //如果当前要访问login页面并且有token，就跳转首页
			uni.switchTab({
				url: '/pages/tabbar/home/home'
			})
		}
		if(!to.meta.needLogin|| to.meta.needLogin&&token){  //不需要登录就直接跳转 ||需要token校验并且有token 直接next
			next()
		}
		
		if(to.meta.needLogin&&!token){ //需要token校验并且没有token 去登录页面登录
			uni.navigateTo({
				url: '/pages/auth/login'
			})
		}
})
//全局路由后置守卫
router.afterEach((to,from)=>{})
export default router