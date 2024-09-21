<style scope lang="scss">
/deep/.u-scroll-box{
	display: flex;
}
.scroll-view-height {
	/* 页面高度减去包含状态栏、标题、tab组件的高度 */
	height: calc(100vh - var(--status-bar-height));
	background-color: #f7f7f7;
}
</style>
<template>
	<view>
		<!-- 顶部区域 -->
		<u-sticky bgColor="#fffff">
			<u-tabs :list="tabList" :current="current" @change="tabChange" lineWidth="30" lineColor="#f56c6c"></u-tabs>
		</u-sticky>
		<!-- 内容区域 -->
		<swiper class="scroll-view-height" @change="swipeIndex" :current="current" :duration="300">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower"
				:refresher-triggered="triggered"
				:refresher-enabled="true"
				:refresher-threshold="100"
				@refresherrefresh="onPulling"
				@refresherrestore="onRestore">
					<view v-show="current == index">
						<view class="content" v-show="houseList.length>0">
							<!-- 列表 -->
							<block v-for="(item, i) in houseList" :key="i">
								<house-list-item ref="ListItem" :item="item" :index="i" @updateHouseList="updateHouseList" :current="current"></house-list-item>
							</block>
						</view>
						<!-- 骨架屏 -->
						<view v-show="showModel && houseList.length==0">
							<block v-for="item in houseJia" :key="item">
								<houseListItemSkeleton/>
							</block>
						</view>
						<block v-if="!showModel && houseList.length===0 && pageNum==1">
							<u-empty  text="暂无数据" mode="favor"></u-empty>
						</block>
					</view>
				</scroll-view>
			</swiper-item>
        </swiper>
	</view>
</template>

<script>
import houseListItem from '@/components/house-list/house-list-item.vue';
import houseListItemSkeleton from '@/components/house-list/house-list-item-skeleton.vue'
import loadinM from '@/components/common/modal/loading_model.vue'
import {editTitleText,showToastTit} from '@/utils/utils.js'

export default {
	components: {
		houseListItem,
		loadinM,
		houseListItemSkeleton
	},
	data() {
		return {
			triggered:false,
			showModel:false,
			houseJia:[1,2,3,4,5,6,7,8],
			houseList: [],
			auditList:[],//待审核
			publishedList:[],//已发布
			removeList:[],//已下架
			collectList:[],//收藏
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
				this.houseList=[]
				this.pageNum=1
				this.loadStatus='loadmore'
				// #ifdef APP-PLUS
				var webView = this.$mp.page.$getAppWebview();
				// #endif
				if(newVal==0){ // 待审核
					this.houseList=this.auditList
					// #ifdef APP-PLUS
					webView.setTitleNViewButtonStyle(0,{
						width: '100px'  
					});
					// #endif
				} else if(newVal==1){ // 已发布
					this.houseList=this.publishedList
					// #ifdef APP-PLUS
					webView.setTitleNViewButtonStyle(0,{
						width: '100px'  
					});
					// #endif
				} else if(newVal==2){ // 已下架
					this.houseList=this.removeList
					// #ifdef APP-PLUS
					webView.setTitleNViewButtonStyle(0,{
						width: '0px'  
					});
					// #endif
				} else if(newVal==3){ // 收藏
					this.houseList=this.collectList
					if(this.collectList.length==0){
						this.showModel=true
						this.getCollect()
					}
					// #ifdef APP-PLUS
					webView.setTitleNViewButtonStyle(0,{
						width: '0'  
					});
					// #endif
				} 
				if(this.houseList.length==0){
					this.showModel=true
					this.getStatusHouseList(Number(newVal)+1)
				}
				// 编辑右上角按钮文字
				editTitleText('管理')
				this.isUpdate=false
			}
		}
	},
	onLoad(options) {
		this.current=options.index
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
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
		if(this.$refs.ListItem && this.$refs.ListItem.length>0){
			this.$refs.ListItem.forEach(item=>{
				item.isUpdate=this.isUpdate
			})
			// 编辑右上角按钮文字
			editTitleText(txt)
		}
	},
	methods: {
		//自定义刷新
		onPulling(e) {
			if(!this.triggered){
				this.triggered=true
				setTimeout(()=>{
					this.pageNum=1
					this.houseList=[]
					if(this.current!=3){
						this.getStatusHouseList(Number(this.current)+1)
					}else{
						this.getCollect()
					}
				},1000)
			}		
		},
		onRestore() {
			this.triggered = false; // 需要重置
		},
		//滚动
		scrolltolower(){
			if(this.loadStatus=='loadmore'){
				this.pageNum++
				if(this.current!=3){
					this.getStatusHouseList(Number(this.current)+1)
				}else{
					this.getCollect()
				}
			}
		},
		//下架  接口成功之后的刷新
		updateHouseList(){
			this.pageNum=1
			this.getStatusHouseList(2)
		},
		//获取收藏的房源
		getCollect(){
			this.$H.get('/zf/v1/const/collect/rooms',{
				userId:this.$store.state.userInfo.id,
				page:this.pageNum,
				size:10
			},true).then(res=>{
				this.showModel=false
				this.triggered=false
				if(res.status&&res.code==200){
					this.houseList=[...this.houseList,...res.data]	
					this.collectList=this.houseList
					if(res.data&&res.data.length<10 && this.pageNum>1){
						this.loadStatus='end'
						uni.showToast({
							icon: 'none',
							title: '已加载完成'
						});
					}
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
		getStatusHouseList(type){	
			let params={
				"page":this.pageNum,
				"size":"10",
				"status":type, //(1:待审核,2:已发布,3:已下架)
				"user_id": this.$store.state.userInfo.id,
			}
			// 1待审核 2已发布 3已下架
			this.$H.post('/zf/v1/room/list',params,true).then(res=>{
				this.triggered=false
				this.showModel=false
				if(res.data && res.status && res.data.length>0){
					this.houseList=res.data
				} else if(res.data && res.status && res.data.length==0){
					this.houseList=[];
				}
				switch(type){
                    case 1 :
                        this.auditList=this.houseList
                        break;
                    case 2:
                        this.publishedList=this.houseList
                        break;
                    case 3:
                        this.removeList=this.houseList
                        break;
					case 4:
					    this.getCollect();
					    break;
                }
				res.data.length<10?this.loadStatus='end':this.loadStatus='loadmore'
				// 下架后关闭管理操作
				this.isUpdate=false
				if(this.$refs.ListItem && this.$refs.ListItem.length>0){
					this.$refs.ListItem.forEach(item=>{
						item.isUpdate=this.isUpdate
					})
					// 编辑右上角按钮文字
					editTitleText('管理')
				}
			})
		}
	}
}
</script>