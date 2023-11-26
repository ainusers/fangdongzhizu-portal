import Vue from 'vue'
import store from '@/store/index.js';
import config from '@/utils/request/config.js'
import {getuserInfo,initStorestate,getStoreData,setBarUnreadCount} from '@/utils/utils.js'
let fromName=''
let socketInstance=''
let isChatStatus=''
let currentName=store.state.userInfo.username
let heartCheck=''
let isCreate=false

const createlink = function createlink(){
	socketInstance = uni.connectSocket({
		url: config.wsUrl + "/websocket",
		success(data) {
			console.log('链接成功')
		}
	});
	// 打开socket链接
	socketInstance.onOpen((res) => {
		console.log('打开链接');
		// 存储消息状态
		store.commit('socket_status',true)
		// 发送消息认证
		authSocket();
	});
	// 关闭socket链接
	socketInstance.onClose(() => {
		clearInterval(heartCheck);
		store.commit('isChatStatus',false)
	})
	// socket链接错误
	socketInstance.onError(() => {
		clearInterval(heartCheck);
		store.commit('isChatStatus',false)
	})
	// 接收消息
	socketInstance.onMessage( async (res) => {
		let data = eval("(" + res.data + ")");
		console.log(data)
		let chatList=store.state.chatList || []
		// 判断是否聊过天
		if(!isChat(data)){
			let targetName=data.target  //目标对象的username  fromName为昵称
			if(data.from != store.state.userInfo.username){
				targetName=data.from
			}
			//初次收到消息要对当前对象添加fromName和fromAvtar  用于消息列表展示
			addKey(data).then(res=>{
				chatList.push({room:data.room,fromName:res.fromName,fromAvatar:res.fromAvatar,targetName:targetName,currentName:store.state.userInfo.username,unReadCount:0,data:[]})
				return chatList
			}).then(res=>{
				addInfoInit(data,res)
			})
		}else{
			// 添加消息
			addInfoInit(data,chatList)
		}
	});
}
// 添加消息列表用户名称和头像
function addKey(data){
	let target=data.target
	if(data.from != store.state.userInfo.username){
		target=data.from
	}
	let obj={}
	return getuserInfo(target,1).then(res=>{
		obj.fromName=res.nickname
		obj.fromAvatar=res.avatar
		return obj
	})
}
// 消息认证
function authSocket() {
	let that=this
	// 发送认证消息
	if (store.state.socket_status) {
		socketInstance.send({
			data: "{'type':'signal','from':"+store.state.userInfo.username+"}",
			async success() {
				store.commit('isChatStatus',true)
			},
		});
		clearInterval(heartCheck);
		heartCheck = setInterval(function() {
			if(store.state.token){
				socketInstance.send({
					data: "{'type':'keep','from':"+store.state.userInfo.username+"}",
					async success() {
						console.log('心跳检测')
					},
					fail(e){
						console.log(e)
					}
				});
			}else{
				clearInterval(heartCheck)
				store.commit('isChatStatus',false)
			}
		}, 5000);
		Vue.prototype.$socketInstance=socketInstance
	}
}
// 是否聊过天
function isChat(data){
	let temp=store.state.chatList
	if(temp&&temp.length==0){return}
	let arr=temp.filter(item=>{
		if(item.room==data.room&&item.currentName==store.state.userInfo.username){
			return item
		}
	})
	return arr.length
}
// 添加消息
function addInfoInit(data,chatList){
	let msgList=''
	switch (data.type) {
		case 'text':
			msgList=addTextMsg(data,chatList);
			break;
		case 'voice':
			msgList=addVoiceMsg(data,chatList);
			break;
		case 'img':
			msgList=addImgMsg(data,chatList);
			break;
	}
	if(data.id&&data.from!=store.state.userInfo.username){
		if(msgList.length>0){
			msgList.forEach(item=>{
				if(item.room==data.room&&item.currentName==store.state.userInfo.username){
					if(store.state.currentNameChat!=data.from){
						// 设置未读消息数
						setMsgUnreadCount(data)
						// 本条消息未读数+1
						item.unReadCount+=1
						getStoreData('unReadCount')
						let count=store.state.unReadCount+=1
						store.commit('unReadCount',count)
						// 设置Bar未读消息数
						setBarUnreadCount(count)
					}
				}
			})		
		}
		uni.vibrateLong();
	}
	store.commit('chatList',msgList)
}
// 设置未读消息数
function setMsgUnreadCount(data){
	if(store.state.currentNameChat!=data.from){
		let count=store.state.unReadCount++
		store.commit('unReadCount',count)
	}
}
// 添加文字消息
function addTextMsg(data,chatList){
	for(let i=0;i<chatList.length;i++){
		let item=chatList[i]
		if(item.room==data.room&&item.currentName==store.state.userInfo.username){
			// 适配表情包
			if(data.msg.indexOf('alt')!=-1){
				data.typename=infoImgInit(data)
			}else{
				data.typename=data.msg
			}
			item.data.push(data)
		}
	}
	return chatList	
}	
// 添加图片消息
function addImgMsg(data,chatList){
	data.msg = setPicSize(data.msg);
	if(data.id&&chatList.length>0){
		chatList.forEach(item=>{
			if(item.room==data.room&&item.currentName==store.state.userInfo.username){
				let date=new Date(item.datetime)
				let y=date.getFullYear()
				data.typename="[图片]"
				item.data.push(data)
			}
		})
	}
	return chatList
}
// 添加语音消息
function addVoiceMsg(data,chatList){
	if(data.id){
		chatList.forEach(item=>{
			if(item.room==data.room&&item.currentName==store.state.userInfo.username){
				let date=new Date(item.datetime)
				let y=date.getFullYear()
				data.typename='[语音]'
				item.data.push(data)
			}
		})
	}
	return chatList
}
// 处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
function createPromise(data){
	return new Promise((resolve,reject)=>{
		setTimeout(function(){
			resolve(data)
		},0)
	})
}
// 处理表情包
function infoImgInit(data){
	let	name=''
	let alttext=data.msg.split('alt="')[1]
	if(alttext){
		name=alttext.slice(0,alttext.length-2).split('">')[0]
	} 
	return name
}
// 设置图片大小
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
// 清除聊天心跳
const clearHeartCheck=function clearHeartCheck(){
	 clearInterval(heartCheck)
}

export {
	createlink,
	heartCheck,
	isCreate,
	clearHeartCheck
}