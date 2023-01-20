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
	    margin: 4px;
	    width: 100px;
	    height: 100px;
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
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 9">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
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
			}
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
			// 批量上传接口
			attachUpload(){
				return new Promise((resolve, reject) => {
					// 批量上传接口
					let files = [];
					for(let i = 0,len = this.imageList.length; i < len; i++){
						let imgAttr = new Object();
						imgAttr.name = 'img' + i;
						imgAttr.uri = this.imageList[i];
						files.push(imgAttr);
					}
					uni.uploadFile({
						url: 'http://81.70.163.240:11001/zf/v1/file/uploads',
						header: {
							'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSMjQ2MjO3NDU2sjRU0lFKrShQsjI0Mzc2NjY0sDSsBQAkcQnqJgAAAA.xrwwffvn6-vek2iTmx6Cmt6sSbwWMLDf4Hducz83oWehPd6GrSTKmX0zYX_qAY4vcjA3T9_VXZhkM7EJe15J3Q'
						},
						files: files,
						success: (res) => {
							resolve(JSON.parse(res.data).data);
						},
						fail: (e) => {
							console.log("e: " + JSON.stringify(e));
							uni.hideLoading();
							reject(e);
						}
					});
				})
			},
			async publish(){
				if (!this.input_content) {
					uni.showToast({
						title: '文字内容不能为空',
						duration: 1000,
						icon: "none"
					});
					return;
				}
				uni.showLoading({title:'发布中'});
				// 获取位置信息
				let location = await this.getLocation();
				// 获取上传图片地址
				let images;
				if(this.imageList.length == 0) {
					images = [];
				} else {
					images = await this.attachUpload();
				}
				// 上传动态信息
				uni.request({
					method: 'post',
					header: {
						'content-type': 'application/json'
					},
					data: {
						'imgUrl': images.toString(),
						'username': '俊哥',
						'avatar': 'http://81.70.163.240:25415/avatar-bk/62e20350efcef62d940556e420220726132059.jpg',
						'userId': 1606522650501607424,
						'words': this.input_content,
						'longitude': location.longitude, // 经度
						'latitude': location.latitude, // 纬度
						'country': location.address.country,
						'province': location.address.province,
						'city': location.address.city,
						'address': location.address.district+"-"+location.address.street+"-"+location.address.streetNum+"-"+location.address.poiName,
						'type': location.type
					},
					url: 'http://81.70.163.240:11001/zf/v1/dynamic/dynamics',
					success: (res) => {
						uni.hideLoading();
						uni.showToast({
							icon:'success',
							title:"发布成功"
						})
						uni.navigateBack({//可根据实际情况使用其他路由方式
							delta:1
						});
					},
					fail: (e) => {
						console.log("e: " + JSON.stringify(e));
						uni.hideLoading();
						uni.showToast({
							icon:'none',
							title:"发布失败,请检查网络"
						})
					}
				});
			},
			// 获取地理位置（h5中可能不支持）
			getLocation(){
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'gcj02',
						geocode: true,
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
					console.log("是否继续?", isContinue);
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
						var compressd = cp_images=> {
							this.imageList = this.imageList.concat(cp_images)//压缩后的图片路径
						}
						image.compress(res.tempFilePaths,compressd);
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
			}
		}
	}
</script>