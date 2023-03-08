import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:"",
		token:'',
		messegeNum:[],
		houseDeatil:{}
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
		houseDeatil(state,houseDeatil){
			if(houseDeatil){
				state.houseDeatil=houseDeatil
				uni.setStorage({
					key:'houseDeatil',
					data:houseDeatil
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
