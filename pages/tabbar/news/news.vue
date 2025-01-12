<template>
	<view class="layout">
		<view class="title">
			<view class="item zan" @click="goLike()">
				<view class="top">
					<uni-icons type="heart" size="35" color="#5199ff"></uni-icons>
					<view class="down">点赞</view>
					<u-badge numberType="overflow" type="error" :overflow-count='99' :count="likeCnt"
						:offset="[10,chgPosition(likeCnt,zany)]" absolute></u-badge>
				</view>
			</view>

			<view class="item guanzhu" @click="goBookMark()">
				<view class="top">
					<uni-icons type="star" size="40" color="#5199ff"></uni-icons>
					<u-badge numberType="overflow" type="error" :count="bookMarkCnt"
						:offset="[10,chgPosition(bookMarkCnt,shoucangy)]" :overflow-count='99'></u-badge>
				</view>
				<view class="down">收藏</view>
			</view>

			<view class="item pinglun" @click="goComment()">
				<view class="top">
					<uni-icons type="chat" size="40" color="#5199ff"></uni-icons>
					<u-badge numberType="overflow" type="error" :overflow-count='99' :count="commentCnt"
						:offset="[0,chgPosition(commentCnt,pingluny)] " absolute></u-badge>
				</view>
				<view class="down">评论</view>
			</view>
		</view>
		
		<view class="messageList">
			<!-- 消息列表 -->
			<u-empty text="暂无消息" mode="favor"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '', // 返回处理后展示的消息内容
				redDotFlag: true,
				likeCnt: 0,
				bookMarkCnt: 0,
				commentCnt: 0,
				zany: 564,
				shoucangy: 324,
				pingluny: 88,
				newCountData: {}
			};
		},
		onShow() {
			// 判断用户是否登录
			if (!this.$store.state.token) {
				uni.navigateTo({
					url: '/pages/auth/login',
				})
				return;
			}
			// 移除TabBar消息未读数量角标
			uni.removeTabBarBadge({
				index: 3
			});
			this.getUnreadMsgCnt();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getUnreadMsgCnt();
			uni.stopPullDownRefresh();
		},
		methods: {
			// 点赞
			goLike() {
				uni.navigateTo({
					url: "/pages/tabbar/news/like"
				})
			},
			// 收藏
			goBookMark() {
				uni.navigateTo({
					url: "/pages/tabbar/news/bookmark"
				})
			},
			// 评论
			goComment() {
				uni.navigateTo({
					url: "/pages/tabbar/news/comment"
				})
			},
			// 调整角标位置
			chgPosition(count, y) {
				if (count > 0 && count <= 9) {
					return y;
				} else if (count <= 99 && count > 9) {
					return y - 8;
				} else if (count > 99) {
					return y - 16;
				}
			},
			getUnreadMsgCnt() {
				// 或者使用异步方法
				uni.getStorage({
					key: 'unreadMsgCnt',
					success: (res) => {
						if (res.data) {
							let data = res.data;
							this.likeCnt = data.dynamicCount;
							this.bookMarkCnt = data.roomCount;
							this.commentCnt = data.commentCount;
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.layout {
		margin: 0 30rpx;
		.title {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;
			text-align: center;
			.zan {
				padding-top: 10rpx;
			}
		}
		.messageList{
			margin-top: 10rpx;
		}
	}
</style>