<script>
import {initStorestate} from '@/utils/utils.js'
import {connectSocket, reconnectSocket, stopHeartbeat} from '@/utils/scoket.js'

export default {
	onLaunch: function() {
		uni.getStorage({
			key:'token',
			success(res) {
				if(res.data){
					uni.switchTab({
						url: '/pages/tabbar/home/home'
					})
				}
			}
		})
	},
	onShow(){
		// 持久化内存数据
		initStorestate();
		// 用户已登录则创建socket连接
		uni.getStorage({
			key:'token',
			success(res){
				if (res.data) {
					uni.getStorage({
						key:'socketStatus',
						success(res) {
							if (res.data === WebSocket.OPEN) {
								// 重新链接scoket
								reconnectSocket();
							} else {
								// 连接scoket
								connectSocket();
							}
						},
						fail(data) {
							// 重新连接scoket
							connectSocket();
						}
					})
				}
			}
		})
	},
	onHide(){
		stopHeartbeat();
	},
	onUnload(){
		stopHeartbeat();
	}
};
</script>

<!-- 加入公共样式uview-ui -->
<style lang="scss">
@import 'uview-ui/index.scss';
</style>
