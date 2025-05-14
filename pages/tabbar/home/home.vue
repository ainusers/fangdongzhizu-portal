<style lang="scss" scoped>
	.upgra_modal {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
	.content {
		background-color: #f7f7f7;
	}
	.empty{
		height: calc(var(--status-bar-height));
		background-color: #1183fb;
	}
	.home_top {
		position: relative;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		align-items: center;
		background: #ffffff;
		.type {
			width: 100%;
			display: flex;
			justify-content: center;
			::v-deep .u-scroll-box {
				background: #ffffff;
			}
		}
	}
	::v-deep .screen_view {
		background: #ffffff;
	}
	.city {
		position: absolute;
		align-items: center;
		color: #272727;
		display: inline-flex;
		font-size: 32upx;
	}
	.u-tab-item .u-line-1 {
		line-height: 0px !important;
	}
	.home_nodata {
		text-align: center;
		color: #aaa;
		padding: 10upx 0;
	}
	.scroll-view-height {
		/* 页面高度减去包含状态栏、标题、tab组件的高度 */
		/* #ifdef APP */
		height: calc(100vh - var(--status-bar-height) - 160rpx);
		/* #endif */
		/* #ifdef H5 */
		height: calc(100vh - 160rpx);
		/* #endif */
		background-color: #f2f2f2;
	}
	.list-swiper {
		/* 页面高度减去包含状态栏、标题、tab组件的高度 */
		/* #ifdef APP */
		height: calc(100vh - var(--status-bar-height) - 160rpx);
		/* #endif */
		/* #ifdef H5 */
		height: calc(100vh - 160rpx);
		/* #endif */
		background: #f2f2f2;
	}
	uni-swiper-item {
		overflow: scroll;
	}
	.screen_fixed_list {
		z-index: 100 !important;
	}
	.screen-tab{
		width:100vw;
	}
</style>
<template>
	<view class="main">
		<!-- 顶部区域 -->
		<u-sticky offset-top="0" h5-nav-height="0">
    <!-- #ifdef APP-PLUS -->
			<view class="empty"></view>
		    <!-- #endif -->
			<view class="home_top">
				<!-- 城市 -->
				<view class="city" @click="chooseCity">
					<view>{{ cityName }}</view>
          <u-icon name="arrow-down-fill" color="#333" size="20" style="padding-left: 2px;"></u-icon>
				</view>
				<!-- 选项卡（转租和直租） -->
				<view class="type">
					<u-tabs :list="tabList" barWidth="50" gutter="10" font-size="30" bg-color="#f2f2f2"
						height="70" :current="current" @change="tabChange"></u-tabs>
				</view>
			</view>
			<!-- 筛选项 -->
			<screenTab class="screen-tab" ref="screenTab" v-if="current == 0 || current == 1"
				:screenFormData="screenFormData" :roomList="roomList" :from="from" :regionLeftList="regionLeftList"
				:regionRightMap="regionRightMap" :enterType="enterType" :roomPriceRange="roomPriceRange"
				:fixedContHeight="fixedContHeight" :key="updateSearch" 
				:listTcShow.sync="listTcShow"
				@screenBtn="screenBtn"
				@regionRightBtn="regionRightBtn" @confirmBtn="confirmBtn"
				@roomConfirm="roomConfirm" @confirmPrice="confirmPrice">
			</screenTab>
		</u-sticky>
		
		<!-- 内容区域 -->
		<swiper class="list-swiper scroll-view-height" @change="swipeIndex" :current="current" :duration="300" ref="listSwiper">
			<!-- 直租类型 -->
			<swiper-item class="scroll-view-height">
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower"
					:refresher-triggered="triggered" :refresher-enabled="true" :refresher-threshold="40"
					@refresherrefresh="onRefresh" @refresherrestore="onRestore">
					<view v-if="current === 0">
						<view class="content" v-if="houseList.length>0">
							<!-- 租房列表 -->
							<block v-for="(item, index) in houseList" :key="index">
								<house-list-item :item="item" :index="index"></house-list-item>
							</block>
						</view>
						<view v-if="showModel && houseList.length==0">
							<block v-for="item in houseJia" :key="item">
								<houseListItemSkeleton />
							</block>
						</view>
						<view class="home_nodata" v-if="!showModel && houseList.length==0">
							<u-empty text="暂无数据" mode="favor"></u-empty>
						</view>
						<u-loadmore v-else :status="loadStatus" :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 二手房 -->
			<swiper-item class="scroll-view-height">
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower"
					:refresher-triggered="triggered" :refresher-enabled="true" :refresher-threshold="40"
					@refresherrefresh="onRefresh" @refresherrestore="onRestore">
					<view v-if="current === 1">
						<!-- 内容区域 -->
						<view class="content" v-if="houseList.length>0">
							<!-- 租房列表 -->
							<block v-for="(item, index) in houseList" :key="index">
								<house-list-item :item="item" :index="index"></house-list-item>
							</block>
						</view>
						<!-- 骨架屏 -->
						<view v-if="showModel && houseList.length==0">
							<block v-for="item in houseJia" :key="item">
								<houseListItemSkeleton />
							</block>
						</view>
						<view class="home_nodata" v-else-if="!showModel && houseList.length==0">
							<u-empty text="暂无数据" mode="favor"></u-empty>
						</view>
						<u-loadmore v-else :status="loadStatus" :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- 公告信息 -->
		<u-popup v-model="showNotice" mode="center" border-radius="17" :closeable="true" :overlay="false"
			:overlayOpacity="0.3">
			<notice :content="noticeStr" />
		</u-popup>
	</view>
</template>

<script>
	var that;
	import houseListItem from '@/components/house-list/house-list-item.vue';
	import houseListItemSkeleton from '@/components/house-list/house-list-item-skeleton.vue';
	import screenTab from '@/components/common/screen-tab/screen-tab.vue'
	import notice from '@/components/common/noticeModel.vue'
	import {constant} from "@/utils/constant.js";
	import {MycheckUpdate,getLatest} from '@/utils/utils.js'

	export default {
		components: {
			houseListItem,
			screenTab,
			houseListItemSkeleton,
			notice
		},
		data() {
			return {
				isGps: false,
				showNotice: false,	// 是否展示通知
				noticeStr: '',	// 通知默认内容
				triggered: false, //下拉刷新是否触发
				isLoad: false,
				houseJia: [1, 2, 3, 4, 5, 6, 7],
				showModel: true,
				updateSearch: 0,
				houseList: [],
				cityName: '北京市',	// 城市名称
				current: 0, //当前tab的下标
				subleaseList: [], //转租
				directList: [], //直租
				tabList: [{
						name: '直租'
					},
					{
						name: '转租'
					}
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
				regionLeftList: [{
						text: '区域'
					},
					{
						text: '地铁'
					}
				],
				regionRightMap: {
					region: []
				},
				// 房屋价格区间
				roomPriceRange: constant.roomPriceRange,
				// 户型筛选
				roomList: constant.roomList,
				cityId: "1",
				enterType: 'erHouse',
				publish_type: 1, //(1：转租，2：直租，3：换租)
				currPage: 1,
				size: 10,
				fulling: false, //防止点击和滑动swiper同时执行，只执行一个就行
				isScreen: true, //当前是否为筛选查询
				subway: '', //地铁站
				screenArea: '', //筛选区域
				screenMoney: '', //筛选价格
				has_elevator: '', //筛选是否有电梯
				screenHeat_type: '', //筛选供暖方式
				room_type: '', //筛选主卧，次卧
				home_type: '', //筛选三居室
				moreChooseStr: [], //更多选中的筛选
				fixedContHeight: 0, //屏幕的高度
				moreSubKey: ['room_type', 'has_elevator', 'heat_type', 'room_type'], //更多提交接口的key 与screen-tab组件中moreType顺序相同
				loadStatus:'loadmore',
				loadingText: '努力加载中...', // 加载中提示文字
				loadmoreText: '轻轻上拉加载更多...', // 加载前提示文字
				nomoreText: '-- 没有更多了 --' ,// 没有更多数据提示文字
				listTcShow:false
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
			}
		},
		mounted() {
			that = this
			uni.$on('chooseCity', function(data) {
				//触发更新后
				that.cityName = data.cityName;
				uni.setStorageSync('cityName', data.cityName) // 保存城市
				// 查询房源列表
				that.subleaseList = []
				that.directList = []
				that.init(1)
			})
		},
		//为了优化代码，可以加上移除事件，避免重复监听事件
		onUnload() {
			// 移除监听事件  
			uni.$off('chooseCity');
		},
		onLoad() {
			/*#ifdef APP-PLUS*/
			plus.navigator.closeSplashscreen()
			/*#endif*/
			that = this
			// 从本地缓存中获取城市名称，如果没有则使用默认
			let cityName = uni.getStorageSync('cityName');
			if(cityName){
				that.cityName = cityName;
			} else {
				that.cityName = '北京市'
				uni.setStorageSync('cityName', this.cityName)
			}
			// 查询房源列表
			this.getHouseList()
			// 通知公告
			this.getNotice()
			// 检查更新
			getLatest().then(res => {
				if (res.version != this.$store.state.version) {
					MycheckUpdate()
				}
			})
			// 保存登录人的设备
			uni.getStorage({
				key: 'phoneInfo',
				success(res) {
					that.fixedContHeight = res.data.screenHeight
					// 上报用户设备信息
					that.savePhoneInfo(res.data)
				}
			})
		},
		methods: {
			// 获取公告
			getNotice() {
				this.$H.get('/zf/v1/notice', {}, true).then(res => {
					if (200 == res.code && res.data.length > 0) {
						this.noticeStr = res.data[0].notice
						this.showNotice = true
					}
				})
			},
			// 自定义下拉刷新
			onRefresh(e) {
				if (!this.triggered) {
					this.triggered = true
					setTimeout(() => {
						this.currPage = 1
						this.houseList = []
						// 查询房源列表
						this.getHouseList()
					}, 1000)
				}
			},
			// 需要重置
			onRestore() {
				this.triggered = false;
			},
			// 保存登录人的设备
			async savePhoneInfo(phoneInfo) {
				const systemSetting = uni.getSystemSetting()
				let params = {
					"userId": this.$store.state.userInfo.id,
					"appName": phoneInfo.appName,
					"appVersion": phoneInfo.appVersion,
					"appLanguage": phoneInfo.appLanguage,
					"deviceId": phoneInfo.deviceId,
					"deviceBrand": phoneInfo.deviceBrand,
					"deviceModel": phoneInfo.deviceModel,
					"deviceType": phoneInfo.deviceType,
					"osName": phoneInfo.osName,
					"osVersion": phoneInfo.osVersion,
					"osLanguage": phoneInfo.osLanguage,
					"osTheme": phoneInfo.osTheme
				}
				this.$H.post('/zf/v1/const/user/device', params, true).then(res => {})
			},
			// 滚动到最底部时触发
			scrolltolower() {
				if (this.isLoad) {
					uni.showToast({
						icon: 'none',
						title: '小主,别使劲,已经到底了'
					});
					return;
				}
				this.currPage++
				// 查询房源列表
				this.getHouseList()
			},
			// 查询房源列表
			getHouseList() {
				if (this.currPage == 1) {
					this.showModel = true
					this.isLoad = false
				}
				let data = {
					publish_type: this.publish_type,
					page: this.currPage,
					size: this.size,
					city: this.cityName,
					status: 2
				}
				if (this.isScreen) {
					data['subway'] = this.subway ? this.subway : null
					data['area'] = this.screenArea ? this.screenArea : null
					data['money'] = this.screenMoney ? this.screenMoney : null
					data['home_type'] = this.home_type ? this.home_type : null
					//更多筛选赋值
					if (this.moreChooseStr) {
						this.moreChooseStr.forEach((item, index) => {
							if (item) {
								data[this.moreSubKey[index]] = item ? item : null
							}
						})
					}
				}
				this.$H.post('/zf/v1/room/list', data, true).then(res => {
					this.showModel = false
					this.triggered = false
					if (res.status) {
						this.fulling = false
						this.houseList = this.houseList.concat(res.data)
						if (this.publish_type == 1) {
							this.subleaseList = this.houseList
						} else if (this.publish_type == 2) {
							this.directList = this.houseList
						}
						if (res.data.length < 10) {
							this.isLoad = true
							this.loadStatus = 'nomore'
						} else if (res.data.length == 10) {
							this.loadStatus = 'loadmore'
						}
					}
				})
			},
			// 获得swiper切换后的current索引
			swipeIndex(index) {
				if (!this.fulling) {
					this.fulling = true
					if (index == this.current) return
					this.currPage = 1
					this.current = index.detail.current;
					if((this.subleaseList.length == 10 || this.directList.length == 10) && this.isLoad){
						this.isLoad= false;
					};
					this.init(true)
				}
			},
			// 切换选项卡
			tabChange(index) {
				if (!this.fulling) {
					this.fulling = true
					if (index == this.current) return
					this.current = index;
					if((this.subleaseList.length == 10 || this.directList.length == 10 ) && this.isLoad){
						this.isLoad= false;
					}
					this.init()
				}
			},
			/**
			 * @param {Object} status  当前是否需要重新请求接口   供筛选
			 */
			init(status) {
				this.currPage = 1
				this.houseList = []
				this.publish_type = this.current + 1
				if (!status) {
					switch (this.publish_type) {
						case 1:
							this.houseList = this.subleaseList
							break;
						case 2:
							this.houseList = this.directList
							break;
					}
				}
				if (this.houseList.length == 0 || status) {
					this.houseList = []
					// 查询房源列表
					this.getHouseList()
				} else {
					this.fulling = false
				}
				this.listTcShow = false;
			},
			// 选择城市
			chooseCity() {
				this.listTcShow = false;
				this.$refs.screenTab.areaName = '区域';
				this.$refs.screenTab.regionRightMap['region'] = '';
				this.$refs.screenTab.screenFormData[this.enterType]['region'].show = false;
				this.$refs.screenTab.stationIndex= -1;
				this.$refs.screenTab.screenFormData.erHouse.region.show  = false;
				this.$refs.screenTab.screenFormData.erHouse.region.text='区域'
				this.regionRightBtn('')
				uni.navigateTo({
					url: "/pages/tabbar/home/chooseCity"
				});
			},
			// 选项卡点击 - 弹出div
			screenBtn(type) {
				let screenFormData = this.screenFormData;
				let enterType = this.enterType;
				if (!screenFormData[enterType][type]) {
					throw new Error("参数配置错误，请检查screenFormData中是否有对应的key");
				}
				screenFormData[enterType][type].show = !screenFormData[enterType][type].show;
				for (let key in screenFormData[enterType]) {
					if (screenFormData[enterType][key].show !== undefined && key !== type) {
						screenFormData[enterType][key].show = false;
					}
				}
			},
			// 确认价格
			confirmPrice(item, index) {
				let screenFormData = this.screenFormData;
				let enterType = this.enterType;
				if (!item.id) {
					screenFormData[enterType].price.text = "价格";
					screenFormData[enterType].price.show = false
					this.screenMoney = ''
					this.init(true)
					return
				}
				this.screenMoney = item.val
				screenFormData[enterType].price.id = item.id;
				screenFormData[enterType].price.show = true;
				screenFormData[enterType].price.text = item.text;
				this.screenFormData = screenFormData;
				this.init(true)
			},
			// 更多选项卡 - 确定按钮
			confirmBtn(arr) {
				this.moreChooseStr = arr
				this.init(true)
			},
			// 区域筛选
			regionRightBtn(item) {
				this.directList = []
				this.subleaseList = []
				if (item.name) {
					this.screenArea = item.name
					this.subway = ''
				} else {
					this.subway = item
					this.screenArea = ''
				}
				this.init(true)
			},
			// 户型的确认
			roomConfirm(item, index) {
				let screenFormData = this.screenFormData;
				let enterType = this.enterType;
				if (!item.id) {
					screenFormData[enterType].room.text = "户型";
					screenFormData[enterType].room.show = false
					this.home_type = ''
					this.roomListIndex = -1
					this.init(true)
					return
				}
				this.home_type = item.val
				screenFormData[enterType].room.id = item.id;
				screenFormData[enterType].room.show = true;
				screenFormData[enterType].room.text = item.text;
				this.screenFormData = screenFormData;
				this.init(true)
			}
		}
	}
</script>