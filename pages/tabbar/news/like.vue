<template>
	<view class="likeLayout">
		<view class="content" v-if="!nodataFlag">
			<view class="item" v-for="(item,dynamic_id) in LikeList" :key="dynamic_id"
			 @click="goComment(item.dynamic_id,userId)">
				<view class="left" @click.stop="toUcenter(item.user_id)">
					<u-avatar  class="detail" level-bg-color="#8072f3" :src="item.avatar" size="100"></u-avatar>
				</view>
				
				<view class="middle">
					<view class="nickname">{{item.nickname}}</view>
					<view class="second">
						<view class="text">点赞了你的动态</view>
						<view class="date">{{ tranfTime(item.create_time) }} </view>
					</view>
				</view>
				
				<view class="right">
					<image v-if="item.img_url" :src="item.img_url" mode="aspectFill"></image>
					<image v-else style="background: #f2f2f2;" mode="aspectFill"></image>
				</view>
			</view>
			
			<view class="loading">
				<u-loadmore
					:status="status" 
					:loading-text="loadingText" 
					:loadmore-text="loadmoreText" 
					:nomore-text="nomoreText"
					icon-color="#5199ff"
					color="#999"
				/>
			</view>
		</view>
		
		<view class="noMessage" v-else >
			<u-empty text="暂无未读消息" mode="favor" ></u-empty>
		</view>
	</view>
</template>

<script>
	import {tranfTime} from '@/utils/utils.js'
	export default {
		data() {
			return {
				LikeList:[],
				id:'',
				dynamicUserId:'',
				listPage:1,
				userId:'',
				nodataFlag:false,
				isShow:false,
				loadingFlag:false,
				status: 'loadmore',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了'
			}
		},
		onShow() {
			this.userId=this.$store.state.userInfo.id;
			this.getUnreadLikeList();
		},
		onUnload() {
			let data = uni.getStorageSync('unreadMsgCnt');
			data.dynamicCount=0;
			uni.setStorageSync('unreadMsgCnt',data)
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.listPage = 1;
			this.LikeList =[];
			this.nodataFlag= false;
			this.getUnreadLikeList();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.nodataFlag && !isShow){
				this.listPage++;
				this.getUnreadLikeList();
			}else{
				uni.showToast({
					icon:'none',
					title:"主人，别使劲了，已经到底了"
				})
				uni.stopPullDownRefresh();
			}
		},
		methods: {
			tranfTime(autoTime) {
				return tranfTime(new Date(autoTime));
			},
			// 获取所有点赞信息
			getAllLikeList(){
				let data={
					"userId": this.userId,
					"page": this.listPage,
					"size": 10
				}
				if(!this.nodataFlag){
					this.$H.get('/zf/v1/dynamic/statistics/dynamics?userId', data, true).then(res => {
						if (200 == res.code && res.data.length == 0) {
							this.nodataFlag = true;
							this.loadingFlag = false;
							this.status='nomore';
						}else if(200 == res.code && res.data.length ==10){
							this.LikeList = this.LikeList.concat(res.data);
							this.loadingFlag = false;
							this.status='loadmore';
						}else if(200 == res.code && res.data.length <10){
							this.LikeList = this.LikeList.concat(res.data);
							this.isShow = true;
							this.loadingFlag = false;
							this.status="nomore";
						}
					})
				}
			},
			// 点击右侧进入对应的动态
			goComment(dynamicId,userId){
				this.$H.get("/zf/v1/dynamic/detail?id="+dynamicId+"&userId="+userId, {}, true).then(res => {
					if (200 == res.code) {
						let detail = res.data;
						detail.forEach(item=>{
							item.image=item.imgurl.split(',');
							// 设置动态操作默认值为false
							this.$set(item,'isReport',false);
						})
						if(detail){
							uni.stopPullDownRefresh();
							this.$store.commit('communityInfo', detail[0]);
							uni.navigateTo({
								url: "/pages/tabbar/community/comment?data=" + JSON.stringify(detail[0])
							})
						}else {
							uni.showToast({
								title:"未知异常，请联系管理员"
							})
						}
					}
				})
			},
			// 跳转至点赞人的个人中心
			toUcenter(userId) {
				uni.navigateTo({
					url: '/pages/tabbar/me/personal?userId=' + userId
				})
			},
			//未读消息数量
			getUnreadLikeList(){
				// 判断用户是否登录
				if(!this.$store.state.token){
					uni.navigateTo({
						url: '/pages/auth/login',
					})
					return;
				}
				
				let data={
					"userId": this.userId,
					"page": this.listPage,
					"size": 10
				}
				//分页请求，但是这样请求时，后端返回的数据为空
				if(!this.nodataFlag){
					this.status = 'loading';
					this.loadingFlag = true;
					this.$H.get("/zf/v1/dynamic/statistics/unread", data, true).then(res => {
						if (200 == res.code && res.data.length == 0) {
							this.getAllLikeList();
						}else if(200 == res.code && res.data.length ==10){
							this.LikeList = this.LikeList.concat(res.data);
							this.loadingFlag = false;
							this.status='loadmore';
						}else if(200 == res.code && res.data.length <10){
							this.LikeList = this.LikeList.concat(res.data);
							this.isShow = true;
							this.loadingFlag = false;
							this.status='nomore';
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.likeLayout{
	padding: 0rpx 20rpx;
	.content{
		.item{
			display: flex;	
			flex-direction: row;
			width: 100%;
			padding: 10rpx 0;
			border-bottom: #f2f2f2 solid 1px;
			.left{
				flex: 1;
				padding-top: 16rpx;
				width: 100rpx;
				height: 100rpx;
			}
			.middle{
				flex: 7;
				display: flex;
				padding-top: 16rpx;
				flex-direction: column;
				.nickname{
					font-size: 28rpx;
					padding: 5px 0px 0px 10px;
				}
				.second{
					display: flex;
					flex-direction: row;
					font-size: 23rpx;
					.text{
						padding: 5px 0px 0px 10px;
						color: #999;
					}
					.date{
						color: #999;
						padding: 5px 0px 0px 10px;
					}
				}
			}
			.right{
				flex: 2;
				image{
					width: 180rpx;
					height: 120rpx;
					border: #f2f2f2 solid 1px;
					border-radius: 16rpx;
				}
			}
		}
		.loading{
			display: flex;
			justify-content: center;
		}
	}
	.footer{
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
	}
}
</style>
