<style scope lang="scss">
/deep/.u-scroll-box{
	display: flex;
}
.scroll-view-height {
	/* 页面高度减去包含状态栏、标题、tab组件的高度 */
	height: calc(100vh - var(--status-bar-height));
	background-color: #f7f7f7;
}
.operate {
	 position: absolute;
	 bottom: 60px;
	 left: 80%;
}
.report_con{
	width:100%;
	padding: 15upx 60upx 0upx 80upx;
	/deep/.u-radio{
		width: 50%;
		margin-bottom: 30upx;				
	}
};
.hink{
	font-size: 26upx;
	color: #aaa;
	margin: 0upx 30upx 10upx 40upx;
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
						<view class="content" v-if="houseList.length>0">
							<!-- 列表 -->
							<block v-for="(item, i) in houseList" :key="i">
								<house-list-item ref="ListItem" :item="item" :index="i" @updateHouseList="updateHouseList" :current="current" @updateRemoveShow="changeRemoveShow"></house-list-item>
							</block>
						</view>
						<!-- 骨架屏 -->
						<view v-if="showModel && houseList.length==0">
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
		
		<!-- 编辑按钮 (当待审核、已发布、已下架时显示)-->
		<view class="operate" @click="roomOperate()" v-if="(current==0 || current==1 || current==2) && houseList.length>0">
			<uni-icons custom-prefix="iconfont" type="icon-bianji" color="#5199ff" size="30"></uni-icons>
		</view>
		
		<!-- 下架 - 温馨提示 -->
		<u-modal  v-model="removeShow"   title="请选择房源下架原因" confirm-text="确认下架" :show-cancel-button="true" cancel-text="再想想" @confirm="confirm">
			<view class="report_con">
				<u-radio-group v-model="reportValue" @change="radioGroupChange" width="50%">
							<u-radio 
								v-for="(item, index) in reportList" :key="index" 
								:name="item.name"
								v-model="item.checked"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
				</u-radio-group>
			</view>
			<view class="hink">
				注：非常感谢您一直以来对房东直租app的支持与关注，我们深知房源的数量和质量对于用户来说至关重要，因此我们一直在努力拓展房源和丰富功能，以满足更多用户的需求，我们真诚地希望您能够继续留在这里，一同见证app的成长与发展
			</view>
		</u-modal>
		
	</view>
</template>

<script>
import houseListItem from '@/components/house-list/house-list-item.vue';
import houseListItemSkeleton from '@/components/house-list/house-list-item-skeleton.vue'

export default {
	components: {
		houseListItem,
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
			isUpdate:false,
			removeShow:false,
			reason: '',
			itemId:'',
			reportValue:'',
			reportList:[
				{
					name:'虚假房源',
					checked:false
				},
				{
					name:'房源较少',
					checked:false
				},
				{
					name:'已租到房',
					checked:false
				},
				{
					name:'用户体验',
					checked:false
				},
				{
					name:'信息安全',
					checked:false
				},
				{
					name:'其它',
					checked:false
				}
			]
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
						// this.getCollect()
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
			if(type == 4){
				// 查询收藏房源
				this.getCollect();
			} else {
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
          }
					res.data.length<10?this.loadStatus='end':this.loadStatus='loadmore'
					// 关闭管理操作
					this.isUpdate=false
					if(this.$refs.ListItem && this.$refs.ListItem.length>0){
						this.$refs.ListItem.forEach(item=>{
							item.isUpdate=this.isUpdate
						})
					}
				})
			}
		},
		// 编辑房源按钮
		roomOperate(){
			if(!this.isUpdate){
				this.isUpdate=true
			} else{
				this.isUpdate=false
			}
			if(this.$refs.ListItem && this.$refs.ListItem.length>0){
				this.$refs.ListItem.forEach(item=>{
					item.isUpdate=this.isUpdate
				})
			}
		},
    // 展示下架dialog
		changeRemoveShow(show,item){
			this.removeShow = show
      this.itemId = item.id
		},
		// 切换注销原因事件
		radioGroupChange(e){
			this.reason=e
		},
		// 确认下架
		confirm(e) {
			if(!this.reason) {
				this.$u.toast('请选择下架原因')
				this.removeShow = true;
				return
			}
      let data={
        id:this.itemId,
        status:3,
        reason:this.reason
      }
      // 刷新页面
      this.$H.post('/zf/v1/room/status',data,true).then(res=>{
        if(res.status){
          this.updateHouseList();
          this.reportValue = ''
          this.$u.toast('下架房源成功！')
        }
      })
			this.removeShow = false;
		}
	}
}
</script>