<template>
	<view class="main-style">
		<block v-for="(item, index) in list" :key="index">
			<view @click="toDetail(item,index,'')">
				<view class="post-item">
					<!-- 用户数据 -->
					<view class="post-item-top-user">
						<!-- 用户头像 -->
						<view class="avatar-img" @click.stop="toUcenter(item.userid)">
							<u-avatar class="avatar" :src="item.avatar" level-bg-color="#8072f3" mode="square"></u-avatar>
						</view>
						<!-- 用户名称 -->
						<view class="center">
							<view style="display:flex;">
								<text class="nickname" style="flex:1">{{ item.nickname?item.nickname.substring(0, 12):'' }}</text>
								<view style="flex:1"></view>
								<template style="flex:1">
									<text style="font-size: 14px;color:#5199ff;padding-right: 20rpx;">{{ item.score }}</text>
									<view>
										<view style="font-size: 18px;" @click.stop.prevent="goReport(index,$event)"
											  v-if="item.userid==$store.state.userInfo.id">
											<u-icon name="more-dot-fill" color="rgb(203,203,203)"style="display: flex;right:50rpx;" ></u-icon>
											<view class="reportText" v-if="item.isReport">
												<view @click="deletePost(index,item.id)" class="item" >删除</view>
											</view>
										</view>
									</view>
								</template>
							</view>
							<view>
								<text class="time">{{tranfTime(item.createtime)}}</text>
								<block v-if="item.province">
									<text class="city">{{item.province}}</text>
								</block>
							</view>
						</view>
					</view>
					<!-- 列表内容 -->
					<view class="post-content" >
						<rich-text :style="showRow" class="post-text" :nodes="item.words"></rich-text>
						<view v-if="item.image&&item.image[0]!=''">
							<block>
								<!--一张图片-->
								<block v-if="item.filetype==='image'&&item.image&&item.image.length == 1">
									<image :lazy-load="true" mode="aspectFill" class="img-style-1" :src="item.image[0]" v-if="imageFlag"
									@tap.stop="previewImage(item.image[0], item.image, item.integral, item.id,index)"></image>
									<image :lazy-load="true" mode="aspectFill" class="img-style-1" :src="item.image[0]" v-else></image>
								</block>
								<!--二张图片-->
								<block v-if="item.filetype==='image'&&item.image&&item.image.length == 2">
									<view class="img-style-2">
										<template v-if="imageFlag">
											<image :lazy-load="true" v-for="(imgItem, flag) in item.image" :key="flag" mode="aspectFill" :src="imgItem" 
											@tap.stop="previewImage(imgItem, item.image, item.integral, item.id,index)" ></image>
										</template>
										<template v-else>
											<image :lazy-load="true" v-for="(imgItem, flag) in item.image" :key="flag" mode="aspectFill" :src="imgItem" ></image>
										</template>
									</view>
								</block>
								<!--三张以上图片-->
								<block v-if="item.filetype==='image'&&item.image&&item.image.length > 2">
									<view class="img-style-3">
										<template v-if="imageFlag">
											<image :lazy-load="true" v-for="(imgItem, flag) in item.image" :key="flag" mode="aspectFill" :src="imgItem" 
											@tap.stop="previewImage(imgItem, item.image, item.integral, item.id,index)"  ></image>
										</template>
										<template v-else>
											<image :lazy-load="true" v-for="(imgItem, flag) in item.image" :key="flag" mode="aspectFill" :src="imgItem" ></image>
										</template>
									</view>
								</block>
								<!--一个视频-->
								<block v-if="item.filetype==='video'&&item.image&&item.image.length == 1">
									<video :lazy-load="true" mode="aspectFill" class="img-style-1" 
									:poster="item.videofirstimage" :controls="true" :src="item.image[0]" :data-src="item.image[0]"></video>
								</block>
							</block>
						</view>
					</view>
					<!-- 列表操作（浏览，评论，点赞） -->
					<view class="p-footer">
						<!-- 分享 -->
						<view class="p-item">
							<view v-if="!isDetail" @click.stop="toDetail(item,index,'zhuanfa')">
								<u-icon name="zhuanfa"></u-icon>
								<text class="count">{{ item.forward > 0 ? item.forward : '' }}</text>
							</view>
							<view v-else @click.stop="showShares">
								<u-icon name="zhuanfa"></u-icon>
								<text class="count">{{ item.forward > 0 ? item.forward : '' }}</text>
							</view>
						</view>						
						<!-- 浏览 -->
						<view class="p-item">
							<view>
								<u-icon name="eye" size="38"></u-icon>
								<text class="count">{{ item.look > 0 ? item.look : '' }}</text>
							</view>
						</view>
						<!-- 评论 -->
						<view class="p-item margin50">
							<u-icon name="chat" size="38"></u-icon>
							<text class="count">{{ item.comment > 0 ? item.comment : '' }}</text>
						</view>
						<!-- 点赞和取消点赞 -->
						<view v-if="item.status==1" class="p-item"
							@click.stop="cancelCollection(item.id, index, item.userid)">
							<u-icon name="heart-fill" color="#cc0000" size="38"></u-icon>
							<text class="count">{{ item.like > 0 ? item.like : '' }}</text>
						</view>
						<view v-else class="p-item" @click.stop="addCollection(item.id, index, item.userid)">
							<u-icon name="heart" size="38"></u-icon>
							<text class="count">{{ item.like>0 ? item.like : '' }}</text>
						</view>
					</view>
					<!-- 温馨提示 -->
					<view v-if="isDetail">
						<view style="color:#AAAAAA; font-size: 14px;padding: 5px;">
							基于言论自由的考量，暂未对以上内容进行审核，无法确保内容的真实和准确性，对此不做任何保证与承诺，强烈建议交易前谨慎核实，确保个人财产和信息安全，如遇问题，请立即联系平台
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
		<view  v-if="!isDetail && list.length == 0">
				<u-empty text="暂无数据" mode="favor"></u-empty>
		</view>
		<u-loadmore  v-else-if="!isDetail && list.length>0" :status="loadStatus" :load-text="loadText" />
		<!-- 举报模态框 -->
		<view v-if="reportShows">
			<zhizuReport @cancelReport="cancelReport" @goReport="goReportText" :typeStr="reportType" :reportId="reportId" ref="report" />
		</view>
		<!-- 分享操作 appShare('1','qq','')-->
		<u-popup  v-model="showShare" mode="bottom" :mask="true" border-radius="15" @close="closeShare">
			<view class="share-wrap">
				<view class="row">
					<view @click.stop="appShare('weixin','WXSceneSession','0')" class="share-item">
						<uni-icons custom-prefix="iconfont" type="icon-weixinhaoyou"  size="40"></uni-icons>
						<text>微信好友</text>
					</view>
					<view @click.stop="appShare('weixin','WXSceneFavorite','0')" class="share-item">
						<uni-icons custom-prefix="iconfont" type="icon-wechatEnshrine" size="40"></uni-icons>
						<text>微信收藏</text>
					</view>
					<view @click.stop="appShare('weixin','WXSceneTimeline','0')" class="share-item">
						<uni-icons custom-prefix="iconfont" type="icon-shejiaotubiao-02" size="40"></uni-icons>
						<text>朋友圈</text>
					</view>
					<view @click.stop="copyCurrentUrl" class="share-item">
						<uni-icons custom-prefix="iconfont" type="icon-fuzhilianjie" size="40"></uni-icons>
						<text>复制链接</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let that = null;
	import zhizuReport from '@/components/common/modal/report.vue'
	import postListSkeleton from '@/components/post-list/post-list-skeleton.vue'
	import {tranfTime,getCurrentUrl,appShare} from '@/utils/utils.js'
	
	export default {
		name: 'post-list',
		props: {
			list: Array,
			loadStatus: String,
			isDetail: Boolean,
			isPersonal: Boolean,
			showRow: String,
			imageFlag: Boolean
		},
		components: {
			zhizuReport,
			postListSkeleton
		},
		data() {
			return {
				reportShows: false,
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
				follow: '',//当前是否点赞状态
				shareId:'',
				jiaL:[1,2,3],
				showShare:false, //是否展示分享弹窗
				shareUrl:'' //分享的地址
			};
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
			// 格式化时间
			tranfTime(autoTime) {
				return tranfTime(new Date(autoTime));
			},
			// 删除动态
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
			// 控制举报，删除，显示隐藏
			goReport(index) {
				this.currentIndex = index
				this.list[index].isReport ? this.isReport = false : this.isReport = true
				this.reportId = this.list[index].id
				this.$emit('changeStatus', index, this.isReport)
			},
			cancelReport() {},
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
			toDetail(data,index,type) {
				this.dyId = data.id
				if(type == 'zhuanfa'){
					uni.navigateTo({
						url: "/pages/tabbar/community/comment?id=" + this.dyId + "&userId=" + ''
					})
				}else{
					// 判断用户是否登录
					if(!this.$store.state.token){
						uni.navigateTo({
							url: '/pages/auth/login',
						})
						return;
					}
					this.isReport = false
					this.$emit('changeStatus', index, false)
					if (this.isDetail) {
						if (this.$parent.comment_id) {
							this.$emit('commontInt')
						}
						return;
					}
					uni.navigateTo({
						url: "/pages/tabbar/community/comment?id=" + this.dyId+"&userId="+this.$store.state.userInfo.id
					})
				}
			},
			toUcenter(userId) {
				if (this.isPersonal) return
				uni.navigateTo({
					url: '/pages/tabbar/me/personal?userId=' + userId
				})
			},
			// 跳转评论区
			toComment(url) {
				if (this.isDetail) return;
				uni.navigateTo({
					url: url
				});
			},
			// 点赞
			addCollection(id, index, ownerid) {
				this.$emit('clickLike', id, index, ownerid)
			},
			// 取消点赞
			cancelCollection(id, index, ownerid) {
				this.$emit('clickLike', id, index, ownerid)
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
				this.$H.patch('/zf/v1/dynamic/transfer',data,true).then(res=>{})
			},
			// 展示分享弹框
			showShares() {
				this.showShare = true;
			},
			// 关闭分享弹框
			closeShare(){
				this.showShare = false;
			},
			// uni-share分享
			appShare(provider,scene,type) {
				this.getCurrentUrl();
				appShare(provider,scene,type,this.shareUrl,this.list[0].words,this.list[0].words);
				this.forwardCount();
				this.closeShare();
			},
			// 复制链接
			copyCurrentUrl() {
				this.getCurrentUrl();
				uni.setClipboardData({
				    data: this.shareUrl,
				    success: function () {
				        console.log('复制成功');
				    },
				    fail: function (err) {
				        console.error('复制失败', err);
				    }
				});
				this.forwardCount();
				this.closeShare();
			},
			// 获取当前页面地址
			getCurrentUrl(){
				this.shareUrl = getCurrentUrl();
			},
			// 转发统计
			forwardCount(){
				// 登录后才会触发转发计数
				if(this.$store.state.userInfo.id){
					let data={
						id:this.list[0].id,
						userId:this.$store.state.userInfo.id,
						type:'plus',
						dynamicUserId:this.list[0].userid
					}
					this.$H.patch('/zf/v1/dynamic/forward ',data,true).then(res=>{
					})
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	// 总体样式
	.main-style {
		background: #f7f7f7
	}
	.post-item {
		background: #ffffff;
		border: solid 1px #eee;
		margin: 0px 5px 5px 5px;
		border-radius: 10px;
		padding: 5px 5px 0 5px;
		.post-content {
			margin-top: 10rpx;
			.videoclass{
				width: 100%;
				object-fit: cover;
				position: relative;
			}
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
			width: 176rpx;
			position: absolute;
			right: 10rpx;
			text-align: center;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			font-size: 28rpx;
			z-index: 9999;
			.item {
				padding: 16rpx 0;
			}
		}
		.avatar {
			width: 85rpx;
			height: 85rpx;
			border-radius: 20rpx;
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
		margin: 0 auto;
		padding: 30rpx 10rpx;
		z-index: 999;
		.row{
			display: flex;
			margin: 10rpx 0;
		}
		.share-item {
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			image {
				width: 100rpx;
				height: 100rpx;
			}
			text {
				font-size: 24rpx;
				margin-top: 8rpx;
			}
		}
	}
</style>