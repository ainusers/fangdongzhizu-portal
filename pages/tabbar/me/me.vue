<style lang="scss" scoped>
	.content {
		background-color: #f2f2f2;
		text-align: center;
		height: 100vh;
	}
	.top {
	  height: 250rpx;
	  position: relative;
	  .background {
	    background-color: #5199ff;
	    border-bottom-left-radius: 22px;
	    border-bottom-right-radius: 22px;
	    position: absolute;
	    height: 300rpx;
	    width: 100%;
	  }
	}
	.icon {
	  float: right;
	  padding-right: 5px;
	}
	.user-card {
	  height: 200rpx;
	  padding: 0 15px;
	  .card {
	    position: relative;
	    bottom: 40px;
	    height: 250rpx;
	    background-color: #ffffff;
	    border-radius: 5px;
		box-shadow: 0 0 15px 1px rgba(224, 224, 224, 50%);
	    .top {
	      height: 30%;
	      position: relative;
		  margin-bottom: 25px;
	      .userImage {
			background-color: white;
	        position: relative;
	        bottom: 40px;
			margin: 0 auto;
	        width: 160rpx;
	        height: 160rpx;
	        overflow: hidden;
	        border-radius: 50%;
	        border: 1px solid #eee;
			image {
				display: initial;
			}
				
			/deep/.avatar{
				width: 180rpx;
				height: 180rpx;
			}
	      }
	    }
	    .bottom {
	      display: flex;
	      height: 70%;
		  margin-top: 40rpx;
	      .left {
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
	        }
	      }
	      .right {
	        width: 20%;
	        height: 50%;
	      }
	    }
	  }
	}
	.list-card {
	  background-color: #ffffff;
	  margin: 20px 15px 0 15px;
	  border-radius: 5px;
	  box-shadow: 0 0 15px 1px rgba(224, 224, 224, 50%);
	  .card {
	    border-radius: 5px;
	    position: relative;
	    background-color: white;
	    border-radius: 5px;
	    .item {
	      display: flex;
	      height: 120rpx;
	      .left {
	        width: 15%;
	        image {
	          width: 40rpx;
	          height: 40rpx;
			  padding: 22px 2px;
	        }
	      }
	      .center {
	        width: 70%;
	        display: flex;
	        justify-content: start;
	        align-items: center;
	        font-size: 1.1em;
	      }
	      .right {
	        width: 15%;
	        padding: 25px 2px;
	      }
	    }
	  }
	}
	.item-bottom-solid {
	  border-bottom: 1px solid #d4d6da;
	}
	.func {
		display: flex;
		height: 280upx;
		align-items: center;
		background-color: #ffffff;
		flex-wrap: wrap;
		margin: 0 15px;
		border-radius: 5px;
		box-shadow: 0 0 15px 1px rgba(224, 224, 224, 50%);
		.option {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 140upx;
			.icon {
				image {
					height: 50upx;
					width: 50upx;
				}
			}
			.name {
				color: #333;
				line-height: 30upx;
				margin-top: 20upx;
			}
		}
	}
	.renzheng_icon{
		width:120upx;
		height: 40upx;
		position: relative;
		bottom:110rpx;
		}
	/deep/.u-avatar__img{
		overflow: visible;
	}
</style>
<template>
	<!-- 个人信息区域 -->
	<view class="content">
	  <view class="top">
	    <view class="background"></view>
	  </view>
	  <view class="user-card">
	    <view class="card" @click="goto('/pages/tabbar/me/user')">
	      <view class="top">
	        <view class="userImage">
			  <u-avatar class="avatar" :src="this.userInfo.avatar" level-bg-color="#8072f3" size="140rpx" img-mode="scaleToFill"></u-avatar>
			</view>
			 <image mode="aspectFit" src="../../../static/me/renzheng.png" class="renzheng_icon" v-if="this.userInfo.auth==1"></image>
			 <image mode="aspectFit" src="../../../static/me/weirenzheng.png" class="renzheng_icon" v-else></image>
	      </view>
	      <view class="bottom">
	        <view class="left">
	          <view class="user-text">
	            <view class="userNickName">{{ this.userInfo.nickname }}
						<image mode="aspectFit" src="../../../static/me/boy_icon.png" class="sex_con" v-if="this.userInfo.sex == 1"></image>
						<image mode="aspectFit" src="../../../static/me/girl.svg" class="sex_con" v-else></image>
						
				</view>
				<view class="option" >
					<u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
	          </view>
	          <view class="user-phone">{{ this.userInfo.signature }}</view>
	        </view>
	      </view>
	    </view>
	  </view>
	  
	  <!-- 功能区域 -->
	  <view class="func">
	      <view class="option" @click="goto('/pages/tabbar/me/tools/check?index=0')">
	      	<view class="icon">
	      		<image src="../../../static/me/daishenhe.png" mode="aspectFit"></image>
	      	</view>
	      	<view class="name">待审核</view>
	      </view>
	      <view class="option" @click="goto('/pages/tabbar/me/tools/check?index=1')">
	      	<view class="icon">
	      		<image src="../../../static/me/publish.png" mode="aspectFit"></image>
	      	</view>
	      	<view class="name">已发布</view>
	      </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/check?index=2')">
		  	<view class="icon">
		  		<image src="../../../static/me/xiajia.png" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">已下架</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/check?index=3')">
		  	<view class="icon">
		  		<image src="../../../static/me/save.png" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">收藏记录</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=0')">
		  	<view class="icon">
		  		<image src="../../../static/me/quanzi.png" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">动态</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=1')">
		  	<view class="icon">
		  		<image src="../../../static/me/hudong.png" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">点赞</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=2')">
		  	<view class="icon">
		  		<image src="../../../static/me/share.png" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">转发</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=3')">
		  	<view class="icon">
		  		<image src="../../../static/me/look.png" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">浏览</view>
		  </view>
	  </view>
	  
	  <!-- 横条区域 -->
	  <view class="list-card">
		  <view class="card">
		    <view class="item item-bottom-solid" @click="goto('/pages/tabbar/me/reward')">
		      <view class="left flex-center">
		        <image mode="aspectFit" src="../../../static/me/money.png"></image>
		      </view>
		      <view class="center">
		        <text>去打赏</text>
		      </view>
		      <view class="right flex-center">
		        <u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
		      </view>
		    </view>
		  </view>
	    <view class="card">
	      <view class="item item-bottom-solid" @click="goto('/pages/tabbar/me/tools/advise')">
	        <view class="left flex-center">
	          <image mode="aspectFit" src="../../../static/me/care.png"></image>
	        </view>
	        <view class="center">
	          <text>反馈建议</text>
	        </view>
	        <view class="right flex-center">
	          <u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
	        </view>
	      </view>
	    </view>
	    <view class="card">
	      <view class="item item-bottom-solid" @click="goto('/pages/tabbar/me/tools/about')">
	        <view class="left flex-center">
			  <image mode="aspectFit" src="../../../static/me/about.svg"></image>
	        </view>
	        <view class="center">
	          <text>关于我们</text>
	        </view>
	        <view class="right flex-center">
	          <u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
	        </view>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script>
	import {isLoginCheck} from '../../../utils/utils.js'
	export default {
		data() {
			return {
				userInfo: '',
				token:''
			}
		},
		
		onShow() {
			this.userInfo=this.$store.state.userInfo
		},
		methods: {
			goto(uri){
				console.log(uri)
				uni.navigateTo({
					url: uri
				})
			}
		}
	}
</script>