<style scoped>
	.pei_tao_she_shi{
		box-sizing: border-box;
		margin-top: 20upx;
		flex-direction: column;
	}
	.pei_item{
		width: 100%;
		text-align: center;
		margin-bottom: 30upx;
		display: flex;
	}
	.pei_icon{
		width: 40upx;
		height: 40upx;
		margin: 0 auto;
	}
	.pei_text{
		width: 20%;
		font-size: 24upx;
		color: #101D36;
		line-height: 34upx;
		text-align: center;
	}
</style>
<template>
	<view class="f_r_s pei_tao_she_shi">
		<block v-for="(item, index) in list" :key="index">
			<view class="pei_item f_c_c">
				<view class="pei_text">{{ item.house }}</view>
				<view class="pei_text">{{ item.sex }}</view>
				<view class="pei_text">{{ item.size }}</view>
				<view class="pei_text">{{ item.money }}</view>
				<view class="pei_text">{{ item.status }}</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconUrl: "",   // 标签图片路径
				tex: "",  	   // 标签的中文名
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