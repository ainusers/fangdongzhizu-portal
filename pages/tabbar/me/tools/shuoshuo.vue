<style scope lang="scss">
.main {
	background-color: #f2f2f2;
	 // height: var(--status-bar-height);
}
/deep/.u-scroll-box{
	display: flex;
}

.u-tab-item .u-line-1 {
	line-height: 0px!important;
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
		  <!-- 选项卡 -->
			<u-sticky bgColor="#fff">
			  <u-tabs :list="tabList" :current="current" @change="tabChange" 
			   lineWidth="30"
			lineColor="#f56c6c"></u-tabs>
			</u-sticky>
		<!-- 内容区域 -->
		<swiper class="scroll-view-height" @change="swipeIndex" :current="current" :duration="300">
		
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 0">
						<!-- 内容区域 -->
						<view class="content">
							<!-- 待审核 -->
						    <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 1">
					<view class="content">
						<!-- 已发布 -->
					   <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>
					</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 2">
					<view class="content">
						<!-- 已下架 -->
					     <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>
					</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 3">
					<view class="content">
						<!-- 收藏 -->
					    <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>
					</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import screenTab from '@/components/common/screen-tab/screen-tab.vue'
import { Const } from "@/utils/const/Const.js";
import postList from '@/components/post-list/post-list.vue';
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
		screenTab,
		postList
	},
	data() {
		return {
			current: 0,
			tabList: [
				{
					name: '圈子'
				},
				{
					name: '互动'
				},
				{
					name: '转发'
				},
				{
					name: '浏览'
				}
			],
			// 价格列表的map
		tuwen_data: [ {
						"id": 4048,
						"cid": 1,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"follow": false,
						"followCount": 0,
						"comment_count": 0,
						"share_count": 0,
						"avatar": "http://192.168.3.101:9090/asiatrip/63de0f9551b4bbd2cf765c361675497360154_mmexport1579505430486.jpg",
						"words": "今天是周一，我来上班了，手里的任务好多呀，安排好优先级，一件一件的做！！！",
						"imgUrl": ["https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281","https://img.tukuppt.com/photo-big/00/00/94/6152bc0ce6e5d805.jpg","https://img0.baidu.com/it/u=2028084904,3939052004&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500","https://img0.baidu.com/it/u=1472391233,99561733&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"],
						"longitude": "116.34125",
						"latitude": "39.936784",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "西城区-西直门外南路-26号院-北京建筑大学(西城校区)",
						"type": "gcj02",
						"updateTime": "2022-12-26T02:52:23.018+00:00",
						"createTime": "2022-12-26T02:52:23.018+00:00"
					},
					{
						"id": 1607350262874345473,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "现在我在地铁上，准备回家了。",
						"imgUrl": ["https://img2.baidu.com/it/u=3442493809,2528798933&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375","https://img95.699pic.com/xsj/19/8l/m1.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast"],
						"longitude": "116.344058",
						"latitude": "39.93243",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "西城区-展览馆路-12-4号-壹零捌道(车公庄店)",
						"type": "gcj02",
						"updateTime": "2022-12-26T12:19:00.451+00:00",
						"createTime": "2022-12-26T12:19:00.451+00:00"
					},
					{
						"id": 1607351406937870337,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "我现在到花园桥地铁站了",
						"imgUrl": ["http://81.70.163.240:9090/asiatrip/63afbfc474b82586c57f77271672462271452_IMG_20221219_204659.jpg",
									"http://81.70.163.240:9090/asiatrip/63afbfc474b82586c57f77271672462271452_IMG_20221219_204659.jpg",
									"http://81.70.163.240:9090/asiatrip/63afbfc474b82586c57f77271672462271452_IMG_20221219_204659.jpg"],
						"longitude": "116.310484",
						"latitude": "39.932368",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "海淀区-西三环北路辅路-38号-汉堡王(花园桥店)",
						"type": "gcj02",
						"updateTime": "2022-12-26T12:23:33.217+00:00",
						"createTime": "2022-12-26T12:23:33.217+00:00"
					},
					{
						"id": 1607356633464279042,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "我现在到金安桥地铁站了。",
						"imgUrl": ["http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f77291672462860233_IMG_20221219_204421.jpg",
									"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f77291672462860233_IMG_20221219_204421.jpg",
									"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f77291672462860233_IMG_20221219_204421.jpg",
									"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f77291672462860233_IMG_20221219_204421.jpg"],
						"longitude": "116.162621",
						"latitude": "39.923336",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "石景山区-北辛安路-9号院-麦当劳(北京北辛安路中海金安环宇荟餐厅)",
						"type": "gcj02",
						"updateTime": "2022-12-26T12:44:19.319+00:00",
						"createTime": "2022-12-26T12:44:19.319+00:00"
					},
					{
						"id": 1607358511279345666,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "这里是桥户营地铁站",
						"imgUrl": ["http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg",
						"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg",
						"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg",
						"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg",
						"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg"],
						"longitude": "116.124302",
						"latitude": "39.911615",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "门头沟区-石龙东路-32号院-北京市门头沟区华葳幼儿园",
						"type": "gcj02",
						"updateTime": "2022-12-26T12:51:47.023+00:00",
						"createTime": "2022-12-26T12:51:47.023+00:00"
					},
					{
						"id": 1607359154152902657,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "上岸地铁站",
						"imgUrl": ["http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
						"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
						"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
						"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
						"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
						"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp"],
						"longitude": "116.122243",
						"latitude": "39.907237",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "门头沟区-新城大街-9号-绿茶(门头沟龙湖店)",
						"type": "gcj02",
						"updateTime": "2022-12-26T12:54:20.296+00:00",
						"createTime": "2022-12-26T12:54:20.296+00:00"
					},
					{
						"id": 1607359704114237441,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "栗园庄地铁站",
						"imgUrl": ["http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772b1672462958086_Screenshot_2022-12-29-20-23-03-233_com.tencent.mm.png",
						"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
						"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
						"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
						"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
						"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
						"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png"],
						"longitude": "116.122921",
						"latitude": "39.897435",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "门头沟区-新城大街-甲14号-艺优艺术培训中心",
						"type": "gcj02",
						"updateTime": "2022-12-26T12:56:31.418+00:00",
						"createTime": "2022-12-26T12:56:31.418+00:00"
					},
					{
						"id": 1607535086738182145,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "马上到西黄村地铁站了",
						"imgUrl": ["http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png"],
						"longitude": "116.187053",
						"latitude": "39.927891",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "石景山区-苹果园南路-18号-漫咖啡(苹果园大街店)",
						"type": "gcj02",
						"updateTime": "2022-12-27T00:33:25.895+00:00",
						"createTime": "2022-12-27T00:33:25.895+00:00"
					},
					{
						"id": 1607753669191766017,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "慈寿寺",
						"imgUrl": ["http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png"
						],
						"longitude": "116.293655",
						"latitude": "39.932642",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "海淀区-玲珑路-10号-星巴克(北京琨御府新址店)",
						"type": "gcj02",
						"updateTime": "2022-12-27T15:02:00.012+00:00",
						"createTime": "2022-12-27T15:02:00.012+00:00"
					},
					{
						"id": 1608089157253566466,
						"userId": 1606522650501607400,
						"username": "俊哥",
						"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
						"words": "海淀五路居",
						"imgUrl": ["http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png"],
						"longitude": "116.276636",
						"latitude": "39.932424",
						"country": "中国",
						"province": "北京市",
						"city": "北京市",
						"address": "海淀区-玲珑路-156号-YoKID优儿学堂(玲珑路托育园)",
						"type": "gcj02",
						"updateTime": "2022-12-28T13:15:06.598+00:00",
						"createTime": "2022-12-28T13:15:06.598+00:00"
					}
				],
		load_status_tuwen: 'loadmore',
		};
	},
	props: {
	},
	onLoad() {
		console.log('进入页面')
		 let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		 console.log(routes)
		 this.current=Number(routes[routes.length - 1].options.id) ;
	},
	methods: {
		// 获得swiper切换后的current索引
		swipeIndex(index) {
			this.current = index.detail.current
		},
		// 切换选项卡
		tabChange(index) {
			this.current = index;
		},


	}
}
</script>