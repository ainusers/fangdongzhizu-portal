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
					<view class="value">{{detailData.layout}}</view>
				</view>
				<view class="money">
					<view class="pay">
						<view class="price"><view class="num">{{detailData.money}}</view>元</view>
						<view class="way">({{detailData.payType}})</view>
					</view>
				</view>
			 </view>
			 <view class="detail">
				<view class="info_con">
					<view  class="value"> {{detailData.roomType}}</view>
					<view  class="key">出租房间 </view>
				</view>
				<view class="info_con">
					<view class="value">
						{{detailData.size}}m²
					</view>
					<view class="key">
						建筑面积
					</view>
				</view>
				<view class="info_con">
					<view  class="value">{{detailData.liveTime||'-'}}</view>
					<view  class="key"> 入住时间</view>
				</view>
				<view class="info_con">
					<view  class="value">{{detailData.floor}}</view>
					<view  class="key">楼层</view>
				</view>
			 </view>
			 <view class="icon_list">
				 <view class="item">
					 <!-- 有无电梯 -->
					 {{detailData.hasElevator}}
				 </view>
				 <view class="item">
				 	<!-- 集中供暖-->
				 	{{detailData.heatType}}
				 </view>
				 <!-- 朝向 -->
				 <view class="item">
					 {{detailData.orientation}}
				 </view>
			 </view>
		   </block>
		</view>
		<!-- 详情页 - 租赁信息 -->
		<view class="model" v-if="zulinData.length > 0">
		  <block>
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
			<view class="modelName">地理位置
        <span style="font-size: 28rpx;color: #9195a3;margin-left: 5px">(仅供参考)</span>
      </view>
			<view class="map_con">
			<view>{{detailData.distanceSubway}}</view>
				<!-- <di-li-wei-zhi v-if="isMap" :latitude="detailData.latitude" :longitude="detailData.longitude" :markers="markers"></di-li-wei-zhi> -->
			</view>
		</view>
		<!-- 详情页 - 配套设施 -->
		<view class="model">
		  <block v-if="sheshiData.length > 0">
			 <view class="modelName">配套设施</view>
			 <pei-tao-she-shi :list="sheshiData"></pei-tao-she-shi>
		   </block>
		</view>
		<!-- //举报模态框 -->
		<view>
			<zhizuReport @cancelReport="cancelReport" @goReport="goReport" :typeStr="reportType" :userId="detailData.userId" :reportId="detailData.id" ref="reportS"/>
		</view>
		<!-- 详情页 - 立即沟通 -->
		<view class="final">
			<view class="left">
				<view class="report"  @click="showShares">
					<u-icon name="zhuanfa" size="45"></u-icon>
					<view class="target">分享</view>
				</view>
				<view class="report"  @click="report(2)">
					<u-icon :name="startIcon" size="45" :color="iconColor"></u-icon>
					<view class="target">收藏</view>
				</view>
				<view class="collect" @click="reportShowFn">
					<u-icon name="bell" size="45"></u-icon>
					<view class="target">举报</view>
				</view>
			</view>
			<view class="contact">
				<u-button shape="square" @click="report(3)">立即沟通</u-button>
			</view>
		</view>

		<!-- 分享操作 appShare('1','qq','')-->
		<u-popup  v-model="showShare" mode="bottom" :mask="true" border-radius="15" @close="closeShare">
			<view class="share-wrap">
				<view class="row">
					<view @click.stop="appShare('weixin','WXSceneSession','0')" class="share-item">
						<uni-icons custom-prefix="iconfont" type="icon-weixinhaoyou"  size="40"></uni-icons>
						<text>微信好友</text>
					</view>
					<view @click.stop="appShare('weixin','WXSceneFavorite','0')" class="share-item">
						<uni-icons custom-prefix="iconfont" type="icon-wechatEnshrine" size="40"></uni-icons>
						<text>微信收藏</text>
					</view>
					<view @click.stop="appShare('weixin','WXSceneTimeline','0')" class="share-item">
						<uni-icons custom-prefix="iconfont" type="icon-pengyouquan" size="40"></uni-icons>
						<text>朋友圈</text>
					</view>
					<view @click.stop="copyCurrentUrl" class="share-item">
						<uni-icons custom-prefix="iconfont" type="icon-fuzhilianjie" size="40"></uni-icons>
						<text>复制链接</text>
					</view>
				</view>
			</view>
		</u-popup>
  </view>
