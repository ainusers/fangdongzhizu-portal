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
		font-size: 26rpx;
		color: #101D36;
		line-height: 34upx;
		margin-top: 10upx;
	}
	.icon_color{
		color: #d8d9de;
	}
</style>
<template>
	<view class="f_r_s pei_tao_she_shi">
		<block v-for="(item, index) in list" :key="index">
			<view class="pei_item f_c_c" >
				<view v-if='item.isShow'>
					<uni-icons custom-prefix="iconfont" :type="item.icon" size="20" color="#000"></uni-icons>
					<view class="pei_text" :class="{'icon_color':!item.isShow}">{{ item.text }}</view>
				</view>
				<view v-if='!item.isShow'>
					<uni-icons custom-prefix="iconfont" :type="item.icon+'-dark'" size="20" color="#eee"></uni-icons>
					<view class="pei_text" :class="{'icon_color':!item.isShow}">{{ item.text }}</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		}
	}
</script>