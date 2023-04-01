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
console.log('myrouter',myRouter)
//初始化
const router=new Router({
	routes:myRouter
})
//全局路由守卫
router.beforeEach((to,from,next)=>{
		getStoreData('token')
		let isLogin=store.state.token
		if(to.path.indexOf('login')!=-1&&!isLogin){
			next()
		}else{
			if(!isLogin){
					uni.navigateTo({
						url: '/pages/auth/login'
					})
				next()
			}else if(to.path.indexOf('login')==-1){
				next()
			}else{
				uni.switchTab({
					url: '/pages/tabbar/home/home'
				})
						next()
			}
			
		}
})
//全局路由后置守卫
router.afterEach((to,from)=>{})
export default router