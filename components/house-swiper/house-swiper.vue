<style scoped>
    .swiper_view{
        position:relative;
        width:100%;
		height: 400upx;
        background:url(http://cdn.haofang.net/static/wxPlusApp/yjk/house/house_detail_default.png) no-repeat center center;
        background-size:60%;
        background-color:#F7F7F9;
    }
    .swiper_box,.swiper_item,.swiper_img{
        width: 100%;
        height: 100%;
    }
    .page_view{
        position:absolute;
        bottom:18upx;
        right:20upx;
        display:flex;
        padding:8upx 20upx;
		box-sizing: border-box;
        border-radius:18upx;
		will-change: transform;
        color:#fff;
        text-align:center;
        font-size:22upx;
        justify-content:center;
        align-items:center;
        z-index:100;
        background:rgba(0,0,0,.7);
    }
</style>
<template>
	<view class="swiper_view">
		<!-- 图片滚动区域 -->
		<swiper @change="swiperChange" class="swiper_box" :current="swiperIndex">
			<block v-for="(item, index) of list" :key="index">
				<swiper-item class="swiper_item">
					<image @tap.stop="previewImage(item.url, item.urls)"
					mode="scaleToFill" class="swiper_img" :src="item.url"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 展示图片个数 -->
		<view v-if="swiperIndex - otherNum >= 0 && imgNum > 0"
			class="page_view"> {{ swiperIndex - otherNum + 1 }}/{{ imgNum }} </view>
		</view>
	</view>
</template>

<script>
    export class HouseSwiperItem {
        url = "";	// 房源图片路径
        type = "";	// 目前只支持image
    }
	export default {
		data() {
			return {
				swiperIndex: 0,
                hasImg: false,
                currenClickType: "",
                imgNum: 1,
                otherNum: 1
			}
		},
        props: {
            list: {
                type: Array,
                default: []
            }
        },
        mounted() {
        	this.imgCount();
        },
        methods: {
			// 切换图片
        	swiperChange(e) {
                if(e.detail.source) {
                    this.swiperIndex = e.detail.current;
                    this.currenClickType = this.list[e.detail.current].type;
                }
        	},
			// 图片计数
            imgCount() {
                this.hasImg = false;
                let imgNum = 0;
                let otherNum = 0;
                this.list.map((val,index) => {
                    if(index === 0) {
                       this.currenClickType = val.type;
                    }
                    if(val.type === "img") {
                       this.hasImg = true;
                       imgNum++;
                    }
                });
                this.imgNum = imgNum;
                this.otherNum = otherNum;
            },
			// 预览图片
			previewImage(url, urls) {
				uni.previewImage({
					current: url,
					urls: urls
				})
			},
        }
	}
</script>