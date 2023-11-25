import Vue from 'vue'
import store from '@/store/index.js';
import config from '@/utils/request/config.js'
import {getuserInfo,initStorestate,getStoreData,setBarBadgeNum} from '@/utils/utils.js'
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
		let newchatList=store.state.chatList || []
		 // 之前是否聊过天
		isChatStatus=isChatBoolean(data);
		// 如果没有聊过天
		if(!isChatStatus){
			let targetName=data.target  //目标对象的username  fromName为昵称
			if(data.from != store.state.userInfo.username){
				targetName=data.from
			}
			//初次收到消息要对当前对象添加fromName和fromAvtar  用于消息列表展示	
			addKey(data).then(res=>{
				 newchatList.push({room:data.room,fromName:res.fromName,fromAvatar:res.fromAvatar,targetName:targetName,currentName:store.state.userInfo.username,unReadCount:0,data:[]})
				return newchatList
			}).then(res=>{
				addInfoInit(data,res)
			})
		}else{
			// 添加消息
			addInfoInit(data,newchatList)
		}
	});
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
						// console.log('心跳检测')
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
function isChatBoolean(data){
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
function addInfoInit(data,newchatList){
	console.log(newchatList)
	let tempChatList=''
	switch (data.type) {
		// case 'system':
		// 	this.addSystemTextMsg(data);
		// 	break;
		case 'text':
			tempChatList=addTextMsg(data,newchatList);
			break;
		case 'voice':
			tempChatList=addVoiceMsg(data,newchatList);
			break;
		case 'img':
			tempChatList=addImgMsg(data,newchatList);
			break;
	}
	if(data.id&&data.from!=store.state.userInfo.username&&data.msg!='ping'&& data.type!='signal'){
		if(tempChatList.length>0){
			tempChatList.forEach(item=>{
				if(item.room==data.room&&item.currentName==store.state.userInfo.username){
					if(store.state.currentNameChat!=data.from){
						setUnreadCountAll(data)
						item.unReadCount+=1
						getStoreData('unReadCount')
						let count=store.state.unReadCount+=1
						store.commit('unReadCount',count)
						setBarBadgeNum(count)
					}
				}
			})		
		}	
		uni.vibrateLong();
	}
	store.commit('chatList',tempChatList)	
}
function addKey(data){
	let target=data.target
	if(data.from != store.state.userInfo.username){
		target=data.from
	}
	let obj={
		
	}
	return getuserInfo(target,1).then(res=>{
		console.log(res)
		obj.fromName=res.nickname
		obj.fromAvatar=res.avatar
		return obj
	})
}	
function setUnreadCountAll(data){
	if(store.state.currentNameChat!=data.fromName){
		let count=store.state.unReadCount++
		store.commit('unReadCount',count)
	}
}

function addTextMsg(data,chatList){
	let typename=''
	let currentNameChat=store.state.currentNameChat
	for(let i=0;i<chatList.length;i++){
		let item=chatList[i]
			if(item.room==data.room&&item.currentName==store.state.userInfo.username){
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

function addImgMsg(msg,chatList){
	msg.msg = setPicSize(msg.msg);
	if(msg.id&&chatList.length>0){
		chatList.forEach(item=>{
			if(item.room==msg.room&&item.currentName==store.state.userInfo.username){
				let date=new Date(item.datetime)
				let y=date.getFullYear()
				msg.typename="[图片]"
				item.data.push(msg)
			}
		})
	}
	return chatList
}

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

function infoImgInit(data){
	let	name=''
	let alttext=data.msg.split('alt="')[1]
	if(alttext){
		name=alttext.slice(0,alttext.length-2).split('">')[0]
	} 
	return name
}

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

const clearT=function clearT(){
	 clearInterval(heartCheck)
}

export {
	createlink,
	heartCheck,
	isCreate,
	clearT
}