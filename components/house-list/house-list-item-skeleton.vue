<style scoped lang="scss" scoped>
	.er_house_main {
		background-color: #f2f2f2
	}
	.er_house_item_con{
		display: flex;
	}
    .er_house_item{
		position: relative;
        padding: 0px 0px 5px 5px;
        box-sizing: border-box;
        background: #FFFFFF;
		margin: 0px 0px 5px 0px;
		padding-top: 0;
		border-bottom: 20rpx solid #f2f2f2;
    }
    .er_house_img_view{
        position: relative;
        width:300upx;
        height:200upx;
        flex-shrink: 0;
		background:#f2f2f2 url(http://cdn.haofang.net/static/wxPlusApp/yjk/house/house_list_default.png) no-repeat center center;
		background-size:cover;
		border-radius: 4upx;
		box-sizing: border-box;
    }
    .er_house_img{
        width: 100%;
        height: 100%;
    }
    .er_house_cont{
		padding: 0px 6px 0px 6px;
        box-sizing: border-box;
        width: calc(100% - 180upx);
    }
    .er_house_title{
		width:100%;
		line-height:42upx;
		background: #eee;
    }
    .er_house_des{
		height: 30upx;
		background: #eee;
    }
    .er_house_tag_info{
		margin-top: 10rpx;
		height:30rpx;
		background: #eee;
		width:80%
    }
    .er_house_price_view{
		line-height:30upx;
		height: 30upx;
		justify-content: space-between;
    }
    .er_house_price{
		height:30rpx;
		background: #eee;
		width:80%;
		margin-top: 20rpx;
    }
	.place {
		height:30rpx;
		background: #eee;
		width:30%;
		margin-top: 20rpx;
	}
</style>
<template>
	<view class="er_house_main">
		<view   class="er_house_item f_r_s">
			<view class="er_house_item_con">
				<view class="er_house_img_view"></view>
				<view class="er_house_cont">
					<!-- 租房类型，小区名称-->
					<view class="er_house_title"></view>
					<!-- 租房类型，两室一厅（配比），大小，楼层 -->
					<view class="er_house_des"></view>
					<!-- 地理位置：距离昌平线沙河地铁站1020米 -->
					<view class="er_house_tag_info f_r_s"></view>
					<!-- 房屋价格，朝阳区，酒仙桥 -->
					<view class="er_house_price_view f_r_s">
						<view class="er_house_price main_color f_r_s"></view>
						<view class="place"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'house-list-item',
		data(){
			return{}
		},
        computed:{},
		onLoad() {},
        methods: {},
	}
</script>