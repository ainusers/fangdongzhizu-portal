<template>
	<view class="layout">
		<view class="content" v-if="!nodataFlag">
			<view class="item" v-for="(item,index) in roomList" :key="index"   @click="goHomeDetail(item.room_id,userInfo.id)">
				<view class="left" @click.stop="toUcenter(item.user_id)">
					<u-avatar class="detail" level-bg-color="#8072f3" :src="item.avatar" size="100"></u-avatar>
				</view>
				
				<view class="middle">
					<view class="nickname">{{item.nickname}}</view>
					<view class="second">
						<view class="text">收藏了你的房源</view>
						<view class="date">{{ tranfTime(item.create_time) }} </view>
					</view>
				</view>
				
				<view class="right">
					<image v-if="item.img_url" :src="item.img_url" mode="aspectFill"></image>
					<image v-else style="background: #f2f2f2;" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view>
			<u-loadmore v-if="roomList.length>0"
			        :status="status" 
			        :loading-text="loadingText" 
			        :loadmore-text="loadmoreText" 
			        :nomore-text="nomoreText"
					icon-color="#5199ff"
					color="#999"
			/>
			<view v-else >
				<u-empty  text="暂无数据" mode="favor" ></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import {tranfTime} from '@/utils/utils.js'
	export default {
		data() {
			return {
				roomList:[],
				id:'',
				dynamicUserId:'',
				userInfo:'',
				listPage:1,
				nodataFlag:false,
				isShow:false,
				loadingFlag:false,
				status: 'loadmore',
				loadmoreText: '轻轻上拉加载更多...',
				loadingText: '努力加载中...',
				nomoreText: '没有更多了'
			}
		},
		onLoad() {
			this.userInfo = this.$store.state.userInfo
			this.getUrdBookmarkList();
		},
		onUnload() {
			let data = uni.getStorageSync('unreadMsgCnt');
			data.roomCount=0;
			uni.setStorageSync('unreadMsgCnt',data)
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.listPage = 1;
			this.nodataFlag= false;
			this.roomList =[];
			this.getUrdBookmarkList();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.nodataFlag && !isShow){
				this.listPage++;
				this.getUrdBookmarkList();
			}else{
				uni.showToast({
					icon:'none',
					title:"小主,别使劲,已经到底了"
				});
				uni.stopPullDownRefresh();
			}
		},
		methods: {
			tranfTime(autoTime) {
				return tranfTime(new Date(autoTime));
			},
			getAllBookmarkList(){
				let data={
					"userId": this.userInfo.id,
					"page": this.listPage,
					"size": 10
				}
				//分页请求，但是这样请求时，后端返回的数据为空
				if(!this.nodataFlag){
					this.$H.get("/zf/v1/const/statistics/room", data, true).then(res => {
						if (200 == res.code && res.data.length == 0) {
							this.nodataFlag=true;
							this.loadingFlag = false;
							this.status='nomore'
						}else if(200 == res.code && res.data.length ==10){
							this.roomList = this.roomList.concat(res.data);
							this.loadingFlag = false;
							this.status='loadmore'
						}else if(200 == res.code && res.data.length <10){
							this.roomList = this.roomList.concat(res.data);
							this.isShow = true;
							this.loadingFlag = false;
							this.status="nomore"
						}
					})
				}
			},
			//点击右侧图片进入对应的动态
			goHomeDetail(id,userid){
				uni.navigateTo({
					url:'/pages/tabbar/home/homeDetail?id=' + id + '&userId=' + userid
				})
			},
			toUcenter(userId) {
				uni.navigateTo({
					url: '/pages/tabbar/me/personal?userId=' + userId
				})
			},
			getUrdBookmarkList(){
				let data={
					"userId": this.userInfo.id,
					"page": this.listPage,
					"size": 10
				}
				//分页请求，但是这样请求时，后端返回的数据为空
				if(!this.nodataFlag){
					this.status = 'loading';
					this.loadingFlag = true;
					this.$H.get("/zf/v1/const/statistics/unread/room", data, true).then(res => {
						if (200 == res.code && res.data.length == 0) {
							this.getAllBookmarkList();
						}else if(200 == res.code && res.data.length ==10){
							this.roomList = this.roomList.concat(res.data);
							this.loadingFlag = false;
							this.status='loadmore';
						}else if(200 == res.code && res.data.length <10){
							this.roomList = this.roomList.concat(res.data);
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
.layout{
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
	}
	.footer{
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
	}
}
</style>