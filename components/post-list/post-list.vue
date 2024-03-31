<template>
	<view class="main-style">
		<block v-for="(item, index) in list" :key="index">
			<view @click="toDetail(item,index)">
				<view class="post-item">
					<!-- 用户数据 -->
					<view class="post-item-top-user">
						<!-- 用户头像 -->
						<view class="avatar-img" @click.stop="toUcenter(item.userid)">
							<u-avatar class="avatar" :src="item.avatar" level-bg-color="#8072f3"></u-avatar>
						</view>
						<!-- 用户名称 -->
						<view class="center">
							<view style="display:flex;align-items: center;justify-content: space-between;">
								<text class="nickname">{{ item.nickname?item.nickname.substring(0, 12):'' }}</text>
								
								<view style="float: right;padding-right: 10px;font-size: 18px;" @click.stop.prevent="goReport(index,$event)">
									<u-icon name="more-dot-fill" color="rgb(203,203,203)" ></u-icon>
									<view class="reportText" v-show="item.isReport">
										<view @click="report" class="item"
											v-show="item.userid!=$store.state.userInfo.id">举报</view>
										<view @click="deletePost(index,item.id)" class="item"
											v-show="item.userid==$store.state.userInfo.id">删除</view>
									</view>
								</view>
							</view>
							<view>
								<text class="time">{{tranfTime(item.createtime)}}</text>
								<block v-if="item.province">
									<text class="city">发布于{{item.province | splitEnd1}}</text>
								</block>
							</view>
						</view>
					</view>
					<!-- 列表内容 -->
					<view class="post-content" >
						<rich-text class="post-text" :nodes="item.words"></rich-text>
						<view v-show="item.image&&item.image[0]!=''">
							<block>
								<!--一张图片-->
								<block v-if="item.filetype==='image'&&item.image&&item.image.length == 1">
									<image :lazy-load="true" mode="aspectFill" class="img-style-1" :src="item.image[0]"
										@tap.stop="previewImage(item.image[0], item.image, item.integral, item.id,index)"></image>
								</block>
								<!--二张图片-->
								<block v-if="item.filetype==='image'&&item.image&&item.image.length == 2">
									<view class="img-style-2">
										<image :lazy-load="true" v-for="(imgItem, flag) in item.image" :key="flag"
											@tap.stop="previewImage(imgItem, item.image, item.integral, item.id,index)"
											mode="aspectFill" :src="imgItem"></image>
									</view>
								</block>
								<!--三张以上图片-->
								<block v-if="item.filetype==='image'&&item.image&&item.image.length > 2">
									<view class="img-style-3">
										<image :lazy-load="true" v-for="(imgItem, flag) in item.image" :key="flag"
											@tap.stop="previewImage(imgItem, item.image, item.integral, item.id,index)"
											mode="aspectFill" :src="imgItem"></image>
									</view>
								</block>
								<!--一个视频-->
								<block v-if="item.filetype==='video'&&item.image&&item.image.length == 1">
									<video :lazy-load="true" mode="aspectFill" class="img-style-1" :controls="true" :src="item.image[0]" :data-src="item.image[0]"></video>
								</block>
							</block>
						</view>
					</view>
					<!-- 列表操作（浏览，评论，点赞） -->
					<view class="p-footer">
						<!-- 浏览 -->
						<view class="p-item">
							<button class="u-reset-button" open-type="share">
								<u-icon name="eye" size="38"></u-icon>
								<text class="count">{{ item.look }}</text>
							</button>
						</view>
						<!-- 评论 -->
						<view class="p-item margin50">
							<u-icon name="chat" size="38"></u-icon>
							<text class="count">{{ item.comment }}</text>
						</view>
						<!-- 点赞和取消点赞 -->
						<view v-show="item.status&&item.status==1" class="p-item"
							@click.stop="cancelCollection(item.id, index)">
							<u-icon name="heart-fill" color="#cc0000" size="38"></u-icon>
							<text class="count">{{ item.like ?item.like :'' }}</text>
						</view>
						<view v-show="!item.status" class="p-item" @click.stop="addCollection(item.id, index)">
							<u-icon name="heart" size="38"></u-icon>
							<text class="count">{{ item.like?item.like:'' }}</text>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 骨架屏  数据正在加载中 -->
		<block v-if="list.length==0&&loadStatus=='loading'">
			<view v-for="(key,index) in jiaL">
				<postListSkeleton/>
			</view>
		</block>
		<!-- 判断是否加载数据 -->
		<block v-if="list.length === 0 && loadStatus == 'nomore'">
			<!-- margin-top="100" -->
			<u-empty text="我可是有底线的" mode="favor"></u-empty>
		</block>

		<block v-if="loadStatus == 'loadmore'&&!isDetail">
			<view style="padding: 30rpx 0;">
				<u-loadmore :status="loadStatus" :load-text="loadText" />
			</view>
		</block>
		<block v-else>
			<!-- 此处空白，用于朋友圈详情页 -->
		</block>
		<!-- //举报模态框 -->
		<view v-show="reportShows">
			<zhizuReport @cancelReport="cancelReport" @goReport="goReportText" :typeStr="reportType" :reportId="reportId" ref="report" />
		</view>
	</view>
</template>

