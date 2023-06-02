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
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower">
					<view v-if="current === 0">
						<!-- 内容区域 -->
						<block v-if="tuwen_data.length === 0 && currPage==1">
							<u-empty  text="暂无数据" mode="favor"></u-empty>
						</block>
						<view class="content" v-else>
							<!-- 圈子 -->
						    <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>					
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 1">
					<block v-if="tuwen_data.length === 0 && currPage==1">
						<u-empty  text="暂无数据" mode="favor"></u-empty>
					</block>
					<view class="content" v-else>
						<!-- 已发布 -->
					   <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>
					</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 2">
						<block v-if="tuwen_data.length === 0 && currPage==1">
								<u-empty  text="暂无数据" mode="favor"></u-empty>
						</block>
						<view class="content" v-else>
							<!-- 已下架 -->
							 <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current === 3">
					<block v-if="tuwen_data.length === 0 && currPage==1">
						<u-empty  text="暂无数据" mode="favor"></u-empty>
					</block>
					<view class="content" v-else>
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
import tuwenVue from '../../publish/choice/tuwen.vue';
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
					name: '点赞'
				},
				{
					name: '转发'
				},
				{
					name: '浏览'
				}
			],
			// 价格列表的map
		tuwen_data: [],
		load_status_tuwen: 'loadmore',
		currPage:1,
		typeIndex:'',//0 圈子 1 互动 2 转发  3 浏览
		};
	},
	props: {
	},
	onLoad(options) {
		console.log(options)
		this.typeIndex=options.id
		// console.log('进入页面')
		that=this
		 let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		 // console.log(routes)
		 this.getShowData()
		 this.current=Number(routes[routes.length - 1].options.id) ;
	},
	methods: {
		scrolltolower(){
			if(this.load_status_tuwen=='nomore'){
				uni.showToast({
					icon: 'none',
					title: '已加载完成'
				});
				return;
			}
			this.currPage++
			if(this.typeIndex==0){
				this.getShowData()
			}			
		},
		// 获得swiper切换后的current索引
		swipeIndex(index) {
			this.current = index.detail.current
			that.tuwen_data=[]
		},
		// 切换选项卡
		tabChange(index) {
			this.current = index;
			this.typeIndex=index
			that.tuwen_data=[]
			this.getShowData()
			
		},
		getShowData(){
			console.log(this.typeIndex)
			let data={}
			let url=''
			
			if(this.typeIndex==0){
				data={
					userId:that.$store.state.userInfo.id, 
					page:this.currPage,
					size:10
				}
				url='/zf/v1/dynamic/list'
				this.$H.post(url,data,true).then(res=>{
							that.getRestus(res)
				})
			}else if(this.typeIndex==1 || this.typeIndex==2 ||this.typeIndex==3){
				let type=''
				if(this.typeIndex==1) type='likes'
				if(this.typeIndex==2) type='transfer'
				if(this.typeIndex==3) type="look" 
				data={
					userId:that.$store.state.userInfo.id,
					pageNum:this.currPage,
					pageSize:10,
					type:type
				}
				url='/zf/v1/dynamic/statistics'
				this.$H.get(url,data,true).then(res=>{
							that.getRestus(res)
				})
			}
			
			
		},
			
		getRestus(res){
			console.log('请求的数据',res)
			if(res.status){
				that.tuwen_data=[...that.tuwen_data,...res.data]
				console.log(that.tuwen_data)
					if(res.data.length==0 &&this.currPage!=1){
						that.load_status_tuwen='nomore'
					}
			}
		}
	}
}
</script>