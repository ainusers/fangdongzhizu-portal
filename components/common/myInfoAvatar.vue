<template>
	<view class="user-info" @click="goto('/pages/tabbar/me/user')">
		<view class="left">
			<view class="user-image" @click="previewAvatar(userInfo.avatar)">
				<u-avatar :src="userInfo.avatar" size="115" mode="square"></u-avatar>
			</view>
		</view>
		
		<view class="middle">
			<view class="user-nickname">{{ userInfo.nickname }}</view>
			<view class="user-sign">{{ userInfo.signature }}</view>
			<view class="user-icon">
				<view class="user-realname">
					<uni-icons v-if="userInfo.auth == 1" custom-prefix="iconfont" type="icon-yishiming" color="#0076f6" size="20"></uni-icons>
					<uni-icons v-else custom-prefix="iconfont" type="icon-weishiming" color="#0076f6" size="20"></uni-icons>
				</view>
				<view class="user-sex">
          <u-icon v-if="userInfo.sex == 1" name="man" color="#0076f6" size="40"></u-icon>
          <u-icon v-else name="woman" color="#fa3534" size="40"></u-icon>
				</view>
			</view>
		</view>
		
		<view class="right">
			<view class="option" v-if="isShow">
				<u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['userInfo','isShow','height'],
		methods:{
			goto(url){
				if(!this.isShow)  return
				uni.navigateTo({
					url:url
				})
			},
			// 头像预览
			previewAvatar(imageUrl){
				uni.previewImage({
					urls:[imageUrl]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-info {
		height: 200rpx;
		display: flex;
		background-color: #ffffff;
		box-shadow: 0 0 15px 1px rgba(224, 224, 224, 0.5);
		margin: 10px 10px 0 10px;
		border-radius: 5px;
		padding: 10px 0;
	}
	.left {
		width: 25%;
	}
	.user-image {
		padding: 0 20px 0 10px;
	}
	.middle {
		width: 65%;
		display: flex;
		flex-direction: column;
	}
	.user-nickname {
		text-align: left;
		font-size: 36rpx;
		font-weight: 600;
		padding-bottom: 5px;
	}
	.user-sign {
		font-size: 30rpx;
		color: #626675;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 222px;
	}
	.user-icon {
		display: flex;
		flex-direction: row;
		padding-top: 10rpx;
	}
	.user-realname-icon {
		height: 60rpx;
		width: 120rpx;
	}
	.user-sex {
		    padding: 0 6px;
	}
	.user-sex-icon {
		height: 36rpx;
		width: 60rpx;
	}
	.right {
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>