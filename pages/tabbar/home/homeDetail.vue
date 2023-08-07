<style scope lang="scss">
  page {
    background: #f2f2f2;
  }
  .er_house_detail {
    overflow-x: hidden;
	box-shadow: 0 1px 0 2px rgba(0,0,0,0.05);
  }
  .model {
	  background-color: #ffffff;
	  padding: 10px;
	  border-radius: 15px;
	  border-bottom: 10px solid #f2f2f2;
  }
  /deep/.u-mode-center-box{
	  z-index: 9999 !important;
  }
  /deep/.pei_tao_she_shi{
	  position: relative;
	  z-index: 1 !important;
  }
  .modelName{
	 font-size:28upx;
	 font-weight:600;
	 color:#101d36;
	 padding-left: 13upx;
	 box-sizing: border-box;
	 border-left: 6rpx solid #5199ff;
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
	  	  padding-left: 8px;
	  }
	  .datetime{
		  margin-right: 8px;
		  color: #999999;
		  font-size: 24upx;
	  }
  }
  .detail{
	  display: flex;
	  justify-content: space-around;
	  margin: 10px 8px 10px 8px;
	  .info_con{
		  text-align: center;
		  .value{
			  font-size: 30upx;
			  color: #333;
			  margin-bottom: 28upx;
		  }
		  .key{
			  font-size: 24upx;
			  color:#999
		  }
	  } 
  }
  .icon_list{
  		  .item{
  			  display: inline-block;
  			  color: #333;
  			  background: #eee;
  			  padding: 10upx 30upx;
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
			  color:#5199ff;
		  }
		  /deep/.uicon-heart{
		  	color:#5199ff;
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
		  width: 60%;
		  padding: 0px 4px 4px 0px;
		  background: #5199ff;
		   border-radius: 50upx;
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
		  margin-left: 10upx;
	  }
  }
  .pei_tao_she_shi{
	  padding:10upx;
  }
	.map_con{
		padding: 20upx;
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
					<view class="value">{{detailData.layout}}</view>
				</view>
				<view class="money">
					<view class="pay">
						<view class="price"><view class="num">{{detailData.money}}</view>元/月</view>
						<view class="way">({{detailData.payType}})</view>
					</view>
					<view class="datetime">{{detailData.updateTime}}</view>
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
		  <block v-if="diliData.length > 0">
			 <view class="modelName">地理位置</view>
			 <view class="map_con">
				<view>{{detailData.distanceSubway}}</view>
				<di-li-wei-zhi :list="diliData"  v-show="isMap" :latitude="detailData.latitude" :longitude="detailData.longitude" :markers="markers"></di-li-wei-zhi>
			 </view>
		   </block>
		</view>
		<!-- 详情页 - 配套设施 -->
		<view class="model">
		  <block v-if="sheshiData.length > 0">
			 <view class="modelName">配套设施</view>
			 <pei-tao-she-shi :list="sheshiData"></pei-tao-she-shi>
		   </block>
		</view>
		<!-- //举报模态框 -->
		<view v-show="reportShow">
			<zhizuReport @cancelReport="cancelReport" @goReport="goReport" :typeStr="reportType" :userId="detailData.userId" :reportId="detailData.id"/>
		</view>
		<!-- 详情页 - 立即沟通 -->
		<view class="final">
			<view class="left">
				<view class="collect" @click="reportShowFn">
					<u-icon name="bell" size="50"></u-icon>
					<view class="target">举报</view>
				</view>
				<view class="report"  @click="report(2)">
					<u-icon :name="startIcon" size="50" :color="iconColor"></u-icon>
					<view class="target" >收藏</view>
				</view>
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
  import zhizuReport from '@/components/common/modal/report.vue'

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
	},
	onShow() {
		that=this
		this.initData()
		console.log(this.detailData.latitude)
		console.log(this.detailData.longitude)
		
	},
    data() {
      return {
		  houseId:'',//房源id
		  detailData:'',
		  markers:[],
		  isMap:true,
		reportShow:false,
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
							{'iconUrl':'../../../static/home/detail/xiyiji-bak.svg','text':'洗衣机',isShow:false,hIconUrl:'../../../static/home/detail/xiyiji.svg'}, 
							{'iconUrl':'../../../static/home/detail/bingxiang-bak.svg','text':'冰箱',isShow:false,hIconUrl:'../../../static/home/detail/bingxiang.svg'},
							{'iconUrl':'../../../static/home/detail/dianshi-bak.svg','text':'电视',isShow:false,hIconUrl:'../../../static/home/detail/dianshi.svg'},
							{'iconUrl':'../../../static/home/detail/kongtiao-bak.svg','text':'空调',isShow:false,hIconUrl:'../../../static/home/detail/kongtiao.svg'},
							{'iconUrl':'../../../static/home/detail/reshuiqi-bak.svg','text':'热水器',isShow:false,hIconUrl:'../../../static/home/detail/reshuiqi.svg'},
							{'iconUrl':'../../../static/home/detail/ranqi-bak.svg','text':'天然气',isShow:false,hIconUrl:'../../../static/home/detail/ranqi.svg'},
							{'iconUrl':'../../../static/home/detail/nuanqi-bak.svg','text':'暖气',isShow:false,hIconUrl:'../../../static/home/detail/nuanqi.svg'},
							{'iconUrl':'../../../static/home/detail/wifi-bak.svg','text':'无线网',isShow:false,hIconUrl:'../../../static/home/detail/wifi.svg'},
							{'iconUrl':'../../../static/home/detail/weibolu-bak.svg','text':'微波炉',isShow:false,hIconUrl:'../../../static/home/detail/weibolu.svg'}, 
							{'iconUrl':'../../../static/home/detail/diancilu-bak.svg','text':'电磁炉',isShow:false,hIconUrl:'../../../static/home/detail/diancilu.svg'},
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
		tipcontent:'',
		startIcon:'heart',
		iconColor:''
      };
    },
	methods:{
		//初始化数据
		async initData(){
			await this.getHouseDetail()
			// 轮播图 img 数据初始化
			await this.swiperImgInit()
			//费用数据初始化
			this.coseDataInit()
			// 配套设施展示
			this.showSupport()
			//租赁信息
			this.initzulinData()
		},
		getHouseDetail(){
			let data={
				roomId:this.houseId,
				userId:this.$store.state.userInfo.id
			}
		 return	this.$H.get('/zf/v1/room/list/id',data,true).then(res=>{
				this.detailData=res.data[0]
				this.markers.push(
						{
							latitude: this.detailData.latitude,
							longitude:this.detailData.longitude,
							title:this.detailData.communityName,
							iconPath: require('../../../static/address.png'),
							width:25,
							height:25,
						}
						)
				if(this.detailData.like){
					this.startIcon='heart-fill'
					this.iconColor='#f91e08'
				}
			})
		},
		reportShowFn(){
			this.isMap=false
			this.reportShow=true
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
			this.feiyongData[1].value=this.detailData.money+'元/月'//租金
			this.feiyongData[2].value=this.detailData.mortgageMoney//押金
			this.feiyongData[3].value=this.detailData.serviceMoney+'元/月'//维修费
			this.feiyongData[4].value=this.detailData.proxyMoney+'元/月'//中介费
			this.feiyongData[6].value=this.detailData.heatMoney+'元/月' //取暖费
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
		},
		//举报，收藏，
		report(index){
			let params={
				"userId": this.$store.state.userInfo.id,
				"roomId": this.detailData.id,
			}
			// 1 举报  2 收藏  3立即沟通
			switch (index){
				case 2:
				// this.detailData.collection==0?params['collection']=1:params['collection']=0
				this.statistics(params)
				break;
				case 3:
				params['chat']=1
				var chatId = this.$store.state.userInfo.id+''+this.houseId
				uni.navigateTo({
					url:'/pages/tabbar/community/tools/news?houseId='+this.houseId+'&userId='+this.detailData.username+'&chatId='+chatId
				})
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
					if(support.indexOf(item.text)!=-1){
						item.isShow=true
						item.iconUrl=item.hIconUrl
					}
				})
			}
		},
		goReport(){
			this.isMap=true
		},
		cancelReport(){
			this.isMap=true
		},
	}
}
</script>