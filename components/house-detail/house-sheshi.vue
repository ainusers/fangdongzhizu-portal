<style scoped>
	.pei_tao_she_shi{
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		margin-top: 20upx;
	}
	.pei_item{
		width: 20%;
		text-align: center;
		margin-bottom: 30upx;
	}
	.pei_icon{
		width: 40upx;
		height: 40upx;
		margin: 0 auto;
	}
	.pei_text{
		font-size: 24upx;
		color: #101D36;
		line-height: 34upx;
		margin-top: 17upx;
	}
</style>
<template>
	<view class="f_r_s pei_tao_she_shi">
		<block v-for="(item, index) in list" :key="index">
			<view class="pei_item f_c_c">
				<image mode="widthFix" class="pei_icon" :src="item.iconUrl"></image>
				<view class="pei_text">{{ item.text }}</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconUrl: "",   // 标签图片路径
				tex: "",  	// 标签的中文名
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