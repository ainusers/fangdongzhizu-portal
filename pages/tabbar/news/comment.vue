<template>
	<view class="layout">
		<view class="content" v-if="!nodataFlag">
			<view class="item" v-for="(item,index) in commentList" :key="index"  @click="goComment(item.dynamic_id,userid)" >
				<view class="left" @click.stop="toUcenter(item.comment_user_id)">
					<u-avatar class="detail" level-bg-color="#8072f3" :src="item.avatar" size="100"></u-avatar>
				</view>
				
				<view class="middle">
					<view class="nickname">{{item.nickname}}</view>
					<view class="second">
						<view class="text">回复了你的评论</view>
						<view class="date">{{ tranfTime(item.create_time) }}</view>
					</view>
					<view class="respond">{{item.words}}</view>
				</view>
				
				<view class="right">
					<image v-if="item.img_url" :src="item.img_url" mode="aspectFill"></image>
					<image v-else style="background: #f2f2f2;" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view>
				<u-loadmore v-if="commentList.length>0"
				        :status="status" 
				        :loading-text="loadingText" 
				        :loadmore-text="loadmoreText" 
				        :nomore-text="nomoreText"
						icon-color="#1183fb"
						color="#999"
				/>
				<view v-else>
					<u-empty text="暂无数据" mode="favor" ></u-empty>
				</view>
			</view>
	</view>
</template>

<script>
	import {tranfTime} from '@/utils/utils.js'
	export default {
		data() {
			return {
				commentList:[],
				userid:'',
				dynamicUserId:'',
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
			this.userid = this.$store.state.userInfo.id
			this.getUrdCommentList();
		},
		onUnload() {
			let data = uni.getStorageSync('unreadMsgCnt');
			data.commentCount=0;
			uni.setStorageSync('unreadMsgCnt',data)
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.listPage = 1;
			this.nodataFlag= false;
			this.commentList =[];
			this.getUrdCommentList();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.nodataFlag && !this.isShow){
				this.listPage++;
				this.getUrdCommentList();
				uni.stopPullDownRefresh();
			}else{
				uni.showToast({
					icon:'none',
					title:"小主,别使劲,已经到底了"
				})
				uni.stopPullDownRefresh();
			}
		},
		methods: {
			// 格式化时间
			tranfTime(autoTime) {
				return tranfTime(new Date(autoTime));
			},
			// 获取所有评论
			getAllCommentList(){
				let data={
					"userId": this.userid,
					"page": this.listPage,
					"size": 10
				}
				//分页请求，但是这样请求时，后端返回的数据为空
				if(!this.nodataFlag){
					this.$H.get("/zf/v1/comment/statistics/comment", data, true).then(res => {
						if (200 == res.code && res.data.length == 0) {
							this.nodataFlag= true;
							this.loadingFlag = false;
							this.status='nomore';
						}else if(200 == res.code && res.data.length ==10){
							this.commentList = this.commentList.concat(res.data);
							this.loadingFlag = false;
							this.status='loadmore';
						}else if(200 == res.code && res.data.length <10){
							this.commentList = this.commentList.concat(res.data);
							this.isShow = true;
							this.loadingFlag = false;
							this.status="nomore";
						}
					})
				}
			},
			//点击右侧图片进入对应的动态
			goComment(dynamicId,userId){
				uni.navigateTo({
					url: "/pages/tabbar/community/comment?id=" + dynamicId+"&userId=" + userId
				})
			},
			toUcenter(userId) {
				uni.navigateTo({
					url: '/pages/tabbar/me/personal?userId=' + userId
				})
			},
			getUrdCommentList(){
				let data={
					"userId": this.userid,
					"page": this.listPage,
					"size": 10
				}
				//分页请求，但是这样请求时，后端返回的数据为空
				if(!this.nodataFlag){
					this.status = 'loading';
					this.loadingFlag = true;
					this.$H.get("/zf/v1/comment/statistics/unread/comment", data, true).then(res => {
						if (200 == res.code && res.data.length == 0) {
							this.getAllCommentList();
						}else if(200 == res.code && res.data.length ==10){
							this.commentList = this.commentList.concat(res.data);
							this.loadingFlag = false;
							this.status='loadmore';
						}else if(200 == res.code && res.data.length <10){
							this.commentList = this.commentList.concat(res.data);
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
			width: 100%;
			margin-top: 30rpx;
			border-bottom: #f2f2f2 solid 1px;;
			position: relative;
			.left{
				flex:1;
				width: 140rpx;
				height: 140rpx;		
			};
			.middle{
				flex:7;
				margin-bottom: 10rpx;
				.second{
					display: flex;
					font-size: 23rpx;
					color: #999;
					.text{
						color: #999;
						margin:0 10rpx;
					}
				}
				.respond{
					width: 380rpx;
					padding: 4rpx;
					font-size: 24rpx;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					white-space: pre-wrap;
					overflow: hidden;    /* 隐藏溢出内容 */
					text-overflow: ellipsis; /* 显示省略号  未生效 */ 
				}
			}
			.right{
				flex:2;
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