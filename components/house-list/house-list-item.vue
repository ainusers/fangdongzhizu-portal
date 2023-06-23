<style scoped lang="scss" scoped>
	.isTopHouse_view{
		position: absolute;
		bottom: 30upx;
		right: 0;
		color: #c8c8c9;
		font-size: 22upx;
		text-align: right;
	}
	.er_house_main {
		background-color: #f2f2f2
	}
    .er_house_item{
		position: relative;
		display: flex;
		align-items: center;
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
		padding: 0px 10upx 0px 10upx;
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
	.detail_btn{
		width:100%;
		height:80upx;
		display: flex;
		// margin-bottom: 20upx;
		justify-content: end;
		.btn_item{
			display: flex;
			align-items: center;
			padding: 10upx 20px;
			border:1px solid #18acf0;
			border-radius: 50upx;
			margin: 10upx;
			color: #18acf0;
		}
	}
</style>
<template>
	<view class="er_house_main">
		<view @click="homeDetail(item,index)" class="er_house_item f_r_s">
			<view class="er_house_img_view">
				<image mode="scaleToFill" class="er_house_img" :src="item.imgUrl.split(',')[0]" lazy-load></image>
			</view>
			<view class="er_house_cont">
				<!-- 租房类型，小区名称-->
				<view class="er_house_title">
					<text v-if="item.layout">{{ item.roomType.split('-')[0] }}</text>
					<text v-if=" item.communityName">{{ item.communityName }}</text>
				</view>
				<!-- 租房类型，两室一厅（配比），大小，楼层 -->
				<view class="er_house_des">
					<text v-if="item.homeType">{{item.homeType}}</text>
					<text v-if="item.rentalHouse">{{item.roomType.split('-')[1]}}</text>
					<text v-if="item.layout">{{ item.size }}m² </text>
					<text v-if="item.layout">{{ item.floor }}层</text>
				</view>
				<!-- 地理位置：距离昌平线沙河地铁站1020米 -->
				<view class="er_house_tag_info f_r_s">
					<text> {{item.distanceSubway}}</text>
				</view>
		
				<!-- 房屋价格，朝阳区，酒仙桥 -->
				<view class="er_house_price_view f_r_s">
					<view class="er_house_price main_color f_r_s">
						<text v-if="item.money" class="price">{{ item.money }}</text>
						<text>元/月</text>
					</view>
					<view class="place">
						<text v-if="item.area">{{item.area}}</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="detail_btn" v-show="isUpdate">
			<view class="btn_item" @click="updateHouse(item)" v-show="current==0">
				编辑
			</view>
			<view class="btn_item" @click="offShelf(item)" v-show="current==1">
				下架
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		name: 'house-list-item',
		data(){
			return{
				isUpdate:false
			}
		},
        computed:{},
        props: ["item","index","current"],
		onLoad() {
		},
		
        methods: {
			updateHouse(item){
				let city=''
				if(item.city==item.province){
					city='市辖区'
				}
				let houseModel={
					id:item.id,
					publishType:item.publishType,				
					province:item.province, //省
					city:item.city,//市
					area:item.area,//区，县城
					communityName:item.communityName, //小区名称
					roomName:item.roomName,//房间号
					heatType:item.heatType,//供暖方式
					homeArr:item.roommate,
					homesize:item.size,
					money:item.money.toString(),//月度租金
					mortgageMoney:item.mortgageMoney.toString(),//押金
					serviceMoney:item.serviceMoney.toString(),//服务费用
					proxyMoney:item.proxyMoney.toString(),//中介费用
					houseImageList:item.imgUrl.split(','),
					naturalImageList:item.condition.split(','),
					houseConfig: item.support,
					hasElevatorStr:item.hasElevator,
					roomType:item.roomType,//房屋类型
					lease:item.roomType,//房屋类型
					region1:item.province+'-'+item.city+'-'+item.area ,//所属区域
					payType:item.payType,//付款方式
					warmType:item.heatMoney,//取暖费用
					wirelessType:item.wifiMoney,//无线费用
					propertyType:item.manageMoney,//物业费用
					hydropowerType:item.waterElectricMoney,//水电费用
					houseConfigStr:item.support,//房屋配置
					chekcNum:item.roommate.length+1,//当前入住的有几位
					layout:item.layout, //房屋布局
					orientation:item.orientation ,//房屋朝向
					floor:item.floor, //楼层位置
					live_time:item.live_time|| ''
				}
				console.log('房源信息',houseModel)
				uni.setStorage({
					key:'houseModel',
					data:JSON.stringify(houseModel)
				})
				let currentObj={
					 //所有picker选中的内容
						warm:{
							valueName:item.heatMoney,
							valueCode:''
						},
						wireless:{
							valueName:item.wifiMoney,
							valueCode:''
						},
						property:{
							valueName:item.manageMoney,
							valueCode:''
						},
						hydropower:{
							valueName:item.waterElectricMoney,
							valueCode:''
						},
						pay:{
							valueName:item.payType,
							valueCode:''
						},
						hire:{
							valueName:'',
							valueCode:''
						},
						sex:{
							valueName:'请选择性别',
							valueCode:''
						}
				}
				uni.setStorage({
					key:'currentObj',
					data:currentObj
				})
			
				uni.navigateTo({
					url:'/pages/tabbar/publish/choice/fangyuan?isUpdate=true'
				})
			},
			offShelf(item){
				let data={
					id:item.id,
					status:3
				}
				this.$H.patch('/zf/v1/room/status',data,true).then(res=>{
					if(res.status){
						this.$emit('updateHouseList')
					}
				})
			},
        	homeDetail(item,index) {
                uni.navigateTo({
                    url: `/pages/tabbar/home/homeDetail?id=${item.id}`
                });
        	}
        },
	}
</script>