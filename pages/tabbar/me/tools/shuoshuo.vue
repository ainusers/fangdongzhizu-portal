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
var that=''
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
		tuwen_data: [ 
			// {
			// 			"id": 4048,
			// 			"cid": 1,
			// 			"userId": 1606522650501607400,
			// 			"username": "俊哥",
			// 			"follow": false,
			// 			"followCount": 0,
			// 			"comment_count": 0,
			// 			"share_count": 0,
			// 			"avatar": "http://192.168.3.101:9090/asiatrip/63de0f9551b4bbd2cf765c361675497360154_mmexport1579505430486.jpg",
			// 			"words": "今天是周一，我来上班了，手里的任务好多呀，安排好优先级，一件一件的做！！！",
			// 			"imgUrl": ["https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281","https://img.tukuppt.com/photo-big/00/00/94/6152bc0ce6e5d805.jpg","https://img0.baidu.com/it/u=2028084904,3939052004&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500","https://img0.baidu.com/it/u=1472391233,99561733&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"],
			// 			"longitude": "116.34125",
			// 			"latitude": "39.936784",
			// 			"country": "中国",
			// 			"province": "北京市",
			// 			"city": "北京市",
			// 			"address": "西城区-西直门外南路-26号院-北京建筑大学(西城校区)",
			// 			"type": "gcj02",
			// 			"updateTime": "2022-12-26T02:52:23.018+00:00",
			// 			"createTime": "2022-12-26T02:52:23.018+00:00"
			// 		}
				],
		load_status_tuwen: 'loadmore',
		};
	},
	props: {
	},
	onLoad() {
		// console.log('进入页面')
		that=this
		 let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		 // console.log(routes)
		 this.getShowData()
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
		getShowData(){
			let data={
				userId:that.$store.state.userInfo.id
			}
			this.$H.post('/zf/v1/dynamic/list',data,true).then(res=>{
						if(res.status){
							that.tuwen_data=res.data
								if(that.tuwen_data.length==0){
									that.load_status_tuwen='nomore'
								}
						}
			})
		}

	}
}
</script>