<template>
	<view class="flex-row">
		<view class="flex-view-item">
			<view class="model">
				<image class="reasonImg" src="@/static/me/tools/quit.png"></image>
				<text class="reason">页面闪退</text>
			</view>
		</view>
		<view class="flex-view-item">
			<view class="model">
				<image class="reasonImg" src="@/static/me/tools/transform.png"></image>
				<text class="reason">传输问题</text>
			</view>
		</view>
		<view class="flex-view-item">
			<view class="model">
				<image class="reasonImg" src="@/static/me/tools/operation.png"></image>
				<text class="reason">操作体验</text>
			</view>
		</view>
		<view class="flex-view-item">
			<view class="model">
				<image class="reasonImg" src="@/static/me/tools/mei.png"></image>
				<text class="reason">界面审美</text>
			</view>
		</view>
		<view class="flex-view-item">
			<view class="model">
				<image class="reasonImg" src="@/static/me/tools/function.png"></image>
				<text class="reason">功能建议</text>
			</view>
		</view>
		<view class="flex-view-item">
			<view class="model">
				<image class="reasonImg" src="@/static/me/tools/other.png"></image>
				<text class="reason">其他反馈</text>
			</view>
		</view>
		<form bindsubmit="formSubmit">
			<view class="middle">
				<view class="record">我要反馈</view>
				<textarea name="content" class="recordContent" maxlength="500" bindinput='listenInput'
					placeholder="您想说点什么?" />
				<span class="wordwrap">{{number}}/500</span>
			</view>
			<view class="bottom">
				<view class="concact">
					<text class="way">联系方式</text>
					<text class="communication">　注：手机号/微信/QQ</text>
				</view>
				<input name="contact" class="concactContent" placeholder="请留下任一联系方式" bindinput="userNameInput" />
			</view>
			<button form-type='submit' class="commit" type="primary" plain="true">
				<text class="commitContent">提交</text>
			</button>
		</form>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				number: 0, // 已输入字数
				contact: '', // 联系方式
				content: '' // 反馈内容
			}
		},
		onLoad() {},
		onShow() {},
		onUnload() {},
		methods: {
			// 用户反馈内容提交
			formSubmit: function(e) {
				console.log(e);
			},
		}
	}
</script>

<style>
	/* pages/record/record.wxss */
	/* 反馈选项 */
	.flex-row {
		width: 100%;
		height: 26vh;
		padding-top: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.flex-view-item {
		height: 80px;
		width: 120px;
		background-color: #f8f9fd;
		border-radius: 20rpx;
	}

	.model {
		padding-left: 50rpx;
	}

	.reasonImg {
		width: 80rpx;
		height: 80rpx;
		display: block;
		padding-left: 10px;
	}

	.reason {
		color: #a5acc0;
	}

	/* 反馈内容 */
	.middle {
		height: 36vh;
		width: 100%;
	}

	.record {
		font-size: 20px;
		font-weight: 500;
		padding-bottom: 20rpx;
	}

	.recordContent {
		background-color: #f8f9fd;
		width: 100%;
		height: 87%;
		border-radius: 25rpx;
	}

	.wordwrap {
		position: absolute;
		top: 61vh;
		right: 10rpx;
	}

	/* 联系方式 */
	.bottom {
		height: 29vh;
		width: 100%;
	}

	.concact {
		padding-top: 30rpx;
		font-size: 20px;
		font-weight: 500;
		padding-bottom: 30rpx;
	}

	.communication {
		font-size: 14px;
		color: #b9bece;
	}

	.concactContent {
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		height: 120rpx;
		background-color: #f8f9fd;
		width: 100%;
		border-radius: 25rpx;
	}

	/* 按钮 */
	.commit {
		background-color: #2f7af1 !important;
	}

	.commitContent {
		color: #fff;
		border-radius: 30rpx;
	}
</style>
