<style lang="scss" scoped>
	.content {
		background-color: #f2f2f2;
		text-align: center;
		height: 100vh;
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
		margin: 15px 15px 15px 15px;
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
	/deep/.renzheng_icon{
		width:120upx;
		height: 40upx;
		position: relative;
		bottom:110rpx;
		left:auto;
		margin-left: 0;
		}
</style>
<template>
	<!-- 个人信息区域 -->
	<view class="content">
		<myInfoAvatar :userInfo="userInfo" :isShow="true"/>
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
		  		<image src="../../../static/me/report.png" mode="aspectFit"></image>
		  	</view>
		  	<view class="name">举报</view>
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
		 <!-- <view class="card">
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
		  </view> -->
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
	import myInfoAvatar from '@/components/common/myInfoAvatar.vue'
	import {isLoginCheck,getUserInfo} from '@/utils/utils.js'
	export default {
		data() {
			return {
				userInfo: '',
				token:''
			}
		},
		components:{
			myInfoAvatar
		},
		onShow() {
			this.userInfo=this.$store.state.userInfo
			if(!this.userInfo || !this.userInfo.nickname){
				this.getUserInfo()
			}
		},
		methods: {
			goto(uri){
				uni.navigateTo({
					url: uri
				})
			},
			getUserInfo() {
				this.$H.get('/zf/v1/user/attr/token',{},true).then(res=>{
					if(res.status){
						this.userInfo = res.data[0].user;
						this.$store.commit('userInfo',this.userInfo)
						uni.setStorage({
							key:'userInfo',
							data:this.userInfo
						})
					}
				})
			}
		}
	}
</script>