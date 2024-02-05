<template>
	<view class="main_notice">
		<h2>通知</h2>
		<view class="con" v-html="content"></view>
	</view>
</template>

<script>
	export default{
		props:['content']
	}
</script>

<style>
	h2{
		position: absolute;
		top: 15px;
		left: 40%;
	}
	.main_notice{
		width:280px;
		height:370px;
		background: url('../../static/home/notice.png') no-repeat;
		background-size: 280px 400px;
		overflow: hidden;
		padding: 40px 15px 0px 15px;
		font-size: 14px;
		letter-spacing: 3rpx;
		line-height: 150%;
		color: #5199ff;
		font-weight: bold;
		.con{
			padding: 5rpx;
			/* box-shadow: 1px 1px 1px #eee; */
		}
	}
</style>