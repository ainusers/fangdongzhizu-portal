import Vue from 'vue'
import store from '@/store/index.js';
import {getuserInfo,initStorestate,getStoreData,setBarBadgeNum} from '@/utils/utils.js'
let fromName=''
let socketInstance=''
let isChatStatus=''
 const createlink=  function  createlink(type){
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
			socketInstance.onMessage( async (res) => {
				console.log("收到服务器内容：" + res.data);
				let data = eval("(" + res.data + ")");
				//当前是否有过聊天记录 ，有直接push ，不需要添加fromName  没有就创建一个新的对象  
				let tempChatList=''
				let newchatList=store.state.chatList ||[]
				 //之前是否聊过天
				isChatStatus=isChatBoolean(data) 
				// 添加对方的fromName
					//处理所有类型初次聊天的info数据 //1.直接push，第一次添加都需要类型的判断处理
				if(!isChatStatus){
					let targetName=data.target
					if(data.from != store.state.userInfo.username){
						targetName=data.from
					}
					//初次收到消息要对当前对象添加fromName和fromAvtar  用于消息列表展示	
					addKey(data).then(res=>{
						 newchatList.push({room:data.room,fromName:res.fromName,fromAvatar:res.fromAvatar,targetName:targetName,unReadCount:0,data:[]})
						return newchatList
					}).then(res=>{
						addInfoInit(data,res)
					})
				}else{
					
					console.log(newchatList)
					addInfoInit(data,newchatList)
				}
			});
		}
		function addInfoInit(data,newchatList){
			let tempChatList=''
			console.log(newchatList)
			switch (data.type) {
				// case 'system':
				// 	this.addSystemTextMsg(data);
				// 	break;
				case 'text':
					tempChatList=addTextMsg(data,newchatList);
					break;
				case 'voice':
					tempChatList=addVoiceMsg(data,newchatList);
					console.log('返回数据')
					break;
				case 'img':
					tempChatList=addImgMsg(data,newchatList);
					break;
			}
					console.log(newchatList)
					console.log('最后的数据',tempChatList)

							if(data.id&&data.from!=store.state.userInfo.username&&data.msg!='ping'&& data.type!='signal'){
							if(tempChatList.length>0){
								tempChatList.forEach(item=>{
									if(item.room==data.room){
										if(store.state.currentNameChat!=data.from){
											console.log('++')
											setUnreadCountAll(data)
											item.unReadCount+=1
											console.log(item.unReadCount)
											getStoreData('unReadCount')
											let count=store.state.unReadCount+=1
											console.log(count)
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
				obj.fromName=res.nickname
				obj.fromAvatar=res.avatar
				return obj
			})
		}
		function isChatBoolean(data){
			let temp=store.state.chatList
			if(temp&&temp.length==0){return }
			let arr=temp.filter(item=>{
				return item.room==data.room
			})
			return arr.length
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
function addTextMsg(data,chatList){
	let typename=''
	for(let i=0;i<chatList.length;i++){
		let item=chatList[i]
			if(item.room==data.room){
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
			if(item.room==msg.room){
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
	// let chatList=store.state.chatList
	// let isChat=false
				console.log('添加语音，',data)
				if(data.id){
					chatList.forEach(item=>{
						if(item.room==data.room){
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
		name=alttext.slice(0,alttext.length-2).split('"><img')[0]
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
createlink()



export {
	createlink
}