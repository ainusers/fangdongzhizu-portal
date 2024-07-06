<template>
	<view>
			<u-form :model="form" ref="uForm">
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-if="form.straightUrl" >
										<view class="uni-uploader__file" style="position: relative;" @tap="chooseImage('straight')">
											<image class="uni-uploader__img" mode="aspectFill" :src="form.straightUrl" :data-src="form.straightUrl" @tap="previewImage"></image>
										</view>
									</block>
									<view class="uni-uploader__input-box" v-if="!form.straightUrl[0]">
										<view class="uni-uploader__input" @tap="chooseImage('straight')">请上传人像面</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-if="form.reverseUrl">
										<view class="uni-uploader__file" style="position: relative;" @tap="chooseImage('reverse')">
											<image class="uni-uploader__img" mode="aspectFill" :src="form.reverseUrl" :data-src="form.straightUrl" @tap="previewImage"></image>
										</view>
									</block>
									<view class="uni-uploader__input-box" v-if="!form.reverseUrl[0]">
										<view class="uni-uploader__input" @tap="chooseImage('reverse')">请上传国徽面</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-form>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	import {attachUpload,compressImg} from '@/utils/utils.js'
	export default{
		data(){
			return{
				form:{
					straightUrl:'', //正面url
					reverseUrl:''//反面url
				},
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
			}
		},
		methods:{
			chooseImage: function(type) {
				let that = this;
				uni.showModal({
					title: '温馨提示',
					content: '获取相机和相册权限才可以选择图片',
					showCancel: false,
					success(res) {
						if (res.confirm) {
							that.chooseImageFn(type)
						}
					}
				});
			},
			chooseImageFn: function(type){
				let imageList=[]
				let count=1
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: count,
					success: (res) => {
						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						res.tempFilePaths.forEach(item=>{
							compressImg(item).then(cp_images=>{
								attachUpload([cp_images]).then(res=>{
									this.form[type+'Url']=res[0]
								})
							})
						})
						// #endif
						// #ifndef APP-PLUS
						attachUpload(res.tempFilePaths).then(res=>{
							this.form[type+'Url']=res[0]
						})
						// #endif
					}
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
		},
		onNavigationBarButtonTap(e){
			if(!this.form.straightUrl){
				uni.showToast({
					title: '请上传身份证人像面',
					icon: 'none',
					duration: 2000
				})
				return
			}
			if(!this.form.reverseUrl){
				uni.showToast({
					title: '请上传身份证国徽面',
					icon: 'none',
					duration: 2000
				})
				return
			}
			let data={
					userId:this.$store.state.userInfo.id,
					imageUrl:this.form.straightUrl,
					reverseImageUrl:this.form.reverseUrl
				}
			this.$H.post('/zf/v1/card/verifi',data,true).then(res=>{
				if(res.status&&res.data[0].indexOf('失败')==-1){
					uni.showToast({
						title: '认证成功',
						icon: 'none',
						duration: 2000
					})
					this.$store.state.userInfo.auth=1
					this.$store.commit('userInfo',this.$store.state.userInfo)
					// 返回上一页
					setTimeout(() => {
						uni.navigateBack({
						    delta: 1
						});
					},2000)
				}else{
					uni.showToast({
						title: res.data[0],
						icon: 'none',
						duration: 2000
					})
				}
				
			})
		}
	}
</script>

<style lang="scss" scoped>
	.cell-pd {
		padding: 20upx 30upx;
	}
	uni-image{
		width: 100%;
		height: 350upx;
	}
	//附件上传
	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uni-uploader__input-box {
		position: relative;
		margin:10upx;
		width: 100%;
		height: 350upx;
		border: 2upx solid #D9D9D9;
	}
	// .uni-uploader__input-box:before,
	// .uni-uploader__input-box:after {
	// 	content: " ";
	// 	position: absolute;
	// 	top: 50%;
	// 	left: 50%;
	// 	-webkit-transform: translate(-50%, -50%);
	// 	transform: translate(-50%, -50%);
	// 	background-color: #D9D9D9;
	// }
	// .uni-uploader__input-box:before {
	// 	width: 4upx;
	// 	height: 79upx;
	// }
	// .uni-uploader__input-box:after {
	// 	width: 79upx;
	// 	height: 4upx;
	// }
	// .uni-uploader__input-box:active {
	// 	border-color: #999999;
	// }
	// .uni-uploader__input-box:active:before,
	// .uni-uploader__input-box:active:after {
	// 	background-color: #999999;
	// }
	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 350upx;
		font-size: 28px;
		color: #aaa;
		// opacity: 0;
	}
	.uni-uploader__file {
	    margin: 4px;
	   width: 100%;
	   height: 350upx;
	   img{
		   width: 100%;
	   }
	}
</style>