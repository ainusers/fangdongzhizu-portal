<script>
import {initStorestate,setBarBadgeNum} from '@/utils/utils.js'
export default {
	onLaunch: function() {
		console.log('App Launch');
	
				// initStorestate()
	},
	onShow: function() {
		initStorestate()
		let count=this.$store.state.unReadCount
		if(count>0){
			setBarBadgeNum(count)
		}else{
			uni.removeTabBarBadge({
				index:3
			})
		}
		
			

	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<!-- 加入公共样式uview-ui -->
<style lang="scss">
@import 'uview-ui/index.scss';
</style>
