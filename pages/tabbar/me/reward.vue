<template>
	<view class="reward_main">
		<!-- 占位使用 -->
		<view style="height: 30rpx"></view>
		
		<!-- 图标部分 -->
		<view class="reward_info">
			<view class="reward_avatar">
				<u-avatar :src="src" mode="square"></u-avatar>
			</view>
			<view class="text" style="padding: 8rpx 0rpx 0rpx 30rpx">
				<view class="tit">
					房东直租
				</view>
				<view class="val">
					支付人数:<view class="num">99+</view>
				</view>
			</view>
		</view>
		
		<!-- 占位使用 -->
		<view style="height: 30rpx"></view>
		
		<!-- <view class="reward_middle">
			<view class="name">
				<view class="left">商品名称:</view>
				<view class="first-right">发布待售卖的商品房</view>
			</view>
			<view class="name">
				<view class="left">商品数量:</view>
				<view class="first-right">1个</view>
			</view>
			<view class="price">
				<view class="left">商品价格:</view>
				<view class="second-right">¥100元</view>
			</view> 
		</view> -->
		
		<!-- 支付选项 -->
		<view class="reward_bottom">
			
			<!-- 打赏金额 -->
			<block v-for="(item,index) in moneyList">
				<view class="item" :class="{active_item :currentIndex==index}" @click="changeMoney(index,item)">
					￥<view class="num">{{item}}</view>
				</view>
			</block>
			
			<view class="pay_type">
				<view class="item_pay" @click="pay('wxpay')" :class="{pay_ative:payType=='wxpay'}">
					<uni-icons custom-prefix="iconfont" type="icon-weixin" color="#2aae67" size="50"></uni-icons>
					微信
				</view>
				<view class="item_pay" @click="pay('alipay')" :class="{pay_ative:payType=='alipay'}">
					<uni-icons custom-prefix="iconfont" type="icon-zhifubao" color="#5199ff" size="45"></uni-icons>
					支付宝
				</view>
			</view>
			<u-button type="primary"  class="custom-style"  @click="goPay(payType)">立即支付</u-button>
		</view>
		<view class="reward_text">
			<view>
				温馨提示:
			</view>
			<view>
				1、支付前请检查金额和支付方式是否正确
			</view>
			<view>
				2、虚拟产品支付后不支持转让、提现或退款
			</view>
			<view>
				3、支付金额用于APP运行费用，不会计入个人账户
			</view>
			<view>
				4、如遇无法支付问题，请在"反馈建议"中提交信息
			</view>
			<view>
				5、不建议军人/军属，教师，医生/护士进行打赏
			</view>
			<view>
				6、每一份打赏都是对我们努力的认可，感谢您的支持
			</view>
		</view>
		
		<!-- 支付成功提示框 -->
		<u-modal v-model="show" :content="content" title="温馨提示"></u-modal>
		
		<!-- 信息流广告 -->
		<ad adpid="1804384865"></ad>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				money: 1,
				src: 'http://43.143.148.105:9090/banner/logo-apple.png',
				currentIndex:0,
				moneyList:[1,5,10,20,50,100],
				show: false,
				payType:'wxpay',
				content: '每一份打赏都是对我们努力的认可，感谢您的支持'
			}
		},
		methods:{
			changeMoney(index,money){
				this.money = money
				this.currentIndex=index
			},
			pay(type){
				this.payType=type
			},
			goPay(){
				if("alipay" == this.payType){
					this.$H.get('/zf/v1/ali/pay',{price: this.money,username: this.$store.state.userInfo.username},true).then(res=>{
						if(res.status){
							console.log("-------------->" + res.data[0]);
							var that = this;
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data[0],
								success(r) {
									// 上传打赏信息
									that.$H.get('/zf/v1/ali/statistics', {}, true).then(res => {
										// 反馈用户提示语
										that.show = true;
									})
								},
								fail(err) {
									uni.showToast({
										title: err.errMsg,
										icon: 'none',
										duration: 3000
									})
								}
							})
						}
					})
				} else {
					let order = 'app_dashang_'+ Date.now().toString().slice(-7);
					this.$H.get('/zf/v1/wx/pay?order='+order+'&money='+this.money+'&desc=房东直租_app_打赏&username='+this.$store.state.userInfo.username,{},true).then(res=>{
						if(res.status){
							console.log("-------------->" + JSON.stringify(res.data[0]));
							var that = this;
							uni.requestPayment({
							    "provider": "wxpay", 
							    "orderInfo": {
							        "appid": res.data[0].appid,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
							        "noncestr": res.data[0].nonceStr, // 随机字符串
							        "package": res.data[0].packageVal,        // 固定值
							        "partnerid": res.data[0].partnerId,      // 微信支付商户号
							        "prepayid": res.data[0].prepayId, // 统一下单订单号 
							        "timestamp": Number(res.data[0].timestamp),        // 时间戳（单位：秒）
							        "sign": res.data[0].sign // 签名，这里用的 MD5/RSA 签名
							    },
								success: function (res) {
									let data = {
										'order': order,
										'money': that.money,
										'desc': '房东直租_app_打赏',
										'username': that.$store.state.userInfo.username
									}
									// 上传打赏信息
									that.$H.get('/zf/v1/wx/statistics', data, true).then(res => {
										// 反馈用户提示语
										that.show = true;
									})
								},
								fail: function (err) {
									uni.showToast({
										title: err.errMsg,
										icon: 'none',
										duration: 3000
									})
								}
							});
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reward_main{
		height: 100vh;
		background-color: #f7f7f7;
	}
	.pay_ative{
		background: #e5f3fe !important;
		border-color: #7db5f0;
		color: #5199ff;
		border-radius: 20rpx;
	}
	.reward_info{
		width:95%;
		display: flex;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 20rpx;
		.reward_avatar{
			margin: 1rpx;
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
			margin-left: 10rpx;
		}
	}
	.reward_middle{
		width:95%;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 20rpx;
		.name{
			display: flex;
			padding: 18rpx 8rpx 18rpx 8rpx;
			border-bottom: solid 1px #ebebeb;
		}
		.price{
			display: flex;
			padding: 18rpx 8rpx 18rpx 8rpx;
		}
		.first-right{
			padding-left: 20rpx;
		}
		.second-right{
			padding-left: 20rpx;
			color: #c10000
		}
	}
	.reward_bottom{
		width:95%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin: 0 auto;
		background: #ffffff;
		margin-top: 30rpx;
		padding: 30rpx 20rpx;
		border-radius: 20rpx;
		.item{
			width:180rpx;
			height: 100rpx;
			margin-bottom: 30rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 20rpx;
			border: solid 1px #eee;
			.num{
				display: inline-block;
				font-size: 30rpx;
			}
		}
		.custom-style{
			width: 75%;
			height: 80rpx;
			background: #5199ff;
			border-radius: 20rpx;
			margin-top: 30rpx;
		}
	}
	.reward_text{
		font-size: 27rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: 60rpx;
		color: #AAAAAA;
		view{
			margin-bottom: 10rpx;
			line-height: 150%;
		}
	}
	.active_item{
		background: #e5f3fe !important;
		border-color: #7db5f0;
		color: #5199ff;
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
			padding: 10px 20px;
		}
	}
</style>