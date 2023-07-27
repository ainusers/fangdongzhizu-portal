<style lang="scss" scoped>
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
</style>
<template>
	<view>
		<!-- 轮播图 -->
		<u-swiper :list="swiperList"  radius="20rpx"></u-swiper>
		
		<!-- 功能菜单 -->
<!-- 		<view class="community">
			<view class="option" @click="goto('/pages/index/check/index')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/ad.png"></image>
				</view>
				<view class="name">热点资讯</view>
			</view>								
			<view class="option" @click="goto('/pages/tabbar/community/tools/news')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/churuku.png"></image>
				</view>
				<view class="name">万人群聊</view>
			</view>
		
			<view class="option" @click="goto('/pages/tabbar/me/tools/advise')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/jiaoyu.png"></image>
				</view>
				<view class="name">吐槽专区</view>
			</view>
			<view class="option" @click="goto('/pages/index/news/state')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/fujin.png"></image>
				</view>
				<view class="name">分享返现</view>
			</view>
			<view class="option" @click="goto('/pages/index/news/kepu')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/qushi.png"></image>
				</view>
				<view class="name">房屋清洁</view>
			</view>
			<view class="option" @click="goto('/pages/index/news/yaoyan')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/tongzhi.png"></image>
				</view>
				<view class="name">设备维修</view>
			</view>
			<view class="option" @click="goto('/pages/index/minsheng/index')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/wuye.png"></image>
				</view>
				<view class="name">货运搬家</view>
			</view>
			<view class="option" @click="goto('/pages/index/wuye/index')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/zhoubianzhanlichaxun.png"></image>
				</view>
				<view class="name">商务合作</view>
			</view>
		</view>
 -->
		<!-- 朋友圈 -->
		<post-list :list="tuwen_data" :loadStatus="load_status_tuwen" @changeStatus="changeStatus" @clickLike="clickLike"></post-list>
	</view>
</template>

<script>
	import postList from '../../../components/post-list/post-list.vue';
	import {isLoginCheck} from '../../../utils/utils.js'
	export default {
		components: {
			postList
		},
		data() {
			return {
				swiperList: [],
				tuwen_data: [],
				load_status_tuwen: 'loadmore',
				tuwen_default_page: 1
			}
		},
		computed: {
			
		},
		onLoad() {
			this.getBanner()
		},
		onShow() {
			this.getMomentPost();
		},
		onPullDownRefresh() {
			this.tuwen_default_page = 1;
			this.getMomentPost();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if(this.load_status_tuwen!='nomore'){
				this.tuwen_default_page++;
				this.getMomentPost();
				this.tuwen_data.forEach(item=>{
					this.$set(item,'isReport',false)
				})
			}else{
				uni.showToast({
					icon:'none',
					title:"主人，已经到底了呦"
				})
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
			changeStatus(index,statu,isDelete){
				this.tuwen_data[index].isReport=statu
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
				// 测试数据待修改
				this.load_status_tuwen = 'loading';
				let data={
						  "page":this.tuwen_default_page ,
						  "size": "10",
						  'userId':this.$store.state.userInfo.id
				}
				this.$H.get('/zf/v1/dynamic/list',data,true).then(res=>{

					if(res.status){
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
			clickLike(id,index){
				let data={
					userId:this.$store.state.userInfo.id,
					id:id?id:0
				}
				this.$H.patch('/zf/v1/dynamic/like',data,true).then(res=>{
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
				})
			},
		}
	}
</script>