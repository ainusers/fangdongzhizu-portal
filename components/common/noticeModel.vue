<template>
	<view class="main_notice">
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
	.main_notice{
		width:630rpx;
		height:710rpx;
		background: url('../../static/home/notice.png') no-repeat;
		background-size: 630rpx 710rpx;
		overflow: hidden;
		padding:100rpx 20rpx;
		font-size: 30rpx;
		letter-spacing: 3rpx;
		line-height: 200%;
		color: #5199ff;
		font-weight: bold;
		.con{
			padding: 10rpx;
			box-shadow: 3px 3px 10px #aaa;
		}
	}
</style>