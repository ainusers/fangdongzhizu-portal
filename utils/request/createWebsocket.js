import Vue from 'vue'
import store from '@/store/index.js';
import config from '@/utils/request/config.js'
import {getuserInfo,initStorestate,getStoreData,setBarUnreadCount} from '@/utils/utils.js'
let fromName=''
let socketInstance=''
let currentName=store.state.userInfo.username
var heartCheck=''
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
		// 存储消息状态
		store.commit('socket_status',true)
		// 发送消息认证
		authSocketFn();
	});
	// 关闭socket链接
	socketInstance.onClose(() => {
		clearInterval(heartCheck);
		store.commit('isChatStatus',false)
    store.commit('socket_status',false)
    uni.getStorage({
			key:'token',
			success(res) {
        console.log(res)
				if(res.data){
          createlink()
				}
			}
		})
   
	})
	// socket链接错误
	socketInstance.onError(() => {
    console.log('链接错误吗')
		clearInterval(heartCheck);
		store.commit('isChatStatus',false)
    store.commit('socket_status',false)
	})
	// 接收消息
	socketInstance.onMessage( async (res) => {
		let data = eval("(" + res.data + ")");
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
let authSocketFn=function authSocket() {
	// 发送认证消息
  let socket_status=''
  uni.getStorage({
    key:'socket_status',
    success(res){
      socket_status=res.data
    }
  })
	if (socket_status || store.state.socketInstance) {
		socketInstance.send({
			data: "{'type':'signal','from':"+store.state.userInfo.username+"}",
			async success() {
				store.commit('isChatStatus',true)
			},
		});

		heartCheck = setInterval(()=>{
			if(store.state.token){
				socketInstance.send({
					data: "{'type':'keep','from':"+store.state.userInfo.username+"}",
					async success() {
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
		if(item.room==data.room){
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
	if(data.id&&msgList.length>0){
		msgList.forEach(item=>{
			// 当前发消息的不是自己且当前没有在聊天
			if(item.room==data.room&&data.from!=store.state.userInfo.username&&store.state.currentNameChat!=data.from){
				// 设置未读消息数
				setMsgUnreadCount(data)
				// 本条消息未读数+1
				item.unReadCount+=1
				getStoreData('unReadCount')
				let count=store.state.unReadCount+=1
				store.commit('unReadCount',count)
				// 设置Bar未读消息数
				setBarUnreadCount();
			}
		})
		uni.vibrateLong();
	}
	store.commit('chatList',msgList)
}
// 设置未读消息数
function setMsgUnreadCount(data){
	// 如果当前没有和xx聊天则设置未读消息
	if(store.state.currentNameChat!=data.from){
		let count=store.state.unReadCount++
		store.commit('unReadCount',count)
	}
}
// 添加文字消息
function addTextMsg(data,chatList){
	if(data.id&&chatList.length>0){
		chatList.forEach(item=>{
			if(item.room==data.room){
				// 适配表情包
				if(data.msg.indexOf('alt')!=-1){
					data.typename=infoImgInit(data)
				}else{
					data.typename=data.msg
				}
				item.data.push(data)
			}
		})
	}
	return chatList	
}	
// 添加图片消息
function addImgMsg(data,chatList){
	// 设置图片格式
	data.msg = setPicSize(data.msg);
	if(data.id&&chatList.length>0){
		chatList.forEach(item=>{
			if(item.room==data.room){
				data.typename="[图片]"
				item.data.push(data)
			}
		})
	}
	return chatList
}
// 添加语音消息
function addVoiceMsg(data,chatList){
	if(data.id&&chatList.length>0){
		chatList.forEach(item=>{
			if(item.room==data.room){
				data.typename='[语音]'
				item.data.push(data)
			}
		})
	}
	return chatList
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
	let maxW = uni.upx2px(150);//150是定义消息图片最大宽度
	let maxH = uni.upx2px(200);//200是定义消息图片最大高度
	if(content.w>maxW||content.h>maxH){
		let scale = Number(content.w)/Number(content.h);
		content.w = scale>1?maxW:maxH*scale;
		content.h = scale>1?maxW/scale:maxH;
	}
	return content;
}
// 清除聊天心跳
const clearHeartCheck=function clearHeartCheck(type){
  while(heartCheck>0){
    clearInterval(heartCheck)
    heartCheck--
  }
  if(type){
    socketInstance.send({
			data: "{'type':'close','from':"+store.state.userInfo.username+"}",
			async success() {
			},
		});
  }
}

export {
	createlink,
	heartCheck,
	isCreate,
	clearHeartCheck,
  authSocketFn
}