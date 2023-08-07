<style scope lang="scss">
.main {
	background-color: #f2f2f2;
	 // height: var(--status-bar-height);
}
.home_top {
	width: 100%;
	display: flex;
	justify-content: space-around;
}
.city {
	align-items: center;
	color: #272727;
	display: inline-flex;
	font-size: 32upx;
}
.city_icon {
	margin-left: 10upx;
	background: url(http://cdn.haofang.net/static/wxPlusApp/yjk/arr_down.png) no-repeat;
	background-size: contain;
	height: 8upx;
	width: 13upx;
}
.search {
	margin-top: 13px;
	background: url(http://cdn.haofang.net/static/uuminiapp/pageNewUi/common_icon_sprites.png) no-repeat;
	background-size: 226upx 108upx;
	height: 40upx;
	width: 40upx;
	background-position: -30upx 0;
}
.u-tab-item .u-line-1 {
	line-height: 0px!important;
}

/* 弹窗 */
.screen_fixed_list{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 99999;
	font-size: 30upx;
}
/* #ifdef H5 */
.screen_fixed_list{
	max-width: 640px;
	width: 100%;
	transform: translateX(-50%);
	left: 50%;
}
/* #endif */
.region_list_view{
	height: 70%;
	background: #FFFFFF;
	width: 100%;
	position: relative;
}
.region_scroll_left{
	width: 35%;
	height: 100%;
	background: #FFFFFF;
	box-sizing: border-box;
}
.region_scroll_right{
	width: 65%;
	height: 100%;
	background: #F8F8F9;
	padding-left: 30upx;
	box-sizing: border-box;
}
.scroll_view_list{
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	box-sizing: border-box;
	position: relative;
}
.region_scroll_right .region_list_item{
	padding-left: 0;
}
.region_list_item{
	text-align: left;
	padding-left: 30upx;
	width:100%;
	box-sizing:border-box;
	height:100upx;
	line-height:100upx;
	box-sizing: border-box;
	font-size: 30upx;
}
.screen_fixed_list .region_left_active{
	background:#fff;
	color:#ab7f2e;
}
.price_scroll_list .screen_active{
	color:#ab7f2e;
	border: none;
	color:#ab7f2e;
}
.region_scroll_right .screen_active{
	background: #F8F8F9;
	border: none;
	color:#ab7f2e;
}
.region_new_cont .screen_active{
	background: #ffd900;
}
.room_list_view{
	width: 100%;
}
/* 更多 */
.more_list_cont{
	padding-left: 30upx;
	box-sizing: border-box;
	padding-bottom: 190upx;
}
.more_list{
/* border-bottom:1px solid #f3f3f3; */
}
.more_title{
	height:90upx;
	line-height:90upx;
	color:#2d2c2c;
	letter-spacing:1upx;
	font-family:'黑体';
	font-size:36upx;
	font-weight:600;
}
.more_cont{
	flex-wrap: wrap;
	display: flex;
	flex-direction: row;
}
.more_item{
	width:150upx;
	height:62upx;
	background:#f2f2f2;
	line-height:62upx;
	text-align:center;
	color:#101d36;
	border-radius:6upx;
	font-size:26upx;
	margin-right:20upx;
	margin-bottom:20upx;
	letter-spacing:1px;
	box-sizing:border-box;
}
.more_list .more_item_active{
	background:#ffd900;
}
.more_btn_view{
	width:100%;
	height:156upx;
	position:absolute;
	bottom:0;
	align-items:center;
	background:#ffffff;
	z-index:99;
	padding:0 39upx 0 39upx;
	box-sizing:border-box;
}
.more_btn_view view{
	width:48%;
	height:80upx;
	border-radius:6upx;
	background:#f1f3f6;
	text-align:center;
	line-height:85upx;
	font-size:30upx;
	letter-spacing:10upx;
	border-radius:40upx;
}
.more_btn_view .confirmBtn{
	background:-webkit-linear-gradient(left, #ffd900 , rgb(255,84,0));
	color:#fff;
}
.region_new_title{
	font-size:36upx;
	font-weight:600;
	color:#101d36;
	margin-top:20upx;
	padding-left: 30upx;
	box-sizing: border-box;
	margin-bottom: -10upx;
}
.region_new_list_item{
	width:150upx;
	height:62upx;
	background-color:#f2f2f2;
	border-radius:6upx;
	float:left;
	margin-right:23upx;
	text-align:center;
	line-height:62upx;
	color:#101d36;
	font-size:24upx;
	margin-top:24upx;
}
.region_new_cont{
	padding-left: 30upx;
	box-sizing: border-box;
	flex-wrap: wrap;
}
.room_new_btn_view{
	display:flex;
	justify-content:space-between;
	width:100%;
	height:156upx;
	position:absolute;
	bottom:0;
	align-items:center;
	background:#ffffff;
	z-index:99;
	padding:0 39upx 0 39upx;
	box-sizing:border-box;
}
.room_new_btn_view view, .room_new_btn_view view, .room_new_btn_view button{
	width:48%;
	height:80upx;
	border-radius:40upx;
	background:#f1f3f6;
	text-align:center;
	line-height:85upx;
	letter-spacing:10upx;
	font-size:30upx;
}
.room_new_btn_view .room_new_btn_confirm{
	background:-webkit-linear-gradient(left, #ffd900 , rgb(255,84,0));
	color:#fff;
}
.screen_view .price_scroll_list{
	padding-bottom: 140upx;
	box-sizing: border-box;
}
.price_bottom_view{
	position:absolute;
	bottom: 0;
	left: 0;
	height:140upx;
	width:100%;
	box-sizing:border-box;
	padding:0 40upx 0;
	background-color:#ffffff;
}
.price_bottom_view .price_input_val{
	width:160upx;
	height:60upx;
	line-height: 60upx;
	text-align:center;
	border:1px solid #cccccc;
	border-radius:6upx;
	font-size:24upx;
	margin: auto 0;
}
.price_bottom_view .price_input_val:last-child{
	margin-left: 50upx;
}
.f_r_s {
	display: flex;
	flex-direction: row;
}
.price_bottom_confirm{
	width:200upx;
	height:74upx;
	background-image:linear-gradient(246deg, #ffd900 0%, #ff8400 100%), linear-gradient( #eeeff5, #eeeff5);
	border-radius:37upx;
	color:#ffffff;
	font-size:28upx;
	line-height:74upx;
	text-align:center;
	margin: auto 0;
}
/* 新房价格切换 */
.new_house_price_change_view{
	width: 28%;
	flex-shrink: 0;
	background: #FFFFFF;
}
.new_house_price_change_view>view{
	text-align: center;
	line-height: 100upx;
}
.new_house_price_change_view>.new_price_tab_active{
	color: #ab7f2e;
}
.scroll-view-height {
	/* 页面高度减去包含状态栏、标题、tab组件的高度 */
	height: calc(100vh - var(--status-bar-height) - 88rpx);
	background-color: #ffffff;
}
</style>
<template>
	<view class="main">
		<!-- 顶部区域 -->
		<view class="home_top">
		  <!-- 城市 -->
		  <view class="city" @click.stop="chooseCity">
		    <view>{{ cityName }}</view>
		    <view class="city_icon"></view>
		  </view>
		  <!-- 选项卡 -->
		  <view class="type">
			  <!-- tabs -->
			  <u-tabs :list="tabList" barWidth="50" gutter="10" font-size="30" bg-color="#f2f2f2" :current="current" @change="tabChange"></u-tabs>
		  </view>
		  <view></view>
		  <!-- 搜索按钮 -->
		  <view class="search" @click.stop="searchBtn"></view>
		</view>
		
		<!-- 内容区域 -->
		<screenTab :screenFormData="screenFormData" :listTcShow="listTcShow" :priceApiDataMap="priceApiDataMap" :from="from" @screenBtn="screenBtn" :fixedContHeight="fixedContHeight" :fixedTcTop="fixedTcTop" :currentClickType="currentClickType" :contHeight="contHeight" :regionLeftList="regionLeftList" :regionRightMap="regionRightMap" :enterType="enterType"></screenTab>
		<swiper class="scroll-view-height" @change="swipeIndex" :current="current" :duration="300">
		
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 0">
						<!-- 内容区域 -->
						<view class="content">
							<!-- 租房列表 -->
						    <block v-for="(item, index) in houseList" :key="index">
								<house-list-item :item="item"></house-list-item>
						    </block>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 1">我是第1页
					<view class="content">
						<!-- 租房列表 -->
					    <block v-for="(item, index) in houseList" :key="index">
							<house-list-item :item="item"></house-list-item>
					    </block>
					</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 2">我是第2页
					<view class="content">
						<!-- 租房列表 -->
					    <block v-for="(item, index) in houseList" :key="index">
							<house-list-item :item="item"></house-list-item>
					    </block>
					</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
import houseListItem from '@/components/house-list/house-list-item.vue';
import screenTab from '@/components/common/screen-tab/screen-tab.vue'
import { Const } from "@/utils/const/Const.js";
let privateData = {
	room: {
		height: ""
	},
	price: {
		height: ""
	},
	more: {
		height: ""
	},
	region: {
		height: ""
	}
};
export default {
	components: {
		houseListItem,
		screenTab
	},
	data() {
		return {
			houseList: [{
							"houseImg":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwh.28life.com%2Fupload_img%2F2017%2F12%2F28%2Fu_13247643007%2F151447815522.jpg&refer=http%3A%2F%2Fwh.28life.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664629331&t=ebfd7014b06a3b28c2dd7c4290093271",
							"community":"松兰铺",
							"whoCommunity":"圣龙家园",
							"orientation":"朝南",
							"bedroom":"主卧",
							"mode":"整租",
							"layout":"四室一厅一厨一卫",
							"heating":"集中供暖",
							"elevator":"无电梯",
							"size":"23m²",
							"floor":"2/3层",
							"way":"季付",
							"datetime":"2022-09-22 21:54",
							"position":"距离昌平线沙河地铁站1020米",
							"price":"2300",
							"region":"昌平",
							"subway":"沙河"},
						{
							"houseImg":"https://img1.baidu.com/it/u=3942334258,820952260&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=344",
							"community":"兰亭新苑",
							"whoCommunity":"三区",
							"orientation":"朝南",
							"bedroom":"次臥",
							"mode":"合租",
							"layout":"三室一厅一厨一卫",
							"heating":"自供暖",
							"elevator":"有电梯",
							"size":"16m²",
							"floor":"16/27层",
							"way":"月付",
							"datetime":"2022-09-22 21:54",
							"position":"距离10号线劲松地铁站950米",
							"price":"1800",
							"region":"朝阳",
							"subway":"酒仙桥"},
						{
							"houseImg":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwh.28life.com%2Fupload_img%2F2017%2F12%2F28%2Fu_13247643007%2F151447815522.jpg&refer=http%3A%2F%2Fwh.28life.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664629331&t=ebfd7014b06a3b28c2dd7c4290093271",
							"community":"松兰铺",
							"whoCommunity":"圣龙家园",
							"orientation":"朝南",
							"bedroom":"主卧",
							"mode":"整租",
							"layout":"一室一厅一厨一卫",
							"heating":"自供暖",
							"size":"23m²",
							"floor":"2/3层",
							"elevator":"无电梯",
							"way":"年付",
							"datetime":"2022-09-22 21:54",
							"position":"距离昌平线沙河地铁站1020米",
							"price":"2300",
							"region":"昌平",
							"subway":"沙河"}
						],
			cityName: "北京",
			current: 0,
			tabList: [
				{
					name: '转租'
				},
				{
					name: '直租'
				},
				{
					name: '换租'
				}
			],
			fixedContHeight: "100%", // 弹窗的高度
			isRequestIng: false,
			screenFormData: {
			    erHouse: {
			        region: {
			            text: "区域",
			            leftText: "区域",
			            leftId: "",
			            show: false,
			            rightId: "",
			            key_1: "regionId",
			            key_2: "sectionId"
			        },
			        price: {
			            text: "价格",
			            id: "",
			            show: false,
			            key: "price"
			        },
			        room: {
			            text: "户型",
			            id: "",
			            show: false,
			            key: "room"
			        },
			        more: {
			            text: "更多",
			            id: "",
			            show: false,
			            key: "more"
			        },
			        source: {
			            text: "来源",
			            id: "",
			            key: "reSource"
			        },
			        area: {
			            text: "面积",
			            id: "",
			            key: "area"
			        }
			    }
			},
			
			// 区域筛选
			regionLeftList: [],
			regionRightMap: {},
			regionLeftIndex: 0,
			regionRightIndex: 0,
			
			// 二手房价格
			erHousePriceList: [],
			erHousePriceIndex: 0,
			
			// 户型筛选
			roomList: Const.roomList,
			roomListIndex: 0,
			
			// 来源
			sourceLsit: Const.sourceLsit,
			sourceLsitIndex: -1,
			
			// 面积
			areaLsit: Const.areaList,
			areaLsitIndex: -1,
			
			// 公寓出租方式
			aparmentChuZuTypeList: Const.aparmentChuZuTypeList,
			aparmentChuZuTypeListIndex: 0,
			
			// 公寓更多
			aparmentMoreMap: {
				ruZhuTime: {
					list: Const.aparmentRuZhuTimeList,
					index: -1
				},
				room: {
					list: Const.apartmentRoomList,
					index: -1
				},
				area: {
					list: Const.apartmentAreaList,
					index: -1
				},
				sex: {
					list: Const.aparmentSexList,
					index: -1
				},
				specail: {
					list: Const.apartmentSpecialList,
					index: -1
				}
			},
			
			
			listTcShow: false,
			currentClickType: "region",
			
			fixedTcTop: "43px",   // 筛选条件距离顶部高度
			contHeight: "50%",   // 筛选条件高度
			
			
			roomItem: {text:"不限", id: ""},
			priceItem: {text:"不限", id: ""},
			newHouseTypeItem: {text:"不限", id: ""},
			aparmentChuZuTypeItem: {text:"不限", id: ""},
			
			// 价格输入
			minPriceVal: "",
			maxPriceVal: "",
			
			cityId: "1",
			
			// 价格列表的map
			priceApiDataMap: {
				"erHouse": {
					apiKey: "SALE_PRICE_DATA",
					unit: "万",
					defaultText: "价格"
				},
				"lease": {
					apiKey: "LEASE_PRICE_DATA",
					unit: "元",
					defaultText: "租金"
				},
				"newHouse": {
					apiKey: "NEW_HOUSE_PRICE",
					unit: "万",
					defaultText: "价格"
				},
				"apartment": {
					apiKey: "APARTMENT_PRICE_DATA",
					unit: "元",
					defaultText: "租金"
				}
			}
		};
	},
	props: {
		enterType: {
			type: String,
			default: "erHouse"
		},
		from: {
			type: String,
			default: "erHouse"
		},
	    regId: {
	        type: String,
	        default: ""
		},
	    city: {
	        type: String,
	        default: ""
	    }
	},
	onLoad() {},
	methods: {
		// 获取选择城市返回的城市名称
		getValue(cityNameLess){
			this.cityName = cityNameLess;
		},
		// 获得swiper切换后的current索引
		swipeIndex(index) {
			this.current = index.detail.current
		},
		// 切换选项卡
		tabChange(index) {
			this.current = index;
		},
		// 搜索
		searchBtn() {
		  uni.navigateTo({
		    url: "/pagesHouse/search/search?from=index"
		  });
		},
		// 选择城市
		chooseCity() {
		  uni.navigateTo({
		    url: "/pages/tabbar/home/chooseCity"
		  });
		},
		// 点击外部空白区域，弹窗关闭
		screenClose() {
		    this.listTcShow = false;
		    let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		    let moreIds = ["source", "area"];
		    for(let key in (screenFormData[enterType] || {})) {
		        let item = screenFormData[enterType][key];
		        if(key === "region" && !item.rightId) {
		            screenFormData[enterType][key].show = false;
		            continue;
		        }
		        if(key === "more") {
		            let moreNotIdNum = 0;
		            for(let i = 0;i<moreIds.length;i++) {
		                if(!screenFormData[enterType][moreIds[i]].id) {
		                    moreNotIdNum++;
		                }
		            }
		            if(moreNotIdNum === moreIds.length) {
		                screenFormData[enterType][key].show = false;
		                screenFormData[enterType][key].text = "更多";
		            }
		            continue;
		        }
		        if(!item.rightId) {
		            screenFormData[enterType][key].show = false;
		        }
		    }
		    this.screenFormData = screenFormData;
		},
		// 选项卡点击事件
		screenContBtn() {},
		// 选项卡点击 - 弹出div
		screenBtn(type) {
			// this.setTabNodeInfo();
		    this.currentClickType = type;
			let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		    if(!screenFormData[enterType][type]) {
		        throw new Error("参数配置错误，请检查screenFormData中是否有对应的key");
		    }
		
		    // this.setContHeight();
		    screenFormData[enterType][type].show = !screenFormData[enterType][type].show;
		    for(let key in screenFormData[enterType]) {
		        if(screenFormData[enterType][key].show !== undefined && key !== type) {
		            screenFormData[enterType][key].show = false;
		        }
		    }
		    this.listTcShow = screenFormData[enterType][type].show;
		    // new Notification().postNotification(Notify.ScreenShowChanged.Name
		    //     , this.listTcShow);
		    // this.screenFormData = screenFormData;
		},
		// 价格选项卡
		minPriceBlur(e) {
			this.minPriceVal = e.detail.value;
		},
		maxPriceBlur(e) {
			this.maxPriceVal = e.detail.value;
		},
		// 价格选择
		priceBtn(item, index, isInput = false) {
			if(!isInput) {
				this.minPriceVal = "";
				this.maxPriceVal = "";
			}
			this.priceItem = item;
		    let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		    screenFormData[enterType].price.id = item.id;
		    screenFormData[enterType].price.show = false;
		    screenFormData[enterType].price.text = item.text;
		    if(!item.id) {
		        screenFormData[enterType].price.text = this.priceApiDataMap[this.from].defaultText;
		    }
		    this.listTcShow = false;
		    this.erHousePriceIndex = index;
		    this.screenFormData = screenFormData;
		},
		confirmPrice() {
			if(!this.minPriceVal || !this.maxPriceVal) {
				uni.showToast({
					title: "请输入价格",
					icon: "none"
				});
				return;
			}
		
			let unitText = "价格";
			let priceUnit = "";
			if(this.enterType == "newHouse" && this.newHousePriceTabIndex == 1) {
				unitText = "总价";
				priceUnit = "万";
			}
			if(this.enterType == "newHouse" && this.newHousePriceTabIndex == 0) {
				unitText = "均价";
				priceUnit = "元";
			}
			if(Number(this.minPriceVal) > Number(this.maxPriceVal)) {
				uni.showToast({
					title: `最高${unitText}应该大于最低${unitText}`,
					icon: "none"
				});
				return;
			}
			if(this.enterType == "newHouse") {
				this.newHousePriceBtn({text: `${this.minPriceVal}-${this.maxPriceVal}${priceUnit}`,
					id: `${this.minPriceVal}:${this.maxPriceVal}`}, -1, true);
			}else{
				this.priceBtn({text: `${this.minPriceVal}-${this.maxPriceVal}${this.priceApiDataMap[this.from].unit}`,
					id: `${this.minPriceVal}:${this.maxPriceVal}`}, -1, true);
			}
		},
		// 户型选项卡
		roomBtn(item, index) {
			this.roomItem = item;
		    let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		    screenFormData[enterType].room.id = item.id;
		    screenFormData[enterType].room.show = false;
		    screenFormData[enterType].room.text = item.text;
		    if(!item.id) {
		        screenFormData[enterType].room.text = "户型";
		    }
		    this.listTcShow = false;
		    this.roomListIndex = index;
		    this.screenFormData = screenFormData;
		},
		// 更多选项卡 - 选中来源
		sourceBtn(item, index) {
		    let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		    if (this.sourceLsitIndex === index) {
		        this.sourceLsitIndex = -1;
		        screenFormData[enterType].source.id = "";
		        screenFormData[enterType].source.text = "来源";
		        return;
		    }
		    this.sourceLsitIndex = index;
		    screenFormData[enterType].source.id = item.id;
		    screenFormData[enterType].source.text = item.text;
		},
		// 更多选项卡 - 选中面积
		areaBtn(item, index) {
		    let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		    if (this.areaLsitIndex === index) {
		        this.areaLsitIndex = -1;
		        screenFormData[enterType].area.id = "";
		        screenFormData[enterType].area.text = "面积";
		        return;
		    }
		    this.areaLsitIndex = index;
		    screenFormData[enterType].area.id = item.id;
		    screenFormData[enterType].area.text = item.text;
		},
		// 更多选项卡 - 确定按钮
		confirmBtn() {
		    let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		    screenFormData[enterType].more.text = "更多 ";
		    screenFormData[enterType].more.show = false;
		    let ids = ["source", "area"];
			if(enterType == 'apartment') {
				ids = ["ruZhuTime","room","area","sex","specail"];
			}
		    let emptyNum = 0;
		    for(let i = 0;i<ids.length;i++) {
		        if(!screenFormData[enterType][ids[i]].id) {
		            emptyNum++;
		        }
		    }
		    if(ids.length === emptyNum) {
		        screenFormData[enterType].more.text = "更多";
		    }
		    this.screenFormData = screenFormData;
		    this.listTcShow = false;
		},
		// 更多选项卡 - 重置按钮
		resetBtn() {
		    let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		
		    screenFormData[enterType].more.text = "更多";
		    screenFormData[enterType].more.show = true;
		
		    this.areaLsitIndex = -1;
		    screenFormData[enterType].area.id = "";
		    screenFormData[enterType].area.text = "面积";
		
		    this.sourceLsitIndex = -1;
		    screenFormData[enterType].source.id = "";
		    screenFormData[enterType].source.text = "来源";
		
		    this.screenFormData = screenFormData;
		},
	}
}
</script>