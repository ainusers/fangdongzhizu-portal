<style lang="scss">
	.community {
		display: flex;
		width: 100%;
		height: 280upx;
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
		<u-swiper :list="swiperList" @click="click" radius="20rpx"></u-swiper>
		
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
		<post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>
		
	</view>
</template>

<script>
	import postList from '../../../components/post-list/post-list.vue';
	export default {
		components: {
			postList
		},
		data() {
			return {
				swiperList: [
					'../../../static/community/banner/banner-1.png',
					'../../../static/community/banner/banner-2.png',
					'../../../static/community/banner/banner-3.png',
				],
				tuwen_data: [],
				load_status_tuwen: 'loadmore',
				tuwen_default_page: 1
			}
		},
		computed: {
			
		},
		onLoad() {
			// 进入页面就加载推荐数据
			this.getMomentPost();
		},
		onShow() {
			this.getMomentPost();
		},
		onPullDownRefresh() {
			this.tuwen_default_page = 1;
			// this.tuwen_data = this.tuwen_data.reverse();
			this.getMomentPost();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			
			if(this.load_status_tuwen!='nomore'){
				this.tuwen_default_page++;
				this.getMomentPost();
				this.tuwen_data = this.tuwen_data.concat(this.tuwen_data.slice(1,2));
			}else{
				uni.showToast({
					icon:'none',
					title:"已加载完成"
				})
			}
			
		},
		methods: {
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
						  "userId": this.$store.state.userInfo.id,
						  "page":this.tuwen_default_page ,
						  "size": "10"
					}
				this.$H.post('/zf/v1/dynamic/list',data,true).then(res=>{
					if(res.status){
						
						if(this.tuwen_default_page==1){
							this.tuwen_data = res.data
						}else{
							this.tuwen_data.concat(this.tuwen_data,res.data)
						}
						
						if(res.data.length>10){
							this.load_status_tuwen = 'loadmore';
						}else{
							this.load_status_tuwen = 'nomore';
						}
						console.log(res.data)
						console.log(this.load_status_tuwen)
					}
				})
			}
		}
	}
</script>