</template>
<style scope lang="scss">
  page {
    background: #f7f7f7;
  }
  .er_house_detail {
    overflow-x: hidden;
	box-shadow: 0 1px 0 2px rgba(0,0,0,0.05);
  }
  .model {
	  background-color: #ffffff;
	  padding: 10px;
	  border-radius: 15px;
	  border-bottom: 5px solid #f2f2f2;
  }
  ::v-deep .u-mode-center-box{
	  z-index: 9999 !important;
  }
  ::v-deep .pei_tao_she_shi{
	  position: relative;
	  z-index: 1 !important;
  }
  .modelName{
	 font-size:30rpx;
	 font-weight:600;
	 color:#101d36;
	 padding-left: 13upx;
	 box-sizing: border-box;
	 border-left: 6rpx solid #1183fb;
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
	  font-size: 30upx;
	  justify-content: space-between;
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
	  font-size: 24upx;
	  justify-content: space-between;
	  .pay{
	  	  padding-left: 8px;
		  display: flex;
		  align-items: center;
	  }
	  .price{
		  color: red;
		  .num{
			  display: inline-block;
			  font-size: 30upx;
			  font-weight: bold;
			  margin-right: 10upx;
		  }
	  }
	  .way{
        font-size: 12px;
	  	  padding-left: 8px;
	  }
  }
  .detail{
	  display: flex;
	  justify-content: space-around;
	  margin: 10px 8px 10px 8px;
	  .info_con{
		  text-align: center;
		  .value{
			  font-size: 28rpx;
			  color: #333;
			  margin-bottom: 16upx;
		  }
		  .key{
			  font-size: 28rpx;
			  color:#999
		  }
	  } 
  }
  .icon_list{
  		  .item{
  			  display: inline-block;
  			  color: #333;
  			  background: #eee;
  			  padding: 10upx 20upx;
			  margin-right: 20upx;
  		  }
  }
  .final{
	  display: flex;
	  justify-content: space-between;
	  .report{
		  display: flex;
		  padding: 8px 0px 8px 10px;
	  }
	  .report_active,.collect_active{
		  .target{
			  color:#1183fb;
		  }
		  ::v-deep .uicon-heart{
		  	color:#1183fb;
		  }
	  }
	  .collect{
		  display: flex;
		  padding: 8px 0px 8px 10px;
	  }
	  .left{
		  display: flex;
		  align-items: center;
	  }
	  .contact{
		  width: 40%;
		  margin: 0px 8px 8px 0px;
		  background: #1183fb;
		  border-radius: 20upx;
		  .u-btn--default{
			  background: none;
			  color:#fff;
			 
			  &:after{
				  border:none;
			  }
		  }
	  }
	  .target{
		  font-size: 14px;
		  margin-left: 5upx;
		  margin-top: 8upx;
	  }
  }
	.pei_tao_she_shi{
		padding:10upx;
	}
	.map_con{
		padding: 20upx;
	}
	// 分享弹窗
	.share-wrap {
		margin: 0 auto;
		padding: 30rpx 10rpx;
		z-index: 999;
		.row{
			display: flex;
			margin: 10rpx 0;
		}
		.share-item {
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			image {
				width: 100rpx;
				height: 100rpx;
			}
			text {
				font-size: 24rpx;
				margin-top: 8rpx;
			}
		}
	}
</style>


