<template>
	<view class="news">
		<view class="title">
			<view class="item zan" @click="goLike()">
				<view class="top">
					<uni-icons type="heart" size="35" color="#5199ff"></uni-icons>
					<u-badge type="error" count="7" offset="[-8,-8]"></u-badge>
				</view>
				<view class="down">点赞</view>
			</view>
			<view class="item guanzhu" @click="goBookMark()">
				<view class="top">
					<uni-icons type="star" size="40" color="#5199ff"></uni-icons>
					<u-badge type="error" count="7" offset="[-8,-8]"></u-badge>
				</view>
				<view class="down">收藏</view>
			</view>
			<view class="item pinglun" @click="goComment()">
				<view class="top">
					<uni-icons type="chat" size="40" color="#5199ff"></uni-icons>
					<u-badge type="error" count="7" offset="[-8,-8]"></u-badge>
				</view>
				<view class="down">
					评论
				</view>
			</view>
		</view>
		
		<!-- 消息列表 -->
		<u-empty  text="暂无消息" mode="favor"></u-empty>

	</view>
</template>

<script setup>
	export default {
		data() {
			return {
				text:'', // 返回处理后展示的消息内容
				redDotFlag:true
			}
		},
		onLoad() {
			// 根据后端接口返回情况判断
			if(this.redDotFlag){
				uni.setTabBarBadge({
					index:3,
					text:'66'
				})
			}
		}, 
		methods: {
			// 点赞
			goLike(){ 
				 uni.navigateTo({
				 	url:"/pages/tabbar/news/like"
				 })
			 },
			 // 收藏
			goBookMark(){
			 	 uni.navigateTo({
			 	 	url:"/pages/tabbar/news/bookmark"
			 	 })
			 },
			 // 评论
			goComment(){
			 	 uni.navigateTo({
			 	 	url:"/pages/tabbar/news/comment"
			 	 })
			 }
		}
	}
</script>

<style lang="scss" scoped>
.news{
	margin: 30rpx;
	.title{
		height: 20vh;
		display: grid;
		grid-template-columns: repeat(3, 1fr); gap: 10px; 
		margin-bottom: 30rpx;
		text-align: center;
		.zan {
			padding-top: 5px;
		}
	}
	.content{
		.item{
			display: flex;
			width: 100%;
			border-bottom: solid 2rpx #999;
			margin-bottom: 20rpx;
			height:80rpx;
			.left{
				flex:1;
				margin: 10rpx;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.message{
				flex:7;
				.nickname{
					font-weight: bold;
				}
				.text{
					color: #999;
					font-size: 20rpx;
				}
			}
			.right{
				width: auto;
			}
		}
	}
}
</style>
