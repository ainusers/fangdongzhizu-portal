<template>
	<view class="likeLayout">
		<view class="content">
			<view class="item" v-for="i in likeList.length" @click="goHomeDetail('1864534068870701056','1859066705199587328')">
				<view class="left">
					<image src="/static/tabbar/home.png" mode="aspectFill"  @click.stop="toUcenter('1867140002673090560')"></image>
				</view>
				<view class="middle">
					<view class="nickname">昵称昵称昵称</view>
					
					<view class="second">
						<view class="text">收藏了你的房源</view>
						<view class="date">{{ new Date().toISOString().slice(0, 10)}}</view>
					</view>
					
					
				</view>
				<view class="right" >
					<image src="http://43.143.148.105:9090/remote/fangdongzhizu/logo.png" mode="aspectFill"></image>
				</view>
				
			</view>
		</view>
		
		<view class="footer" @click="refreshLike()">
			查看更多历史消息
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				likeList:[1,2,3]
			}
		},
		methods: {
			refreshLike(){
				//调后端获取全部点赞接口，并将结果放入likeList里
				this.likeList = [...this.likeList, ...this.likeList]
			},
			//点击右侧图片进入对应的动态
			goHomeDetail(id,userid){//id,userid
			//http://localhost:8080/#/pages/tabbar/home/homeDetail?id=1864534068870701056&userId=1859066705199587328
			// let id ='1864534068870701056';
			// let userid='1859066705199587328'
				uni.navigateTo({
					url:'/pages/tabbar/home/homeDetail?id=' + id + '&userId=' + userid
				})
			}
			,
			toUcenter(userId) {
				uni.navigateTo({
					url: '/pages/tabbar/me/personal?userId=' + userId
				})
			}
		}
	}
</script>

<style>
.likeLayout{
	margin: 30rpx;
	.content{
		.item{
			display: flex;	
			width: 100%;
			margin-top: 20rpx;
			border-bottom: #999 solid 2rpx;
			/* border: red solid 2rpx; */
			.left{
				flex:2;
				image{
					height: 80%;
					width: 80%;
					border-radius: 50%;
					border: green solid 2rpx;
				}		
			};
			.middle{
				flex:6;
				margin-bottom: 20rpx;
				.nickname{
					font-weight: bold;
				}
				.second{
					display: flex;
					font-size: 20rpx;
					.text{
						margin-right: 20rpx;
					}
				}
				.quote{
					font-size: 20rpx;
					margin: 10rpx;
					border-left: #ccc solid 5rpx;
				}
				border: pink solid 2rpx;
			} ;
			.right{
				flex:2;
				image{
					height: 80%;
					width: 80%;
					border: aqua solid 2rpx;
					border-radius: 20rpx;
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
