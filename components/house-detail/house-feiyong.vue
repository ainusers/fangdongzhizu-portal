<style scoped>
	.fei_yong_xiang_qing{
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		margin-top: 15upx;
	}
	.pei_item{
		width: 20%;
		text-align: center;
		margin-bottom: 45upx;
	}
	.pei_title{
		font-size: 28rpx;
		color: #999;
		margin-bottom: 10rpx;
	}
	.pei_text{
		font-size: 28rpx;
		color: #101D36;
		line-height: 34upx;
		margin-top: 17upx;
	}
</style>
<template>
	<view class="f_r_s fei_yong_xiang_qing">
		<block v-for="(item, index) in list" :key="index">
			<view class="pei_item f_c_c">
				<view class="pei_title">{{ item.title }}</view>
				<view class="pei_text">{{ item.value }}</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",   // 费用详情 - 标题
				value: "",  // 费用详情 - 标题
			}
		},
		props: {
			list: {
				type: Array,
				default: []
			},
		}
	}
</script>