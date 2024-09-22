<style lang="scss" scoped>
	@import "@/static/iconfont/iconfont.css";
	.content {
		background-color: #f7f7f7;
		text-align: center;
		height: 100vh;
	}
	.list-card {
	  background-color: #ffffff;
	  margin: 10px 10px 0 10px;
	  border-radius: 5px;
	  bottom: 180rpx;
	  position: relative;
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
			padding-top: 15px;
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
	  border-bottom: 1px solid #f2f2f2;
	}
	.func {
		display: flex;
		height: 280upx;
		align-items: center;
		bottom: 180rpx;
		position: relative;
		background-color: #ffffff;
		flex-wrap: wrap;
		margin: 10px 10px 0 10px;
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
		bottom: 90rpx;
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
				<uni-icons custom-prefix="iconfont" type="icon-daishenhe" color="#5199ff" size="20"></uni-icons>
	      	</view>
	      	<view class="name">待审核</view>
	      </view>
	      <view class="option" @click="goto('/pages/tabbar/me/tools/check?index=1')">
	      	<view class="icon">
				<uni-icons custom-prefix="iconfont" type="icon-fabu" color="#5199ff" size="23"></uni-icons>
	      	</view>
	      	<view class="name">已发布</view>
	      </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/check?index=2')">
		  	<view class="icon">
				<uni-icons custom-prefix="iconfont" type="icon-xiajia" color="#5199ff" size="25"></uni-icons>
		  	</view>
		  	<view class="name">已下架</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/check?index=3')">
		  	<view class="icon">
				<uni-icons custom-prefix="iconfont" type="icon-shoucang" color="#5199ff" size="26"></uni-icons>
		  	</view>
		  	<view class="name">收藏记录</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=0')">
		  	<view class="icon">
				<uni-icons custom-prefix="iconfont" type="icon-dongtai" color="#5199ff" size="32"></uni-icons>
		  	</view>
		  	<view class="name">动态</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=1')">
		  	<view class="icon">
				<uni-icons custom-prefix="iconfont" type="icon-dianzan" color="#5199ff" size="23"></uni-icons>
		  	</view>
		  	<view class="name">点赞</view>
		  </view>
		 <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=2')">
		  	<view class="icon">
				<uni-icons custom-prefix="iconfont" type="icon-jubao" color="#5199ff" size="23"></uni-icons>
		  	</view>
		  	<view class="name">举报</view>
		  </view>
		  <view class="option" @click="goto('/pages/tabbar/me/tools/shuoshuo?id=3')">
		  	<view class="icon">
				<uni-icons custom-prefix="iconfont" type="icon-liulan" color="#5199ff" size="25"></uni-icons>
		  	</view>
		  	<view class="name">浏览</view>
		  </view>
	  </view>
	  
	  <!-- 横条区域 -->
	  <view class="list-card">
		  <view class="card">
		    <view class="item item-bottom-solid" @click="goto('/pages/tabbar/me/reward')">
		      <view class="left flex-center">
				<uni-icons custom-prefix="iconfont" type="icon-dashang" color="#5199ff" size="25"></uni-icons>
		      </view>
		      <view class="center">
		        <text>去打赏</text>
		      </view>
		      <view class="right flex-center">
		        <u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
		      </view>
		    </view>
		  </view>
		  <!-- <view class="card">
		    <view class="item item-bottom-solid" @click="goto('/pages/tabbar/me/tools/feel')">
		      <view class="left flex-center">
		        <image mode="aspectFit" src="../../../static/me/feel.png"></image>
		      </view>
		      <view class="center">
		        <text>租房心得</text>
		      </view>
		      <view class="right flex-center">
		        <u-icon class="icon" name="arrow-right" color="#969799" size="28"></u-icon>
		      </view>
		    </view>
		  </view> -->
	    <view class="card">
	      <view class="item item-bottom-solid" @click="goto('/pages/tabbar/me/tools/advise')">
	        <view class="left flex-center">
			  <u-icon name="edit-pen" color="#5199ff" size="50"></u-icon>
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
			  <u-icon name="info-circle" color="#5199ff" size="50"></u-icon>
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
	import {getUserInfo} from '@/utils/utils.js'
	export default {
		data() {
			return {
				userInfo: '',
				token: ''
			}
		},
		components:{
			myInfoAvatar
		},
		onShow() {
			// 判断用户是否登录
			if(!this.$store.state.token){
				uni.navigateTo({
					url: '/pages/auth/login',
				})
				return;
			}
			
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