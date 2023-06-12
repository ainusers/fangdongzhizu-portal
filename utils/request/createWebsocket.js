import Vue from 'vue'
let socketInstance=''
let socket_status=false
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
				socket_status=true
				
				setTimeout(function() {
					authSocket();
				}, 10);
			});
		}
function authSocket() {
		if (socket_status) {
			socketInstance.send({
				data: "{'type':'signal','from':"+Vue.prototype.$store.state.userInfo.username+"}",
				async success() {
					// that.isChatStatus=true
					console.log("认证消息发送成功");
				},
			});
		}
	}
createlink()


Vue.prototype.$socketInstance=socketInstance