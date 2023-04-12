<style scope lang="scss">
  page {
    background: #FFFFFF;
  }
  .er_house_detail {
    overflow-x: hidden;
	box-shadow: 0 1px 0 2px rgba(0,0,0,0.05);
  }
  .model {
	  border: 1px solid #F5F5F5
  }
  .modelName{
	  padding: 5px 5px 0px 5px;
	  font-weight: bolder;
  }
  .near_map_item {
    height: 25upx;
  }
  .position_near {
    box-shadow: 0upx 9upx 32upx -10upx rgba(20, 20, 20, 0.07);
    margin-bottom: 10upx;
  }
  .near_house {
    margin-bottom: 20upx;
  }
  .look_more {
    color: #7A8190;
    font-size: 24upx;
    flex-shrink: 0;
    position: relative;
    line-height: 54upx;
    margin: 57upx 0 6upx;
    margin-right: 40upx;
    padding-right: 30upx;
  }
  .position {
	  display: flex;
	  padding: 8px 0px 8px 0px;
	  font-weight: bolder;
	  font-size: 16px;
	  .community{
		  padding-left: 8px
	  }
	  .whoCommunity{
	  		  padding-left: 8px
	  }
	  .matche{
	  		  padding-left: 8px
	  }
	  .bedroom{
	  		  padding-left: 8px
	  }
  }
  .money{
	  display: flex;
	  font-weight: bolder;
	  font-size: 16px;
	  padding: 0px 0px 8px 0px;
	  justify-content: space-between;
	  .pay{
	  	  padding-left: 8px;
		  display: flex;
	  }
	  .price{
		  color: red;
		  padding-left: 8px;
	  }
	  .way{
	  	  padding-left: 8px;
	  }
	  .datetime{
		  margin-right: 8px;
	  }
  }
  .detail{
	  display: flex;
	  justify-content: space-around;
	  margin: 10px 8px 10px 8px;
	  .size{
		  text-align: center;
		  padding-top: 5px;

	  }
	  .heating{
		  text-align: center;
		  padding-top: 5px;
	  }
	  .elevator{
		  text-align: center;
		  padding-top: 5px;
	  }
	  .floor{
		  text-align: center;
	  }
  }
  .final{
	  display: flex;
	  justify-content: space-between;
	  .report{
		  padding: 8px 0px 8px 10px;
	  }
	  .collect{
		  padding: 8px 0px 8px 10px;
	  }
	  .left{
		  display: flex;
	  }
	  .contact{
		  width: 60%;
		  padding: 0px 4px 4px 0px;
	  }
	  .target{
		  padding-top: 8px;
		  font-size: 14px;
	  }
  }
</style>
<template>
    <view class="er_house_detail">
		<!-- 详情页 - 轮播图 -->
		<house-swiper :list="swiperList"></house-swiper>
		
		<!-- 详情页 - 主板 -->
		<view class="model">
		    <block v-if="detailData != null">
			 <view class="description">
				<view class="position">
					<view class="community">{{detailData.communityName}}</view>
					<view class="bedroom"> - {{detailData.roomType}}</view>
				</view>
				<view class="money">
					<view class="pay">
						<view class="fix">月租金</view>
						<view class="price">{{detailData.money}}</view>元/月
						<view class="way">({{detailData.payType}})</view>
					</view>
					<view class="datetime">{{detailData.updateTime.split('T')[0]}}</view>
				</view>
			 </view>
			 <view class="detail">
				<view class="chaoxiang">
					<view  class="orientation">朝向 - {{detailData.orientation}}</view>
					<view  class="size">{{detailData.size}}m²</view>
				</view>
				<image style="width:5px;height: 40px;" src="/static/home/detail/vertical.png"></image>
				<view class="pattern">
					<view  class="layout">{{detailData.layout}}</view>
					<view  class="heating">{{detailData.heatType}}</view>
				</view>
				<image style="width:5px;height: 40px;" src="/static/home/detail/vertical.png"></image>
				<view class="height">
					<view  class="floor">{{detailData.floor}}</view>
					<view  class="elevator">{{detailData.hasElevator}}</view>
				</view>
			 </view>
		   </block>
		</view>
		
		<!-- 详情页 - 租赁信息 -->
		<view class="model">
		  <block v-if="zulinData.length > 0">
			 <view class="modelName">租赁信息</view>
			 <zu-lin-xin-xi :list="zulinData"></zu-lin-xin-xi>
		   </block>
		</view>

		<!-- 详情页 - 费用详情 -->
		<view class="model">
		  <block v-if="feiyongData.length > 0">
			 <view class="modelName">费用详情</view>
			 <fei-yong-xiang-qing :list="feiyongData"></fei-yong-xiang-qing>
		   </block>
		</view>
		
		<!-- 详情页 - 地理位置 -->
		<view class="model">
		  <block v-if="diliData.length > 0">
			 <view class="modelName">地理位置</view>
			 <di-li-wei-zhi :list="diliData"></di-li-wei-zhi>
		   </block>
		<!-- 详情页 - 配套设施 -->
		</view>
		
		<view class="model">
		  <block v-if="sheshiData.length > 0">
			 <view class="modelName">配套设施</view>
			 <pei-tao-she-shi :list="sheshiData"></pei-tao-she-shi>
		   </block>
		</view>
		
		<!-- 详情页 - 立即沟通 -->
		<view class="final">
			<view class="left">
				<view class="collect">
					<u-icon name="bell" size="50"></u-icon>
				</view>
				<view class="target" @click="report(1)">举报</view>
				<view class="report">
					<u-icon name="heart" size="50"></u-icon>
				</view>
				<view class="target" @click="report(2)">收藏</view>
			</view>
			<view class="contact">
				<u-button shape="square" @click="report(3)">立即沟通</u-button>
			</view>
		</view>
    </view>
</template>

