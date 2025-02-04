<template>
	<view class="post-item">
		<view class="post-item-top-user">
			<view class="avatar-img">
				<u-avatar class="avatar" src="../../static/me/avtar.png" level-bg-color="#8072f3"></u-avatar>
			</view>
			<view class="center">
				<view style="display:flex;align-items: center;justify-content: space-between;background: #eee;width:80%;height:40rpx">
					<text class="nickname"></text>
					<view style="float: right;padding-right: 10px;font-size: 18px;" @click.stop.prevent="goReport(index,$event)"></view>
				</view>
				<view style="background: #eee;width:30%;height:20rpx;margin-top: 20rpx;">
					<text class="time"></text>
					<block>
						<text class="city"></text>
					</block>
				</view>
			</view>
		</view>
		<view class="post-content">
			<view style="height: 40rpx;width: 90%;background: #eee;margin-bottom: 10rpx;"></view>
			<view style="height: 600rpx;width: 100%;background: #eee;border-radius: 5px;margin-bottom:20rpx;"></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.post-item-top-user {
		display: flex;
		align-items: center;
		.center {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 24rpx;
			color: #999;
			margin-top: -16rpx;
			margin-left: 10rpx;
		}
	}
</style>