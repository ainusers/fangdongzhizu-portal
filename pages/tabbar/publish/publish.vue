<template>
	<view class="content">
		<view class="container" @click="goToPage('/pages/tabbar/publish/choice/tuwen','tuwen')">
			<view class="left">
				<image class="tuwen-icon" src="http://43.143.148.105:9090/remote/fangdongzhizu/release.png" mode="aspectFit"></image>
			</view>
			<view class="middle">
				<view class="title">发布动态</view>
				<view class="rule">
					<view class="title-content">无需经过平台审核，私下联系需谨慎</view>
					<view class="title-content">发布后全国可见</view>
				</view>
			</view>
			<view class="right">
				<u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		<view class="container" @click="goToPage('/pages/tabbar/publish/choice/fangyuan','fangyuan')">
			<view class="left">
				<image class="tuwen-icon" src="http://43.143.148.105:9090/remote/fangdongzhizu/qa.png" mode="aspectFit"></image>
			</view>
			<view class="middle">
				<view class="title">发布房源</view>
				<view class="rule">
					<view class="title-content">资质上传：<br/>租客：租房合同或其他证明材料<br/>房东：房产证内容页或其他证明材料<br/></view>
				</view>
			</view>
			<view class="right">
				<u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<!-- 温馨提示 -->
		<view class="advise">
			<u-divider fontSize="29rpx;" half-width="300" bg-color="#f7f7f7">温馨提示</u-divider>
			<view style="color: #9195a3;padding: 10rpx;">
				如发现在资质中上传房源照片，因平台无法核实您的身份和房源的真实性，一律审核不过
			</view>
		</view>
		
		<!-- 实名认证校验 -->
		<u-modal v-model="show" :content="content" :mask-close-able="true" title="温馨提示" @confirm="confirm" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
import {getCount,checkPush} from '@/utils/utils.js'
export default {
	data() {
		return {
			active: false,
			show: false,
			content:'需要实名认证，是否去认证'
		};
	},
	onShow() {
		this.active = true;
	},
	onHide() {
		this.active = false;
	},
	methods: {
		goToPage(url,type) {
			// 判断用户是否登录
			if(!this.$store.state.token){
				uni.navigateTo({
					url: '/pages/auth/login',
				})
				return;
			}
			// 判断用户是否实名认证
			if(!this.$store.state.userInfo.auth){
				this.show=true
				return;
			}
			if (!url) return;
			// 发布房源
			if(type=='fangyuan'){
				getCount().then(res=>{
					if (res.code == 200 && res.data[0].status) {
						uni.navigateTo({
							url
						});
					} else{
						uni.$u.toast('每个用户发布房源不超过两个')
					}
				})
			} else if(type=='tuwen'){
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
		// 跳转实名认证
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
    height: 100vh;
		background-color: #f7f7f7;
		display: flex;
		flex-direction: column;
	}
	.container {
		height: 200rpx;
		background-color: #ffffff;
		margin: 15px 10px 5px 10px;
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		box-shadow: 0 0 15px 1px rgba(224, 224, 224, 0.5);
	}
	.left{
    flex: 1;
	}
	.middle{
    flex: 8;
		padding: 10px 0 5px 0;
	}
	.title {
		font-size: 17px;
		font-weight: 600;
	}
	.title-content {
		font-size: 14px;
		padding: 8rpx 0;
	}
	.rule {
		color: #9195a3;
	}
	.right{
    flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tuwen-icon {
		height: 100rpx;
		width: 100rpx;
		padding: 20rpx;
	}
	.advise {
    width: 100%;
		color: #9195a3;
		padding: 20rpx;
		font-size: 14px;
    position: absolute;
    bottom: 20rpx;
	}
</style>