<script>
	let that = null;
	import zhizuReport from '@/components/common/modal/report.vue'
	import postListSkeleton from '@/components/post-list/post-list-skeleton.vue'
	export default {
		name: 'post-list',
		props: {
			list: Array,
			loadStatus: String,
			isDetail: Boolean,
			isPersonal: Boolean
		},
		components: {
			zhizuReport,
			postListSkeleton
		},
		data() {
			return {
				reportShows: false,
				showShare: false,
				loadText: {
					loadmore: '轻轻上拉加载更多...',
					loading: '努力加载中...',
					nomore: '没有更多了'
				},
				dyId: '',
				isReport: false,
				reportType: '动态',
				reportId: '',
				currentIndex: '',
				follow: '' ,//当前是否点赞状态
				shareId:'',
				jiaL:[1,2,3]
			};
		},
		filters:{
			splitEnd1(val){
				if(val){
					return val.substring(0,val.length-1)
				}else{
					return val
				}
			}
		},
		computed: {
			timestamp() {
				return Date.parse(new Date()) / 1000;
			},
		},
		created() {
			this.isReport = false
			if(this.isDetail){
				this.jiaL=[1]
			}
		},
		onLoad(options) {
			this.isDetail = options.isDetail
			that = this
		},
		methods: {
			tranfTime(autoTime) {
				var now = (Date.parse(new Date())) / 1000; //计算当前时间戳 
				var occur = (Date.parse(new Date(autoTime))) / 1000;; //自动收货的时间戳 （字符串转时间戳）
				var diff = (now - occur) * 1000; //时间差的毫秒数
				// 差值计算日、时、分
				var day = Math.floor(diff / (24 * 3600 * 1000));
				var hour = Math.floor(diff / (3600 * 1000));
				var minute = Math.floor(diff / (60 * 1000));
				//计算显示数值
				if (minute < 1) {
					return "刚刚"
				} else if (hour < 1) {
					return minute + "分钟前"
				} else if(day < 1) {
					return hour + '小时前'
				} else if (day <= 31) {
					return day + "天前"
				} else {
					return autoTime
				}
			},
			//删除动态
			deletePost(index,id) {
				this.isReport ? this.isReport = false : this.isReport = true
				this.reportShows = false
				let data={
					id:id,
					status:0
				}
				let isDelete=false
				this.$H.patch('/zf/v1/dynamic/dynamics',data,true).then(res=>{
					if(res.code==200){
						isDelete=true
					}
					return isDelete
				}).then(res=>{
					this.$emit('changeStatus', index, !this.isReport,res)
				})
			},
			//控制举报，删除 显示隐藏
			goReport(index) {
				this.currentIndex = index
				this.list[index].isReport ? this.isReport = false : this.isReport = true
				this.reportId = this.list[index].id
				this.$emit('changeStatus', index, this.isReport)
			},
			cancelReport() {

			},
			report() {
				this.reportShows = true
				this.$refs.report.reportShow=true
				this.$refs.report.reportValue=''
				this.$refs.report.otherReport=''
				this.$emit('changeStatus', this.currentIndex, false)
			},
			goReportText() {
				this.isReport = false
				this.reportShows=false
			},
			// 跳转详情页
			toDetail(data,index) {
				this.isReport = false
				this.$emit('changeStatus', index, false)
				if (this.isDetail) {
					if (this.$parent.$parent.comment_id) {
						this.$emit('commontInt')
					}
					return;
				}
				this.$store.commit('communityInfo', data)
				this.dyId = data.id
				uni.navigateTo({
					url: "/pages/tabbar/community/comment?data=" + JSON.stringify(data)
				})
			},
			toUcenter(userId) {
				if (this.isPersonal) return
				uni.navigateTo({
					url: '/pages/tabbar/me/personal?userId=' + userId
				})
			},
			// 跳转评论区
			toComment(url) {
				if (this.isDetail) return
				uni.navigateTo({
					url: url
				});
			},
			// 点赞
			addCollection(id, index, isLove) {
				this.$emit('clickLike', id, index)
			},
			// 取消点赞
			cancelCollection(id, index, isLove) {
				this.$emit('clickLike', id, index)
			},
			// 预览图片
			previewImage(url, urls, integral, post_id,index) {
				this.isReport=false
				this.$emit('changeStatus', index, false)
				uni.previewImage({
					current: url,
					urls: urls
				});
			},
			tranferCount(){
				let data={
					id:this.shareId,
					userId:this.$store.state.userInfo.id,
					type:'plus'
				}
				this.$H.patch('/zf/v1/dynamic/transfer',data,true).then(res=>{
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	// 总体样式
	.main-style {
		background: #f2f2f2
	}

	.post-item {
		background: #fff;
		border: solid 1px #eee;
		margin: 0px 0px 10px 0px;
		border-radius: 10px;
		padding: 5px 5px 0 5px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.15);

		.post-content {
			margin-top: 10rpx;
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

		.avatar-img {
			padding: 5px;
		}

		.reportText {
			width: 200rpx;
			padding: 10rpx 10rpx;
			position: absolute;
			right: 10rpx;
			text-align: center;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			font-size: 28rpx;
			z-index: 9999;
			background-color: #fff;
			.item {
				padding:20rpx 0;
				// &:last-child {
				// 	border-top: 1px solid #d5d5d6;
				// 	margin-bottom: 0;
				// 	border-bottom: none;
				// }
			}
		}

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
			margin-top: -16rpx;
			.nickname {
				font-size: 32rpx;
				font-weight: 600;
				color: #616161;
			}
			.city{
					font-size: 24rpx;
					font-weight: normal;
					margin-left: 20rpx;
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
		margin-bottom: 5px;
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
		justify-content: space-between;
		width: 80%;
		margin: 0 auto;
		padding: 30rpx;

		.share-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0;

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
