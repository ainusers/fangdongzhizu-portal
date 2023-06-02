import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:"",
		token:'',
		messegeNum:[],
		houseInfo:[],
		communityInfo:{},
		currentCity:'北京市',//当前城市
		ThreeInfo:{},
		isWx:false, //是否是微信授权
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
		ThreeInfo(state,ThreeInfo){
			state.ThreeInfo=ThreeInfo
			uni.setStorage({
				key:'ThreeInfo',
				data:ThreeInfo
			})		
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
			
		},
		communityInfo(state,communityInfo){
			state.communityInfo=communityInfo
			uni.setStorage({
				key:'communityInfo',
				data:communityInfo
			})
		},
		currentCity(state,city){
			state.currentCity=city
			uni.setStorage({
				key:'currentCity',
				data:city
			})
		},
		isWx(state,isWx){
			state.isWx=isWx
			uni.setStorage({
				key:'isWx',
				data:isWx
			})
		}
	},
	getters:{
		token:state=>{
			return state.token
		},
		WXInfo:state=>{
			return state.WXInfo
		}
	}
})

export default store
