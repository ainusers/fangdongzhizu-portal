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
			<view class="pay_type">
				<view class="item_pay" @click="pay('wxpay')" :class="{pay_ative:payType=='wxpay'}">
					<image src="../../../static/me/wx.png" mode=""></image>
					微信
				</view>
				<view class="item_pay" @click="pay('alipay')" :class="{pay_ative:payType=='alipay'}">
						<image src="../../../static/me/zwb.png" mode=""></image>
					支付宝
				</view>
			</view>
			<u-button type="primary"  class="custom-style"  @click="goPay">立即打赏</u-button>
		</view>
		<view class="reward_text">
			<view>
				温馨提示:
			</view>
			<view>
				1、打赏金额用于APP服务器运行费用，不会计入个人账户
			</view>
			<view>
				2、已打赏金额不可转让、提现或退款
			</view>
			<view>
				3、不建议军人/军属，教师，医生/护士进行打赏
			</view>
			<view>
				4、如遇无法打赏问题，请在"反馈建议"中提交信息
			</view>
		</view>
		<view>
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
				show:false,
				payType:'wxpay'
			}
		},
		methods:{
			changeMoney(index){
				this.currentIndex=index
			},
			pay(type){
				this.payType=type
			},
			goPay(){
				this.$H.get('/zf/v1/ali/pay',{},true).then(res=>{
					if(res.status){
						console.log("-------------->" + res.data[0]);
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: res.data[0],
							success(r) {
								uni.showToast({
									title:"支付成功",
									icon: "success"
								})
							},
							fail(e) {
								uni.showToast({
									title:"用户取消支付",
									icon: "error"
								})
							},
							complete: () => {
								console.log("payment结束")
							}
						})
					}
				})
				/* uni.requestPayment({
				    provider: 'wxpay',
				    orderInfo: {
						"appid": "wx2c28b021e15abad4",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
						"partnerid": "1648896229",      // 微信支付商户号
						"prepayid": "wx202254********************fbe90000", // 统一下单订单号 
						"timestamp": 1597935292,        // 时间戳（单位：秒）
						"sign": "96e939a667090ad79004e272e11d4a84" // 签名，这里用的 MD5/RSA 签名
					}, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
				    success: function (res) {
				    	let rawdata = JSON.parse(res.rawdata);
				    	console.log("支付成功");
				    },
				    fail: function (err) {
				    	console.log('支付失败:' + JSON.stringify(err));
				    }
				}); */
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay_ative{
		box-shadow: 0 0px 5px 0 #5199ff;
	}
	.reward_bg{
		height:250rpx;
		background-image:linear-gradient( #5199ff 0%, #ffffff 100%);
	}
	.reward_info{
		width:90%;
		display: flex;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 0 10px 3px #eee;
		margin-top: -150rpx;
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
			background: #f2f2f2;
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
		width:100%;
		display: flex;
		justify-content: space-around;
		image{
			width:80rpx;
			height: 80rpx;
			display: block;
			margin-bottom: 20rpx;
		}
		.item_pay{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 10px 30px;
		}
	}
</style>