<template>
	<view>
		<view class="shadow_top" :style="{height: height + 'rpx'}"></view>
		  <view class="card" @click="goto('/pages/tabbar/me/user')" >
		    <view class="top">
		      <view class="userImage">
					  <u-avatar class="avatar" :src="userInfo.avatar" level-bg-color="#8072f3" size="140rpx" img-mode="scaleToFill"></u-avatar>
					</view>
					 <image mode="aspectFit" src="../../static/me/renzheng.png" class="renzheng_icon" v-if="this.userInfo.auth==1"></image>
					 <image mode="aspectFit" src="../../static/me/weirenzheng.png" class="renzheng_icon" v-else></image>
		    </view>
		    <view class="bottom">
		      <view class="left">
		        <view class="user-text">
					<view class="userNickName">{{ userInfo.nickname }}
						<image mode="aspectFit" src="../../static/me/boy_icon.png" class="sex_con" v-if="this.userInfo.sex == 1"></image>
						<image mode="aspectFit" src="../../static/me/girl_icon.png" class="sex_con" v-else></image>
					</view>
						<view class="option" v-if="isShow">
						<u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
					</view>
		        </view>
		        <view class="user-phone">{{ userInfo.signature }}</view>
		      </view>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shadow_top{
		background-color: #5199ff;
		border-bottom-left-radius: 22px;
		border-bottom-right-radius: 22px;
		width: 100%;
	}
  .card {
	margin: 10px 10px 0 10px;
	position: relative;
	bottom: 188rpx;
	height: 250rpx;
	background-color: #ffffff;
	border-radius: 5px;
	.top {
	  height: 30%;
	  position: relative;
	  margin-bottom: 25px;
	  .userImage {
		background-color: white;
		position: relative;
		bottom: 30px;
		margin: 0 auto;
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
		border-radius: 50%;
		image {
			display: initial;
		}
		/deep/.avatar{
			width: 160rpx;
			height: 160rpx;
		}
	  }
	}
	.bottom .left {
		width: 100%;
		height: 100%;
		position: relative;
		.user-text {
		  width: 100%;
		  font-size: 30rpx;
		  text-align: center;
			  .sex_con{
				  display: inline-block;
				  width:50rpx;
				  height:33rpx;
				  padding-left:0;
			  }
			  .userNickName {
				  display: inline-flex;
				  align-items: center;
			  }
			  image {
				  height: 30px;
				  width: 30px;
				  padding-left: 5px;
				  line-height: 200%;
			  }
		}
		.user-phone {
		  width: 300px;
		  margin: auto;
		  padding-top: 5px;
		  font-size: 28rpx;
		  text-align: center;
		}
	  }
	  .right {
		width: 20%;
		height: 50%;
	  }
  }
	.icon {
	  float: right;
	  padding-right: 5px;
	}

	.renzheng_icon{
		position: relative;
		bottom:94rpx;
		left:50%;
		width:120upx;
		height: 40upx;
		margin-left: -60upx;
		}
	/deep/.u-avatar__img{
		overflow: visible;
	}
</style>