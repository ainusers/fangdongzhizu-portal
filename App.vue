<script>
import {initStorestate} from '@/utils/utils.js'
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
		// 显示消息多少
			uni.setTabBarBadge({
				index: 3,
				text: '31'
			});
		// 显示右上角的红点
			// uni.showTabBarRedDot({
			// 	index: 3
			// });
		}, 1000);
		initStorestate()
		
	},
	onShow: function() {
		initStorestate()
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
