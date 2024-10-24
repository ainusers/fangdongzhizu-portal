<script>
import {initStorestate} from '@/utils/utils.js'

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
	}
};
</script>

<!-- 加入公共样式uview-ui -->
<style lang="scss">
	@import 'uview-ui/index.scss';
	@import "@/static/iconfont/iconfont.css";
</style>
