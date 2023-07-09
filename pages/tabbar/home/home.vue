<style scope lang="scss" scoped>
.main {
	background:#5199ff;
}
.home_top {
	margin-top: calc(var(--status-bar-height));
	position: relative;
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 30rpx;
	padding-bottom: 0;
	align-items: center;
	background: #ffffff;
	.type{
		width:100%;
		display: flex;
		justify-content: center;
		/deep/.u-scroll-box{
			background: #ffffff;
		}
	}
}
/deep/.screen_view{
	background: #ffffff;
}
.city {
	position: absolute;
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
	height: calc(100vh - var(--status-bar-height) - 176rpx);
	background-color: #ffffff;
}
.list-content{
	height: calc(100vh - var(--status-bar-height) - 176rpx);
}
.list-swiper{
	height: calc(100vh - var(--status-bar-height) - 176rpx);
	background: #ffffff;
}
uni-swiper-item{
	overflow: scroll;
}
.screen_fixed_list{
	z-index: 100 !important;
}

</style>
<template>
	<view class="main">
		<!-- 顶部区域 -->
		<u-sticky offset-top="0">
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
		  <!-- <view></view> -->
		  <!-- 搜索按钮 -->
		  <!-- <view class="search" @click.stop="searchBtn"></view> -->
		</view>
		
		<!-- 筛选项 -->
		<!-- 转租和直租 -->
		<screenTab ref="screenTab" 
		v-if="current == 0&&fixedContHeight || current == 1&&fixedContHeight"
		:screenFormData="screenFormData" 
		:roomList="roomList"
		:from="from"
		:regionLeftList="regionLeftList" 
		:regionRightMap="regionRightMap" 
		:enterType="enterType"  
		:erHousePriceList="erHousePriceList"
		:fixedContHeight="fixedContHeight"
		:key="updateSearch"
		@screenBtn="screenBtn"  
		@regionLeftBtn="regionLeftBtn"
		@regionRightBtn="regionRightBtn" 
		@confirmBtn="confirmBtn"
		@roomConfirm="roomConfirm"
		@confirmPrice="confirmPrice"
		 >
		</screenTab>
		<!-- 换租的筛选 -->
		<screenHuan v-if="current==2"></screenHuan>
		</u-sticky>
		<!-- 内容区域 -->
		<swiper class="list-swiper" @change="swipeIndex" :current="current" :duration="300" ref="listSwiper">
		
			<swiper-item>
				<scroll-view scroll-y="true" class=" list-content" @scrolltolower="scrolltolower"
				:refresher-triggered="triggered"
				:refresher-enabled="true"
				:refresher-threshold="100"
				@refresherpulling="onPulling"
				@refresherrestore="onRestore"
				>
					<view v-if="current === 0">
						<!-- 内容区域 -->
						<view class="content" v-if="houseList.length>0">
							<!-- 租房列表 -->
						    <block v-for="(item, index) in houseList" :key="index">
								<house-list-item :item="item" :index="index"></house-list-item>
						    </block>
						</view>
						<view v-if="showModel&&houseList.length==0" >
							<block v-for="item in houseJia" :key="item">
								<houseListItemSkeleton/>
							</block>
						</view>
						<view  class="home_nodata" v-else-if="!showModel&&houseList.length==0">
							<u-empty  text="暂无数据" mode="favor"></u-empty>
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

					<view v-if="showModel&&houseList.length==0" >
						<block v-for="item in houseJia" :key="item">
							<houseListItemSkeleton/>
						</block>
					</view>
					<view  class="home_nodata" v-else-if="!showModel&&houseList.length==0">
						<u-empty  text="暂无数据" mode="favor"></u-empty>
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
		<!-- <LodingM :Model="showModel"/> -->
	</view>
	
</template>

