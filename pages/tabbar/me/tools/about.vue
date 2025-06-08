<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.content {
		height: 100%;
		background-color: #ffffff;
		border-radius: 10px;
		.top {
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 100%;
			height: 40%;
			image {
				width: 240rpx;
				height: 240rpx;
				margin-bottom: 40rpx;
				margin-top: 100rpx;
			}
		}
		.bottom {
			position: relative;
			display: flex;
			justify-content: center;
			width: 100%;
			height: 60%;
			color: #aaa;
			.app_info {
				padding: 40rpx;
				.item {
					display: flex;
					justify-content: space-between;
					padding: 40rpx 0;
					border-bottom: 1px solid #f2f2f2;
          font-size: 28rpx;
				}
			}
			.text {
				width: 100%;
				.txt {
					display: flex;
					justify-content: center;
					margin-bottom: 5rpx;
				}
				.txt1 {
					text-align: center;
				}
			}
			.high {
				color: blue;
			}
			.txt_con {
				position: absolute;
				width: 100%;
				bottom: 50rpx;
			}
		}
	}
	.slogan {
		color: #AAAAAA;
    font-size: 14px;
	}
	.about_tit {
		margin-bottom: 20rpx;
		font-size: 36upx;
	}
</style>
<template>
	<view class="content">
		<view class="top">
			<image src="http://43.143.148.105:9090/remote/fangdongzhizu/logo.png"></image>
			<view class="mb20 about_tit">
				房东直租
			</view>
			<view class="slogan">
				面对面交易，拒绝中间商
			</view>
		</view>
		<view class="bottom">
			<view class="text">
				<view class="app_info">
					<view class="item">
						<view>
							版本号
						</view>
						<view>
							{{version}}
						</view>
					</view>
					<view class="item">
						<view>
							商务合作
						</view>
						<view>
							5730473@qq.com
						</view>
					</view>
					<view class="item" @click="showUpdateDialog">
						<view>
							版本升级
						</view>
						<view>
							<u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
						</view>
					</view>
				</view>
				<view class="txt_con">
					<view class="txt1">京ICP备2023028039号-2A</view>
					<view class="txt">
						<view class="high" @click="goto('/pages/tabbar/me/text/register')">《注册协议》</view>
						<view class="high" @click="goto('/pages/tabbar/me/text/privacy')">《隐私协议》</view>
						<view class="high" @click="goto('/pages/tabbar/me/text/server')">《用户协议》</view>
					</view>
					<view class="txt1">版权所有&nbsp;&nbsp;违法必究 </view>
				</view>
			</view>
		</view>

		<!-- 下载进度条 -->
		<view v-if="progressFlag" class="download-dialog">
			<view class="dialog-content">
				<text class="dialog-title">正在下载...</text>
				<view class="progress-bar">
					<view class="progress" :style="{ width: progress + '%' }"></view>
				</view>
				<text class="progress-text">{{ progress }}%</text>
			</view>
		</view>

	</view>
</template>
<script>
	import {getLatest,compareVersions} from '@/utils/utils.js';
	export default {
		computed: {
			// 适配微信小程序
			version() {
				return this.$store.state.version;
			}
		},
		data() {
			return {
				progress: 0, // 下载进度百分比
				progressFlag: false //是否展示进度条
			}
		},
		methods: {
			goto(uri) {
				uni.navigateTo({
					url: uri
				})
			},
			// 在需要检查更新的页面或组件中调用
			showUpdateDialog() {
        // #ifdef MP-WEIXIN
        // 已是最新版本
        uni.showToast({
          title: '您已经是最新版本了！',
          icon: 'none'
        });
        return
        // #endif
        // #ifdef H5
        // 已是最新版本
        uni.showToast({
          title: '您已经是最新版本了！',
          icon: 'none'
        });
        return
        // #endif
				let currentVersion = ''
				// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
					currentVersion = widgetInfo.version
				});
				// #endif
				// #ifdef H5
				currentVersion = uni.getStorageSync('phoneInfo').appVersion;
				// #endif
				getLatest().then((latestVersionInfo) => {
					// 比较版本号
					if (compareVersions(currentVersion.toString(), latestVersionInfo.version) < 0) {
						// 需要更新
						if (latestVersionInfo.type) {
							// 强制更新
							uni.showModal({
								title: '版本更新',
								content: '检测到新版本，请立即更新以继续使用。',
								showCancel: false,
								confirmText: '立即更新',
								success: (res) => {
									if (res.confirm) {
										this.handleUpdate(latestVersionInfo);
									}
								}
							});
						} else {
							// 自主更新
							uni.showModal({
								title: '版本更新',
								content: `检测到新版本 ${latestVersionInfo.version}，是否更新？`,
								confirmText: '立即更新',
								cancelText: '稍后再说',
								success: (res) => {
									if (res.confirm) {
										this.handleUpdate(latestVersionInfo);
									}
								}
							});
						}
					} else {
						// 已是最新版本
						uni.showToast({
							title: '您已经是最新版本了！',
							icon: 'none'
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: '检查更新失败',
						icon: 'none'
					});
				});
			},
			// 处理更新操作
			handleUpdate(versionInfo) {
				this.progress = 0;
				this.progressFlag = true;
				// #ifdef APP-PLUS
				const systemInfo = uni.getSystemInfoSync();
				if (systemInfo.platform === 'android') {
					uni.hideTabBar();
					// Android 下载并安装 APK
					const uploadTask = uni.downloadFile({
						url: versionInfo.url,
						success: (res) => {
							if (res.statusCode === 200) {
								plus.runtime.install(res.tempFilePath, {}, () => {
									uni.showToast({
										title: '下载成功',
										icon: 'success'
									});
								}, (e) => {
									uni.showToast({
										title: '下载失败',
										icon: 'none'
									});
								});
							}
						},
						fail: (err) => {
							uni.showToast({
								title: '下载失败',
								icon: 'none'
							});
						}
					});
					uploadTask.onProgressUpdate((res) => {
						this.progress = res.progress
						if (this.progress == 100) {
							uni.showToast({
								title: '下载完成',
								icon: 'success',
								duration: 2000
							});
							uni.showTabBar();
							this.progressFlag = false;
						}
					});
				}
				// #endif
			}
		}
	}
</script>