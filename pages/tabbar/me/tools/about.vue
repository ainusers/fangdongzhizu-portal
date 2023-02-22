<style>
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
	}
	.title {
		padding: 10px 10px 0px 10px;
		font-size: 15px;
		text-align: left;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: 600;
	}
	.desc{
		padding: 10px 20px 0px 20px;
		font-size: 14px;
		font-family: Arial, Helvetica, sans-serif;
	}
	.question {
		padding: 3px;
		color:#665a5a;
		line-height: 160%;
	}
</style>
<template>
	<view class="content">
		<!-- <image src="@/static/me/tools/about.png" mode="aspectFit"></image> -->
		<u-image width="100%" height="300rpx" borderRadius="10px"  src="@/static/me/tools/about.png"></u-image>
		<view>
			<view class="title">一、软件信息</view>
			<view class="desc">
				<view class="question">软件初衷：面对面交易，拒绝中间商。</view>
				<view class="question">软件简介：房东直租，是一款以客户为中心，简洁实用的租房软件。</view>
				<view class="question">软件备注：不接广告，不做推广。</view>
			</view>
			<view class="title">二、那些故事</view>
			<view class="desc">
				<view class="question">2022年6月：下定决心</view>
				<view class="question">1. 其实萌生想法大概是在2021年1月某壳暴雷的时候，后来由于工作原因搁置了。</view>
				<view class="question">2. 虽然现在依旧很忙，但是我希望做一款真正没有套路且有用的软件。</view>
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