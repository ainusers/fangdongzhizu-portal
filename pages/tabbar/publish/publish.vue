<template>
	<view class="content" :class="{'active':active}">
		<view class="container">
			<view class="title">社区行为规范:</view>
			<view class="title">1、尊重他人，不发布攻击、侮辱、谩骂等不良言论</view>
			<view class="title">2、不发布广告和商业推广信息</view>
			<view class="title">3、禁止恶意灌水，不发布重复、无意义的垃圾信息</view>
			<view class="title">4、不侵犯他人版权，不发布侵犯他人知识产权的内容</view>
			<view class="title">5、注意言辞和形象，不得使用粗俗、低俗的语言</view>
			<view class="title">6、遵守社区规定，不得违反社区的任何规定和要求</view>
		</view>
		<view class="container">
			<view class="title">社区发布规则:</view>
			<view class="title">1、每个用户发布 (房源) 不超过两个</view>
			<view class="title">2、每个用户每天发布 (动态) 不超过三个</view>
		</view>
		<view class="container">
			<view class="title">社区审核规则:</view>
			<view class="title">1、发布图文：无需经过平台审核</view>
			<view class="title">2、发布房源：需要经过平台审核<br/>2.1、未审核：会在“待审核”中展示<br/>2.2、审核不通过：会在“待审核”中展示并附上审核意见<br/>2.3、审核通过：会在首页展示</view>
		</view>
		<!-- <image class="logo" :class="{'active':active}" src="../../../static/logo.png"  mode="aspectFit"></image> -->
		<view class="tabbar-box-wrap">
			<view class="tabbar-box">
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar/publish/choice/tuwen','tuwen')">
					<image class="box-image" src="../../../static/publish/release.png" mode="aspectFit"></image>
					<text class="explain">发布图文</text>
				</view>
				<!-- <view class="tabbar-box-item" @click="goToPage('/pages/tabbar/publish/choice/tuwen')">
					<image class="box-image" src="../../../static/publish/video.png" mode="aspectFit"></image>
					<text class="explain">发布视频</text>
				</view> -->
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar/publish/choice/fangyuan','fangyuan')">
					<image class="box-image" src="../../../static/publish/qa.png" mode="aspectFit"></image>
					<text class="explain">发布房源</text>
				</view>
			</view>
		</view>
		<u-modal v-model="show" :content="content" :mask-close-able="true" title="提示" @confirm="confirm" :show-cancel-button="true"></u-modal>
	</view>
</template> 

<script>
import {getCount,checkPush} from '@/utils/utils.js'
export default {
	data() {
		return {
			active: false,
			show:false,
			content:'需要实名认证，是否去认证'
		};
	},
	onLoad() {},
	onShow() {
		// setTimeout(() => {
			this.active = true;
		// }, 500);
	},
	onHide() {
		this.active = false;
	},
	methods: {
		goToPage(url,type) {
			if(!this.$store.state.userInfo.auth){
				this.show=true
				return
			}
			if (!url) return;
			//房源
			if(type=='fangyuan'){
				getCount().then(res=>{
					if (res.code == 200 && res.data[0].status) {
						uni.navigateTo({
							url
						});
					}else{
						uni.$u.toast('每个用户发布房源不超过两个')
					}
				})
			}else if(type=='tuwen'){
				checkPush().then(res=>{
					if(res.status){
						uni.navigateTo({
							url
						})
					}else{
						uni.$u.toast('每个用户每天发布动态不能超过三个')
					}
				})
			}
			
			
			
		},
		confirm(){
			uni.navigateTo({
				url:'/pages/tabbar/me/update/realname'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	align-items: center;
	justify-content: center;
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	/* #endif */
	/* #ifndef H5 */
	height: 100vh;
	/* #endif */
	transition: opacity 0.3s;
	background: #999;
	opacity: 0;
	&.active {
		opacity: 1;
	}
	.container {  
	  padding: 20px 10px 10px 10px;  
	}  
	.title {  
	  font-size: 14px;  
	  font-weight: bold;  
	  margin-bottom: 10px;  
	}  
	.rule {  
	  font-size: 14px;
	}
}
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 26upx;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	.tabbar-box {
		position: relative;
		display: flex;
		width: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			// position: relative;
			width: 100%;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
		}
	}
}
</style>
