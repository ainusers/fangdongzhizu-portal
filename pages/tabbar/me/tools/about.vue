<style lang="scss">
    page{
        width: 100%;
        height: 100%;
		background-color: #f2f2f2;
    }
	.content{
		height: 91vh;
		background-color: #ffffff;
		border-radius: 10px;
		margin: 10px 10px 10px 10px;
		.top{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width:100%;
			height:80%;
			image{
				width:400rpx;
				height:400rpx;
				margin-bottom: 20rpx;
			}
		}
		.bottom{
			width:100%;
			height: 20%;
			display: flex;
			justify-content: center;
			color: #aaa;
			.text{
				.txt{
					display: flex;
					justify-content: center;
					margin-bottom: 5rpx;
				}
				.txt1{
					text-align: center;
				}
			}
			.high{
				color: red;
			}
		}
	}
	
</style>
<template>
	<view class="content">
		<view class="top">
			<image src="../../../../static/me/about.jpg" mode=""></image>
			<view>
				当前版本V1.1.0
			</view>
		</view>
		<view class="bottom">
			<view class="text">
				<view class="txt">
					<view class="high">《注册协议》</view>和<view class="high">《隐私政策》</view>归**版权所有
				</view>
				<view class="txt1">Copyright © 2014-2023 QIANXIN.COM All Rights Reserved 奇安信 </view>
			</view>
		</view>
	</view>
</template>
<script>
    export default {
        data() {
			return {}
		},
        onLoad() {},
        onShow() {},
        onUnload() {},
        methods: {}
    }
</script>