<script>
import '@/utils/request/createWebsocket.js'
var that;
import houseListItem from '@/components/house-list/house-list-item.vue';
import houseListItemSkeleton from '@/components/house-list/house-list-item-skeleton.vue';
import screenTab from '@/components/common/screen-tab/screen-tab.vue'
import screenHuan from '@/components/common/screen-tab/screen_huan.vue'
import LodingM from '@/components/common/modal/loading_model.vue'
import { Const } from "@/utils/const/Const.js";
import {isLoginCheck} from '../../../utils/utils.js'

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
		screenHuan,
		LodingM,
		houseListItemSkeleton
	},
	data() {
		return {
			triggered:false, //下拉刷新是否触发
			houseJia:[1,2,3,4,5,6,7],
			showModel:true,
			updateSearch:0,
			houseList: [],
			cityName: '',
			current: 0, //当前tab的下标
			subleaseList:[],//转租
			directList:[],//直租
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
			screenFormData: {
			    erHouse: {
			        region: {
			            text: "区域",
			            leftText: "区域",
			            leftId: "",
			            show: false,
			            rightId: "",
			            key_1: "regionId",
			            key_2: "sectionId",
			        },
			        price: {
			            text: "价格",
			            id: "",
			            show: false,
			            key: "price",
			        },
			        room: {
			            text: "户型",
			            id: "",
			            show: false,
			            key: "room",
			        },
			        more: {
			            text: "更多",
			            id: "",
			            show: false,
			            key: "more",
			        },
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
			erHousePriceList: Const.CPriceScreen,
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
			priceItem: {text:"不限", id: ""},
			cityId: "1",
			enterType:'erHouse',
			publish_type:1, //(1：转租，2：直租，3：换租)
			currPage:1,
			size:10,
			isLoad:false,
			fulling:false,//防止点击和滑动swiper同时执行，只执行一个就行
			isScreen:true, //当前是否为筛选查询
			subway:'',//地铁站
			screenArea:'',//筛选区域
			screenMoney:'',//筛选价格
			has_elevator:'',//筛选是否有电梯
			screenHeat_type:'',//筛选供暖方式
			room_type:'',//筛选主卧，次卧
			home_type:'',//筛选三居室
			moreChooseStr:[],//更多选中的筛选
			fixedContHeight:0, //屏幕的高度
			moreSubKey:['room_type','has_elevator','heat_type','room_type'],//更多提交接口的key 与screen-tab组件中moreType顺序相同
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
		isLogin:false ,//是否登录
	},
	onLoad() {
		that=this
		this.cityName=this.$store.state.currentCity
		this.regionLeftList[0].text=this.cityName
		uni.getStorage({
			key:'phoneInfo',
			success(res){
				console.log('手机信息1',res)
				that.fixedContHeight=res.data.screenHeight
				that.savePhoneInfo(res.data)
			}
		})
		this.getArea()
		this.getHouseList()
	},
	onShow(){
		// this.currPage=1
		
		// this.houseList=[]
		
	},
	onReady(){
		
	},
	onPullDownRefresh() {
		console.log('shangla')
		that.currPage=1
		this.getHouseList()
		this.houseList=[]
		uni.stopPullDownRefresh();
	},
	methods: {
		//自定义下拉刷新
		 onPulling(e) {
			if(!this.triggered){
				this.triggered=true
				setTimeout(()=>{
					that.currPage=1
					this.houseList=[]
					this.getHouseList(1)
				},1000)
				
			}		
		},
		onRestore() {
			this.triggered = false ; // 需要重置
			console.log("onRestore");
		},
//保存登录人的设备
			async savePhoneInfo(phoneInfo){
					var location=await this.getLocation();
					let address=location.address
					let position=address.province+'-'+address.city+'-'+address.district+'-'+address.street+'-'+address.streetNum+'-'+address.poiName+'-'+address.cityCode
					let params={
					  "userId": this.$store.state.userInfo.id,
					  "appName": phoneInfo.appName,
					  "appVersion": phoneInfo.appVersion,
					  "appLanguage":phoneInfo.appLanguage,
					  "deviceId": phoneInfo.deviceId,
					  "deviceBrand":phoneInfo.deviceBrand,
					  "deviceModel":phoneInfo.deviceModel,
					  "deviceType": phoneInfo.deviceType,
					  "osName": phoneInfo.osName,
					  "osVersion": phoneInfo.osVersion,
					  "osLanguage": phoneInfo.osLanguage,
					  "osTheme":phoneInfo.osTheme,
					  "position":position
				}
				this.$H.post('/zf/v1/const/user/device',params,true).then(res=>{
					console.log('传送手机信息',res)
				})
			},
			getLocation(){//h5中可能不支持,自己选择
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'gcj02',
						geocode:true,
						// isHighAccuracy:true,
						success: function (res) {
							resolve(res);
						},
						fail: (e) => {  
							reject(e);
						}
					});
				} )
			},
		scrolltolower(){
			if(this.isLoad){
				return;
			}
			this.currPage++
			this.getHouseList()
		},
		getHouseList(type){
			console.log('请求了接口了')
			if(this.currPage==1){
				this.showModel=true
				this.isLoad=false
			}
					let data={
							publish_type:that.publish_type,
							page:that.currPage,
							size:that.size,
							city:that.cityName,
							status:2
						}
						if(this.isScreen){
								data['subway']=this.subway?this.subway:null
								data['area']=this.screenArea?this.screenArea:null
								data['money']=this.screenMoney?this.screenMoney:null
								data['home_type']=this.home_type?this.home_type:null
								//更多筛选赋值
								this.moreChooseStr.forEach((item,index)=>{
									data[this.moreSubKey[index]]=item?item:null
								})
						}
					this.$H.post('/zf/v1/room/list',data,true).then(res=>{
						this.showModel=false
						this.triggered=false
						uni.hideLoading()
							if(res.status){
								this.fulling=false
								that.houseList=that.houseList.concat(res.data)
								if(this.publish_type==1){
									that.subleaseList=that.houseList
								}else if(this.publish_type==2){
									that.directList=that.houseList
								}
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
			if(!this.fulling){
				this.fulling=true
				if(index==this.current) return
				this.currPage=1
				this.current = index.detail.current
				this.init()
			}
		},
		// 切换选项卡
		tabChange(index) {
			if(!this.fulling){
				this.fulling=true
				if(index==this.current) return
				this.current = index;
				this.init()
			}
		},
		/**
		 * @param {Object} status  当前是否需要重新请求接口   供筛选
		 */
		init(status){	
			this.currPage=1
			this.houseList=[]
			this.publish_type=this.current+1
			if(!status){
				switch(this.publish_type){
					case 1:
						this.houseList=this.subleaseList
					break;
					case 2:
						this.houseList=this.directList
					break;
				}
			}
			if(this.houseList.length==0 || status){
				this.houseList=[]
				this.getHouseList()
			}else{
				this.fulling=false
			}
			this.$refs.screenTab.listTcShow=false
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
	
		// 选项卡点击 - 弹出div
		screenBtn(type) {
			// this.setTabNodeInfo();
			let screenFormData = this.screenFormData;
		    let enterType = this.enterType;
		    if(!screenFormData[enterType][type]) {
		        throw new Error("参数配置错误，请检查screenFormData中是否有对应的key");
		    }
		    screenFormData[enterType][type].show = !screenFormData[enterType][type].show;
		    for(let key in screenFormData[enterType]) {
		        if(screenFormData[enterType][key].show !== undefined && key !== type) {
		            screenFormData[enterType][key].show = false;
		        }
		    }
		    // new Notification().postNotification(Notify.ScreenShowChanged.Name
		    //     , this.listTcShow);
		    // this.screenFormData = screenFormData;
		},
		confirmPrice(val) {
			this.screenMoney=val
			this.init(true)
		},
		
		// 更多选项卡 - 确定按钮
		confirmBtn(arr) {
			this.moreChooseStr=arr
			this.init(true)
		},
		//获取该城市的所有区
		getArea(){
			let data={
						city:this.cityName
					}
			this.$H.get('/zf/v1/const/area',data,true).then(res=>{
				if(res.status){
					that.regionRightMap['region']=res.data
					that.regionRightMap['region'].unshift({name:'不限',id:0})
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
					that.regionRightMap['region'].unshift({line:'不限',station:[]})
				}			
			})
		},
		regionLeftBtn(item,index){
			console.log(item)
			switch(index){
				case 0:
					this.getArea()
				break;
				case 1:
					this.getStation()
				break
			}
		},
		// 区域筛选
		regionRightBtn(item){
			console.log(item)
			if(item.name){
				console.log('name',item.name)
				this.screenArea=item.name
			}else{
				this.subway=item
				this.screenArea=''
			}
			this.init(true)
		},
		//户型的确认
		roomConfirm(item,index){
			console.log(item)
			let screenFormData = this.screenFormData;
			let enterType = this.enterType;
			if(!item.id) {
				this.home_type=''
				this.init(true)
				 return
			} 
			 this.home_type=item.val
			screenFormData[enterType].room.id = item.id;
			screenFormData[enterType].room.show = true;
			screenFormData[enterType].room.text = item.text;
			if(!item.id) {
			    screenFormData[enterType].room.text = "户型";
				screenFormData[enterType].room.show = false
			}	  
			this.screenFormData = screenFormData;
			this.init(true)
		}
	}
}
</script>