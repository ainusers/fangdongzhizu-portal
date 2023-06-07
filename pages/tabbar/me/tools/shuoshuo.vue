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
					<view v-if="current == 0">
						<!-- 内容区域 -->
						<block v-if="tuwen_data.length === 0 && currPage==1">
							<u-empty  text="暂无数据" mode="favor"></u-empty>
						</block>
						<view class="content" v-else>
							<!-- 圈子 -->
						    <post-list :list="tuwen_data" :loadStatus="load_status_tuwen" @clickLike="clickLike"></post-list>					
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current == 1">
					<block v-if="tuwen_data.length === 0 && currPage==1">
						<u-empty  text="暂无数据" mode="favor"></u-empty>
					</block>
					<view class="content" v-else>
						<!-- 点赞 -->
					   <post-list :list="tuwen_data" :loadStatus="load_status_tuwen" @clickLike="clickLike"></post-list>
					</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current == 2">
						<block v-if="tuwen_data.length === 0 && currPage==1">
								<u-empty  text="暂无数据" mode="favor"></u-empty>
						</block>
						<view class="content" v-else>
							<!-- 已下架 -->
							 <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"  @clickLike="clickLike"></post-list>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content">
					<view v-if="current == 3">
					<block v-if="tuwen_data.length === 0 && currPage==1">
						<u-empty  text="暂无数据" mode="favor"></u-empty>
					</block>
					<view class="content" v-else>
						<!-- 收藏 -->
					    <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"  @clickLike="clickLike"></post-list>
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
export default {
	components: {
		screenTab,
		postList
	},
	data() {
		return {
			current: 0,//0 圈子 1 互动 2 转发  3 浏览
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
			tuwen_data: [],
			tuwen_dataAll:[], //存储四个tab所有数据
			load_status_tuwen: 'loadmore',
			currPage:1,
			status:false, //当前是否正在被加载
		};
	},
	props: {
	},
	onLoad(options) {
		this.current=options.id
		 this.getShowData()
	},
	methods: {
		tuwen_init(index){
			this.current = index;
			 this.tuwen_data=this.tuwen_dataAll[index]?this.tuwen_dataAll[index]:[]  
			  if(this.tuwen_dataAll[index]&&this.tuwen_dataAll[index].length==0){
				   this.status =false
			  }
			 if(this.status) return
			 this.status=true
			if(this.tuwen_dataAll[index]&&this.tuwen_dataAll[index].length==0 ||!this.tuwen_dataAll[index]){
					this.currPage=1
					this.tuwen_data=[]
					this.getShowData()
			}	
		},
		//上拉加载
		scrolltolower(){
			this.currPage++
			this.getShowData()			
		},
		// 获得swiper切换后的current索引
		swipeIndex(index) {
			 let curindex=index.detail.current
			this.tuwen_init(curindex)
		},
		// 切换选项卡
		tabChange(index) {
			this.tuwen_init(index)
		},
		//动态点赞
		clickLike(id,isLove,index){
			let data={
				userId:this.$store.state.userInfo.id,
				id:id?id:0,
				type:isLove?'plus':'reduce',
			}
			this.$H.patch('/zf/v1/dynamic/follow',data,true).then(res=>{
				if(res.status&&res.status!=500){
					res.data[0].count?this.tuwen_data[index].likes+=1 :this.tuwen_data[index].likes-=1
					res.data[0].count?this.tuwen_data[index].status=1 :this.tuwen_data[index].status=0
				}
			})
		},
		getShowData(){
			let data={}
			let url=''
			if(this.current==0){
				data={
					userId:this.$store.state.userInfo.id, 
					page:this.currPage,
					size:10,
					type:'user'
				}
				url='/zf/v1/dynamic/list'
				this.$H.post(url,data,true).then(res=>{
					this.status=false
					this.getRestus(res,this.current)
				})
			}else if(this.current==1 || this.current==2 ||this.current==3){
				let type=''
				if(this.current==1) type='likes'
				if(this.current==2) type='transfer'
				if(this.current==3) type="look" 
				data={
					userId:this.$store.state.userInfo.id,
					pageNum:this.currPage,
					pageSize:10,
					type:type
				}
				url='/zf/v1/dynamic/statistics'
				this.$H.get(url,data,true).then(res=>{
					this.status=false
					this.getRestus(res,this.current)
				})
			}
		},
			
		getRestus(res,type){
			if(res.status){
				if(res.data.length==0 &&this.currPage!=1){
					this.load_status_tuwen='nomore'
					uni.showToast({
						icon: 'none',
						title: '已加载完成'
					});
				}
				this.tuwen_dataAll[type]=(this.tuwen_dataAll[type]?this.tuwen_dataAll[type]:[])
				this.tuwen_dataAll[type]=[...this.tuwen_data,...res.data]
						this.tuwen_dataAll[type].forEach(item=>{
							item.image=item.imgurl.split(',')
				})
				this.tuwen_data=this.tuwen_dataAll[type]
			}
		}
	}
}
</script>