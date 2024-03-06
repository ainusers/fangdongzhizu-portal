import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:'',
		token:'',
		messegeNum:[],
		loadlTuwenStatus:'',
		communityInfo:{},
		currentCity:'定位中...',//当前城市
		lock: 0,//让watch监听只走一次
		currentNameChat:'',//当前和谁正在聊天
		version:'1.0.2',
		address:{},
		ispublishSub:false, //是否点击到过开启定位服务界面
	},
	mutations: {
		lock(state,obj){
			state.lock=obj
			uni.setStorage({
				key:'lock',
				data:obj
			})
		},
		loadlTuwenStatus(state,obj){
			if(obj){
				state.loadlTuwenStatus=obj
				uni.setStorage({
					key:'loadlTuwenStatus',
					data:obj
				})
			}
		},
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
		currentCity(state,city){
			state.currentCity=city
			uni.setStorage({
				key:'currentCity',
				data:city
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
		loadlTuwenStatus:state=>{
			return state.loadlTuwenStatus
		},
		userInfo:state=>{
			return state.userInfo
		},
		chatList:state=>{
			return state.chatList
		}
	}
})

export default store
