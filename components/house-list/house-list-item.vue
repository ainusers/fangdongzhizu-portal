<style>
	.isTopHouse_view{
		position: absolute;
		bottom: 30upx;
		right: 0;
		color: #c8c8c9;
		font-size: 22upx;
		text-align: right;
	}
    .er_house_item{
        padding: 10upx 10upx 10upx 10upx;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 2upx solid #F5F5F5;
    }
    .er_house_img_view{
        position: relative;
        width:300upx;
        height:180upx;
        flex-shrink: 0;
		background:#fafafa url(http://cdn.haofang.net/static/wxPlusApp/yjk/house/house_list_default.png) no-repeat center center;
		background-size:cover;
		border-radius: 4upx;
		box-sizing: border-box;
    }
    .er_house_img{
        width: 100%;
        height: 100%;
    }
    .vr_img{
		position: absolute;
		left: 20upx;
		bottom: 10upx;
		z-index: 20;
		background:url(http://cdn.haofang.net/static/uuminiapp/pageNewUi/house_list_sprites.png)  no-repeat;
		background-size: 179px 24px;
		height: 28px;
		width: 25px;
		background-position: -39px 0;
    }
    .big_video_img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 20;
		background:url(http://cdn.haofang.net/static/uuminiapp/pageNewUi/house_list_sprites.png)  no-repeat;
		background-size: 179px 24px;
		height: 28px;
		width: 25px;
		background-position:-17px 0;
    }
    .small_video_img{
        position: absolute;
        left: 20upx;
        bottom: 10upx;
        z-index: 20;
		background:url(http://cdn.haofang.net/static/uuminiapp/pageNewUi/house_list_sprites.png)  no-repeat;
		background-size: 179px 24px;
		height: 28px;
		width: 25px;
		background-position:-15px 0;
    }

    .er_house_cont{
		padding: 0px 20upx 0px 20upx;
        box-sizing: border-box;
        width: calc(100% - 180upx);
    }
    .er_house_title{
		width:100%;
		font-size:32upx;
		font-weight:bold;
		color:#101d36;
		line-height:42upx;
		margin-bottom:12upx;
		overflow:hidden;
		word-wrap:break-word;
		word-break:break-all;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		margin-top: -4upx;
		display: flex;
		justify-content: space-between;
    }
    .er_house_des{
		height: 30upx;
        font-size:26upx;
        line-height: 30upx;
        color:#101d37;
		font-size: 26upx;
        text-align: left;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
		margin-bottom: 15upx;
    }
	.er_house_des text{
		color:#101d37;
	}
	.er_house_des text::after{
		content: "|";
		font-size: 16upx;
		color: #babfc5;
		margin-left: 10upx;
		margin-right: 10upx;
		position: relative;
		top: -2upx;
	}
	.er_house_des text:last-child::after{
		content: ''
	}
    .er_house_tag_info{
		overflow: hidden;
		margin-bottom: 15upx;
    }
	.er_house_tag_view{
		flex-wrap: wrap;
	}
    .er_house_true {
		margin: auto 10upx auto 0;
		flex-shrink: 0;
		background:url('http://cdn.haofang.net/static/wxPlusApp/yjk/home/true_house.png')  no-repeat center;
		background-size: contain;
		height: 30upx;
		width: 96upx;
    }
    .er_house_tag_info .er_house_tag:nth-of-type(4n+1){
        color: #18acf0;
        background: #ddf3fd;
    }
    .er_house_tag_info .er_house_tag:nth-of-type(4n+2){
        color: #ff9600;
        background: #fff1dc;
    }
    .er_house_tag_info .er_house_tag:nth-of-type(4n+3){
        color: #f3685f;
        background: #fde8e7;
    }
    .er_house_tag_info .er_house_tag:nth-of-type(4n+4){
        color: #1bc964;
        background: #ddf7e8;
    }
    .er_house_tag{
        white-space: nowrap;
		font-size:22upx;
		display:flex;
		flex-direction: column;
		justify-content: center;
		color:#7991a6 !important;
		background:#edf0f3 !important;
		padding:0 6upx;
		border-radius:2upx;
		margin-right:10upx;
		box-sizing: border-box;
    }
	/* #ifdef MP-BAIDU */
	.er_house_tag{
		border-radius:0.5vw!important;
	}
	/* #endif */
    /* #ifdef MP-ALIPAY*/
    .er_house_tag{
        padding:0 6upx !important;
    }
    /* #endif */
    .er_house_price_view{
		line-height:30upx;
		height: 30upx;
		display: flex;
		justify-content: space-between;
    }
    .er_house_price{
        font-size:30upx;
        margin-right: 20upx;
    }
	.price {
		font-weight:bold;
		color: red;
	}
	.place {
		color: #A6A6A6;
	}
</style>
<template>
	<view @click="homeDetail(item)" class="er_house_item f_r_s">
		<view class="er_house_img_view">
			<image mode="aspectFill" class="er_house_img" :src="item.houseImg" lazy-load></image>
		</view>

		<view class="er_house_cont">
			<!-- 兰亭新苑 三区 朝向 主卧-->
			<view class="er_house_title">
				<text v-if="item.mode">{{ item.mode }}</text>
				<text v-if="item.whoCommunity">{{ item.community }}{{ item.whoCommunity }}</text>
				<text v-if="item.orientation">{{ item.orientation }}</text>
			</view>

			<!-- 租房类型，两室一厅（配比），大小，楼层 -->
			<view class="er_house_des">
				<text v-if="item.bedroom">{{ item.bedroom }}</text>
				<text v-if="item.matche">{{ item.matche }}</text>
				<text v-if="item.size">{{ item.size }}</text>
				<text v-if="item.floor">{{ item.floor }}</text>
			</view>

			<!-- 地理位置：距离昌平线沙河地铁站1020米 -->
			<view class="er_house_tag_info f_r_s">
				<text v-if="item.position">{{ item.position }}</text>
			</view>

			<!-- 房屋价格，朝阳区，酒仙桥 -->
			<view class="er_house_price_view f_r_s">
				<view class="er_house_price main_color f_r_s">
					<text v-if="item.price" class="price">{{ item.price }}</text>
					<text>元/月</text>
				</view>
				<view class="place">
					<text v-if="item.region">{{ item.region }}</text>
					<text v-if="item.subway">{{ item.subway }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'house-list-item',
        computed:{},
        props: ["item"],
        methods: {
        	homeDetail(item) {
				console.log("----> " + JSON.stringify(item))
                uni.navigateTo({
                    url: `./homeDetail?detail=${encodeURIComponent(JSON.stringify(item))}`
                });
        	}
        },
	}
</script>