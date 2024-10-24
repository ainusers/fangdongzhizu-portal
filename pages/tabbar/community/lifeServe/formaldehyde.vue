<template>
	<view class="main">
		<image class="jq_ldy_main" src="http://43.143.148.105:9090/remote/fangdongzhizu/jq-ldy.png"></image>
		<view class="contact">
			<u-button class="jq_ldy_phone" shape="square" @click="report" :throttleTime="3000">立即沟通</u-button>
		</view>
	</view>
</template>
<script>
	export default{
	methods:{
		report(){
			uni.makePhoneCall({
				phoneNumber: '15711058934'
			})
			// 用户审计埋点
			this.saveThirdServer();
		},
		// 保存登录人的设备
		async saveThirdServer() {
			let params = {
				"userId": this.$store.state.userInfo.id,
				"name": '空气净化(除甲醛)'
			}
			this.$H.post('/zf/v1/const/third/server', params, true).then(res => {})
		}
	}
}
</script>
	<style lang="scss" scoped>
	.jq_ldy_main {
		width:100%;
		height: 1500px;
	}
	.contact {
		padding: 5px 0 30px;
		.jq_ldy_phone {
			width: 90%;
			color: #fff;
			background: #cf1a17;
		}
	}
</style>