<script>
  import permision from "@/sdk/wa-permission/permission.js"
  import houseSwiper from "@/components/house-swiper/house-swiper.vue";
  import peiTaoSheShi from "@/components/house-detail/house-sheshi.vue";
  import feiYongXiangQing from "@/components/house-detail/house-feiyong.vue";
  import zuLinXinXi from "@/components/house-detail/house-zulin.vue";
  import diLiWeiZhi from "@/components/house-detail/house-dili.vue";
  import zhizuReport from '@/components/common/modal/report.vue';
  import {getCurrentUrl,appShare} from '@/utils/utils.js';

  let that;
  export default {
	components: {
	    houseSwiper,
		peiTaoSheShi,
		feiYongXiangQing,
		zuLinXinXi,
		diLiWeiZhi,
		zhizuReport
	},
	// 页面传值
	 onLoad(options) {
		this.houseId=options.id
		this.targetId=options.userId
	},
	onShow() {
		that=this
		this.initData()
	},
    data() {
      return {
		houseId:'',//房源id
		targetId:'',//房东用户id
		detailData:'',
		markers:[],
		isMap:true,
		isOtherR:false,
        sourceTypeId: 2201, // 数据采集 - lh
        shareOption: {},
        haveVillageExpert: false,// 是否有小区专家
        loadingReqeust: true,
		reportType:'房源',
        swiperList: [],
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
			{'text':'洗衣机',isShow:false,icon:'icon-xiyiji'}, 
			{'text':'冰箱',isShow:false,icon:'icon-bingxiang'},
			{'text':'电视',isShow:false,icon:'icon-dianshi'},
			{'text':'空调',isShow:false,icon:'icon-kongtiao'},
			{'text':'热水器',isShow:false,icon:'icon-reshuiqi'},
			{'text':'天然气',isShow:false,icon:'icon-ranqi'},
			{'text':'暖气',isShow:false,icon:'icon-nuanqi'},
			{'text':'无线网',isShow:false,icon:'icon-wifi'},
			{'text':'微波炉',isShow:false,icon:'icon-weibolu'}, 
			{'text':'电磁炉',isShow:false,icon:'icon-diancilu'}
		],
		feiyongData: [
			{'title':'付款方式','value':'-'},
			{'title':'租金','value':'-'},
			{'title':'押金','value':'-'},
			{'title':'维修费用','value':'-'},
			{'title':'中介费','value':'-'},
			{'title':'','value':''},
			{'title':'取暖费','value':'-'},
			{'title':'无线费','value':'-'},
			{'title':'物业费','value':'-'},
			{'title':'水电费','value':'-'},
		],
		zulinData: [],
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
		tipcontent:'',
		startIcon:'heart',
		iconColor:'',
		reportStatu:false,
		showShare:false, // 分享弹框展示标识
		shareUrl:'' //分享的地址
      };
    },
	methods:{
		// 初始化数据
		async initData(){
			await this.getHouseDetail()
			// 轮播图 img 数据初始化
			await this.swiperImgInit()
			// 费用数据初始化
			this.coseDataInit()
			// 配套设施展示
			this.showSupport()
			// 租赁信息
			this.initzulinData()
		},
		getHouseDetail(){
			let data={
				roomId:this.houseId,
				userId:this.$store.state.userInfo.id
			}
			return	this.$H.get('/zf/v1/room/list/id',data,true).then(res=>{
				this.detailData=res.data[0]
				this.markers.push({
					id: 0,
					latitude: this.detailData.latitude,
					longitude: this.detailData.longitude,
					title: this.detailData.communityName,
					iconPath: 'http://43.143.148.105:9090/remote/fangdongzhizu/address.png',
					width: 80,
					height: 80
				})
				if(this.detailData.like){
					this.startIcon='heart-fill'
					this.iconColor='#f91e08'
				}
				})
			},
		// 举报房源
		reportShowFn(){
			// 判断用户是否登录
			if(!this.$store.state.token){
				uni.navigateTo({
					url: '/pages/auth/login',
				})
				return;
			}
			
			if(!this.reportStatu){
				this.reportStatu=true
				setTimeout(()=>{
					this.reportStatu=false
				},500)
				this.isMap=false
				this.$refs.reportS.reportShow=true
			}
		},
		swiperImgInit(){
			let imgUrl=this.detailData.imgUrl
			if(imgUrl){
				imgUrl=imgUrl.split(',')
			}
			for(let i=0;i<imgUrl.length;i++){
				let obj={
					url:'',
					type:'img',
					urls:[]
				}
				obj.urls=imgUrl
				obj.url=imgUrl[i]
				this.swiperList.push(obj)
			}
		},
		coseDataInit(){
			this.feiyongData[0].value=this.detailData.payType//支付方式
			this.feiyongData[1].value=this.detailData.money+'元'//租金
			this.feiyongData[2].value=this.detailData.mortgageMoney+'元'//押金
			this.feiyongData[3].value=this.detailData.serviceMoney+'元'//维修费
			this.feiyongData[4].value=this.detailData.proxyMoney+'元'//中介费
			this.feiyongData[6].value=this.detailData.heatMoney+'元' //取暖费
			this.feiyongData[7].value=this.detailData.wifiMoney //无线费用
			this.feiyongData[8].value=this.detailData.manageMoney //物业费
			this.feiyongData[9].value=this.detailData.waterElectricMoney //水电费
		},
		initzulinData(){
			this.zulinData=[]
			let roommate=this.detailData.roommate
			roommate.forEach((item,index)=>{
				let otherInfo=''
				if(item.tenantStr){
					otherInfo=item.tenantStr.split('-')
				}
				let money=''
				let sex=''
				if(otherInfo[0]&&otherInfo[0].indexOf('未')!=-1){
					money=otherInfo[1]
				}else if(otherInfo[0]&&otherInfo[0].indexOf('已')!=-1){
					sex=otherInfo[1]
				}
				let obj={
					house:item.name,
					status:otherInfo[0],
					sex:sex || '-',
					money:money ||'-',
					size:otherInfo[2]
				}
				this.zulinData.push(obj)
			})
			let currentHome={
				house:'当前房源',
				status:'未出租',
				sex:'-',
				money:this.detailData.money+'元/月',
				size:this.detailData.size+'m²'
			}
			this.zulinData.push(currentHome)
		},
		// 收藏，立即沟通
		report(index){
			// 判断用户是否登录
			if(!this.$store.state.token){
				uni.navigateTo({
					url: '/pages/auth/login',
				})
				return;
			}
			
			let that = this;
			let params={
				"userId": this.$store.state.userInfo.id,
				"roomId": this.detailData.id,
			}
			// 1 举报  2 收藏  3立即沟通
			switch (index){
				case 2:
          params.roomUserId = this.targetId;
					this.statistics(params)
					break;
				case 3:
					// 温馨提示
					uni.showModal({
						title: '温馨提示',
						content: '每人每天有两次机会获取房东电话',
						showCancel: false,
						success(res) {
							if (res.confirm) {
								let data={
									"userId": that.$store.state.userInfo.id
								}
								that.$H.get('/zf/v1/const/room/chat/count',data,true).then(res=>{
									if (res.status && res.data[0].count && Number(res.data[0].count) > 1) {
										uni.showToast({
											icon:'none',
											title:"您今天的两次机会已使用完，请明天再来"
										})
									} else {
										// 插入记录
										let data={
											"roomId": that.detailData.id,
											"phone": that.detailData.username,
											"userId": that.$store.state.userInfo.id
										}
										that.$H.post('/zf/v1/const/room/chat/count',data,true).then(res=>{
											if (res.status) {
												// 判断用户是否获取电话权限
												// #ifdef APP-PLUS
												plus.android.requestPermissions(['android.permission.CALL_PHONE'],
												(e) => {
													// 权限被永久拒绝
													if (e.deniedAlways.length > 0) {
														uni.showModal({
															title: '温馨提示',
															content: '获取电话权限才可以和房东联系',
															showCancel: false,
															success(res) {
																if (res.confirm) {
																	permision.gotoAppPermissionSetting()
																}
															}
														});
														// 权限被临时拒绝  
													} else if (e.deniedPresent.length > 0) { 
														uni.showModal({
															title: '温馨提示',
															content: '获取电话权限才可以和房东联系',
															showCancel: false,
															success(res) {
																if (res.confirm) {
																	permision.gotoAppPermissionSetting()
																}
															}
														});
													}
												})
												// #endif
												// 使用手机号联系房东
												const id = that.detailData.id
												const username = that.detailData.username
												uni.makePhoneCall({
													phoneNumber: (username-id.substring(id.length-5,id.length)).toString()
												})
											}
										})
									}
								})
							}
						}
					});
					break;
			}
		},
		statistics(params){
			this.$H.post('/zf/v1/const/save/statistics',params,true).then(res=>{
				let status=res.data[0].status
				if(status){
					this.startIcon='heart-fill'
					this.iconColor='#f91e08'
					// 收藏成功
					this.$u.toast('收藏成功')
				}else{
					this.$u.toast('取消收藏')
					this.startIcon='heart'
					this.iconColor=''
				}
			})
		},
		showSupport(){
		  let support=this.detailData.support
		  if(support){
					support=support.split(',')
					this.sheshiData.forEach(item=>{
						if(support.indexOf(item.text) != -1){
							item.isShow=true
						}
					})
				}
		},
		goReport(){
			this.isMap=true
			this.reportStatu=false
		},
		cancelReport(){
			this.isMap=true
			this.reportStatu=false
		},
		// 展示分享弹框
		showShares() {
			this.showShare = true;
			this.isMap = false;
		},
		// 关闭分享弹框
		closeShare(){
			this.showShare = false;
			this.isMap = true;
		},
		// uni-share 微信分享
		async appShare(provider,scene,type) {
			this.shareUrl= await getCurrentUrl();
			appShare(provider,scene,type,this.shareUrl,this.detailData.communityName+'-'+this.detailData.roomType,this.detailData.layout +'-'+ this.detailData.money+'-'+this.detailData.payType)
			this.closeShare();
		},
		// 复制链接
		async copyCurrentUrl() {
			this.shareUrl= await getCurrentUrl();
			uni.setClipboardData({
				data: this.shareUrl,
				success: function () {
				  console.log('复制成功');
				},
				fail: function (err) {
				  console.error('复制失败', err);
				}
			});
			this.closeShare();
		}
	}
}
</script>