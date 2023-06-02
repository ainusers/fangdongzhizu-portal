<style scope lang="scss">
.main {
	background-color: #f2f2f2;
	 // height: var(--status-bar-height);
}
/deep/.u-scroll-box{
	display: flex;
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
.home_nodata{
	padding: 5px 0 ;
	text-align: center;
}
</style>
<template>
	<view class="main">
		<!-- 顶部区域 -->
		  <!-- 选项卡 -->
			<u-sticky bgColor="#fff">
			  <u-tabs :list="tabList" :current="current" @change="tabChange" lineWidth="30" lineColor="#f56c6c"></u-tabs>
			</u-sticky>
		<!-- 内容区域 -->
		<swiper class="scroll-view-height" @change="swipeIndex" :current="current" :duration="300"  >
			<swiper-item v-for=" (item,index) in tabList" :key="index">
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower">
					<view v-show="current == index">
						<block v-if="houseList.length === 0 && pageNum==1">
							<u-empty  text="暂无数据" mode="favor"></u-empty>
						</block>
						<view class="content" v-else>
							<!-- 列表 -->
								<block v-for="(item, index) in houseList" :key="index">
									<house-list-item ref="ListItem" :item="item" :index="index" @updateHouseList="updateHouseList" :current="current"></house-list-item>
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
import {editTitleText} from '@/utils/utils.js'
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
let that='';
export default {
	components: {
		houseListItem,
		screenTab
	},
	data() {
		return {
			houseList: [],
			cityName: "北京",
			current: 0,
			tabList: [
				{
					name: '待审核'
				},
				{
					name: '已发布'
				},
				{
					name: '已下架'
				},
				{
					name: '收藏'
				}
			],
			pageNum:1,//当前请求页码
			loadStatus:'loadmore',
			isUpdate:false
		};
	},
	watch:{
		current:{
			handler(newVal,oldVal){
				that.houseList=[]
				that.pageNum=1
				// #ifdef APP-PLUS
					var webView = this.$mp.page.$getAppWebview();
				// #endif
				
				if(newVal==3){
					that.getCollect()
					// #ifdef APP-PLUS
					webView.setTitleNViewButtonStyle(0,{
						width: '0'  
					});
					// #endif
					
				}else{
					if(newVal==1){ //已发布
					// #ifdef APP-PLUS
					webView.setTitleNViewButtonStyle(0,{
						width: '100px'  
					});
					// #endif
						
					}else if(newVal==0){ //待审核
					// #ifdef APP-PLUS
					webView.setTitleNViewButtonStyle(0,{
						width: '100px'  
					});
					// #endif
					}
					else{
						// #ifdef APP-PLUS
						webView.setTitleNViewButtonStyle(0,{
							width: '0px'  
						});
						// #endif
					}
					that.getstatusHouseList(Number(newVal)+1)
				}
				editTitleText('管理')
				this.isUpdate=false
			}
		}
	},
	onLoad(options) {
		that=this
		this.current=options.index
	},
	onNavigationBarButtonTap(e){
		let txt=''
		if(!this.isUpdate){
			txt='退出管理'
			this.isUpdate=true
		}else{
			txt='管理'
			this.isUpdate=false
		}
		if(this.$refs.ListItem&&this.$refs.ListItem.length>0){
			this.$refs.ListItem.forEach(item=>{
				item.isUpdate=this.isUpdate
			})
			editTitleText(txt)
		}
			
	},
	methods: {
		//滚动
		scrolltolower(){
			if(this.loadStatus=='loadmore'){
				this.pageNum++
				this.getstatusHouseList(Number(this.current)+1)
			}
		},
		//下架刷新
		updateHouseList(){
			this.pageNum=1
			this.getstatusHouseList(2)
		},
		//获取收藏的房源
		getCollect(){
			this.$H.get('/zf/v1/const/collect/rooms',{userId:that.$store.state.userInfo.id},true).then(res=>{
				if(res.status&&res.code==200){
					that.houseList=[...that.houseList,...res.data]	
					that.$store.commit('houseInfo',that.houseList)
				}else{
					uni.showToast({
						icon:'none',
						title:res.message
					})
				}
			})
		},
		// 获得swiper切换后的current索引
		swipeIndex(index) {
			this.current = index.detail.current
		},
		// 切换选项卡
		tabChange(index) {
			this.current = index;
		},
		//获取不同状态的数据
		getstatusHouseList(type){	
			let params={
				"page":this.pageNum,
				"size":"10",
				"status":type, //(1:待审核,2:已发布,3:已下架)
				"user_id": that.$store.state.userInfo.id,
			}
			//1 待审核 2 已发布  3已下架
				this.$H.post('/zf/v1/room/list',params,true).then(res=>{
							if(res.data&&res.status&&res.data.length>0){
								that.houseList=[...that.houseList,...res.data]
							}else if(res.data.length==0&&that.houseList.length==0){
								this.houseList=[]
							}else{
								uni.showToast({
									icon: 'none',
									title: '已加载完成'
								});
							}
							res.data.length<10?this.loadStatus='end':this.loadStatus='loadmore'
							that.$store.commit('houseInfo',that.houseList)
				})
		},
	}
}
</script>