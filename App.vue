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
		uni.getStorage({
			key:'token',
			success(res) {
				if(res.data){
					//设置未读消息数量
					uni.getStorage({
						key:'unreadMsgCnt',
						success(res) {
							if(res.data){
								let unReadMsgCnt =res.data.commentCount+res.data.dynamicCount+res.data.roomCount;
								if(unReadMsgCnt>0){
									uni.setTabBarBadge({
										index:3,
										text: unReadMsgCnt.toString()
									})
								}
							}else{
								let data ={
									userId:this.$store.state.userInfo.id
								}
								this.$H.get('/zf/v1/const/news/count', data, true).then(res => {
									if (200 == res.code && res.data.length > 0) {
										let unReadMsgCnt=res.data[0].commentCount+res.data[0].dynamicCount+res.data[0].roomCount;
										uni.setStorage('unreadMsgCnt',res.data[0]);
										if(unReadMsgCnt > 0){
											uni.setTabBarBadge({
												index:3,
												text: unReadMsgCnt.toString()
											})
										}
									}
								});
							}
						}
					});
				}
			}
		})
	}
};
</script>

<!-- 加入公共样式uview-ui -->
<style lang="scss">
	@import 'uview-ui/index.scss';
	@import "static/iconfont/iconfont.css";
</style>