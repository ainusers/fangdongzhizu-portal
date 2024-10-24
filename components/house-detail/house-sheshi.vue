<style scoped>
	.pei_tao_she_shi{
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		margin-top: 20upx;
		justify-content: space-between;
	}
	.pei_item{
		width: 19%;
		text-align: center;
		padding: 10upx;
		border:1px solid #dcdcdc;
		border-radius: 10upx;
		margin-bottom:10rpx;
	}
	.pei_text{
		font-size: 24upx;
		color: #101D36;
		line-height: 34upx;
		margin-top: 10upx;
	}
	.isNoHas{
		color: #9e9fa3;
	}
</style>
<template>
	<view class="f_r_s pei_tao_she_shi">
		<block v-for="(item, index) in list" :key="index">
			<view class="pei_item f_c_c" >
				<uni-icons custom-prefix="iconfont" :type="item.iconUrl" size="20"></uni-icons>
				<view class="pei_text" :class="{'isNoHas':!item.isShow}">{{ item.text }}</view>
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