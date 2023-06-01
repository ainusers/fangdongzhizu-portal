<template>
	<view class="reward_main">
		<view class="reward_bg">
			
		</view>
		<view class="reward_info">
			<view class="reward_avatar">
				<u-avatar :src="src" mode="square"></u-avatar>
			</view>
			
			<view class="text">
				<view class="tit">
					房东直租
				</view>
				<view class="val">
					打赏人数<view class="num">99+</view>
				</view>
			</view>
		</view>
		<view class="reward_bottom">
			<block v-for="(item,index) in moneyList">
				<view class="item" :class="{active_item :currentIndex==index}" @click="changeMoney(index)">
					￥<view class="num">{{item}}</view>
				</view>
			</block>
			
			<u-button type="primary"  class="custom-style"  @click="show = true">立即打赏</u-button>
		</view>
		<view class="reward_text">
			<view>
				温馨提示:
			</view>
			<view>
				1.打赏的金额仅用于APP，将不会计于个人账户中
			</view>
			<view>
				2.不可转让、提现或退款
			</view>
			<view>
				3.如遇无法打赏问题，请联系客服或提交反馈信息
			</view>
			<view>
				4.充值需要缓冲使时间，请在网络条件好的情况下充值，耐心等待，不要关闭等待界面
			</view>
		</view>
		<view>
				<u-popup v-model="show" mode="bottom">
					<view class="pay_type">
						<view class="item" @click="pay('wx')">
							<image src="../../../static/me/wx.png" mode=""></image>
							微信
						</view>
						<view class="item" @click="pay('zfb')">
								<image src="../../../static/me/zwb.png" mode=""></image>
							支付宝
						</view>
					</view>
					
				</u-popup>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				currentIndex:0,
				moneyList:[1,5,10,15,20,50],
				show:false
			}
		},
		methods:{
			changeMoney(index){
				this.currentIndex=index
			},
			pay(type){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reward_bg{
		height:200rpx;
		background-image:linear-gradient( #5199ff 0%, #ffffff 100%);
	}
	.reward_info{
		width:90%;
		display: flex;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 0 10px 3px #eee;
		margin-top: -120rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		.reward_avatar{
			margin-right: 20rpx;
		}
		.tit{
			font-size: 35rpx;
			margin-bottom: 10rpx;
		}
		.val{
			font-size: 25rpx;
		}
		.num{
			display: inline-block;
			margin-left: 10px;
			color: #f17a25;
		}
	}
	.reward_bottom{
		width:90%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 0 10px 3px #eee;
		margin-top: 20rpx;
		border-radius: 20rpx;
		padding: 50rpx 20rpx;
		.item{
			width:180rpx;
			height: 100rpx;
			margin-bottom: 30rpx;
			line-height: 100rpx;
			background: #e5e5e5;
			text-align: center;
			.num{
				display: inline-block;
				font-size: 40rpx;
			}
		}
		.custom-style{
			width:90%;
			height: 80rpx;
			background: #5199ff;
			border-radius: 50rpx;
			margin-top: 50rpx;
		}
	}
	.reward_text{
		font-size: 27rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: 60rpx;
		color: #333;
		view{
			margin-bottom: 10rpx;
			line-height: 150%;
		}
	}
	.active_item{
		background: #5199ff !important;
		color: #ffffff;
	}
	/deep/.u-drawer-content{
		width:100% !important;
		margin: 0 !important;
		border-radius: 10px 10px 0 0 !important;
		padding: 50rpx 30rpx;
	}
	.pay_type{
		display: flex;
		justify-content: space-around;
		image{
			width:80rpx;
			height: 80rpx;
			display: block;
			margin-bottom: 20rpx;
		}
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>