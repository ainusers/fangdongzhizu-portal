import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:"",
		token:'',
		messegeNum:[],
		houseInfo:{}
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
			if(token){
				state.token=token
				uni.setStorage({
					key:'token',
					data:token
				})
			}
			
		},
		houseInfo(state,houseInfo){
			if(houseInfo){
				state.houseInfo=houseInfo
				uni.setStorage({
					key:'houseInfo',
					data:houseInfo
				})
			}
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
			
		}
	}
})

export default store
