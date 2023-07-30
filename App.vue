<script>
import {initStorestate,setBarBadgeNum} from '@/utils/utils.js'
import {heartCheck} from '@/utils/request/createWebsocket.js'
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
		initStorestate()
		uni.getStorage({
			key:'unReadCount',
			success(res){
				let count=res.data
				if(count>0){
					setBarBadgeNum(count)
				}else{
					uni.removeTabBarBadge({
						index:3
					})
				}
			}
		})
	},
	onHide: function() {
		console.log('App Hide');
		clearInterval(heartCheck)
		this.store.commit('isChatStatus',false)
	}
};
</script>

<!-- 加入公共样式uview-ui -->
<style lang="scss">
@import 'uview-ui/index.scss';
</style>