<script>
  import houseSwiper from "@/components/house-swiper/house-swiper.vue";
  import peiTaoSheShi from "@/components/house-detail/house-sheshi.vue";
  import feiYongXiangQing from "@/components/house-detail/house-feiyong.vue";
  import zuLinXinXi from "@/components/house-detail/house-zulin.vue";
  import diLiWeiZhi from "@/components/house-detail/house-dili.vue";

  // 页面带过来的参数
  let detailData = {
    houseImg: '',
    community: '',
    whoCommunity: '',
    orientation: '',
    bedroom: '',  
    mode: '',  
    matche: '',  
    size: '',  
    floor: '',  
    position: '',  
    price: '',  
    region: '',  
    subway: '',
	way: '',
	datetime: ''
  }
  let that;
  export default {
	components: {
	    houseSwiper,
		peiTaoSheShi,
		feiYongXiangQing,
		zuLinXinXi,
		diLiWeiZhi
	},
	// 页面传值
	onLoad(options) {
		that=this
		this.detailData =this.$store.state.houseInfo[options.index]
		console.log(this.detailData)
		this.initData()
	},
	onShow() {
		
	},
    data() {
      return {
        sourceTypeId: 2201, // 数据采集 - lh
        shareOption: {},
        haveVillageExpert: false,// 是否有小区专家
        loadingReqeust: true,
        swiperList: [
			// {
			// 	'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwh.28life.com%2Fupload_img%2F2017%2F12%2F28%2Fu_13247643007%2F151447815522.jpg&refer=http%3A%2F%2Fwh.28life.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664629331&t=ebfd7014b06a3b28c2dd7c4290093271',
			// 	'type':'img',
			// 	'urls':[
			// 		'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwh.28life.com%2Fupload_img%2F2017%2F12%2F28%2Fu_13247643007%2F151447815522.jpg&refer=http%3A%2F%2Fwh.28life.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664629331&t=ebfd7014b06a3b28c2dd7c4290093271',
			// 		'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.2ge.cn%2Fgroup1%2FM00%2F02%2FCD%2FwKgBPFts7U2AL2nJAANbVDfzFAE955.jpg&refer=http%3A%2F%2Fimage.2ge.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667388805&t=52cc1fc3e6d2a0642d25a3de480f716f'
			// 	]
			// },
		],
        archiveId: "",  // 经纪人id
        cityId: "",
        caseId: "",
        caseType: "",
        resource: "",
        houseName: "",
        pageFrom: "list",  //  进入的来源 list代表列表和搜索, im代表聊天进入 entrust 代表委托
        topNameItem: {},
        houseDes: null,
        buildDesItem: {},
        priceTrendItem: {},
        buildExpertItem: {},  // 小区专家模块字段
        trafficInfoItem: {},
        nearInfoItem: {},
        nearMapItem: {},
        nearErHouseList: [],
        nearNewHouseList: [],
        guaPaiAgentList: [],
        bottomAgentInfo: {},
        sheshiData: [
							{'iconUrl':'../../../static/home/detail/xiyiji-bak.svg','text':'洗衣机',isShow:false,hIconUrl:'../../../static/home/detail/xiyiji.svg'}, 
							{'iconUrl':'../../../static/home/detail/bingxiang-bak.svg','text':'冰箱',isShow:false,hIconUrl:'../../../static/home/detail/bingxiang.svg'},
							{'iconUrl':'../../../static/home/detail/dianshi-bak.svg','text':'电视',isShow:false,hIconUrl:'../../../static/home/detail/dianshi.svg'},
							{'iconUrl':'../../../static/home/detail/kongtiao-bak.svg','text':'空调',isShow:false,hIconUrl:'../../../static/home/detail/kongtiao.svg'},
							{'iconUrl':'../../../static/home/detail/reshuiqi-bak.svg','text':'热水器',isShow:false,hIconUrl:'../../../static/home/detail/reshuiqi.svg'},
							{'iconUrl':'../../../static/home/detail/ranqi-bak.svg','text':'燃气灶',isShow:false,hIconUrl:'../../../static/home/detail/ranqi.svg'},
							{'iconUrl':'../../../static/home/detail/nuanqi-bak.svg','text':'暖气',isShow:false,hIconUrl:'../../../static/home/detail/nuanqi.svg'},
							{'iconUrl':'../../../static/home/detail/wifi-bak.svg','text':'网络',isShow:false,hIconUrl:'../../../static/home/detail/wifi.svg'},
							{'iconUrl':'../../../static/home/detail/weibolu-bak.svg','text':'微波炉',isShow:false,hIconUrl:'../../../static/home/detail/weibolu.svg'}, 
							{'iconUrl':'../../../static/home/detail/diancilu-bak.svg','text':'电磁炉',isShow:false,hIconUrl:'../../../static/home/detail/diancilu.svg'},
					],
		feiyongData: [
				{'title':'付款方式','value':'-'},
				{'title':'租金','value':'-'},
				{'title':'押金','value':'-'},
				{'title':'服务费','value':'-'},
				{'title':'中介费','value':'-'},
				{'title':'','value':'-'},
				{'title':'取暖费','value':'-'},
				{'title':'无线费','value':'-'},
				{'title':'物业费','value':'-'},
				{'title':'水电费','value':'-'},
			],
		zulinData: [],
		diliData: [{}],

        housePhone: "", // 按月付的电话
        openHuabei: "",  // 是否开通花呗 0:未开通，1:已开通

        showBackIndex: false,
        shareInfoFlag: false,  // 是否显示 例如: pageFrom = personal
        activity: 0,  // 具体干什么的暂时还不清楚(感觉像是判断是否是真房源的) B端分享会带这个参数 等于1时会调用B段分享接口

        // 撩客文案
        liaoKeTips: {
          tips: "",
          archiveId: "",
          show: false
        },
      };
    },
	methods:{
		
		//初始化数据
		initData(){
			// 轮播图 img 数据初始化
			this.swiperImgInit()
			//费用数据初始化
			this.coseDataInit()
			//地图展示
			// this.showMap()
			// 配套设施展示
			this.showSupport()
			//租赁信息
			this.initzulinData()
			
		},
		swiperImgInit(){
			let obj={
				url:'',
				type:'img',
				urls:[]
			}
			let imgUrl=this.detailData.imgUrl
			if(imgUrl){
				imgUrl=imgUrl.split(',')
			}
			// console.log(imgUrl)
			obj.urls=imgUrl
			for(let i=0;i<imgUrl.length;i++){
				obj.url=imgUrl[i]
				this.swiperList.push(obj)
			}
		},
		coseDataInit(){
			this.feiyongData[0].value=this.detailData.payType//支付方式
			this.feiyongData[1].value=this.detailData.money//租金
			this.feiyongData[2].value=this.detailData.mortgageMoney//押金
			this.feiyongData[3].value=this.detailData.serviceMoney+'元'//服务费
			this.feiyongData[4].value=this.detailData.proxyMoney+'元'//中介费
			this.feiyongData[6].value=this.detailData.heatMoney+'元' //取暖费
			this.feiyongData[7].value=this.detailData.wifiMoney+'元' //无线费用
			this.feiyongData[8].value=this.detailData.manageMoney+'元' //物业费
			this.feiyongData[9].value=this.detailData.waterElectricMoney+'元' //水电费
		},
		initzulinData(){
			let roommate=this.detailData.roommate
			roommate.forEach((item,index)=>{
				let otherInfo=''
				if(item.tenatStr){
					otherInfo=item.tenatStr.split('-')
				}				
				let money=''
				let sex=''
				if(otherInfo[1] instanceof Number){
					money=otherInfo[1]
				}else if(otherInfo[1] instanceof String){
					sex=otherInfo[1]
				}
				let obj={
					house:item.name,
					status:otherInfo[0],
					sex:sex,
					money:money,
					size:otherInfo[2]
				}
				this.zulinData.push(obj)
			})
		},
		showMap(){
			let that=this
			console.log('展示地图')
			console.log(that.detailData.latitude)
			console.log(that.detailData.longitude)
			uni.openLocation({
						latitude: that.detailData.latitude,
						longitude: that.detailData.longitude,
						success: function () {
							console.log('success');
						}
					});
		},
		//举报，收藏，
		report(index){
			let params={
				"userId": this.$store.state.userInfo.id,
				"roomId": this.detailData.id,
			}
			// 1 举报  2 收藏  3立即沟通
			switch (index){
				case 1:
				params['complain']=1
				this.statistics(params)
				break;
				case 2:
				params['collection']=1
				this.statistics(params)
				break;
				case 3:
				params['chat']=1
				uni.navigateTo({
					url:'/pages/tabbar/community/tools/news?houseId='+this.detailData.id+'&userId='+this.detailData.userId
				})
				break;
			}
		},
		statistics(params){
			uni.request({
				method:'POST',
				url:'http://81.70.163.240:11001/zf/v1/const/save/statistics',
				data:params,
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + that.$store.state.token
				},
				success(res){
					console.log(res)
				}
			})
		},
		showSupport(){
			console.log(this.detailData)
			let support=this.detailData.support
			if(support){
				support=support.split(',')
				this.sheshiData.forEach(item=>{
					if(support.indexOf(item.text)!=-1){
						item.isShow=true
						item.iconUrl=item.hIconUrl
						
					}
				})
			}
		}
	}
}
  //   onShareAppMessage() {
  //     let that = this;
  //     let path = "/pagesHouse/erHouseDetail/erHouseDetail";
  //     let index = 0;
  //     for (let key in paramsConfig) {
  //       index++;
  //       if (index == 1) {
  //         path += ("?" + key + "=" + paramsConfig[key]);
  //         continue;
  //       }

  //       path += ("&" + key + "=" + paramsConfig[key]);
  //     }
  //     return new this.ShareAppMessage(path, that.houseName, shareAppMessageMap["des"]).init(function () {
  //       that.UserBehavior.shareAppMessage();
  //     });
  //   },

  //   onLoad(params = {}) {
  //     params.resource = params.resource || 1;
  //     let that = this;
  //     //二维码进入详情页
  //     if (!!params.scene) {
  //       // 采集数据 - lh
  //       uni.setStorageSync('imSourceTypeId', 3301);
  //       this.sourceTypeId = 2301;

  //       let sceneStr = params.scene;
  //       // #ifdef MP-WEIXIN
  //       sceneStr = decodeURIComponent(sceneStr);
  //       // #endif
  //       console.log('scene:', sceneStr);
  //       let scene = sceneStr.split('&');

  //       //老的错误代码识别 ["1", "7791475", "1", "1335879", ""]
  //       // 错误格式（因以前 最新好房格式未兼容） $scene = "{$caseType}&{$caseId}&{$cityId}&{$archiveId}&{$archiveUserId}";
  //       // 正确格式                            $scene = "{$caseType}&{$resource}&{$cityId}&{$caseId}&{$archiveId}";
  //       if (!scene[4] || scene[4] == '') {
  //         let sceneErr = sceneStr.split('&')
  //         scene[0] = sceneErr[0]; //caseType
  //         scene[1] = '1'; //resource
  //         scene[2] = sceneErr[2]; //cityId
  //         scene[3] = sceneErr[1]; //caseId
  //         scene[4] = sceneErr[3]; //archiveId
  //       }

  //       console.log('scene:', scene);
  //       if (scene.length >= 3) {
  //         params.caseType = scene[0];
  //         params.resource = scene[1];
  //         params.cityId = scene[2];
  //         params.caseId = scene[3];
  //         params.archiveId = scene[4];
  //         //二维码进入详情页 (有经纪人) 也可以参与新用户赚现金活动
  //         if (!!params.archiveId) {
  //           params.pageFrom = 'zshft';
  //           params.caseType = scene[0];
  //           params.resource = scene[1];
  //           params.cityId = scene[2];
  //           params.caseId = scene[3];
  //           params.archiveId = scene[4];
  //           params.activity = 1;
  //         }
  //         //二维码进入详情页做个单独标记
  //         privateData.scanEnter = true;
  //       }
  //     } else {
  //       // 采集数据 - lh
  //       uni.setStorageSync('imSourceTypeId', 3201);
  //       this.sourceTypeId = 2201;
  //     }
  //     // 数据采集
  //     this.shareOption = {
  //       archiveId: params.archiveId || '',
  //       cityId: params.cityId || '',
  //       caseId: params.caseId || '',
  //       caseType: params.caseType || ''
  //     };
  //     let me = new UserInfoModel().getModel("me") || {};
  //     new ShareVisiting().behavior({
  //       archiveId: params.archiveId || '', // 经济人档案id
  //       cUserId: me.userId || '', // c端用户id，分享时无
  //       caseId: params.caseId || '', // 房源id
  //       caseType: +params.caseType === 1 ? 1 : 2, // 房源类型：1.出售，2.出租，6.新盘
  //       cityId: params.cityId || '',
  //       sourceType: this.sourceTypeId, // 统计子分类
  //       statisType: 2, // 统计类型：1->B端推广分享，2->C端浏览，3->C端咨询，4-->B端回复咨询，5-->约看
  //       appSource: 'zdzf-erHouseDetail-1'
  //     }).then(res => {
  //       console.log(res)
  //     });

  //     privateData.isAboutTake = params.isAboutTake || false;
  //     new GetCityMap().getCityId(params.cityId || "", function (id) {
  //       params.cityId = id;
  //       that.upData(params || {});
  //       paramsConfig = params || {};
  //       that.initData((res) => {
  //         // 初始化用户行为统计的信息
  //         that.loadingReqeust = false;
  //         let data = res.DATA || {};
  //         if (Object.keys(data).length === 0) return;

  //         if (!data.archiveId || !that.caseId || !data.caseType) return;

  //         //平台用户来源采集(标记) 20191112 IM优化需求
  //         new SaveCclientUserType().behavior({
  //           archiveId: that.shareOption.archiveId ? that.shareOption.archiveId : data.archiveId, // 经济人档案id
  //           sourceType: that.shareOption.archiveId ? 2 : 1, //sourceType 1 = 平台， 2 = 私有
  //         }).then(res => {
  //           console.log(res)
  //         });

  //         let item = new that.HouseDetailParamsItem();
  //         item.ownerArchiveId = data.archiveId || "";
  //         item.caseType = data.caseType || "";
  //         item.caseId = that.caseId || "";
  //         item.intentionalityRegionName = data.regionName || "";
  //         item.intentionalityRoom = data.houseRoom || "";
  //         item.intentionalityHousePrice = data.houseTotalPrice || "";
  //         item.cityId = data.cityId || "";

  //         let houseInfo = "";
  //         if (data.houseRoom) {
  //           houseInfo += data.houseRoom + "室 ";
  //         }
  //         if (data.houseArea) {
  //           houseInfo += data.houseArea + "㎡ ";
  //         }
  //         if (data.houseTotalPrice) {
  //           houseInfo += data.houseTotalPrice + (data.caseType == 1
  //             ? "万" : (data.priceUnitCn || ""));
  //         }
  //         that.PlatformUserBehavior.enterHouse(item,
  //           {houseName: data.buildName, houseInfo: houseInfo}
  //         );

  //         // APP分享专用
  //         new GetCityMap().getCityKey(paramsConfig.cityId || "").then(cityKey => {
  //           // 分享小程序配置项
  //           let imgUrl = that.swiperList.length > 0 && that.swiperList[0].url
  //             ? Const.getDealCdnImgUrl(that.swiperList[0].url)
  //             : Const.houseDefaultImg;
  //           let path = "/pagesHouse/erHouseDetail/erHouseDetail";
  //           paramsConfig["archiveId"] = paramsConfig["archiveId"] || data.archiveId || "";
  //           const noDealKey = ["resource", "houseName"];
  //           for (let key in paramsConfig) {
  //             if (noDealKey.includes(key)) continue;

  //             if (path.indexOf("?") >= 0) {
  //               path += `&${key}=${paramsConfig[key]}`;
  //               continue;
  //             }

  //             path += `?${key}=${paramsConfig[key]}`;
  //           }

  //           // 分享网页到朋友圈配置项
  //           let webUrl = "https://m.haofang.net/" + cityKey + "/ershoufang/" +
  //             +paramsConfig["caseId"] + "_" + (paramsConfig["resource"] || 1)
  //             + ".html";
  //           // 初始化分享按钮和事件
  //           privateData.shareObj = new InitShareMenu([
  //             new ShareWxAppToSession(imgUrl, path, that.topNameItem.houseDes),
  //             new ShareWxWebToTimeline(imgUrl, webUrl, that.topNameItem.houseDes),
  //             new ShareWebToQQSession(imgUrl, webUrl, that.topNameItem.houseDes),
  //             new ShareWebToWeiBoTimeline(imgUrl, webUrl, that.topNameItem.houseDes)
  //           ]);
  //           privateData.shareObj.init();
  //         });
  //       });
  //     });
  //   },

  //   onShow() {
  //     if (privateData.DealLiaoKeDetail) {
  //       privateData.DealLiaoKeDetail.enterHouse(privateData.viewStopTime, privateData.bubbleTime);
  //     }
  //     new this.SetMetaInfo().initDefault();
  //     // 监听地图btn事件
  //     new Notification().addObserver(this, "NearInfoMapBtnChanged", Notify.NearInfoMapBtnChanged.Name);

  //     // 监听用户信息授权
  //     new Notification().addObserver(this, "UserInfoChanged", Notify.UserInfoChanged.Name);

  //     // 撩客消息回调
  //     new Notification().addObserver(this, "LiaoKeChartChanged", Notify.LiaoKeChartChanged.Name);
  //   },

  //   onHide() {
  //     if (privateData.shareObj && typeof (privateData.shareObj.hide) !== "undefined") {
  //       privateData.shareObj.hide();
  //     }
  //     this.closeLiaoKeTip();
  //     if (privateData.DealLiaoKeDetail) {
  //       privateData.DealLiaoKeDetail.leaveHouse();
  //     }
  //     // 反注册通知
  //     new Notification().removeObserverAllNotification(this);
  //   },

  //   onUnload() {
  //     if (privateData.shareObj && typeof (privateData.shareObj.hide) !== "undefined") {
  //       privateData.shareObj.hide();
  //     }
  //     // 反注册通知
  //     new Notification().removeObserverAllNotification(this);
  //     this.PlatformUserBehavior.leaveHouse();
  //     if (privateData.DealLiaoKeDetail) {
  //       privateData.DealLiaoKeDetail.leaveHouse();
  //     }
  //   },

  //   // 原生按钮点击事件
  //   onNavigationBarButtonTap(e) {
  //     if (!e.id) return;

  //     if (e.id !== "share") return;

  //     privateData.shareObj.show();
  //   },

  // methods: {
  //     // 小区专家数量change
  //     villageExpertListChange(list) {
  //       if (!list || list.length === 0) {
  //         this.haveVillageExpert = false;
  //       } else {
  //         this.haveVillageExpert = true;
  //       }
  //     },

  //     // 撩客消息回调
  //     LiaoKeChartChanged(name, info) {
  //       console.error(info);
  //       let UpAgentHouseTipsMap = UpAgentHouseTips.getData(info.archiveId);
  //       UpAgentHouseTipsMap.alreadyShowTip = true;
  //       UpAgentHouseTipsMap.alreadyShowCollectTips = true;
  //       UpAgentHouseTips.setData(info.archiveId, UpAgentHouseTipsMap);
  //       this.liaoKeTips = {
  //         tips: info.tips,
  //         archiveId: info.archiveId,
  //         show: true
  //       };
  //     },

  //     // 收藏后的回调
  //     OnCollectChanged() {
  //       if (privateData.DealLiaoKeDetail) {
  //         privateData.DealLiaoKeDetail.collectHouse()
  //       }
  //     },

  //     lookMoreHouseList(pageName) {
  //       uni.navigateTo({
  //         url: "/pagesHouse/" + pageName + "/" + pageName
  //       });
  //     },

  //     // 用户信息授权通知回调
  //     UserInfoChanged() {
  //       let me = new UserInfoModel().getModel("me") || {};
  //       new ShareVisiting().behavior({
  //         archiveId: this.shareOption.archiveId || '', // 经济人档案id
  //         cUserId: me.userId || '', // c端用户id，分享时无
  //         caseId: this.shareOption.caseId || '', // 房源id
  //         caseType: +this.shareOption.caseType === 1 ? 1 : 2, // 房源类型：1.出售，2.出租，6.新盘
  //         cityId: this.shareOption.cityId || '',
  //         sourceType: this.sourceTypeId, // 统计子分类
  //         statisType: 2, // 统计类型：1->B端推广分享，2->C端浏览，3->C端咨询，4-->B端回复咨询，5-->约看
  //         appSource: 'zdzf-erHouseDetail-2'
  //       }).then(res => {
  //         console.log(res)
  //       });
  //       //平台用户来源采集(标记) 20191112 IM优化需求
  //       new SaveCclientUserType().behavior({
  //         archiveId: this.shareOption.archiveId ? this.shareOption.archiveId : this.archiveId, // 经济人档案id
  //         sourceType: this.shareOption.archiveId ? 2 : 1, //sourceType 1 = 平台， 2 = 私有
  //       }).then(res => {
  //         console.log(res)
  //       })

  //       this.initData();
  //     },

  //     lookMap() {
  //       new Notification().postNotification(Notify.NearInfoMapBtnChanged.Name
  //         , {item: {type: "transit", text: "公交"}, index: 0});
  //     },

  //     NearInfoMapBtnChanged(name, info) {
  //       this.PlatformUserBehavior.lookMapNear();
  //       uni.navigateTo({
  //         url: "../nearInfoMap/nearInfoMap?name=" + this.houseName + "&type=" + info.item.type
  //           + "&lat=" + this.nearMapItem.lat + "&lng=" + this.nearMapItem.lng + "&index=" + (info.index || 0)
  //           + "&text=" + info.item.text
  //       });
  //     },

  //     // 初始化data传递参数
  //     upData(item) {
  //       let dataKeys = ["cityId", "caseId", "caseType", "resource", "houseName", "pageFrom", "archiveId", "activity"];
  //       dataKeys.map((val) => {
  //         if (item[val]) {
  //           this[val] = item[val];
  //         }
  //       });
  //       // zshft 掌通
  //       let pageFromMpas = ["personalStore", "im", "entrustDetail", "zshft"];
  //       if (pageFromMpas.indexOf(this.pageFrom) >= 0) {
  //         this.shareInfoFlag = true;
  //       } else {
  //         this.shareInfoFlag = false;
  //       }
  //     },

  //     // 检查参数朱否满足
  //     checkParams() {
  //       let keys = ["cityId", "caseId", "caseType", "resource"];
  //       let boolean = true;
  //       let hasKeys = [];
  //       keys.map((val) => {
  //         if (!this[val]) {
  //           hasKeys.push(val);
  //           boolean = false;
  //         }
  //       });

  //       return {
  //         boolean: boolean,
  //         key: hasKeys.join("/")
  //       };
  //     },

  //     initData(callback = function () {
  //     }) {
  //       let checkRes = this.checkParams();
  //       if (!checkRes.boolean) {
  //         uni.showToast({
  //           title: checkRes.key + "未配置",
  //           icon: "none",
  //         });
  //         return Promise.reject(checkRes.key + "未配置");
  //       }

  //       if (this.houseName) {
  //         uni.setNavigationBarTitle({
  //           title: this.houseName
  //         });
  //       }
  //       this.initDraw();
  //       do {
  //         if (this.archiveId) {
  //           Promise.all([
  //             new GetAgentInfo({archiveId: this.archiveId}).send(),
  //             this.getHouseDetail()
  //           ]).then(res => {
  //             let agentData = res[0].DATA || {};
  //             let agentInfo = {
  //               currUserPhotoUrlPath: agentData.USER_PHOTO || "",
  //               currUserName: agentData.USER_NAME || "",
  //               currUserMobile: agentData.USER_MOBILE || "",
  //               archiveId: this.archiveId
  //             };
  //             agentInfo.currUserPhotoUrlPath = !agentInfo.currUserPhotoUrlPath
  //               ? Const.imDefaultHeadImg
  //               : agentInfo.currUserPhotoUrlPath.indexOf("/Public/wxApp/images/detail/fang_default.png") >= 0
  //                 ? Const.imDefaultHeadImg
  //                 : agentInfo.currUserPhotoUrlPath;
  //             this.dealDetailDraw(res[1], agentInfo);
  //             callback(res[1]);
  //           });
  //           break;
  //         }

  //         if (paramsConfig.buildId && paramsConfig.compId) {
  //           Promise.all([
  //             new GetBiddBuilderInfo({
  //               cityId: this.cityId,
  //               buildId: paramsConfig.buildId,
  //               compId: paramsConfig.compId
  //             }).send(),
  //             this.getHouseDetail()
  //           ]).then(res => {
  //             let data = res[0].data || {};
  //             let agentInfo = {
  //               currUserPhotoUrlPath: data.buildOwnerPicUrl || "",
  //               currUserName: data.buildOwnerName || "",
  //               currUserMobile: data.USER_MOBILE || "",
  //               archiveId: data.buildOwnerArchiveId || "",
  //               starLevel: data.starLevel || ""
  //             };
  //             this.dealDetailDraw(res[1], agentInfo);
  //             callback(res[1]);
  //           });
  //           break;
  //         }

  //         this.getHouseDetail().then(res => {
  //           this.dealDetailDraw(res);
  //           callback(res);
  //         });
  //       } while (false);
  //       this.dealTrueHouseShare();
  //     },
  //     // 处理B端真房源分享
  //     dealTrueHouseShare() {
  //       let me = new UserInfoModel().getModel("me") || {};
  //       if (!me.openId || !me.userId || !this.archiveId || this.activity != 1) return;

  //       new StimulerBroker({
  //         openId: me.openId,
  //         caseType: this.caseType,
  //         cityId: this.cityId,
  //         caseId: this.caseId,
  //         shareArchiveId: this.archiveId,
  //         youyouUserId: me.userId
  //       }).send();
  //     },
  //     // 获取详情数据
  //     getHouseDetail() {
  //       let me = new UserInfoModel().getModel("me") || {};
  //       let requestNet = GetErHouseDetail;
  //       if (this.caseType == 3) {
  //         requestNet = GetUuErHouseDetail;
  //       }
  //       return (new requestNet({
  //         caseId: this.caseId,
  //         caseType: this.caseType,
  //         cityId: this.cityId,
  //         reSource: this.resource,
  //         shareArchiveId: this.archiveId,
  //         youyouUserId: me.userId || "",
  //       })).send().catch((err) => {
  //         uni.showModal({
  //           title: "温馨提示",
  //           content: "获取房源详情失败啦！请稍后重试。",
  //           showCancel: false,
  //           success() {
  //             let pages = getCurrentPages() || [];
  //             if (pages.length === 0) {
  //               uni.reLaunch({
  //                 url: "/pages/index/index"
  //               });
  //               return;
  //             }

  //             uni.navigateBack({
  //               delta: 1
  //             });
  //           }
  //         });
  //         return err;
  //       })
  //     },
  //     // 处理详情数据
  //     dealDetailDraw(res = {}, agentInfo = {}, callback = function () {
  //     }) {
  //       callback(res);
  //       let that = this;
  //       let data = res.DATA || {};
  //       if (res.STATUS != 1 || data.houseIsExist != 1) {
  //         uni.showModal({
  //           confirmColor: "#ab7f2e",
  //           confirmText: "我知道了",
  //           showCancel: false,
  //           title: "",
  //           content: res.INFO || "该房源已下架",
  //           success(info) {
  //             let pages = getCurrentPages() || [];
  //             if (pages.length === 0) {
  //               uni.reLaunch({
  //                 url: "/pages/index/index"
  //               });
  //               return;
  //             }

  //             uni.navigateBack({
  //               delta: 1
  //             });
  //           }
  //         });
  //         return res;
  //       }

  //       this.archiveId = this.archiveId || data.archiveId || "";
  //       // 撩客初始化 resource = 1 (erp房源)才撩客
  //       if (data.resource == 1) {
  //         privateData.DealLiaoKeDetail = new DealLiaoKeDetail(
  //           this.archiveId || data.archiveId || "",
  //           10, data.cityId || "", data.vipCaseId || "",
  //           data.caseType || ""
  //         );
  //         privateData.viewStopTime = (data.viewStopTime || 60);
  //         privateData.bubbleTime = (data.bubbleTime || 300);
  //         privateData.DealLiaoKeDetail.enterHouse(
  //           (data.viewStopTime || 60),
  //           (data.bubbleTime || 300)
  //         );
  //         privateData.DealLiaoKeDetail.checkHideEnterTip(
  //           (data.bubbleTime || 300),
  //           function () {
  //             that.closeLiaoKeTip();
  //           }
  //         );
  //         privateData.DealLiaoKeDetail.checkShowCollectTips(function (val, tips = "") {
  //           if (val) {
  //             let liaoKeTips = that.liaoKeTips;
  //             liaoKeTips.tips = tips;
  //             liaoKeTips.show = val;
  //             that.liaoKeTips = liaoKeTips;
  //           }
  //         });
  //       }

  //       if (agentInfo.archiveId) {
  //         data["starLevel"] = agentInfo["starLevel"] || "";
  //         data["currUserPhotoUrlPath"] = agentInfo["currUserPhotoUrlPath"] || "";
  //         data["currUserName"] = agentInfo["currUserName"] || "";
  //         data["currUserMobile"] = agentInfo["currUserMobile"] || "";
  //         data["archiveId"] = agentInfo["archiveId"] || "";
  //       } else if (data.shareBrokerInfoVO && data.shareBrokerInfoVO.shareArchiveId) {
  //         data["starLevel"] = data.shareBrokerInfoVO["starLevel"] || "";
  //         data["currUserPhotoUrlPath"] = data.shareBrokerInfoVO["userPhoto"] || "";
  //         data["currUserName"] = data.shareBrokerInfoVO["userName"] || "";
  //         data["currUserMobile"] = data.shareBrokerInfoVO["userMobile"] || "";
  //         data["archiveId"] = data.shareBrokerInfoVO["shareArchiveId"] || "";
  //       } else {
  //         data["starLevel"] = agentInfo["starLevel"]
  //           || data["starLevel"]
  //           || "";
  //         data["currUserPhotoUrlPath"] = agentInfo["currUserPhotoUrlPath"]
  //           || data["currUserPhotoUrlPath"]
  //           || "";
  //         data["currUserName"] = agentInfo["currUserName"]
  //           || data["currUserName"]
  //           || "";
  //         data["currUserMobile"] = agentInfo["currUserMobile"]
  //           || data["currUserMobile"]
  //           || "";
  //         data["archiveId"] = agentInfo["archiveId"]
  //           || data["archiveId"]
  //           || "";
  //       }
  //       new HouseDetailModel().setModel(data, hex_md5(this.caseId + this.caseType + this.cityId + this.resource));
  //       this.initDraw();

  //       // 设置一下参数
  //       if (res.deptId && res.cityId) {
  //         new GetAdminDeptIdByErpDeptId({
  //           cityId: res.cityId, erpId: res.deptId
  //         }).send().then(res => {
  //           if (res.data) {
  //             //设置分享经纪人ID的缓存
  //             new CompStoreAdminDeptIdModel().setModel(res.data);
  //           }
  //         });
  //       } else {
  //         // 设置门店ID的缓存
  //         new CompStoreDeptIdModel().setModel(res.deptId);
  //       }
  //       new CompStoreArchiveIdModel().setModel(this.archiveId);
  //       new CompStoreCompIdModel().setModel(res.compId || "");
  //       new CompStoreCityIdModel().setModel(res.cityId || "");
  //       if (res.compId && (res.compId == "279104" || res.compId == "56273")) {
  //         this.fromSource = "jk";
  //       }
  //     },

  //     // 撩客文案点击跳转到im
  //     goToImDetail() {
  //       this.closeLiaoKeTip();
  //       let me = new UserInfoModel().getModel("me") || {};
  //       let url = "/pagesTool/messageDetail/messageDetail";
  //       uni.navigateTo({
  //         url: url + '?messageId=' + this.bottomAgentInfo.archiveId
  //           + "&userId=" + me.userId + "&openId=" + me.openId
  //       });
  //     },
  //     // 关闭撩客文案
  //     closeLiaoKeTip() {
  //       let liaoKeTips = this.liaoKeTips;
  //       liaoKeTips.show = false;
  //       this.liaoKeTips = liaoKeTips;
  //     },

  //     initDraw() {
  //       if (!new HouseDetailModel().getModel(hex_md5(this.caseId + this.caseType + this.cityId + this.resource))) {
  //         return;
  //       }

  //       let data = new HouseDetailModel().getModel(hex_md5(this.caseId + this.caseType + this.cityId + this.resource)) || {};
  //       this.upSwiperList(data);
  //       this.upTopNameIfno(data);
  //       this.upHouseEveryMonthPay(data);
  //       this.upHouseDes(data);
  //       this.upBuildDes(data);
  //       this.upPriceTrend(data);
  //       this.upBuildExpert(data);
  //       this.upTrafficInfo(data);
  //       this.upNearInfo(data);
  //       this.upNearMapInfo(data);
  //       this.upErHouseList(data);
  //       this.upNewHouseList(data);
  //       this.upGuaPaiAgentList(data);
  //       this.upBottomAgentInfo(data);
  //       this.upPeiTaoSheShiList(data);
  //       this.loadingReqeust = false;
  //     },
  //     upSwiperList(data) {
  //       let imgList = data.photoList || [];
  //       let swiperList = [];
  //       imgList.map((val) => {
  //         if (val.picUrl) {
  //           swiperList.push({
  //             url: val.picUrl || Const.houseDefaultImg,
  //             type: "img",
  //             sourceUrl: ""
  //           });
  //         }
  //       });
  //       let vrUrl = Config.vrWeb + '?CITY_ID='
  //         + this.cityId + '&CASE_TYPE=' + this.caseType + '&CASE_ID='
  //         + this.caseId + '&SOURCE=WEB&SSL=1';
  //       if (data.shareArchiveId && data.shareArchiveId > 0) {
  //         vrUrl += '&ARCHIVE_ID=' + data.shareArchiveId;
  //       }
  //       vrUrl += "&APP_SOURCE=" + this.Const.APP_SOURCE;
  //       if (data.videoTopPicUrlPath && data.videoUrlPath) {
  //         swiperList.unshift({
  //           url: data.videoTopPicUrlPath || Const.houseDefaultImg,
  //           type: "video",
  //           sourceUrl: data.videoUrlPath,
  //         });
  //       }
  //       if (data.panoramaMap && data.panoramaMap > 0 && data.panoramaThumbUrl) {
  //         swiperList.unshift({
  //           url: data.panoramaThumbUrl || Const.houseDefaultImg,
  //           type: "vr",
  //           sourceUrl: vrUrl,
  //           name: this.houseName
  //         });
  //         this.swiperList = swiperList;
  //       }
  //       // 返回的沒有vr首图，则调用接口
  //       else if (data.panoramaMap && data.panoramaMap > 0 && !data.panoramaThumbUrl) {
  //         new GetVRFirstPhoto({
  //           caseId: this.caseId,
  //           caseType: this.caseType,
  //           cityId: this.cityId
  //         }).send().then((res) => {
  //           if (res.STATUS != 1 || !res.data) {
  //             this.swiperList = swiperList;
  //             return;
  //           }

  //           swiperList.unshift({
  //             url: res.data || Const.houseDefaultImg,
  //             type: "vr",
  //             sourceUrl: vrUrl,
  //             name: this.houseName
  //           });
  //           this.swiperList = swiperList;
  //         }).catch(() => {
  //           this.swiperList = swiperList;
  //         });
  //       } else {
  //         this.swiperList = swiperList;
  //       }
  //     },
  //     upTopNameIfno(data) {
  //       let cityInfo = new GpsInfoModel().getModel("cityInfo") || {};
  //       let cityName = cityInfo.cityName || "";
  //       let louCeng = data.houseFloor && data.houseFloors
  //         ? data.houseFloor + "/" + data.houseFloors + "层" : "";
  //       if (data.caseType == 3) {
  //         louCeng = data.houseFloor || "";
  //       }
  //       shareAppMessageMap["des"] = data.houseSubject || "";
  //       this.houseName = data.buildName || "";
  //       uni.setNavigationBarTitle({
  //         title: this.houseName
  //       });
  //       this.topNameItem = {
  //         buildId: data.buildId || "",
  //         houseDes: data.houseSubject || "",
  //         isHeZu: data.isHezu || "",
  //         isCollected: !!(data.isCollected && data.isCollected == 1),
  //         totalPrice: data.houseTotalPrice || "",
  //         unitPrice: data.houseUnitPrice ? data.houseUnitPrice + "元/㎡" : "",
  //         houseInfo: (data.houseRoom && data.houseRoom.indexOf("-") < 0 ? data.houseRoom + "室" : "")
  //           + (data.houseHall && data.houseHall.indexOf("-") < 0 ? data.houseHall + "厅" : "")
  //           + (data.houseWei && data.houseWei.indexOf("-") < 0 ? data.houseWei + "卫" : ""),
  //         houseRoom: data.houseRoom && data.houseRoom.indexOf("-") < 0 ? data.houseRoom : "",
  //         houseArea: data.houseArea ? data.houseArea + "㎡" : "",
  //         houseAreaNumber: data.houseArea ? data.houseArea : "",
  //         houseChao: data.houseDirectCn && data.houseDirectCn != "--" ? "朝" + data.houseDirectCn : "",
  //         houseChaoText: data.houseDirectCn && data.houseDirectCn != "--" ? data.houseDirectCn : "",
  //         houseTags: data.houseTagDesc ? data.houseTagDesc.split("|") : [],
  //         zhaungXiu: data.houseFitmentCn || "",
  //         louCeng: louCeng,
  //         maxFloor: data.houseFloors || 0,
  //         currentFloor: data.houseFloor || "",
  //         nianDai: data.houseYear || "",
  //         isTrueHouse: !!(data.trueFlag && data.trueFlag == 1),
  //         caseId: this.caseId,
  //         cityId: this.cityId,
  //         reSource: this.resource,
  //         buildName: data.buildName || "",
  //         archiveId: data.archiveId || "",
  //         checkCodeFun: data.checkCodeFun || "",
  //         checkCodeFunUrl: data.checkCodeFunUrl || "",
  //         checkCodeCityName: data.checkCodeCityName || "",
  //         houseUseageCn: data.houseUseageCn || "",
  //         caseType: data.caseType || "",
  //         priceUnitCn: data.priceUnitCn || "",
  //         houseUseage: data.houseUseage || "",
  //         fuKuan: data.caseAccountCn || "",
  //         yaJin: data.leaseDeposit || "",
  //         sex: data.sexLimit || "0",
  //         fangJian: data.houseType || "0"
  //       };
  //       let title = "", keywords = "", description = "";
  //       uni.setNavigationBarTitle({
  //         title: data.buildName || ""
  //       });
  //       do {
  //         if (this.caseType == 1) {
  //           title = `【${data.buildName}二手房】${data.houseArea}平米${data.houseTotalPrice}万精致${this.topNameItem.houseInfo} - ${cityName}悠居客`;
  //           keywords = `${cityName}二手房,${data.regionName}二手房,${data.buildName}二手房,${this.topNameItem.houseInfo}二手房`;
  //           description = `${data.buildName}精致${this.topNameItem.houseInfo}，售价：${data.houseTotalPrice}万（${this.topNameItem.unitPrice}）;${this.topNameItem.nianDai}建；类型：${data.buildUsage} 楼层：${this.topNameItem.louCeng}；装修：${this.topNameItem.zhaungXiu}，买二手房就到${cityName}悠居客。`;
  //           break;
  //         }

  //         title = `【${data.sectionName}租房】${data.houseArea}平米${data.houseTotalPrice}元此房位置可以出行方便公交地铁有钥匙 - ${cityName}悠居客`;
  //         keywords = `${cityName}租房,${data.regionName}租房,${data.sectionName}租房,${this.topNameItem.houseInfo}租房`;
  //         description = `此房位置出行方便公交地铁有钥匙${data.houseTotalPrice}元/月，是${cityName}${data.regionName}不错的居家选择！，买二手房就到${cityName}悠居客。`;
  //       } while (false);
  //       new this.SetMetaInfo().init(title, keywords, description);
  //     },
  //     upHouseEveryMonthPay(data) {
  //       this.housePhone = data.currUserMobile || "";
  //       this.openHuabei = data.openHuabei || 0;
  //     },
  //     upHouseDes(data) {
  //       this.houseDes = data.houseDesc ? decodeURIComponent(data.houseDesc) : "";
  //     },
  //     upBuildDes(data) {
  //       console.error("--data--", data);
  //       this.buildDesItem = {
  //         wuYeType: data.houseUseageCn || "",
  //         jianZhuType: data.buildType || "",
  //         chanQuanNianXIan: data.rightYears || "",
  //         wuYeFei: data.costStandard || "",
  //         luHuaLv: data.projectGreen || "",
  //         rongJiLv: data.projectSpace || "",
  //         junGongTime: data.submitDate || "",
  //         kaiFaShang: data.builder || "",
  //         wuYeGongSi: data.propertyComp || "",
  //         xiaoQuGaiKuang: data.buildDescript ? decodeURIComponent(data.buildDescript) : ""
  //       };
  //       console.error("--this.buildDesItem--", this.buildDesItem);
  //     },
  //     upPriceTrend(data) {
  //       if (!data.buildId) return;

  //       new GetBuildPriceTrend({cityId: this.cityId, buildId: data.buildId}).send()
  //         .then(res => {
  //           let newData = res.DATA || {};
  //           newData.ratioByLastMonthForPrice = newData.ratioByLastMonthForPrice ? Number(newData.ratioByLastMonthForPrice) : 0;
  //           newData.ratioByLastYearForPrice = newData.ratioByLastYearForPrice ? Number(newData.ratioByLastYearForPrice) : 0;

  //           this.priceTrendItem = {
  //             benYueJunJia: newData.unitPrice ? parseInt(newData.unitPrice) : "",
  //             priceUnit: "元/㎡",
  //             baiFenBiUnit: "%",
  //             huanBiShangYue: Math.abs(newData.ratioByLastMonthForPrice),
  //             huanBiShangYueAdd: !!(newData.ratioByLastMonthForPrice && newData.ratioByLastMonthForPrice > 0),
  //             tongBiQuNian: Math.abs(newData.ratioByLastYearForPrice),
  //             tongBiQuNianAdd: !!(newData.ratioByLastYearForPrice && newData.ratioByLastYearForPrice > 0)
  //           };
  //         });
  //     },
  //     // 根据传过来的参数判断是否显示小区专家的其中一个字段 shareInfoFlag
  //     upBuildExpertShareInfoFlag() {
  //       // 从委托带看房源进入房源详情页面的相关判断
  //       let sourceMap = ["personalStore", "zshft", "im", "entrustDetail"];
  //       if (paramsConfig.pushLogId ||
  //         (paramsConfig.source && (sourceMap.indexOf(paramsConfig.source) >= 0))) {
  //         this.buildExpertItem.shareInfoFlag = true;
  //       }
  //     },
  //     upBuildExpert(data) {
  //       this.upBuildExpertShareInfoFlag();
  //       let houseList = [];
  //       for (let item of (data.buildOwnerHouseList || [])) {
  //         if (item.caseType == 1) {
  //           houseList = houseList.concat(this.drawErHouseList([item]));
  //           continue;
  //         }

  //         houseList = houseList.concat(this.drawZuHouseList([item]));
  //       }
  //       let roomName = "";
  //       (Const.entrustRoomList).map((info) => {
  //         if (info.id == (data.houseRoom || "")) {
  //           roomName = info.text;
  //         }
  //       });
  //       this.buildExpertItem = {
  //         buildName: data.buildName || "",
  //         buildTitle: "联系小区专家，掌握更多该小区信息",
  //         buildAddress: "",
  //         noBoxShadow: false,
  //         agentHeaderImg: data.buildOwnerPicUrl || "",
  //         archiveId: data.buildOwnerArchiveId || "",
  //         agentName: data.buildOwnerName || "",
  //         agentPhone: data.buildOwnerMobile || "",
  //         houseList: houseList,
  //         caseId: this.caseId,
  //         caseType: this.caseType,
  //         cityId: data.cityId || "",
  //         reSource: data.resource || "",
  //         houseTypeName: data.houseUseageCn || "",
  //         houseTypeId: data.houseUseage || "",
  //         buildId: data.buildId || "",
  //         regionId: data.buildRegionId || "",
  //         regionName: data.regionName || "",
  //         zhuangXiuStatusId: data.houseFitment || "", // 装修情况
  //         zhuangXiuStatusName: data.houseFitmentCn || "",
  //         roomId: roomName ? data.houseRoom || "" : "",  // 几室id
  //         roomName: roomName,
  //       };
  //     },
  //     drawErHouseList(apiList = []) {
  //       let erHouseList = [];
  //       for (let i = 0; i < apiList.length; i++) {
  //         let dataItem = apiList[i] || {};
  //         let item = new ErHouseListItem();
  //         if (!dataItem.buildId) continue;

  //         let tags = (dataItem.houseTagDesc
  //           && dataItem.houseTagDesc.indexOf("|") >= 0)
  //           ? dataItem.houseTagDesc.split("|") : [];
  //         if (tags.length > 3) {
  //           tags = tags.slice(0, 3);
  //         }
  //         item.trueHouse = !!(dataItem.trueFlag && dataItem.trueFlag == 1);
  //         item.cityId = dataItem.cityId || "";
  //         item.caseType = dataItem.caseType || "";
  //         item.houseId = dataItem.houseId || "";
  //         item.reSource = dataItem.reSource || "";
  //         item.houseImg = dataItem.thumbUrl || Const.houseDefaultImg;
  //         item.houseTitle = dataItem.houseSubject || "";
  //         item.houseTing = (dataItem.houseRoom ? dataItem.houseRoom + "室" : "")
  //           + (dataItem.houseWei ? dataItem.houseWei + "卫" : "");
  //         item.houseArea = dataItem.houseArea || "";
  //         item.houseAreaUnit = dataItem.houseArea ? "m²" : "";
  //         item.houseName = dataItem.buildName || "";
  //         item.houseTotalPrice = dataItem.houseTotalPrice || "";
  //         item.houseTotalPriceUnit = dataItem.houseTotalPrice
  //           ? (dataItem.priceUnitCn || "") : "";
  //         item.housePriceOfArea = dataItem.houseUnitPrice || "";
  //         item.housePriceOfAreaUnit = dataItem.houseUnitPrice ? "元/m²" : "";
  //         item.hasVr = !!(dataItem.hasPanorama && dataItem.hasPanorama > 0);
  //         item.hasVideo = !!(dataItem.videoNum && dataItem.videoNum > 0);
  //         item.houseTags = tags;
  //         item.houseUseage = dataItem.houseUseage || "";
  //         item.houseUseageCn = dataItem.houseUseageCn || "";
  //         item.archiveId = this.archiveId;
  //         erHouseList.push(item);
  //       }
  //       return erHouseList;
  //     },
  //     drawZuHouseList(apiList = []) {
  //       let zuHouseList = [];
  //       for (let i = 0; i < apiList.length; i++) {
  //         let dataItem = apiList[i] || {};
  //         let item = new ErHouseListItem();
  //         if (!dataItem.buildId) continue;

  //         let tags = (dataItem.houseTagDesc
  //           && dataItem.houseTagDesc.indexOf("|") >= 0)
  //           ? dataItem.houseTagDesc.split("|") : [];
  //         if (tags.length > 3) {
  //           tags = tags.slice(0, 3);
  //         }
  //         item.cityId = dataItem.cityId || "";
  //         item.caseType = dataItem.caseType || "";
  //         item.houseId = dataItem.buildId || "";
  //         item.reSource = dataItem.reSource || "";
  //         item.houseImg = dataItem.thumbUrl || Const.houseDefaultImg;
  //         item.houseTitle = dataItem.houseSubject || "";
  //         item.houseTing = (dataItem.houseRoom ? dataItem.houseRoom + "室" : "")
  //           + (dataItem.houseWei ? dataItem.houseWei + "卫" : "");
  //         item.houseArea = dataItem.houseArea || "";
  //         item.houseAreaUnit = dataItem.houseArea ? "m²" : "";
  //         item.houseName = dataItem.buildName || "";
  //         item.houseTotalPrice = CheckHousePrice.getPrice(dataItem.houseUseage || 1
  //           , dataItem.houseArea || "", dataItem.houseTotalPrice || 0, dataItem.priceUnitCn || "");
  //         item.houseTotalPriceUnit = dataItem.houseTotalPrice
  //           ? (dataItem.priceUnitCn || "") : "";
  //         item.housePriceOfArea = dataItem.houseUnitPrice || "";
  //         item.housePriceOfAreaUnit = dataItem.houseUnitPrice ? "元/m²" : "";
  //         item.hasVr = !!(dataItem.hasPanorama && dataItem.hasPanorama > 0);
  //         item.hasVideo = !!(dataItem.videoNum && dataItem.videoNum > 0);
  //         item.houseTags = tags;
  //         item.houseUseage = dataItem.houseUseage || "";
  //         item.houseUseageCn = dataItem.houseUseageCn || "";
  //         zuHouseList.push(item);
  //       }
  //       return zuHouseList;
  //     },

  //     upPeiTaoSheShiList(data) {
  //       let peiTaoSheShiList = [];
  //       let setting = data.setting || [];
  //       setting.map((item) => {
  //         peiTaoSheShiList.push({
  //           iconUrl: item.icon || "",
  //           text: item.name || "",
  //           id: item.id || ""
  //         });
  //       });
  //       this.peiTaoSheShiList = peiTaoSheShiList;
  //     },

  //     upTrafficInfo(data) {
  //       this.trafficInfoItem = {
  //         busLine: data.busLine ? decodeURIComponent(data.busLine) : ""
  //       };
  //     },
  //     upNearInfo(data) {
  //       this.nearInfoItem = {
  //         text: data.addCase ? decodeURIComponent(data.addCase).replace(/\\r\\n/g, '\n') : ""
  //       };
  //     },
  //     upNearMapInfo(data) {
  //       this.nearMapItem = {
  //         lng: data.buildPositiony || "",
  //         lat: data.buildPositionx || "",
  //         buildName: this.topNameItem.buildName || ""
  //       };
  //     },

  //     upErHouseList(data) {
  //       let nearErHouseList = [];
  //       let apiList = data.surroundSecondHouseList || [];
  //       for (let i = 0; i < apiList.length; i++) {
  //         let dataItem = apiList[i] || {};
  //         let item = new ErHouseListItem();

  //         let tags = (dataItem.houseTagDesc
  //           && dataItem.houseTagDesc.indexOf("|") >= 0)
  //           ? dataItem.houseTagDesc.split("|") : [];
  //         if (tags.length > 3) {
  //           tags = tags.slice(0, 3);
  //         }
  //         item.trueHouse = !!(dataItem.trueFlag && dataItem.trueFlag == 1);
  //         item.cityId = dataItem.cityId || "";
  //         item.caseType = dataItem.caseType || "";
  //         item.houseId = dataItem.houseId || "";
  //         item.reSource = dataItem.reSource || "";
  //         item.houseImg = dataItem.thumbUrl || Const.houseDefaultImg;
  //         item.houseTitle = dataItem.houseSubject || "";
  //         item.houseTing = (dataItem.houseRoom ? dataItem.houseRoom + "室" : "")
  //           + (dataItem.houseWei ? dataItem.houseWei + "卫" : "");
  //         item.houseArea = dataItem.houseArea || "";
  //         item.houseAreaUnit = dataItem.houseArea ? "m²" : "";
  //         item.houseName = dataItem.buildName || "";
  //         item.houseTotalPrice = dataItem.houseTotalPrice || "";
  //         item.houseTotalPriceUnit = dataItem.houseTotalPrice
  //           ? (dataItem.priceUnitCn || "") : "";
  //         item.housePriceOfArea = dataItem.houseUnitPrice || "";
  //         item.housePriceOfAreaUnit = dataItem.houseUnitPrice ? "元/m²" : "";
  //         item.hasVr = !!(dataItem.hasPanorama && dataItem.hasPanorama > 0);
  //         item.hasVideo = !!(dataItem.videoNum && dataItem.videoNum > 0);
  //         item.houseTags = tags;
  //         item.houseUseage = dataItem.houseUseage || "";
  //         item.houseUseageCn = dataItem.houseUseageCn || "";
  //         item.archiveId = this.archiveId;
  //         nearErHouseList.push(item);
  //       }
  //       this.nearErHouseList = nearErHouseList;
  //     },

  //     upNewHouseList(data) {
  //       let nearNewHouseList = [];
  //       let apiList = data.houseList || [];
  //       for (let i = 0; i < apiList.length; i++) {
  //         let dataItem = apiList[i] || {};
  //         let item = new NewHouseListItem();
  //         if (!dataItem.buildId) continue;

  //         let tags = !dataItem.buildTag
  //           ? [] : dataItem.buildTag.indexOf(",") >= 0
  //             ? dataItem.buildTag.split(",") : [dataItem.buildTag];
  //         let buildTypeTags = !dataItem.buildType
  //           ? [] : dataItem.buildType.indexOf(",") >= 0
  //             ? dataItem.buildType.split(",") : [dataItem.buildType];
  //         let buildFitmentTags = !dataItem.buildFitment
  //           ? [] : dataItem.buildFitment.indexOf(",") >= 0
  //             ? dataItem.buildFitment.split(",") : [dataItem.buildFitment];
  //         tags = tags.concat(buildTypeTags);
  //         tags = tags.concat(buildFitmentTags);

  //         if (tags.length > 3) {
  //           tags = tags.slice(0, 3);
  //         }
  //         item.buildId = dataItem.buildId || "";
  //         item.buildImg = dataItem.photoAddr || Const.houseDefaultImg;
  //         item.buildName = dataItem.buildName || "";
  //         item.buildStatus = dataItem.buildStatus || "";
  //         item.buildTing = (dataItem.roomText
  //         && (dataItem.areaLow || dataItem.areaHigh)
  //           ? dataItem.roomText + " | " : (dataItem.roomText || ""));
  //         item.buildArea = (dataItem.areaLow && dataItem.areaHigh)
  //           ? parseInt(dataItem.areaLow) + "-" + parseInt(dataItem.areaHigh)
  //           : (parseInt(dataItem.areaLow || 0) || parseInt(dataItem.areaHigh || 0) || "");
  //         item.buildAreaUnit = item.buildArea ? "㎡" : "";
  //         item.buildAddress = dataItem.buildAddr || "";
  //         item.buildTags = tags;
  //         item.buildPriceOfArea = !dataItem.priceText ? "" : dataItem.priceText.indexOf("价格") >= 0 ? "" : parseInt(dataItem.priceText);
  //         item.buildPriceOfAreaUnit = "元/㎡";
  //         item.isHotSale = !!(dataItem.hotSaleHouse && dataItem.hotSaleHouse == 1);
  //         item.cityId = dataItem.cityId || "";
  //         nearNewHouseList.push(item);
  //       }
  //       this.nearNewHouseList = nearNewHouseList;
  //     },

  //     upGuaPaiAgentList(data) {
  //       let guaPaiAgentList = [];
  //       let gpBrokerList = data.gpBrokerList || [];
  //       for (let i = 0; i < gpBrokerList.length; i++) {
  //         let item = gpBrokerList[i] || {};
  //         if (!item.gpBroker400Phone && !item.brokerMobilePhone) {
  //           continue;
  //         }

  //         guaPaiAgentList.push({
  //           headerImg: item.gpBrokerPhoto || "",
  //           name: item.gpBrokerName || "",
  //           service: item.gpBrokerDesc || "",
  //           telphone: item.brokerMobilePhone || "",
  //           fourPhone: item.gpBroker400Phone || "",
  //           archiveId: data.archiveId || "",
  //           caseId: this.caseId,
  //           caseType: this.caseType,
  //           resource: this.resource
  //         });
  //       }
  //       this.guaPaiAgentList = guaPaiAgentList;
  //     },

  //     upBottomAgentInfo(data) {
  //       let showBackIndex = false;
  //       if (!getCurrentPages() || getCurrentPages().length == 1) {
  //         showBackIndex = true;
  //       }
  //       this.showBackIndex = showBackIndex;
  //       let roomName = "";
  //       (Const.entrustRoomList).map((info) => {
  //         if (info.id == (data.houseRoom || "")) {
  //           roomName = info.text;
  //         }
  //       });
  //       this.bottomAgentInfo = {
  //         isAboutTake: privateData.isAboutTake,
  //         headerImg: data.currUserPhotoUrlPath || Const.defaultHeadImg,
  //         name: data.currUserName || "",
  //         starNum: data.costStandard || 3,
  //         archiveId: data.archiveId || "",
  //         caseId: this.caseId,
  //         caseType: this.caseType,
  //         telephone: data.currUserMobile || "",
  //         cityId: data.cityId || "",
  //         showBackIndex: showBackIndex,
  //         houseTypeName: data.houseUseageCn || "",
  //         houseTypeId: data.houseUseage || "",
  //         buildId: data.buildId || "",
  //         houseName: data.buildName || "",
  //         regionId: data.buildRegionId || "",
  //         regionName: data.regionName || "",
  //         zhuangXiuStatusId: data.houseFitment || "", // 装修情况
  //         zhuangXiuStatusName: data.houseFitmentCn || "",
  //         roomId: roomName ? data.houseRoom || "" : "",  // 几室id
  //         roomName: roomName,
  //         tingId: data.houseHall || "",
  //         weiId: data.houseWei || "",
  //         houseArea: data.houseArea ? parseInt(data.houseArea) : "",
  //         housePrice: data.houseTotalPrice ? parseInt(data.houseTotalPrice) : "",
  //         compName: data.compName || "",
  //         reSource: data.resource || data.reSource || "1"
  //       };
  //     }
  //   },
  // }
</script>