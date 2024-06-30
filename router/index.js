import Vue from 'vue'
import store from '@/store/index.js'
import Router from 'uni-simple-router'
import pages from '@/pages.js'
import {getStoreData} from '@/utils/utils.js'
Vue.use(Router)

const myRouter=pages().pages.map(item=>({
	path:`/${item.path}`,
	meta:item.meta||{}
}))

console.log('myrouter',myRouter)

// 初始化
const router=new Router({
	routes:myRouter
})

//全局路由守卫
router.beforeEach((to,from,next)=>{
	getStoreData('token')
	let token=store.state.token
	
	console.log(!to.meta.needLogin || (to.meta.needLogin && token))
	console.log(to.meta.needLogin && !token)
	
	// 不需要登录就直接跳转 ||需要token校验并且有token 直接next
	if(!to.meta.needLogin || (to.meta.needLogin && token)){  
		console.log(to)
		next()
	}
	
	// 需要token校验并且没有token 去登录页面登录
	if(to.meta.needLogin && !token){ 
		uni.navigateTo({
			url: '/pages/auth/login'
		})
		next()
	}
})

//全局路由后置守卫
router.afterEach((to,from)=>{})
export default router