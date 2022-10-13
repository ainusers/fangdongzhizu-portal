<style scoped>
	.region_new_title{
		font-size:36upx;
		font-weight:600;
		color:#101d36;
		padding-left: 26upx;
		box-sizing: border-box;
		margin-bottom: -10upx;
	}
	.fabuleixing{ 
		padding: 7px 7px 7px 15px;
	}
	.u-form-item{
		padding: 7px 15px 7px 15px;
	}
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
		border-bottom: 2px solid #fafafa;
		height: 130px;
		width: 100%;
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
			<!-- 发布类型 -->
			<view class="region_new_title">发布类型</view>
			<u-radio-group class="fabuleixing" v-model="radio" @change="radioGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
				<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">{{ item.name }}</u-radio>
			</u-radio-group>
			
			<!-- 资质上传 -->
			<view class="region_new_title">资质上传</view>
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
			
			<!-- 房源照片 -->
			<view class="region_new_title">房源照片</view>
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
			
			<!-- 房屋位置 -->
			<view class="region_new_title">房屋位置</view>
			<u-form-item :label-position="labelPosition" label="所属区域" prop="region" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
			</u-form-item>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
			<!-- 小区名称 -->
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="小区名称" prop="name">
				<u-input :border="border" placeholder="请输入小区名称" v-model="model.name" type="text"></u-input>
			</u-form-item>
			
			<!-- 房屋信息 -->
			<view class="region_new_title">房屋信息</view>
			<u-form-item :label-position="labelPosition" label="房屋概况" prop="region" label-width="150">
				<u-input :border="border" placeholder="请选择房屋布局" v-model="model.layout" type="text" @click="show = true"></u-input>
				<u-select @click="show = true" :default-value="defaultValue" :mode="mode" v-model="show" :list="list" @confirm="confirm" @cancel="cancel"></u-select>
			</u-form-item>
			
			
			
			
			
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
				// 发布类型
				labelPosition: 'left',
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				radio: '个人转租',
				radioList: [
					{
						name: '个人转租',
						checked: true,
						disabled: false
					},
					{
						name: '房东直租',
						checked: false,
						disabled: false
					},
					{
						name: '个人换租',
						checked: false,
						disabled: false
					}
				],
				rules: {
					payType: [
						{
							required: true,
							message: '请选择任意一种支付方式',
							trigger: 'change'
						}
					]
				},
				model: {
					payType: '支付宝'
				},
				// 房屋位置
				border: false,
				pickerShow: false,
				region: [
					{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					}
				],
				// 房屋信息
				show: false,
				defaultValue: [1],
				mode: 'mutil-column',
				list: [
					[
						{
							value: '一居室',
							label: '一居室'
						},
						{
							value: '两居室',
							label: '两居室'
						},
						{
							value: '三居室',
							label: '三居室'
						},
						{
							value: '四居室',
							label: '四居室'
						},
						{
							value: '五居室',
							label: '五居室'
						}
					],
					[
						{
							value: '1客厅',
							label: '1客厅'
						},
						{
							value: '2客厅',
							label: '2客厅'
						},
						{
							value: '3客厅',
							label: '3客厅'
						}
					],
					[
						{
							value: '1厨房',
							label: '1厨房'
						},
						{
							value: '2厨房',
							label: '2厨房'
						},
						{
							value: '3厨房',
							label: '3厨房'
						}
					],
					[
						{
							value: '1卫生间',
							label: '1卫生间'
						},
						{
							value: '2卫生间',
							label: '2卫生间'
						},
						{
							value: '3卫生间',
							label: '3卫生间'
						}
					]
				],
				
				
				
				
				
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
			// 发布类型选择发生变化
			radioGroupChange(e) {
				this.model.payType = e;
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			// 房屋概况
			confirm(e) {
				let result = '';
				e.map((val, index) => {
					result += result == '' ? val.label : '-' + val.label;
				})
				this.model.layout = result;
			},
			cancel(e) {
				console.log(e);
			},
			
			
			
			
			
			
			async publish(){
				if (!this.input_content) {
					uni.showModal({ content: '内容不能为空', showCancel: false, });
					return;
				}
				uni.showLoading({title:'发布中'});
				setTimeout(function () {
					uni.hideLoading();
				}, 2000);
				var location = await this.getLocation();//位置信息,可删除,主要想记录一下异步转同步处理
				var images = [];
				for(var i = 0,len = this.imageList.length; i < len; i++){
					var image_obj = {name:'image-'+i,uri:this.imageList[i]};
					images.push(image_obj);
				}
				uni.uploadFile({//该上传仅为示例,可根据自己业务修改或封装,注意:统一上传可能会导致服务器压力过大
					url: 'moment/moments', //仅为示例，非真实的接口地址
					files:images,//有files时,会忽略filePath和name
					filePath: '',
					name: '',
					formData: {//后台以post方式接收
						'user_id':'1',//自己系统中的用户id
						'text': this.input_content,//moment文字部分
						'longitude':location.longitude,//经度
						'latitude':location.latitude//纬度
					},
					success: (uploadFileRes) => {
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
			getLocation(){//h5中可能不支持,自己选择
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'wgs84',
						success: function (res) {
							resolve(res);
						},
						fail: (e) => {  
							reject(e);
						}
					});
				} )
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