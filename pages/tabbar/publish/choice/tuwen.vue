<style scoped>
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
	.uni-uploader__input-box{
		position: relative;
		margin: 4px;
		width: 99px;
		height: 99px;
		border: 1px solid #D9D9D9;
	}
	.uni-uploader__input-box {
		position: relative;
		margin:10upx;
		width: 208upx;
		height: 208upx;
		border: 2upx solid #D9D9D9;
	}
	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}
	.uni-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}
	.uni-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}
	.uni-uploader__input-box:active {
		border-color: #999999;
	}
	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}
	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.uni-uploader__file {
	    margin: 4px 20upx;
	    width: 100px;
	    height: 100px;
		margin-left: 0;
	}
	uni-image{
		width: 100px;
		height: 100px;
	}
	.footer {
		margin: 20upx;
	}
	
	.cell-pd {
		padding: 20upx 30upx;
	}
	textarea {
		border-bottom: 2px solid #f2f2f2;
		height: 130px;
		width: 100%;
	}
	.uni-textarea {
		width: 100%;
		padding: 10upx 15upx;
		line-height: 1.6;
		height: 130px;
	}
	.uni-list::before {
		height: 0;
	}
	.uni-list:after {
		height: 0;
	}
	.list-pd {
		margin-top: 0;
	}
	.close-view{
	    text-align: center;
		line-height:30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}
	.page {
		width: 100%;
		height: 100%;
	}
	.feedback-submit{
		border-radius: 50upx;
		background: #5199ff;
		color:#fff;
	}
</style>
<template>
	<view class="page" @touchstart="touchStart" @touchend="touchEnd">
		<form>
			<view class="uni-textarea">
				<textarea placeholder="说点什么吧..." v-model="input_content" />
			</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFit" :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 9">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="footer">
				<button type="default" class="feedback-submit" @click="publish">发布</button>
			</view>
		</form>
	</view>
</template>

<script>
	import image from '@/store/image.js';
	import {attachUpload,htmlEncode,compressImg,checkPush} from '@/utils/utils.js'
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
	var that;
	export default {
		data() {
			return {
				// title: 'choose/previewImage',
				input_content:'',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				//侧滑返回
				startX: 0, //点击屏幕起始位置
				movedX: 0, //横向移动的距离
				endX: 0, //接触屏幕后移开时的位置
				isLoading:false,
			}
		},
		onLoad(){
			that=this
		},
		onUnload() {
				this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		methods: {
			async publish(){
				// uni.showLoading({title:'发布中',mask:false,});
				if(this.isLoading) return
				this.isLoading=true
				checkPush().then(async res=>{
					this.res1=res
					if(res.status){
							if (!this.input_content) {
								uni.showToast({
									title: '文字内容不能为空',
									duration: 1000,
									icon: "none"
								});
								return;
							}
							// 获取位置信息
							// #ifdef APP-PLUS
							let location = await this.getLocation();
							// #endif
							// 获取上传图片地址
							let images;
							if(this.imageList.length == 0) {
								images = [];
							} else {
								images = await attachUpload(this.imageList);
							}
							let data= {
									'imgUrl': images.toString(),
									'nickname': this.$store.state.userInfo.nickname,
									'avatar': this.$store.state.userInfo.avatar,
									'userId': this.$store.state.userInfo.id,
									'words': htmlEncode(this.input_content),
								}
								// #ifdef APP-PLUS
								data['longitude']=location.longitude// 经度
								data['latitude']=location.latitude// 纬度
								data['country']=location.address.country
								data['province']=location.address.province
								data['city']=location.address.city
								data['address']=location.address.district+"-"+location.address.street+"-"+location.address.streetNum+"-"+location.address.poiName
								data['type']=location.type
								// #endif
								// return
							// 上传动态信息
							this.$H.post('/zf/v1/dynamic/dynamics',data,true).then(res=>{
									uni.hideLoading();
								if(res.status){
									uni.showToast({
										icon:'success',
										title:"发布成功"
									})
									setTimeout(()=>{
										uni.switchTab({
											url: '/pages/tabbar/community/community'
										})
										this.isLoading=false
									},2000)
								}
							})
					}else{
						uni.showToast({
							icon:'none',
							title:"每天发布动态不能超过三个!"
						})
					}
				})
	},
			// 获取地理位置（h5中可能不支持）
			getLocation(){
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'gcj02',
						geocode: true,
						// isHighAccuracy:true,
						success: function (res) {
							resolve(res);
						},
						fail: (e) => {  
							reject(e);
						}
					});
				})
			},
			close(e){
			    this.imageList.splice(e,1);
			},
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						// var compressd = cp_images=> {
						// //压缩后的图片路径
						// }
						res.tempFilePaths.forEach(item=>{
							compressImg(item).then(cp_images=>{
									this.imageList = this.imageList.concat(cp_images)
							})
						})
						// #endif
						
						// #ifndef APP-PLUS
						this.imageList = this.imageList.concat(res.tempFilePaths)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						// #endif
						
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			touchStart: function(e) {
				this.startX = e.mp.changedTouches[0].pageX;
			},
			
			touchEnd: function(e) {
				this.endX = e.mp.changedTouches[0].pageX;
				if (this.endX - this.startX > 200) {
					uni.navigateBack();
				}
			},
		}
	}
</script>