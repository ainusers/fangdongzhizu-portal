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
		chatList:[],//聊天记录
		currentChatList:[],//当前聊天记录
		isChatStatus:false,//当前聊天连接的状态是否成功 给服务发送消息验证
		socket_status:false,//当前socket 是否打开
		otherName:'',
		otherAvtar:'',
		lock:0,//让watch监听只走一次
		currentNameChat:'',//当前和谁正在聊天
		unReadCount:0,//未读消息总数
	},
	mutations: {
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
		otherAvtar(state,obj){
			state.otherAvtar=obj
			uni.setStorage({
				key:'otherAvtar',
				data:obj
			})
		},
		otherName(state,obj){
			state.otherName=obj
			uni.setStorage({
				key:'otherName',
				data:obj
			})
		},
		currentChatList(state,obj){
			state.currentChatList=obj
			uni.setStorage({
				key:'currentChatList',
				data:obj
			})
		},
		socket_status(state,obj){
			state.socket_status=obj
			uni.setStorage({
				key:'socket_status',
				data:obj
			})
			
		},
		isChatStatus(state,obj){
			if(obj){
				state.isChatStatus=obj
				uni.setStorage({
					key:'isChatStatus',
					data:obj
				})
			}
		},
		chatList(state,obj){
			console.log(obj)
			if(obj){
				state.chatList=obj
				uni.setStorage({
					key:'chatList',
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
