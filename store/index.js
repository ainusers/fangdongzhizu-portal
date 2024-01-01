import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		socketStatus:'', //socket状态
		userInfo:'',
		token:'',
		messegeNum:[],
		// houseInfo:[],
		communityInfo:{},
		currentCity:'定位中...',//当前城市
		chatList:[],//聊天记录
		currentChatList:[],//当前聊天记录
		lock:0,//让watch监听只走一次
		currentNameChat:'',//当前和谁正在聊天
		unReadCount:0,//未读消息总数
		version:'1.0.1.6',
		address:{},
		ispublishSub:false, //是否点击到过开启定位服务界面
	},
	mutations: {
		// socket状态
		socketStatus(state,obj){
			state.socketStatus=obj
			uni.setStorage({
				key:'socketStatus',
				data:obj
			})	
		},
		currentNameChat(state,obj){
			state.currentNameChat=obj
			uni.setStorage({
				key:'currentNameChat',
				data:obj
			})
		},
		unReadCount(state,obj){
			state.unReadCount=obj
			uni.setStorage({
				key:'unReadCount',
				data:obj
			})
		},
		lock(state,obj){
			state.lock=obj
			uni.setStorage({
				key:'lock',
				data:obj
			})
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
		// houseInfo(state,houseInfo){
		// 	if(houseInfo){
		// 		state.houseInfo=houseInfo
		// 		uni.setStorage({
		// 			key:'houseInfo',
		// 			data:houseInfo
		// 		})
		// 	}
		// },
		chatList(state,obj){
			if(obj){
				state.chatList=obj
				uni.setStorage({
					key:'chatList',
					data:obj
				})
			}
		},
		currentChatList(state,obj){
			state.currentChatList=obj
			uni.setStorage({
				key:'currentChatList',
				data:obj
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
		socketStatus:state=>{
			return state.socketStatus
		},
		token:state=>{
			return state.token
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
