<style scoped lang="scss" scoped>
	.er_house_main {
		background-color: #f2f2f2
	}
	.er_house_item_con{
		width: 100%;
		display: flex;
	}
    .er_house_item{
		position: relative;
		padding: 5px;
		box-sizing: border-box;
		background: #FFFFFF;
		margin: 0 5px 5px 5px;
		border-radius: 5px;
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
		border-radius: 5px;
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
		padding: 0px 6px 0px 6px;
        box-sizing: border-box;
        width: calc(100% - 180upx);
    }
    .er_house_title{
		font-size:32upx;
		font-weight:bold;
		color:#101d36;
    overflow: hidden;  /* 隐藏超出容器的内容 */
    white-space: nowrap;  /* 防止文本换行 */
    text-overflow: ellipsis;  /* 当文本溢出时显示省略号 */
    width: 400rpx;  /* 根据需要设置容器的宽度 */
		line-height:32upx;
		margin-bottom:18upx;
		.item{
			margin-right: 20rpx;
		}
    }
    .er_house_des{
		height: 30upx;
        line-height: 30upx;
        color:#101d37;
		font-size:30upx;
        text-align: left;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
		margin-bottom: 18upx;
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
		font-size:30upx;
		margin-bottom: 18upx;
		overflow: hidden;  /* 隐藏超出容器的内容 */
		white-space: nowrap;  /* 防止文本换行 */
		text-overflow: ellipsis;  /* 当文本溢出时显示省略号 */
		width: 400rpx;  /* 根据需要设置容器的宽度 */
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
    }
	.price {
		font-weight:bold;
		color: red;
	}
	.place {
		color: #A6A6A6;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 80px;
		text-align: right;
	}
	.detail_btn{
		height:74upx;
		display: flex;
		flex-direction: row;
		.btn_item{
			display: flex;
			width:126upx;
			align-items: center;
			padding: 0upx 30upx;
			border:1px solid #1183fb;
			margin: 0upx -12upx 16upx 22upx;
			color: #1183fb;
			border-radius: 6px;
		}
	}
	.type_icon{
		display: inline-block;
		height: 40rpx;
		line-height: 40rpx;
		z-index: 20;
		border-radius: 5px;
		padding:0rpx 10rpx;
		font-weight: normal;
		background: rgba(81, 153, 255,0.7);
		color:#fff;
		font-size: 24rpx;
	}
</style>
<template>
	<view class="er_house_main">
		<view @click="homeDetail(item,index)"  class="er_house_item">
			<view class="er_house_item_con">
				<view class="er_house_img_view">
					<image mode="scaleToFill" class="er_house_img" :src="item.imgUrl.split(',')[0]" lazy-load></image>
				</view>
				<view class="er_house_cont">
					<!-- 租房类型，小区名称-->
					<view class="er_house_title">
						<view class="type_icon item">
							{{item.publishType==1?'直':'转'}}
						</view>
						<text v-if="item.roomType" class="item">{{ item.roomType.split('-')[0] }}</text>
						<text v-if=" item.communityName" class="item">{{ item.communityName }}</text>
					</view>
					
					<!-- 租房类型，两室一厅（配比），大小，楼层 -->
					<view class="er_house_des">
						<text v-if="item.homeType">{{item.homeType}}</text>
						<text v-if="item.roomType.length > 2">{{item.roomType.split('-')[1]}}</text>
						<text v-if="item.size">{{ item.size }}m² </text>
						<text v-if="item.floor">{{ item.floor }}层</text>
					</view>
					
					<!-- 地理位置：距离昌平线沙河地铁站1020米 -->
					<view class="er_house_tag_info">
						<text> {{item.distanceSubway}}</text>
					</view>
						
					<!-- 房屋价格，朝阳区，酒仙桥 -->
					<view class="er_house_price_view">
						<view class="er_house_price main_color">
							<text v-if="item.money" class="price">{{ item.money }}</text>
							<text>元/月</text>
						</view>
						<view class="place">
							<text v-if="item.area">{{item.area}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 审核意见 -->
			<view style="font-size: 26rpx;padding: 10rpx;display: block;" v-if="item.checkIdea && current==0">审核反馈： 
				<view style="color: #ff002f;display: inline-block;">{{item.checkIdea}}</view>
			</view>
		</view>
		
		<!-- 管理房源功能 -->
		<view class="detail_btn" v-if="isUpdate">
			<view class="btn_item" @click="updateHouse(item)" v-if="current==0 || current==1 || current==2">修改</view>
			<view class="btn_item" @click="removeRoom(item)" v-if="current==1">下架</view>
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
        props: ["item","index","current","homeDetailFlag"],
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
					live_time:item.liveTime|| ''
				}
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
          // 下架房源
          removeRoom(item) {
            this.$emit('updateRemoveShow', true, item)
          },
        	homeDetail(item,index) {
				this.$emit('update:homeDetailFlag', true)
				// 用户浏览统计
				let data={
					userId: this.$store.state.userInfo.id,
					roomId: item.id,
					roomUserId:item.userId
				}
				this.$H.post('/zf/v1/const/look/statistics',data,true).then(res=>{})
				// 跳转详情页
                uni.navigateTo({
                    url: `/pages/tabbar/home/homeDetail?id=${item.id}&userId=${item.userId}`
                });
        	}
        }
	}
</script>