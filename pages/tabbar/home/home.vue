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
.f_r_s {
	display: flex;
	flex-direction: row;
}

.home_nodata{
	text-align: center;
	color:#aaa;
	padding: 10upx 0;
}
.scroll-view-height {
	/* 页面高度减去包含状态栏、标题、tab组件的高度 */
	height: calc(100vh - var(--status-bar-height) - 88rpx);
	background-color: #ffffff;
}
.list-content{
	height: calc(100vh - var(--status-bar-height) - 88rpx);
}
.list-swiper{
	height:79vh;
}
uni-swiper-item{
	overflow: scroll;
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
		  <!-- <view class="search" @click.stop="searchBtn"></view> -->
		</view>
		<!-- 筛选项 -->
		<!-- 转租和直租 -->
		<screenTab ref="screenTab" 
		v-if="current == 0 || current == 1"
		:screenFormData="screenFormData" 
		:roomList="roomList"
		:priceApiDataMap="priceApiDataMap" 
		:from="from" @screenBtn="screenBtn"  
		:regionLeftList="regionLeftList" 
		:regionRightMap="regionRightMap" 
		:enterType="enterType"  
		:erHousePriceList="erHousePriceList"
		:key="updateSearch"
		@regionLeftBtn="regionLeftBtn"
		@regionRightBtn="regionRightBtn" 
		@roomBtn="roomBtn"
		@priceBtn="priceBtn"
		@confirmBtn="confirmBtn"
		@resetBtn="resetBtn"
		@areaBtn="areaBtn"
		@sourceBtn="sourceBtn"
		@roomConfirm="roomConfirm"
		@confirmPrice="confirmPrice"
		 >
		</screenTab>
		<!-- 换租的筛选 -->
		<screenHuan v-if="current==2"></screenHuan>
		<!-- 内容区域 -->
		<swiper class="list-swiper" @change="swipeIndex" :current="current" :duration="300">
		
			<swiper-item>
				<scroll-view scroll-y="true" class=" list-content" @scrolltolower="scrolltolower">
					<view v-if="current === 0">
						<!-- 内容区域 -->
						<view class="content" v-if="houseList.length>0">
							<!-- 租房列表 -->
						    <block v-for="(item, index) in houseList" :key="index">
								<house-list-item :item="item" :index="index"></house-list-item>
						    </block>
						</view>
						<view  class="home_nodata" v-else>
							暂无数据
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower">
					<view v-if="current === 1">
					<view class="content" v-if="houseList.length>0">
						<!-- 租房列表 -->
					    <block v-for="(item, index) in houseList" :key="index">
							<house-list-item :item="item" :index="index"></house-list-item>
					    </block>
					</view>
					<view class="home_nodata" v-else>
						暂无数据
					</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- <swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower">
					<view v-if="current === 2">
					<view class="content" v-if="houseList.length>0">
						
					    <block v-for="(item, index) in houseList" :key="index">
							<house-list-item :item="item" :index="index"></house-list-item>
					    </block>
					</view>
					<view class="home_nodata" v-else>
						暂无数据
					</view>
					</view>
				</scroll-view>
			</swiper-item> -->
		</swiper>
	</view>
</template>

<script>
var that;
import houseListItem from '@/components/house-list/house-list-item.vue';
import screenTab from '@/components/common/screen-tab/screen-tab.vue'
import screenHuan from '@/components/common/screen-tab/screen_huan.vue'
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
		screenTab,
		screenHuan
	},
	data() {
		return {
			updateSearch:0,
			houseList: [],
			cityName: '',
			current: 0,
			tabList: [
				{
					name: '转租'
				},
				{
					name: '直租'
				},
				// {
				// 	name: '换租'
				// }
			],
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
			regionLeftList: [
				{
					text:''
				},
				{
					text:'地铁'
				}
			],
			regionRightMap: {
				region:[]
			},
			// 二手房价格
			erHousePriceList: [
				{text:'1000元以下'},
				{text:'2000-4000元'},
				{text:'4000-60000元'},
				{text:'6000-80000元'},
				{text:'8000-100000元'},
			],
			// 户型筛选
			roomList: Const.roomList,
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
			priceItem: {text:"不限", id: ""},
			newHouseTypeItem: {text:"不限", id: ""},
			aparmentChuZuTypeItem: {text:"不限", id: ""},	
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
			},
			enterType:'erHouse',
			publish_type:1, //(1：转租，2：直租，3：换租)
			currPage:1,
			size:10,
			isLoad:false,
		};
	},
	props: {
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
	    },
	},
	onLoad() {
		that=this
		this.cityName=this.$store.state.currentCity
		this.regionLeftList[0].text=this.cityName
		this.getArea()
		this.getHouseList()
	},
	onShow(){
		console.log('又展示了')
		// this.getHouseList()
	},
	onReady(){
		
	},
	onPullDownRefresh() {
		// this.tuwen_default_page = 1;
		// this.tuwen_data = this.tuwen_data.reverse();
		// this.getMomentPost();
		// 
		console.log('刷新')
		that.currPage=1
		this.getHouseList()
		this.houseList=[]
		uni.stopPullDownRefresh();
	},
	methods: {	
		scrolltolower(){
			console.log('加载更多')
			if(this.isLoad){
				return;
			}
			this.currPage++
			this.getHouseList()
		},
		getHouseList(){
					let data={
							publish_type:that.publish_type,
							page:that.currPage,
							size:that.size,
							city:that.cityName,
							user_id:that.$store.state.userInfo.id
						}
					this.$H.post('/zf/v1/room/list',data,true).then(res=>{
							if(res.status){
								that.houseList=that.houseList.concat(res.data)
								if(res.data.length<10){
									this.isLoad=true
								}
								that.$store.commit('houseInfo',that.houseList)
							}
					})
			
		},
		// 获取选择城市返回的城市名称
		getValue(cityNameLess){
			if(cityNameLess.length<=2){
				this.cityName = cityNameLess+'市';
			}
			let regionLeftIndex=this.$refs.screenTab.regionLeftIndex
			console.log(regionLeftIndex)
			if(regionLeftIndex==0){
				this.getArea()
			}else if(regionLeftIndex==1){
				this.getStation()
			}
			this.getHouseList()
			this.currPage=1
			this.$store.commit('currentCity',cityNameLess)
		},
		// 获得swiper切换后的current索引
		swipeIndex(index) {
			if(index==this.current) return
			this.currPage=1
			this.current = index.detail.current
			this.init()
		},
		// 切换选项卡
		tabChange(index) {
			console.log(index)
			if(index==this.current) return
			this.current = index;
			this.init()
			
		},
		init(){
			this.currPage=1
			this.houseList=[]
			this.publish_type=this.current+1
			this.getHouseList()
		},
		// 搜索
		searchBtn() {
		  console.log("搜索房源ing")
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
	
		// 选项卡点击 - 弹出div
		screenBtn(type) {
			console.log(type)
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
		
		// 价格选择
		priceBtn(item, index, isInput = false) {
			console.log(item)
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
		    
		    this.erHousePriceIndex = index;
		    this.screenFormData = screenFormData;
		},
		confirmPrice() {
			
			if(!this.minPriceVal&&this.priceItem.text=='不限' || !this.maxPriceVal&&this.priceItem.text=='不限') {
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
			console.log('显示价格')
			if(this.enterType == "newHouse") {
				this.newHousePriceBtn({text: `${this.minPriceVal}-${this.maxPriceVal}${priceUnit}`,
					id: `${this.minPriceVal}:${this.maxPriceVal}`}, -1, true);
			}else{
				if(this.minPriceVal&&this.maxPriceVal){
					this.priceBtn({text: `${this.minPriceVal}-${this.maxPriceVal}`,
						id: `${this.priceItem.text}`}, -1, true);
				}else{
					this.priceBtn({text: `${this.priceItem.text}`,
						id: `${this.priceItem.text}`}, -1, true);
				}
				
			}
			this.$refs.screenTab.listTcShow=false
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
		    this.$refs.screenTab.listTcShow=false
		},
		// 更多选项卡 - 重置按钮
		resetBtn() {
		    let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		
		    screenFormData[enterType].more.text = "更多";
		    screenFormData[enterType].more.show = true;
		
		     this.$refs.screenTab.areaLsitIndex = -1;
		    screenFormData[enterType].area.id = "";
		    screenFormData[enterType].area.text = "面积";
		
		     this.$refs.screenTab.sourceLsitIndex = -1;
		    screenFormData[enterType].source.id = "";
		    screenFormData[enterType].source.text = "来源";
		    this.screenFormData = screenFormData;
		},
		//获取该城市的所有区
		getArea(){
			let data={
						city:this.cityName
					}
			this.$H.get('/zf/v1/const/area',data,true).then(res=>{
				if(res.status){
					that.regionRightMap['region']=res.data
				}
			})
		},
		//获取该城市下的所有地铁
		getStation(){
			let data={
					city:this.cityName
				}
			this.$H.get('/zf/v1/const/station',data,true).then(res=>{
				if(res.status){
					that.regionRightMap['region']=res.data
					console.log(res.data)
				}			
			})
		},
		regionLeftBtn(item,index){
			console.log(item)
			console.log(index)
			switch(index){
				case 0:
					this.getArea()
				break;
				case 1:
				this.getStation()
				break
			}
			console.log(index)
		},
		// 区域筛选
		regionRightBtn(item,index){
			console.log(item,index)
			this.$refs.screenTab.listTcShow=false
		},
		roomConfirm(item,index){
			this.$refs.screenTab.listTcShow=false
		}
	}
}
</script>