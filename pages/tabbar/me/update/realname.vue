<template>
	<view class="">
			<u-form :model="form" ref="uForm">
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-if="form.straightUrl" >
										<view class="uni-uploader__file" style="position: relative;" @tap="chooseImage('straight')">
											<image class="uni-uploader__img" mode="aspectFill" :src="form.straightUrl[0]" :data-src="form.straightUrl" @tap="previewImage"></image>
										</view>
									</block>
									<view class="uni-uploader__input-box" v-if="!form.straightUrl[0]">
										<view class="uni-uploader__input" @tap="chooseImage('straight')">人像面</view>
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
											<image class="uni-uploader__img" mode="aspectFill" :src="form.reverseUrl[0]" :data-src="form.straightUrl" @tap="previewImage"></image>
										</view>
									</block>
									<view class="uni-uploader__input-box" v-if="!form.reverseUrl[0]">
										<view class="uni-uploader__input" @tap="chooseImage('reverse')">国徽面</view>
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
	export default{
		data(){
			return{
				form:{
					straightUrl:'', //正面url
					reverseUrl:''//反面url
				},
				action:'http://www.example.com/upload',
				fileList:[
					{
											url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				   }
				],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
			}
		},
		methods:{
			chooseImage: async function(type) {
				this.chooseImageFn(type)
			},
			chooseImageFn:async function(type){
				let imageList=[]
				let count=1
				console.log('选择图片')
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: count,
					success: (res) => {
						console.log(res)
						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						var compressd = cp_images=> {
							this.form[type+'Url']=cp_images
						}
						image.compress(res.tempFilePaths,compressd);
						// #endif
						
						// #ifndef APP-PLUS
						this.form[type+'Url']=res.tempFilePaths
						// #endif
						console.log(this.form)
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
			console.log(e)

			if(!this.form.straightUrl&&!this.form.reverseUrl){
				uni.showToast({
					title: '请上传身份证，正反面',
					icon: 'none',
					duration: 2000
				})
				return
			}
			let data={
					userId:this.$store.state.userInfo.id,
					imageUrl:this.form.straightUrl[0],
					reverseImageUrl:this.form.reverseUrl[0]
				}
				
			this.$H.post('v1/card/verifi',data,true).then(res=>{
				console.log(res)
				
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
			// uni.request({
			// 	url:'http://81.70.163.240:11001/zf/v1/card/verifi',
			// 	method:'POST',
			// 	data:{
			// 		userId:this.$store.state.userInfo.id,
			// 		imageUrl:this.form.straightUrl[0],
			// 		// +','+this.form.reverseUrl
			// 	},
			// 	header: {
			// 		'content-type': 'application/json',
			// 		'Authorization': 'Bearer ' +  this.$store.state.token
			// 	},
			// 	success: (res) => {
			// 		console.log(res)
			// 		if(res.data.status&&res.data[]){
						
			// 		}
			// 	}
			// })
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