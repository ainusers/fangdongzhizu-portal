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
	      .userImage {
			background-color: white;
	        position: relative;
	        bottom: 40px;
			margin: 0 auto;
	        width: 190rpx;
	        height: 150rpx;
	        overflow: hidden;
	        border-radius: 50%;
	        border: 1px solid #eee;
			image {
				display: initial;
			}
	      }
	    }
	    .bottom {
	      display: flex;
	      height: 70%;
	      .left {
	        width: 100%;
	        height: 100%;
	        position: relative;
	        .user-text {
	          width: 100%;
	          font-size: 1.4em;
			  text-align: center;
			  .userNickName {
				  padding-top: 10px;
				  display: inline-block;
			  }
			  image {
				  height: 25px;
				  width: 25px;
				  padding-left: 5px;
				  line-height: 200%;
			  }
	        }
	        .user-phone {
	          width: 100%;
			  text-align: center;
			  padding-top: 5px;
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
			}
		}
	}
</style>
<template>
	<!-- 个人信息区域 -->
	<view class="content">
	  <view class="top">
	    <view class="background"></view>
	  </view>
	  <view class="user-card">
	    <view class="card">
	      <view class="top">
	        <view class="userImage">
	          <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2Ftx19%2F190400013682702.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663558223&t=18f5f6031a8617c79e371aa78bcef759" mode="aspectFit"></image>
			</view>
	      </view>
	      <view class="bottom">
	        <view class="left">
	          <view class="user-text">
	            <view class="userNickName">你是我的优乐美</view>
				<image mode="aspectFit" src="../../../static/me/boy.svg"></image>
				<view class="option" @click="goto('/pages/tabbar/me/user')">
					<u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
	          </view>
	          <view class="user-phone">因为有你，所以一切变得美好</view>
	        </view>
	      </view>
	    </view>
	  </view>
	  
	  <!-- 功能区域 -->
	  <view class="func">
	      <view class="option" @click="goto('/pages/tabbar/me/tools/check?id=0')">
	      	<view class="icon">
	      		<image src="../../../static/me/daishenhe.svg" mode="aspectFit"></image>
	      	</view>
	      	<view class="name">待审核</view>
	      </view>
	      <view class="option" @click="goto('/pages/tabbar/me/tools/check?id=1')">
	      	<view class="icon">
	      		<image src="../../../static/me/publish.svg" mode="aspectFit"></image>
	      	</view>
	      	<view class="name">已发布</view>
	      </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/check?id=2')">
		  	<view class="icon">
		  		<image src="../../../static/me/xiajia.svg" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">已下架</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/check?id=3')">
		  	<view class="icon">
		  		<image src="../../../static/me/save.svg" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">收藏记录</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=0')">
		  	<view class="icon">
		  		<image src="../../../static/me/quanzi.svg" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">圈子</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=1')">
		  	<view class="icon">
		  		<image src="../../../static/me/hudong.svg" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">互动</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=2')">
		  	<view class="icon">
		  		<image src="../../../static/me/share.svg" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">转发</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=3')">
		  	<view class="icon">
		  		<image src="../../../static/me/look.svg" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">浏览</view>
		  </view>
	  </view>
	  
	  <!-- 横条区域 -->
	  <view class="list-card">
	    <view class="card">
	      <view class="item item-bottom-solid">
	        <view class="left flex-center">
	          <image mode="aspectFit" src="../../../static/me/share.svg"></image>
	        </view>
	        <view class="center">
	          <text>反馈建议</text>
	        </view>
	        <view class="right flex-center" @click="goto('/pages/tabbar/me/tools/advise')">
	          <u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
	        </view>
	      </view>
	    </view>
	    <view class="card">
	      <view class="item item-bottom-solid">
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
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			goto(uri){
				uni.navigateTo({
					url: uri
				})
			}
		}
	}
</script>