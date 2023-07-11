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
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower"
				:refresher-triggered="triggered"
				:refresher-enabled="true"
				:refresher-threshold="100"
				@refresherpulling="onPulling"
				@refresherrestore="onRestore"
				>
					<view v-if="current == 0">
						<!-- 内容区域 -->
						<block v-if="status&& currPage==1">
							<view v-for="(key,index) in jiaL">
								<postListSkeleton/>
							</view>
						</block>
						<block v-if="!status&&tuwen_data.length === 0 && currPage==1">
							<u-empty  text="暂无数据" mode="favor"></u-empty>
						</block>
						<view class="content" v-else>
							<!-- 圈子 -->
						    <post-list :list="tuwen_data" :loadStatus="load_status_tuwen" @clickLike="clickLike"  @changeStatus="changeStatus"></post-list>					
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower"
				:refresher-triggered="triggered"
				:refresher-enabled="true"
				:refresher-threshold="100"
				@refresherpulling="onPulling"
				@refresherrestore="onRestore"
				>
					<view v-if="current == 1">
					<!-- 内容区域 -->
					<block v-if="status&& currPage==1">
						<view v-for="(key,index) in jiaL">
							<postListSkeleton/>
						</view>
					</block>
					<block v-if="!status&&tuwen_data.length === 0 && currPage==1">
						<u-empty  text="暂无数据" mode="favor"></u-empty>
					</block>
					<view class="content" v-else>
						<!-- 点赞 -->
					   <post-list :list="tuwen_data" :loadStatus="load_status_tuwen" @clickLike="clickLike" @changeStatus="changeStatus"></post-list>
					</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower"
				:refresher-triggered="triggered"
				:refresher-enabled="true"
				:refresher-threshold="100"
				@refresherpulling="onPulling"
				@refresherrestore="onRestore"
				>
					<view v-if="current == 2">
						<!-- 内容区域 -->
						<block v-if="status&& currPage==1">
							<view v-for="(key,index) in jiaL">
								<postListSkeleton/>
							</view>
						</block>
						<block v-if="!status&&tuwen_data.length === 0 && currPage==1">
							<u-empty  text="暂无数据" mode="favor"></u-empty>
						</block>
						<view class="content" v-else>
							<!-- 已下架 -->
							 <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"  @clickLike="clickLike"  @changeStatus="changeStatus"></post-list>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower"
					:refresher-triggered="triggered"
					:refresher-enabled="true"
					:refresher-threshold="100"
					@refresherpulling="onPulling"
					@refresherrestore="onRestore"
				>
					<view v-if="current == 3">
					<!-- 内容区域 -->
					<block v-if="status&& currPage==1">
						<view v-for="(key,index) in jiaL">
							<postListSkeleton/>
						</view>
					</block>
					<block v-if="!status&&tuwen_data.length === 0 && currPage==1">
						<u-empty  text="暂无数据" mode="favor"></u-empty>
					</block>
					<view class="content" v-else>
						<!-- 收藏 -->
					    <post-list :list="tuwen_data" :loadStatus="load_status_tuwen"  @clickLike="clickLike"  @changeStatus="changeStatus" ></post-list>
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
import postListSkeleton from '@/components/post-list/post-list-skeleton.vue'
import tuwenVue from '../../publish/choice/tuwen.vue';
export default {
	components: {
		screenTab,
		postList,
		postListSkeleton
	},
	data() {
		return {
			triggered:false,
			current: 0,//0 圈子 1 互动 2 转发  3 浏览
			tabList: [
				{
					name: '圈子'
				},
				{
					name: '点赞'
				},
				{
					name: '举报'
				},
				{
					name: '浏览'
				}
			],
			tuwen_data: [],
			tuwen_dataAll:[], //存储四个tab所有数据
			reportList:[],
			load_status_tuwen: 'loadmore',
			currPage:1,
			status:false, //当前是否正在被加载
			jiaL:[1,2,3]
		};
	},
	props: {
	},
	onLoad(options) {
		this.current=options.id
		if(this.current==2){
			this.getDynamics()
		}else{
			 this.getShowData()
		}	
	},
	methods: {
		//自定义刷新
		onPulling(e) {
			console.log(this.triggered)
			if(!this.triggered){
				this.triggered=true
				setTimeout(()=>{
					this.currPage=1
					this.tuwen_data=[]
					this.current!=2?this.getShowData():this.getDynamics()
				},1000)
				
			}		
		},
		onRestore() {
			this.triggered = false; // 需要重置
		},
		tuwen_init(index){
			console.log(index)
			 if(this.status) return
			 this.current = index;
			 if(index!=2){
				 this.tuwen_data=this.tuwen_dataAll[index]?this.tuwen_dataAll[index]:[]
				   if(this.tuwen_dataAll[index]&&this.tuwen_dataAll[index].length==0){
				 	   this.status =false
				   }
			 }else{
				 this.tuwen_data=this.reportList
			 } 
			 if(this.tuwen_data&&this.tuwen_data.length==0 ||!this.tuwen_data){
			 		this.status=true
			 		this.currPage=1
			 		this.tuwen_data=[]
			 		index!=2?this.getShowData():this.getDynamics()
			 }	
		},
		//上拉加载
		scrolltolower(){
			if(this.load_status_tuwen!='nomore'){
				this.currPage++
				this.current!=2?this.getShowData():this.getDynamics()
			}				
		},
		// 获得swiper切换后的current索引
		swipeIndex(index) {
			if(this.status) return
			 let curindex=index.detail.current
			this.tuwen_init(curindex)
		},
		// 切换选项卡
		tabChange(index) {
			if(this.status) return
			this.tuwen_init(index)
		},
		//动态点赞
		clickLike(id,index){
			let data={
				userId:this.$store.state.userInfo.id,
				id:id?id:0,
			}
			this.$H.patch('/zf/v1/dynamic/like',data,true).then(res=>{
				if(res.status&&res.status!=500){
				if(res.status&&res.status!=500){
					if(!this.tuwen_data[index].like){
						this.$set(this.tuwen_data[index],'like',0)
					}
					res.data[0].status?this.tuwen_data[index].like+=1 :this.tuwen_data[index].like-=1
					if(res.data[0].status){
						this.$set(this.tuwen_data[index],'status',1)
						
					}else{
						this.$set(this.tuwen_data[index],'status',0)
					}
				}
				}
			})
		},
		changeStatus(index,statu){
			this.tuwen_data[index].isReport=statu
		},
		getShowData(){
			this.status=true
			let data={}
			let url=''
			url='/zf/v1/dynamic/list'
			if(this.current==0){
				data['way']='user'	
			}else{
				data['way']=null
			}
			data={
				userId:this.$store.state.userInfo.id, 
				page:this.currPage,
				size:10,
			}
			if(this.current==1) data['type']='like'; 
			if(this.current==2) data['type']='transfer'; 
			if(this.current==3) data['type']="look"; 
			this.$H.post(url,data,true).then(res=>{
				if(this.currPage==1){
					 this.tuwen_data=[]
				}
				this.status=false
				this.getRestus(res,this.current)
			})
		},	
		getRestus(res,type){
			this.load_status_tuwen='loading'
			this.triggered=false
			if(res.status){
				if(res.data.length==0 &&this.currPage!=1 || res.data.length<10&&this.currPage!=1){
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
							this.$set(item,'isReport',false)
						})
				this.tuwen_data=this.tuwen_dataAll[type]
			}
		},
		getDynamics(){
			this.load_status_tuwen='loading'
			let type=this.current
			let data={
				userId:this.$store.state.userInfo.id,
				page:this.currPage,
				size:10
			}
			this.$H.get('/zf/v1/tip/dynamics',data,true).then(res=>{
				this.triggered=false
				if(res.status&&res.code==200){
					this.tuwen_data=[...res.data,...this.tuwen_data]
					this.reportList=this.tuwen_data
					this.tuwen_data.forEach(item=>{
						if(item.imgurl){
							item.image=item.imgurl.split(',')
						}
						this.$set(item,'isReport',false)
					})
					if(res.data.length==0 &&this.currPage!=1 || res.data.length<10&&this.currPage!=1){
						this.load_status_tuwen='nomore'
						uni.showToast({
							icon: 'none',
							title: '已加载完成'
						});
					}
				}
			})
		}
	}
}
</script>