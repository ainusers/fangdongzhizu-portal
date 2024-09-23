<template>
	<view class="main">
		<image class="jq_ldy_main" src="/static/community/function/jq-ldy.png"></image>
		<view class="contact">
		<u-button class="jq_ldy_phone" shape="square" @click="report">立即沟通</u-button>
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