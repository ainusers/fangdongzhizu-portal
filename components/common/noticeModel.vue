<template>
	<view class="main_notice">
		<h2>通知</h2>
		<view class="con">
			{{content}}
		</view>
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
		color: black;
	}
	.main_notice{
		width:280px;
		height:370px;
		background: url('../../static/home/notice.png') no-repeat;
		background-size: 600rpx 710rpx;
		overflow: hidden;
		padding:100rpx 20rpx 0rpx 20rpx;
		font-size: 14px;
		letter-spacing: 3rpx;
		line-height: 150%;
		color: #5199ff;
		font-weight: bold;
		.con{
			padding: 5rpx;
			box-shadow: 1px 1px 1px #eee;
		}
	}
</style>