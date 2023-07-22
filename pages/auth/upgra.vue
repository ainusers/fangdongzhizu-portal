<template>
	<view class="up_main">
		<view class="icon">
			<image src="../../static/me/upgra.png" mode="" class="img"></image>
		</view>
		<view class="upgra_tit">
			发现新版本v1.2.0
		</view>
		<view class="upgra_text">
			<view class="tit">
				更新内容
			</view>
			<view class="text">
				<view class="item">
					修复若干bug
				</view>
			</view>
		</view>
		
		<view class="button">
			<view v-if="!isStartDownload" class="button_item">
					<view class="cancel item" @click="cancel" v-if="!isForceUpdate">
						以后再说
					</view>
					<view class="submit item" @click="handleUpgrade">
						立即更新
					</view>
			</view>
			<view class="footer" v-if="isStartDownload">
				<view class="progress-view" :class="{'active':!hasProgress}" @click="handleInstallApp">
					<!-- 进度条 -->
					<view v-if="hasProgress" style="height: 100%;">
						<view class="txt">{{percentText}}</view>
						<view class="progress" :style="setProStyle"></view>
					</view>
					<view v-else>
						<view class="btn upgrade force">{{ isDownloadFinish  ? '立即安装' :'下载中...'}}</view>
					</view>
				</view>
			</view>
		</view>
		<!--下载状态-进度条显示 -->
		
			
		
	</view>
</template>

<script>
	import {
			downloadApp,
			installApp
		} from './upgra/upgrade.js'
	export default {
		data(){
			return{
				isForceUpdate:false,//是否强制更新
				versionName:'',//版本名称
				versionDesc:'',//更新说明
				downloadUrl:'https://wwqr.lanzouw.com/ieyeT12i8y3c',//下载链接
				isStartDownload:false, //是否开始下载
				hasProgress:false, //是否能显示进度条
				currentPercent: 0, //当前下载百分比
				isDownloadFinish:false,//是否下载完成
				fileName:'',//下载后本地app路径名称
			}
		},
		computed:{
			percentText() {
				let percent = this.currentPercent;
				if (typeof percent !== 'number' || isNaN(percent)) return '下载中...'
				if (percent < 100) return `下载中${percent}%`
				return '立即安装'
			 
			},
			setProStyle() {
						return {
							width: (510 * this.currentPercent / 100) + 'rpx' //510：按钮进度条宽度
						}
					},
		},
		methods:{
			handleUpgrade(){
				// plus.runtime.openURL(this.downloadUrl)
				// return;
				if (this.downloadUrl) {
						this.isStartDownload = true
						//开始下载App
						downloadApp(this.downloadUrl, current => {
							//下载进度监听
							this.hasProgress = true
							this.currentPercent = current
							console.log(this.currentPercent)
						}).then(fileName => {
							//下载完成
							console.log('去安装了')
							this.isDownloadFinish = true
							this.fileName = fileName
							if (fileName) {
								//自动安装App
								this.handleInstallApp()
							}
						}).catch(e => {
							console.log(e, 'e')
						})
					} else {
						uni.showToast({
							title: '下载链接不存在',
							icon: 'none'
						})
					}
			},
			handleInstallApp() {
							//下载完成才能安装，防止下载过程中点击
							if (this.isDownloadFinish && this.fileName) {
								installApp(this.fileName, () => {
									//安装成功,关闭升级弹窗
									this.$emit('cancelVersion')
								})
							}
						},
			cancel(){
				this.$emit('cancelVersion')
			}
		}
	}
</script>
<style>
	page{
		background: rgba(0, 0, 0);
	}
</style>
<style lang="scss" scoped>
	.up_main{
		position: fixed;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		margin:0 auto;
		background: #fff;
		width:80%;
		min-height: 500rpx;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.15);
		.icon{
			position: relative;
			top:-100rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: center;
			width:200rpx;
			height: 200rpx;
			background: #fff;
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.15);
			border-radius: 50%;
			.img{
				width:100rpx;
				height: 100rpx;
			}
		}
		.upgra_tit{
			position: relative;
			top:-60rpx;
			text-align: center;
			color: #5199ff;
			font-size: 32rpx;
			font-weight: bold;
		}
		.upgra_text{
			width:80%;
			margin:0 auto;
			.tit{
				font-weight: bold;
			}
			.text{
				.item{
					margin: 0.3rem 0;
				}
			}
		}
		.button{
			position: absolute;
			bottom:30rpx;
			width:100%;
			.button_item{
				display: flex;
				width:100%;
				justify-content: space-around;
			}
			.item{
				width:30%;
				height:70rpx;
				text-align: center;
				line-height: 70rpx;
			}
			.cancel{
				border: 1px solid #000;
				border-radius: 20rpx;
			}
			.submit{
				background: #5199ff;
				border-radius: 20rpx;
				color: #fff;
			}
		}
	}
	.footer {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				flex-shrink: 0;
				.btn {
					width: 246rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					z-index: 999;
					height: 96rpx;
					box-sizing: border-box;
					font-size: 32rpx;
					border-radius: 10rpx;
					letter-spacing: 2rpx;
	 
					&.force {
						width: 500rpx;
					}
	 
					&.close {
						border: 1px solid #E0E0E0;
						margin-right: 25rpx;
						color: #000;
					}
	 
					&.upgrade {
						background-color: #026DF7;
						color: white;
					}
				}
	 
				.progress-view {
					width: 510rpx;
					height: 90rpx;
					display: flex;
					position: relative;
					align-items: center;
					border-radius: 6rpx;
					background-color: #dcdcdc;
					display: flex;
					justify-content: flex-start;
					padding: 0px;
					box-sizing: border-box;
					border: none;
					overflow: hidden;
	 
					&.active {
						background-color: #026DF7;
					}
	 
					.progress {
						height: 100%;
						background-color: #026DF7;
						padding: 0px;
						box-sizing: border-box;
						border: none;
						border-top-left-radius: 10rpx;
						border-bottom-left-radius: 10rpx;
	 
					}
	 
					.txt {
						font-size: 28rpx;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: #fff;
					}
				}
			}
</style>	