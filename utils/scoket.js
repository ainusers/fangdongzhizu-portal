import store from '@/store/index.js';

let socketInstance = '';// socket对象
let heartbeatInterval = '';// 心跳定时任务对象

// 创建连接
function connectSocket() {
	socketInstance = uni.connectSocket({
		url: 'ws://localhost:31780',
		success(data) {
			console.log('连接IM服务成功')
		},
		fail(data) {
			console.log('连接IM服务失败')
		}
	})
	socketInstance.onOpen(() => {
		console.log('socket连接已打开！');
		if (socketInstance.readyState === WebSocket.OPEN) {
			// 将socket对象存放本地内存
			store.commit('socketStatus',socketInstance.readyState)
			// 发送认证
			sendMsg('','auth');
			// 开始心跳检测
			startHeartbeat();
		}
	})
	socketInstance.onMessage((res) => {
		const data = JSON.parse(res.data);
		console.log('收到服务器返回的数据：', data);
		// 在这里对收到的数据进行处理
		handleMessage(event);
	})
	socketInstance.onClose(() => {
		console.log('socket连接已关闭！');
		// 重新连接
		reconnect();
	})
	socketInstance.onError((res) => {  
		console.log('socket连接发生错误：', res);  
		// 重新连接  
		reconnect();  
	})
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
			}
		});
	}, 5000); // 每5秒发送一次心跳消息
}

// 停止心跳
function stopHeartbeat() {
	// 清除定时器，停止发送心跳消息 
	clearInterval(heartbeatInterval);
}

// 重新链接
function reconnect() {
	// 如果重连成功则退出
	if(socketInstance.readyState === WebSocket.OPEN) {
		stopHeartbeat();
		// 发送心跳以保持连接活跃
		startHeartbeat();
		return;
	}
	// 停止发送心跳消息
	stopHeartbeat();
	setTimeout(() => { // 等待一段时间后重新连接WebSocket连接  
		connectSocket();
		startHeartbeat(); // 重新发送心跳消息  
	}, 5000); // 例如，每5秒尝试重新连接一次（可根据实际情况调整）  
}

// 处理消息
function handleMessage(event) {
	switch (event.data) {
		case 'heartbeat':
			// 处理心跳消息  
			console.log(JSON.stringify(data))
			break;
		case 'disconnect':
			// 处理断线消息  
			console.log(JSON.stringify(data))
			break;
		default:
			// 处理其他消息  
			console.log(JSON.stringify(data))
			break;
	}
}

// 发送消息
function sendMsg(content,type){
	if (socketInstance.readyState === WebSocket.OPEN) {
		switch (type) {
			case 'auth':
				socketInstance.send({
					data: "{'type':'keep','from':"+store.state.userInfo.username+"}",
					async success() {
						console.log('发送认证消息成功');
					},
					async fail(err){
						console.log('发送认证消息失败')
					}
				});
				break;
			case 'text':
				let data={
					'type': type,
					'msg':content.text,
					'target': this.targetUserName,
					'face':this.$store.state.userInfo.avatar,
					"from":this.currentName,
					"room":this.chatId
				}
				socketInstance.send({
					data: JSON.stringify(data),
					async success() {
						console.log("普通消息发送成功");
					},
					async fail(err){
						console.log(err)
					}
				});
				break;
			case 'voice':
				let voice = JSON.stringify(content);
				let data1={
					'type': type,
					'msg':voice,
					'target':this.targetUserName,
					'face':this.$store.state.userInfo.avatar,
					"from":this.currentName,
					"room":this.chatId
				}
				socketInstance.send({
					data: JSON.stringify(data1),
						async success() {
						console.log("语音发送成功");
					},
				});
				break;
			case 'img':
				let img = JSON.stringify(content);
				let data2={
					'type': type,
					'msg':img,
					'target':this.targetUserName,
					'face':this.$store.state.userInfo.avatar,
					"from":this.currentName,
					"room":this.chatId
				}
				socketInstance.send({
					data: JSON.stringify(data2) ,
					async success() {
						console.log("图片发送成功");
					}
				});
			break;
		}
	}
}
export {
	connectSocket,
	startHeartbeat,
	stopHeartbeat
}