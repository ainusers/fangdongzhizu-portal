import Vue from 'vue'
import store from '@/store/index.js';
import config from '@/utils/config.js'
import {initStorestate, getStoreData, getuserInfo, setBarUnreadStatus} from '@/utils/utils.js'

let socketInstance = '';// socket对象
let heartbeatInterval = '';// 心跳定时任务对象
let currentName=store.state.userInfo.username

// 创建连接
function connectSocket() {
	socketInstance = uni.connectSocket({
		url: config.wsUrl,
		success(data) {
			console.log('连接IM服务成功')
		},
		fail(data) {
			console.log('连接IM服务失败')
		}
	})
	socketInstance.onOpen(() => {
		console.log('socket连接已打开！');
		// WebSocket.OPEN = 1
		if (socketInstance.readyState === 1) {
			// 将socket对象存放本地内存
			store.commit('socketStatus',socketInstance.readyState)
			// 延迟一秒触发用户认证
			setTimeout(function() {
				// 发送消息认证
				userAuth();
			}, 1000)
		}
	})
	socketInstance.onMessage((res) => {
		// 数据处理
		handleMessage(res);
	})
	socketInstance.onClose(() => {
		console.log('socket连接已关闭！');
		// 重新连接
		connectSocket();
	})
	socketInstance.onError((res) => {  
		console.log('socket连接发生错误：', res);  
		// 重新连接  
		connectSocket();  
	})
}

// 用户认证
function userAuth() {
	// 发送认证消息
	socketInstance.send({
		data: "{'type':'signal','from':"+store.state.userInfo.username+"}",
		async success() {
			console.log('发送认证消息成功');
		},
		async fail(err){
			console.log('发送认证消息失败');
		}
	});
	// 开始心跳检测
	startHeartbeat();
	// 将socket对象存放全局
	Vue.prototype.$socketInstance=socketInstance
}

// 发送心跳
function startHeartbeat() {
	heartbeatInterval = setInterval(() => {
		socketInstance.send({
			data: "{'type':'keep','from':"+store.state.userInfo.username+"}",
			async success() {
				console.log('发送心跳检测成功')
			},
			fail(e){
				console.log('发送心跳检测失败')
				// 重新链接scoket
				connectSocket();
			}
		});
	}, 20000); // 每10秒发送一次心跳消息
}

// 停止心跳
function stopHeartbeat() {
	// 清除定时器，停止发送心跳消息 
	clearInterval(heartbeatInterval);
}

// 重新链接socket调用方法
// function reconnect() {
	// // 停止发送心跳消息
	// stopHeartbeat();
	// // 如果重连成功则退出
	// socketInstance = uni.connectSocket({
	// 	url: 'ws://localhost:31780',
	// 	success(data) {
	// 		console.log('重新连接IM服务成功')
	// 		// 发送心跳以保持连接活跃
	// 		startHeartbeat();
	// 		// 将socket对象存放全局
	// 		Vue.prototype.$socketInstance=socketInstance
	// 	},
	// 	fail(data) {
	// 		console.log('重新连接IM服务失败')
	// 		// 重新连接scoket
	// 		connectSocket();
	// 	}
	// })
// }

// 处理消息
function handleMessage(event) {
	let data = eval("(" + event.data + ")");
	console.log(JSON.stringify(data))
	let chatList=store.state.chatList || []
	console.log(chatList)
	console.log(data)
	// 判断是否聊过天
	let result = isChat(chatList, data);
	console.log(result)
	console.log(result.length === 0)
	if(result.length === 0){
		console.log("1")
		let targetName=data.target  //目标对象的username  fromName为昵称
		if(data.from != store.state.userInfo.username){
			targetName=data.from
		}
		//初次收到消息要对当前对象添加fromName和fromAvtar，用于消息列表展示
		addKey(data).then(res=>{
			chatList.push({room:data.room,fromName:res.fromName,fromAvatar:res.fromAvatar,targetName:targetName,currentName:store.state.userInfo.username,data:[]})
			store.state['chatList'] = chatList
			return chatList
		}).then(res=>{
			// 添加消息到本地
			addMsgToLocal(data, res)
		})
	}else{
		// 添加消息到本地
		addMsgToLocal(data, chatList)
	}
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

// 是否聊过天
function isChat(chatList, data){
	let record = chatList.filter(item=>{
		return item.room==data.room
	})
	return record;
}

// 添加消息
function addMsgToLocal(data,chatList){
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
		// 设置Bar未读消息数
		setBarUnreadStatus();
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
				
			}
		})
		uni.vibrateLong();
	}
	store.commit('chatList',msgList)
}

// 添加文字消息
function addTextMsg(data,chatList){
	if(data.id && chatList.length>0){
		chatList.forEach(item=>{
			if(item.room==data.room){
				// 适配表情包
				if(data.msg.indexOf('alt')!=-1){
					data.typename=makeEmoji(data)
				}else{
					data.typename=data.msg
				}
				item.data.push(data)
			}
		})
	}
	return chatList	
}	

// 处理表情包
function makeEmoji(data){
	let	name=''
	let alttext=data.msg.split('alt="')[1]
	if(alttext){
		name=alttext.slice(0,alttext.length-2).split('">')[0]
	} 
	return name
}

// 添加图片消息
function addImgMsg(data,chatList){
	// 设置图片格式
	data.msg = setImgSize(data.msg);
	if(data.id && chatList.length>0){
		chatList.forEach(item=>{
			if(item.room==data.room){
				data.typename="[图片]"
				item.data.push(data)
			}
		})
	}
	return chatList
}

// 设置图片大小
function setImgSize(content){
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

// 添加语音消息
function addVoiceMsg(data,chatList){
	if(data.id && chatList.length>0){
		chatList.forEach(item=>{
			if(item.room==data.room){
				data.typename='[语音]'
				item.data.push(data)
			}
		})
	}
	return chatList
}

// 设置未读消息数
function setMsgUnreadCount(data){
	// 如果当前没有和xx聊天则设置未读消息
	if(store.state.currentNameChat!=data.from){
		let count=store.state.unReadCount++
		store.commit('unReadCount',count)
	}
}
			
export {
	connectSocket,
	startHeartbeat,
	stopHeartbeat
}