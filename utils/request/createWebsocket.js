import Vue from 'vue'
import store from '@/store/index.js';
import {getuserInfo,initStorestate} from '@/utils/utils.js'
let socketInstance=''

 function createlink(){
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
					authSocket();
				}, 10);
			});
			socketInstance.onMessage((res) => {
				console.log("收到服务器内容：" + res.data);
				let data = eval("(" + res.data + ")");
				// // 非自己的消息震动
				if(data.id&&data.from!=store.state.userInfo.username&&data.msg!='ping'&& data.type!='signal'){
						initStorestate()
					if(!store.state.otherName|| !store.state.otherAvtar){
						getuserInfo(data.from,1).then(res=>{
							store.commit('otherName',res.nickname)
							store.commit('otherAvtar',res.avatar)
						})
					}
					
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
				
				// // 滚动到底
				// Vue.$nextTick(function() {
				// 	// this.scrollToView = 'msg' + data.id
				// });
			});
		}
		//消息认证
function authSocket(room) {
		if (store.state.socket_status) {
			socketInstance.send({
				data: "{'type':'signal','from':"+store.state.userInfo.username+"}",
				async success() {
					store.commit('isChatStatus',true)
					// that.isChatStatus=true
					console.log("认证消息发送成功");
				},
			});
		}
	}
function addTextMsg(data){
	console.log('添加文本',data)
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
			if(data.msg.indexOf('alt')!=-1){
				data.typename='[表情]'
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
		chatList.push({room:data.room,data:[data]})
	}
	store.commit('chatList',chatList)
	store.commit('lock',0)
}	
function addImgMsg(msg){
	let chatList=store.state.chatList
				msg.msg = setPicSize(msg.msg);
				if(msg.id&&chatList.length>0){
					chatList.forEach(item=>{
						if(item.room==msg.room){
							let date=new Date(item.datetime)
							let y=date.getFullYear()
							msg.typename="[图片]"
							item.data.push(msg)
						
						}	
					})
				}else{
					msg.typename="[图片]"
					chatList.push({room:msg.room,data:[msg]})
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
					data.typename="[语音]"
					chatList.push({room:data.room,data:[data]})
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


Vue.prototype.$socketInstance=socketInstance