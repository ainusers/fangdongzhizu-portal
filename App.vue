<script>
import {initStorestate} from '@/utils/utils.js'
import {createlink,clearHeartCheck} from '@/utils/request/createWebsocket.js'

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
	onShow: function() {
		// 初始化内存数据
		initStorestate();
		// 创建会话链接
		uni.getStorage({
			key:'token',
			success(res) {
				if(res.data){
					createlink()
				}
			}
		})
	},
	onHide(){
		clearHeartCheck()
	},
	onUnload(){
		clearHeartCheck()
	}
};
</script>

<!-- 加入公共样式uview-ui -->
<style lang="scss">
@import 'uview-ui/index.scss';
</style>
