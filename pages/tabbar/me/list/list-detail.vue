<style lang="scss" scoped>
	.cmtyLayout{
		background: #f7f7f7;
		height:100vh;
	}
	.pyquan{
		height:100vh;
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
				color: #1183fb;
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
						color: #1183fb;
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
		<!-- 朋友圈 -->
		<scroll-view class="pyquan"
		scroll-y="true"
		direction="vertical" 
		:refresher-triggered="triggered"
		:refresher-enabled="true"
		:refresher-threshold="40"
		@refresherrefresh="onPulling"
		@scrolltolower="scrolllower"
		@refresherrestore="onRestore">
			<post-list :showRow="'-webkit-line-clamp: 1'" :list="tuwen_data" :loadStatus="load_status_tuwen"
			:noOperateFlag="true"
			:imageFlag="true" @changeStatus="changeStatus"></post-list>
		</scroll-view>
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
				tuwen_data: [],
				load_status_tuwen: 'loadmore',
				tuwen_default_page: 1,
				triggered:false,
				code:''  //公司统一信用代码
			}
		},
		// 默认展示
		onLoad(options) {
			this.code= options.code;
			this.getMomentPost();
		},
		methods: {
			changeStatus(index,status,isDelete){
				this.tuwen_data.forEach(item=>{
					item.isReport=false
				})
				this.tuwen_data[index].isReport=status
				if(isDelete){
					this.tuwen_data.splice(index,1)
				}
			},
			// 获取图文数据
			getMomentPost() {
				let data={
					"page": this.tuwen_default_page,
					"size": "10",
					"code":this.code
				}
				this.$H.get('/zf/v1/feel/code',data,true).then(res=>{
					if(res.status){
						this.triggered=false
						if(this.tuwen_default_page==1){
							this.tuwen_data = res.data
						}else{
							this.tuwen_data=[...this.tuwen_data,...res.data]
						}
						this.tuwen_data.forEach(item=>{
							item.image=item.image_list.split(',')
						})
						if(res.data.length >= 10){
							this.load_status_tuwen = 'loadmore';
						}else{
							this.load_status_tuwen = 'nomore';
						}
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
			scrolllower() {
				if(this.load_status_tuwen != 'nomore'){
					this.tuwen_default_page++;
					this.getMomentPost();
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