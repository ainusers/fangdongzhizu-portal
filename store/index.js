import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:'',
		token:'',
		communityInfo:{},
		address:{},
		ispublishSub:false, //是否点击到过开启定位服务界面
		version:'1.0.5'
	},
	mutations: {
		userInfo(state,obj){
			if(obj){
				state.userInfo=obj
				uni.setStorage({
					key:'userInfo',
					data:obj
				})
			}
		},
		token(state,token){
			state.token=token
			uni.setStorage({
				key:'token',
				data:token
			})	
		},
		login(state, userInfo) {			
			state.hasLogin = true;
			uni.setStorageSync("hasLogin",true);
			
			state.userInfo = userInfo;
			uni.setStorageSync("userInfo",userInfo);
		},
		logout(state) {
			state.userInfo = {
				uid:null,
				fans:0,
				down:0
			};
			uni.removeStorageSync("userInfo");
		},
		communityInfo(state,communityInfo){
			state.communityInfo=communityInfo
			uni.setStorage({
				key:'communityInfo',
				data:communityInfo
			})
		},
		address(state,address){
			state.address=address
			uni.setStorage({
				key:'address',
				data:address
			})
		},
		ispublishSub(state,address){
			state.ispublishSub=ispublishSub
			uni.setStorage({
				key:'ispublishSub',
				data:ispublishSub
			})
		}
	},
	getters:{
		token:state=>{
			return state.token
		},
		userInfo:state=>{
			return state.userInfo
		}
	}
})

export default store
