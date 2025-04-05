<style lang="scss" scoped>
	.cmtyLayout{
		background: #f7f7f7;
		height:100vh;
	}
	.pyquan{
		height:calc(100vh - var(--status-bar-height) - 330rpx)
	}
	.empty{
		height: calc(var(--status-bar-height));
		background-color: #0076f6;
	}
	.community {
		display: flex;
		width: 100%;
		height: 300upx;
		align-items: center;
		background-color: #FFFFFF;
		flex-wrap: wrap;
		.option {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 140upx;
			.icon {
				image {
					height: 80upx;
					width: 80upx;
				}
			}
			.name {
				color: #333;
				line-height: 30upx;
			}
		}
	}
	.notice{
		background: #fff;
		width: 730rpx;
		height: 80rpx;
		line-height: 72rpx;
	    margin: 6rpx 10rpx 0rpx 10rpx;
		border-radius: 10rpx;
		border: #eee 2px solid; 
		display: flex;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			.text{
				color: #0076f6;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center{
			width: 100%;
			swiper{
				height: 100%;
				&-item{
					.noticetittle{
						color: #0076f6;
						width: 100%;
						font-size: 28rpx;
						overflow: hidden;
						padding-left: 5px;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
	.report_con{
		font-size: 28rpx;
		width: 100%;
		margin: 0 auto;
		color: #AAAAAA;
		padding: 20px;
	}

</style>
<template>
	<view class="cmtyLayout">
		<!-- #ifdef APP-PLUS -->
		<view class="empty"></view>
		<!-- #endif -->
		<!-- 轮播图 -->
		<div style="background: #f7f7f7;">
			<u-swiper :list="swiperList" radius="20rpx" height="250" mode="rect" @click="navigateToPage"></u-swiper>
		</div>

		<!-- 公告 -->
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#0076f6"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay circular interval="1500" duration="300">
					<swiper-item v-for="(item,index) in noticeList" :key="index">
						<view class="noticetittle" @click="chgIndexShow(index,show)">{{item.title}}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!-- 朋友圈 -->
		<scroll-view scroll-y="true" class="pyquan" 
		:refresher-triggered="triggered"
		:refresher-enabled="true"
		:refresher-threshold="40"
		@refresherrefresh="onPulling"
		@scrolltolower="scrolltolower"
		@refresherrestore="onRestore">
			<post-list :showRow="'-webkit-line-clamp: 1'" :list="tuwen_data" :loadStatus="load_status_tuwen"
			:imageFlag="false" @changeStatus="changeStatus" @clickLike="clickLike"></post-list>
		</scroll-view>

		<!-- 公告弹框 -->
		<u-modal :async-close="true" v-model="show" title="公告"  confirm-text="知道了" @confirm="chgShow(show)">
			<rich-text :nodes="noticeList[curentIndex].content" class="report_con"></rich-text>
		</u-modal>
	</view>
</template>

<script>
	import postList from '@/components/post-list/post-list.vue';
	export default {
		components: {
			postList
		},
		data() {
			return {
				swiperList: [],
				tuwen_data: [],
				load_status_tuwen: 'loadmore',
				tuwen_default_page: 1,
				cityName: '',
				show: false,
				noticeList:[{"title":"","content":''}],
				curentIndex:0,
				triggered:false
			}
		},
		onLoad() {
			this.getBanner();
			// 获取社区公告标题和内容
			this.getNoticeList();
		},
		// 默认展示
		onShow() {
			//加入cityName筛选
			const cityName = uni.getStorageSync('cityName')
			if(this.cityName !== cityName){
				this.tuwen_default_page = 1
				this.cityName = cityName
			}
			if(!this.tuwen_data.length || this.tuwen_default_page == 1){
				this.getMomentPost();
			}
		},
		
		methods: {
			getBanner(){
				this.$H.get('/zf/v1/const/banner',{},true).then(res=>{
					if(res.status&&res.code==200){
						this.swiperList=res.data
					}
				})
			},
			navigateToPage(index) {
                if (index === 0) {
                    uni.navigateTo({
                        url: '/pages/tabbar/community/lifeServe/formaldehyde',
                    })
                }
            },
			changeStatus(index,status,isDelete){
				this.tuwen_data.forEach(item=>{
					item.isReport=false
				})
				this.tuwen_data[index].isReport=status
				if(isDelete){
					this.tuwen_data.splice(index,1)
				}
			},
			// 跳转页面
			goto(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			// 获取图文数据
			getMomentPost() {
				let data={
					"page":this.tuwen_default_page ,
					"size": "10",
					"userId":this.$store.state.userInfo.id,
					"cityName": this.cityName,
				}
				this.$H.get('/zf/v1/dynamic/list',data,true).then(res=>{
					if(res.status){
						this.triggered=false
						if(this.tuwen_default_page==1){
							this.tuwen_data = res.data
						}else{
							this.tuwen_data=[...this.tuwen_data,...res.data]
						}
						this.tuwen_data.forEach(item=>{
							item.image=item.imgurl.split(',')
							this.$set(item,'isReport',false)
						})
						if(res.data.length>=10){
							this.load_status_tuwen = 'loadmore';
						}else{
							this.load_status_tuwen = 'nomore';
						}
					}
				})
			},
			// 动态点赞
			clickLike(id,index,ownerid){
				let data={
					userId:this.$store.state.userInfo.id,
					id:id?id:0,
					dynamicUserId:ownerid
				}
				this.$H.patch('/zf/v1/dynamic/like',data,true).then(res=>{
					if(res.status && res.code==200){		
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
				})
			},
			chgIndexShow(index,show) {
				this.curentIndex = index;
				this.show = !this.show;
			},
			chgShow() {
				this.show = !this.show;
			},
			// 获取社区公告标题和内容
			getNoticeList(){
				this.$H.get('/zf/v1/publicize',{},true).then(res=>{
					if(res.status && res.code==200){
						this.noticeList = res.data[0];
					}
				})
			},
			// 下拉刷新
			onPulling() {
				if(!this.triggered){
					this.triggered=true
					this.tuwen_default_page = 1;
					this.getMomentPost();
				}
			},
			// 上拉加载
			scrolltolower() {
				if(this.load_status_tuwen!='nomore'){
					this.tuwen_default_page++;
					this.getMomentPost();
					this.tuwen_data.forEach(item=>{
						this.$set(item,'isReport',false)
					})
				}else{
					uni.showToast({
						icon:'none',
						title:"小主,别使劲,已经到底了"
					})
				}
			},
			onRestore() {
				this.triggered = false; // 需要重置
			}
		}
	}
</script>