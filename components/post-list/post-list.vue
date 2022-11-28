<template>
	<view class="main-style">
		<block v-for="(item, index) in list" :key="index">
			<view @click="toDetail(item)">
				<view class="post-item">
					<!-- 用户数据 -->
					<view class="post-item-top-user">
						<!-- 用户头像 -->
						<view @click.stop="toUcenter(item.uid)">
							<u-avatar class="avatar" :src="item.userInfo.avatar" :show-level="item.userInfo.type == 1"
								level-bg-color="#8072f3"></u-avatar>
						</view>
						<!-- 用户名称 -->
						<view class="center">
							<view style="align-items: center;">
								<text v-if="item.userInfo.vip_expire_time > timestamp" style="color: red;"
									class="username">{{ item.userInfo.username.substring(0, 12) }}</text>
								<text v-else class="username">{{ item.userInfo.username.substring(0, 12) }}</text>
								<view style="float: right;padding-right: 10px;"> ꔷꔷꔷ </view>
							</view>
							<view>
								<text class="time">{{ item.create_time | timeFrom }}</text>
							</view>
						</view>
					</view>
					<!-- 列表内容 -->
					<view class="post-content">
						<rich-text class="post-text" :nodes="item.content"></rich-text>
						<block>
							<!--一张图片-->
							<block v-if="item.media.length == 1">
								<image :lazy-load="true" mode="aspectFill" class="img-style-1" :src="item.media[0]"
									@tap.stop="previewImage(item.media[0], item.media, item.integral, item.id)"></image>
							</block>
							<!--二张图片-->
							<block v-if="item.media.length == 2">
								<view class="img-style-2">
									<image :lazy-load="true" v-for="(mediaItem, flag) in item.media" :key="flag"
										@tap.stop="previewImage(mediaItem, item.media, item.integral, item.id)"
										mode="aspectFill" :src="mediaItem"></image>
								</view>
							</block>
							<!--三张以上图片-->
							<block v-if="item.media.length > 2">
								<view class="img-style-3">
									<image :lazy-load="true" v-for="(mediaItem, flag) in item.media" :key="flag"
										@tap.stop="previewImage(mediaItem, item.media, item.integral, item.id)"
										mode="aspectFill" :src="mediaItem"></image>
								</view>
							</block>
						</block>
					</view>
					<!-- 列表操作（分享，评论，点赞） -->
					<view class="p-footer">
						<!-- 分享 -->
						<view class="p-item">
							<button @click.stop="showShares(index)" class="u-reset-button" open-type="share">
								<u-icon name="zhuanfa"></u-icon>
								<text class="count">{{ item.share_count }}</text>
							</button>
						</view>
						<!-- 评论 -->
						<view class="p-item margin50" @click="toComment('/pages/tabbar/community/comment')">
							<u-icon name="chat"></u-icon>
							<text class="count">{{ item.comment_count }}</text>
						</view>
						<!-- 点赞和取消点赞 -->
						<view v-show="item.is_collection" class="p-item" @click.stop="cancelCollection(item.id, index)">
							<u-icon name="heart-fill" color="#cc0000"></u-icon>
							<text class="count">{{ item.collection_count }}</text>
						</view>
						<view v-show="!item.is_collection" class="p-item" @click.stop="addCollection(item.id, index)">
							<u-icon name="heart"></u-icon>
							<text class="count">{{ item.collection_count }}</text>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 判断是否加载数据 -->
		<block v-if="list.length === 0 && loadStatus == 'nomore'">
			<u-empty margin-top="100" text="暂无内容" mode="favor"></u-empty>
		</block>
		<block v-if="loadStatus == 'loadmore'">
			<view style="margin: 30rpx 0;">
				<u-loadmore :status="loadStatus" />
			</view>
		</block>
		<block v-else>
			<!-- 此处空白，用于朋友圈详情页 -->
		</block>
		<!-- 分享操作 -->
		<u-popup v-model="showShare" height="240rpx" mode="bottom">
			<view class="share-wrap" @click="showShare = false">
				<button open-type="share" @click="shareWX('WXSceneSession')" class="share-item u-reset-button">
					<image src="/static/login/wx.png"></image>
					<text>微信</text>
				</button>
				<view @click="shareWX('WXSenceTimeline')" class="share-item">
					<image src="/static/login/pyq.png"></image>
					<text>朋友圈</text>
				</view>
				<view @click="shareQQ('qq')" class="share-item">
					<image src="/static/login/qq.png"></image>
					<text>QQ</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'post-list',
		props: {
			list: Array,
			loadStatus: String
		},
		data() {
			return {
				showShare: false
			};
		},
		watch: {},
		computed: {
			timestamp() {
				return Date.parse(new Date()) / 1000;
			}
		},
		created() {
			
		},
		methods: {
			// 跳转详情页
			toDetail(data) {
				uni.navigateTo({
					url: "/pages/tabbar/community/comment?id=" + data.id + "&cid=" + data.cid
				})
			},
			// 跳转评论区
			toComment(url) {
				uni.navigateTo({
					url: url
				});
			},
			// 点赞
			addCollection(id, index) {
				this.list[index].is_collection = true;
				this.list[index].collection_count++;
				
				// this.$H
				// 	.post('post/addCollection', {
				// 		id: id,
				// 		uid: this.list[index].uid
				// 	})
				// 	.then(res => {
				// 		if (res.code === 200) {
				// 			this.list[index].is_collection = true;
				// 			this.list[index].collection_count++;
				// 		}
				// 	});
			},
			// 取消点赞
			cancelCollection(id, index) {
				this.list[index].is_collection = false;
				this.list[index].collection_count--;
				// this.$H
				// 	.post('post/cancelCollection', {
				// 		id: id
				// 	})
				// 	.then(res => {
				// 		if (res.code === 200) {
				// 			this.list[index].is_collection = false;
				// 			this.list[index].collection_count--;
				// 		}
				// 	});
			},
			// 预览图片
			previewImage(url, urls, integral, post_id) {
				uni.previewImage({
					current: url,
					urls: urls
				});
			},
			// 显示分享弹框
			showShares(index) {
				this.showShare = true;
				this.postDetail = this.list[index];
			},
			// 分享至微信
			shareWX(scene) {
				let imgURL = (imgURL = this.postDetail.media[0]);
				let that = this
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "weixin", // 服务提供商（即weixin|qq|sinaweibo）
					scene: scene, // 分享到哪儿
					type: 0, // 图文
					href: 'http://xy.tujingzg.com/api/post/detail?id=' + that.postId, //跳转链接
					summary: that.postDetail.content, // 分享内容的摘要
					title: that.postDetail.content,  // 分享内容的标题
					imageUrl: imgURL, //图片地址
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'none',
							duration: 2000
						})
						that.posters = false; // 成功后关闭底部弹框
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
						that.posters = false;
					}
				})
			},
			// 分享至qq
			shareQQ() {
				let imgURL = (imgURL = this.postDetail.media[0]);
				let that = this
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "qq", // 分享到哪儿（即weixin|qq|sinaweibo）
					type: 0, // 图文
					href: 'http://xy.tujingzg.com/api/post/detail?id=' + that.postId, // 跳转链接
					summary: that.postDetail.content, // 分享内容的摘要
					title: that.postDetail.content,  // 分享内容的标题
					imageUrl: imgURL, //图片地址
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'none',
							duration: 2000
						})
						that.posters = false; // 成功后关闭底部弹框
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
						that.posters = false;
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	// 总体样式
	.main-style{
		background: #f2f2f2
	}
	.post-item {
		background: #fff;
		border: solid 1px #eee;
		margin: 0px 0px 10px 0px;
		border-radius: 10px;

		.post-content {
			margin-top: 20rpx;
			.img-style-1 {
				display: block;
				width: 100%;
				max-height: 600rpx;
				border-radius: 5px;
				overflow: hidden;
			}
			.img-style-2 {
				display: flex;

				image {
					margin: 5rpx;
					border-radius: 5px;
					width: 100%;
					height: 294rpx;
				}
			}
			.img-style-3 {
				display: flex;
				flex-wrap: wrap;

				image {
					width: 31.3%;
					height: 200rpx;
					margin: 1%;
					border-radius: 5px;
				}
			}
		}
	}
	// 列表操作（用户信息）
	.post-item-top-user {
		display: flex;
		align-items: center;

		.avatar {
			width: 85rpx;
			height: 85rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.center {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #999;
			.username {
				font-size: 32rpx;
				font-weight: 600;
				color: #616161;
			}
			.official {
				display: inline-block;
				font-size: 20rpx;
				color: #fff;
				background-color: $themes-color;
				padding: 5rpx 10rpx;
				border-radius: 10rpx;
				margin-right: 10rpx;
			}
		}
	}
	// 列表操作（文本）
	.post-text {
		display: block;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		white-space: pre-wrap;
		overflow: hidden;
		padding: 0 10rpx 0 10rpx;
	}
	// 列表操作（分享，评论，点赞）
	.p-footer {
		display: flex;
		margin: 20rpx 0;

		.p-item {
			margin: 0 auto;
			color: #616161;
			display: flex;
			align-items: center;

			.count {
				margin-left: 10rpx;
				font-size: 28rpx;
			}
		}
		.p-item[hidden] {
			display: none !important;
		}
	}
	// 分享弹窗
	.share-wrap {
		display: flex;
		padding: 30rpx;
		width: 50%;
		margin: 0 auto;
	
		.share-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
	
			&:nth-child(1) {
				margin-right: auto;
			}
			image {
				width: 100rpx;
				height: 100rpx;
			}
			text {
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
