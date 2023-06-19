import Vue from 'vue'
import store from '@/store/index.js';
import {getuserInfo,initStorestate,getStoreData,setBarBadgeNum} from '@/utils/utils.js'
let fromName=''
let socketInstance=''

 const createlink=function createlink(type){
			socketInstance=''
			socketInstance  =  uni.connectSocket({
				// 确保你的服务器是运行态
				url: "ws://81.70.163.240:17180/websocket",
				success(data) {
					// console.log("websocket连接状态：" + JSON.stringify(data.errMsg));
				}
			});
			// 打开socket链接
			socketInstance.onOpen((res) => {
				// 发送认证消息
					store.commit('socket_status',true)
				setTimeout(function() {
					authSocket(type);
				}, 10);
			});
			socketInstance.onMessage((res) => {
				console.log("收到服务器内容：" + res.data);
				let data = eval("(" + res.data + ")");
				
				//发送消息的时候需要给当前聊天记录赋值上fromname 和 fromavater  用于消息列表展示
				let tempChatList=''
				setTimeout(function(){
					initStorestate()
					tempChatList=store.state.chatList
					console.log(tempChatList)
					tempChatList.forEach(item=>{
						if(item.room==data.room&&!item.fromName){
							console.log(item.fromName)
							addKey(data,item,tempChatList)
						}	
					})
				},0)
			
				
				// // 非自己的消息震动
				if(data.id&&data.from!=store.state.userInfo.username&&data.msg!='ping'&& data.type!='signal'){
							setTimeout(function(){
								if(tempChatList.length>0){
									tempChatList.forEach(item=>{
										if(item.room==data.room){
											if(store.state.currentNameChat!=data.from){
												console.log('++')
												item.unReadCount+=1
												getStoreData('unReadCount')
												let count=store.state.unReadCount+=1
												store.commit('unReadCount',count)
												setBarBadgeNum(count)
												
											}
										}
									})
										store.commit('chatList',tempChatList)
								}	
								
							},0)
					
					uni.vibrateLong();
				}
				// data.avatar=this.$store.state.userInfo.avatar
				
				// data.otherAvatar=this.otherAvatar
				switch (data.type) {
					// case 'system':
					// 	this.addSystemTextMsg(data);
					// 	break;
					case 'text':
						addTextMsg(data);
						break;
					case 'voice':
						addVoiceMsg(data);
						break;
					case 'img':
						addImgMsg(data);
						break;
				}
			});
		}
		function addKey(data,item,tempChatList){
			let target=data.target
			if(data.from != store.state.userInfo.username){
				target=data.from
			}
			getuserInfo(target,1).then(res=>{
				item.fromName=res.nickname
				item.fromAvatar=res.avatar
				store.commit('chatList',tempChatList)
			})
		}
		//消息认证
function authSocket(room,type) {
		if (store.state.socket_status) {
			socketInstance.send({
				data: "{'type':'signal','from':"+store.state.userInfo.username+"}",
				async success() {
					store.commit('isChatStatus',true)
					// that.isChatStatus=true
					console.log("认证消息发送成功");
					if(type){
						console.log('我要发送消息了')
					}
					
				},
			});
			Vue.prototype.$socketInstance=socketInstance
			console.log(Vue.prototype.$socketInstance)
		}
	}
function setUnreadCountAll(data){
	if(store.state.currentNameChat!=data.fromName){
		let count=store.state.unReadCount++
		store.commit('unReadCount',count)
	}
}
function addTextMsg(data){
	console.log(data)
	let isChat=false
	let chatList=store.state.chatList
	if(Array.isArray(chatList)){
		chatList=chatList
	}else{
		chatList=JSON.parse(chatList)
	}
	chatList.forEach(item=>{
		if(item.room==data.room){
			isChat=true
			let alttext=data.msg.split('alt="')[1]
			let typename=''
			if(alttext){
				typename=alttext.slice(0,alttext.length-2).split('"><img')[0]
			} 
			if(data.msg.indexOf('alt')!=-1){
				data.typename=typename
			}else{
				data.typename=data.msg
			}
			
			item.data.push(data)
		}
	})
	if(!isChat){
		if(data.msg.indexOf('alt')!=-1){
			data.typename='[表情]'
		}else{
			data.typename=data.msg
		}
		setUnreadCountAll(data)
			let target=data.target
			if(data.from != store.state.userInfo.username){
				target=data.from
			}
			chatList.push({room:data.room,fromName:fromName,targetName:target,unReadCount:0,data:[data]})
	}
		store.commit('chatList',chatList)
		store.commit('lock',0)
}	
function addImgMsg(msg){
	console.log(msg)
	let chatList=store.state.chatList
	let isChats=false
	msg.msg = setPicSize(msg.msg);
	if(msg.id&&chatList.length>0){
		chatList.forEach(item=>{
			console.log(item.room)
			if(item.room==msg.room){
				isChats=true
				let date=new Date(item.datetime)
				let y=date.getFullYear()
				msg.typename="[图片]"
				item.data.push(msg)
			}
		})
	}
	if(!isChats){
		msg.typename="[图片]"
		setUnreadCountAll(msg)
		let target=msg.target
		if(msg.from != store.state.userInfo.username){
			target=msg.from
		}
		chatList.push({room:msg.room,targetName:msg.target,unReadCount:0,data:[msg]})
	}
	store.commit('chatList',chatList)
	store.commit('lock',0)
}
function addVoiceMsg(data){
	let chatList=store.state.chatList
	let isChat=false
				console.log('添加语音，',data)
				if(data.id){
					chatList.forEach(item=>{
						if(item.room==data.room){
							isChat=true
							let date=new Date(item.datetime)
							let y=date.getFullYear()
							data.typename='[语音]'
							item.data.push(data)
						}
					})
				}
				//从来没有聊过天
				if(!isChat){
					setUnreadCountAll(data)
					data.typename="[语音]"
					let target=data.target
					if(data.from != store.state.userInfo.username){
						target=data.from
					}
					chatList.push({room:data.room,targetName:target,unReadCount:0,data:[data]})
				}
				store.commit('chatList',chatList)
				store.commit('lock',0)
			}
			// 处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
function setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = Number(content.w)/Number(content.h);
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			}
createlink()



export {
	createlink
}