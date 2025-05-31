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
.empty {
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
}
.home_top .type {
  width: 100%;
  display: flex;
  justify-content: center;
}
/* 覆盖 uView 组件样式 */
::v-deep .u-scroll-box {
  background: #ffffff;
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
/* 覆盖 uTabItem 文字行高 */
.u-tab-item .u-line-1 {
  line-height: 0px !important;
}
.home_nodata {
  text-align: center;
  color: #aaa;
  padding: 10upx 0;
}
/* 公共高度样式：页面内容区域减去状态栏和标题栏 */
.scroll-content-height {
  /* 页面高度减去包含状态栏、标题、tab组件的高度 */
  /* #ifdef APP */
  height: calc(100vh - var(--status-bar-height) - 160rpx);
  /* #endif */
  /* #ifdef H5 */
  height: calc(100vh - 160rpx);
  /* #endif */
}
/* 应用于列表容器 */
.scroll-view-height {
  @extend .scroll-content-height;
  background-color: #f2f2f2;
}
/* 应用于轮播图 */
.list-swiper {
  @extend .scroll-content-height;
  background: #f2f2f2;
}
/* 解决 uni-app swiper 内容滚动冲突 */
uni-swiper-item {
  overflow: scroll;
}
.screen_fixed_list {
  z-index: 100;
}
.screen-tab {
  width: 100vw;
}
.download-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
.dialog-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    text-align: center;
}
.dialog-title {
    font-size: 18px;
    margin-bottom: 10px;
}
.progress-bar {
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    margin: 10px 0;
    overflow: hidden;
}
.progress {
    height: 100%;
    background-color: #1183fb;
    transition: width 0.3s;
}
.progress-text {
    font-size: 16px;
    margin-bottom: 10px;
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
        <scroll-view scroll-y="true" class="scroll-view-height" @scrolltolower="scrolltolower"
                     :refresher-triggered="triggered" :refresher-enabled="true" :refresher-threshold="40"
                     @refresherrefresh="onRefresh" @refresherrestore="onRestore" :scroll-top="scrollTop"
                     :key="'scrollView' + scrollTop">
          <view v-if="current === 0">
            <view class="content" v-if="houseList.length>0">
              <!-- 租房列表 -->
              <block v-for="(item, index) in houseList" :key="index" >
                <house-list-item :item="item" :index="index" />
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
        <scroll-view scroll-y="true" class="scroll-view-height" @scrolltolower="scrolltolower"
                     :refresher-triggered="triggered" :refresher-enabled="true" :refresher-threshold="40"
                     @refresherrefresh="onRefresh" @refresherrestore="onRestore" :scroll-top="scrollTop"
                     :key="'scrollView' + scrollTop">
          <view v-if="current === 1">
            <!-- 内容区域 -->
            <view class="content" v-if="houseList.length>0">
              <!-- 租房列表 -->
              <block v-for="(item, index) in houseList" :key="index">
                <house-list-item :item="item" :index="index" />
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
	
	<!-- 下载进度条 -->
	<view v-if="progressFlag" class="download-dialog">
		<view class="dialog-content">
        <text class="dialog-title">正在下载...</text>
        <view class="progress-bar">
            <view class="progress" :style="{ width: progress + '%' }"></view>
        </view>
        <text class="progress-text">{{ progress }}%</text>
    </view>
	</view>
</view>
</template>

<script>
var that;
import houseListItem from '@/components/house-list/house-list-item.vue';
import houseListItemSkeleton from '@/components/house-list/house-list-item-skeleton.vue';
import screenTab from '@/components/common/screen-tab/screen-tab.vue'
import notice from '@/components/common/noticeModel.vue'
import {constant} from "@/utils/constant.js";
import {getLatest,compareVersions} from '@/utils/utils.js';

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
      listTcShow:false,
      resetFlag:false, //首页是否需要重置刷新
      scrollTop: 0, // 控制 scroll-view 的滚动位置
	  progress:0 ,// 下载进度百分比
	  progressFlag:false //是否展示进度条
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
      uni.setStorageSync('cityName', that.cityName)
    }
    // 查询房源列表
    that.getHouseList()
    // 通知公告
    that.getNotice()
    // 检查更新
	  that.showUpdateDialog()
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
  onShow() {
    if(this.resetFlag){
      // 从本地缓存中获取城市名称，如果没有则使用默认
      let cityName = uni.getStorageSync('cityName');
      if(cityName){
        this.cityName = cityName;
      } else {
        this.cityName = '北京市'
        uni.setStorageSync('cityName', this.cityName)
      }
      // 查询房源列表
      this.getHouseList()
    }
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
        this.triggered = true;
        setTimeout(() => {
          this.getHouseList({ page: 1 });
          this.triggered = false;
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
      this.getHouseList({ page: ++this.currPage });
    },
    // 查询房源列表
    getHouseList(options = {}) {
      if(this.resetFlag){
        this.currPage = 1;
        this.listTcShow = false;
        this.directList = []
        this.subleaseList = []
        this.subway = ''
        this.screenArea = ''
        this.houseList = []
		    this.resetFlag = false;
        if(this.$refs.screenTab){
          this.$refs.screenTab.areaName = '区域';
          this.$refs.screenTab.regionRightMap['region'] = '';
          this.$refs.screenTab.screenFormData[this.enterType]['region'].show = false;
          this.$refs.screenTab.stationIndex= -1;
          this.$refs.screenTab.screenFormData.erHouse.region.show  = false;
          this.$refs.screenTab.screenFormData.erHouse.region.text='区域'
        }
      }
      this.listTcShow = false
      let data = {
        publish_type: this.publish_type,
        page: options.page || this.currPage,
        size: this.size,
        city: this.cityName,
        status: 2
      }
      if (this.isScreen) {
        data['subway'] = this.subway ? this.subway : null;
        data['area'] = this.screenArea ? this.screenArea : null;
        data['money'] = this.screenMoney ? this.screenMoney : null;
        data['home_type'] = this.home_type ? this.home_type : null;
        //更多筛选赋值
        if (this.moreChooseStr) {
          this.moreChooseStr.forEach((item, index) => {
            if (item) {
              data[this.moreSubKey[index]] = item ? item : null;
            }
          })
        }
      }
      this.$H.post('/zf/v1/room/list', data, true).then(res => {
        this.showModel = false;
        this.triggered = false;
        if (res.status) {
          if (data.page === 1) {
            this.houseList = res.data;
          } else {
            this.houseList = [...this.houseList, ...res.data];
          }
          // 更新缓存
          if (this.publish_type == 1) {
            this.subleaseList = this.houseList;
          } else if (this.publish_type == 2) {
            this.directList = this.houseList;
          }
          // 判断是否加载完毕
          this.isLoad = res.data.length < 10;
          this.loadStatus = this.isLoad ? 'nomore' : 'loadmore';
        }
      })
      // 请求完成时自动滚动到顶部（仅当 page=1 时）
      if (data.page === 1) {
        this.scrollToTop();
      }
    },
    // 滚动到顶部
    scrollToTop() {
      this.scrollTop = 0; // 设置 scroll-view 的 scrollTop 为 0
      this.$nextTick(() => {
        setTimeout(() => {
          try {
            const query = uni.createSelectorQuery().in(this);
            const scrollView = query.select('.scroll-view-height');
            scrollView.boundingClientRect(res => {
              if (res) {
                this.scrollTop = -500;
                console.log('✅ 已回到顶部');
              } else {
                console.warn('⚠️ 未找到 scroll-view 元素');
              }
            }).exec(); // ⚠️ 必须调用 exec()
          } catch (e) {
            console.error('❌ 查询 scroll-view 出错:', e);
          }
        }, 50); // 延迟保证 DOM 完成渲染
      });
    },
    // 获得swiper切换后的current索引
    swipeIndex(item) {
      const index = item.detail.current;
      if (!this.fulling && index != this.current) {
        this.current = index;
        this.init()
      }
    },
    // 切换选项卡
    tabChange(index) {
      if (!this.fulling && index != this.current) {
        this.current = index;
        this.init()
      }
    },
    /**
     * @param {Object} status  当前是否需要重新请求接口   供筛选
     */
    init(status) {
      this.currPage = 1
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
      if (this.houseList.length === 0 || status) {
        this.getHouseList({ page: 1 });
      }
      this.listTcShow = false;
    },
    // 选择城市
    chooseCity() {
      this.houseList=[];
      uni.navigateTo({
        url: "/pages/tabbar/home/chooseCity"
      });
      this.resetFlag = true;
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
      } else {
        this.home_type = item.val
        screenFormData[enterType].room.id = item.id;
        screenFormData[enterType].room.show = true;
        screenFormData[enterType].room.text = item.text;
      }
      this.screenFormData = screenFormData;
      // 直接调用 getHouseList
      this.currPage = 1;
      this.isScreen = true;
      this.getHouseList({page: 1});
      // 同步 subleaseList / directList
      if (this.publish_type === 1) {
        this.subleaseList = [];
      } else if (this.publish_type === 2) {
        this.directList = [];
      }
    },
	// 在需要检查更新的页面或组件中调用
	showUpdateDialog() {
		let currentVersion=''
		// #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
      currentVersion = widgetInfo.version
    });
		// #endif
		// #ifdef H5
    currentVersion = uni.getStorageSync('phoneInfo').appVersion;
		// #endif
		getLatest().then((latestVersionInfo) => {
        // 比较版本号
        if (compareVersions(currentVersion.toString(), latestVersionInfo.version) < 0) {
            // 需要更新
            if (latestVersionInfo.type) {
                // 强制更新
                uni.showModal({
                    title: '版本更新',
                    content: '检测到新版本，请立即更新以继续使用。',
                    showCancel: false,
                    confirmText: '立即更新',
                    success: (res) => {
                        if (res.confirm) {
                            this.handleUpdate(latestVersionInfo);
                        }
                    }
                });
            } else {
                // 自主更新
                uni.showModal({
                    title: '版本更新',
                    content: `检测到新版本 ${latestVersionInfo.version}，是否更新？`,
                    confirmText: '立即更新',
                    cancelText: '稍后再说',
                    success: (res) => {
                        if (res.confirm) {
                            this.handleUpdate(latestVersionInfo);
                        }
                    }
                });
            }
        } else {
            // 已是最新版本
            uni.showToast({
                title: '已是最新版本',
                icon: 'none'
            });
        }
	    }).catch((err) => {
	        uni.showToast({
	            title: '检查更新失败',
	            icon: 'none'
	        });
	    });
	}, 
	// 处理更新操作
	handleUpdate(versionInfo) {
		this.progress = 0;
		this.progressFlag = true;
    // #ifdef APP-PLUS
		const systemInfo = uni.getSystemInfoSync();
	    if(systemInfo.platform === 'android') {
			  uni.hideTabBar();
        // Android 下载并安装 APK
        const uploadTask = uni.downloadFile({
          url: versionInfo.url,
          success: (res) => {
              if (res.statusCode === 200) {
                  plus.runtime.install(res.tempFilePath, {}, () => {
                      uni.showToast({
                          title: '下载成功',
                          icon: 'success'
                      });
                  }, (e) => {
                      uni.showToast({
                          title: '下载失败',
                          icon: 'none'
                      });
                  });
              }
          },
          fail: (err) => {
              uni.showToast({
                  title: '下载失败',
                  icon: 'none'
              });
          }
      });
			uploadTask.onProgressUpdate((res) => {
				this.progress = res.progress
				if (this.progress == 100){
					uni.showToast({
					    title: '下载完成',
					    icon: 'success',
						duration: 2000
					});
					uni.showTabBar();
					this.progressFlag = false;
				}	
			});
    }
    // #endif
	  }
  }
}
</script>