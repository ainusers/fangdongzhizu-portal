<template  style="color: #fafafa;">
	<form>
		<!-- 企业名称 -->
		<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" style="padding: 6px 10px" label-position="left" label="企业名称 :" prop="companyName" ref="item">
			<u-input :border="false" placeholder="风险企业名称" type="text" v-model="companyName" :disabled="false"></u-input>
		</u-form-item>
		<!-- 小区名称 -->
		<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="195" style="padding: 6px 10px" label-position="left" label="社会信用代码 :" prop="companyCode" ref="item">
			<u-input :border="false" placeholder="例如: 91110108MA00FP4F5A" type="text" v-model="companyCode" :disabled="false" maxlength="18"></u-input>
		</u-form-item>
		<!-- 房源位置 -->
		<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" style="padding: 6px 10px" 
			label-position="left" label="房源位置 :" prop="communityName" ref="item">
			<u-input :border="false" type="select" v-model="region" label-position="left" placeholder="选择所在城市" @click="showPickerArea"></u-input>
		</u-form-item>
		<!-- 适用全国 -->
		<uPicker mode="region" v-model="pickerShow" @confirm="regionConfirm"></uPicker>
		<!-- 小区名称 -->
		<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" style="padding: 6px 10px" label-position="left" label="小区名称 :" prop="communityName" ref="item">
			<u-input :border="false" placeholder="小区名称" type="text" v-model="communityName" :disabled="false"></u-input>
		</u-form-item>
		<!-- 详细地址 -->
		<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" style="padding: 6px 10px" label-position="left" label="详细地址 :" prop="communityName" ref="item">
			<u-input :border="false" placeholder="详细地址 (具体到房间号)" type="text" v-model="roomName" :disabled="false"></u-input>
		</u-form-item>
		
		<!-- 图片依据 -->
		<view class="uni-list list-pd">
			<view style="padding: 6px 10px">图片依据：</view>
		    <view class="uni-list-cell cell-pd">
		        <view class="uni-uploader">
		            <view class="uni-uploader-body">
		                <view class="uni-uploader__files">
		                    <block v-for="(image, index) in imageList" :key="index">
		                        <view class="uni-uploader__file" style="position: relative;">
		                            <image class="uni-uploader__img" mode="aspectFit" :src="image" :data-src="image" @tap="previewImage"></image>
		                            <view class="close-view" @click="close(index)">×</view>
		                        </view>
		                    </block>
		                    <view class="uni-uploader__input-box" v-if="uploadType === 'image' ? imageList.length < 9 : imageList <= 1">
								<view class="choose-image" @tap="chooseImage">
									<uni-icons custom-prefix="iconfont" type="icon-zhaoxiangji" size="30" color="#D9D9D9"></uni-icons>
								</view>
		                    </view>
		                </view>
		            </view>
		            <view class="uni-uploader-head">
		                <view class="uni-uploader-title"></view>
		                <view class="uni-uploader-info">{{ imageList.length }}/9</view>
		            </view>
		        </view>
		    </view>
		</view>
		
		<!-- 租房心得 -->
		<view class="uni-textarea">
		    <textarea style="font-size: 14px" placeholder="增加文字描述会更加有力量..." v-model="content" maxlength="500"/>
		</view>
		<view class="footer">
			<button @click="formSubmit" class="commit" type="primary" plain="true" @tap="$u.throttle(formSubmit, 2000)">请君上榜</button>
		</view>
		
		<view class="reward_text">
			<view style="text-align: center;">
				———— 温馨提示 ————
			</view>
			<view>
				1、您的客观评价对他人来说有着极其重要的参考价值。可以帮助无数个为生活奔波的人避免不必要的"踩坑"
			</view>
			<view>
				2、为了提高反馈质量，营造良好的反馈氛围，平台会增加人工审核机制
			</view>
			<view>
				3、目前支持反馈风险企业，暂时不支持风险房产经纪人
			</view>
		</view>
	</form>
</template>

<script>
	import uPicker from '@/uview-ui/components/u-picker/u-picker.vue';
	import image from '@/store/image.js';
	import { attachUpload, compressImg, showToastTit } from '@/utils/utils.js'
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
		components: {
			uPicker
		},
		data() {
			return {
				imageList: [],
				content: '',// 说点什么
				region: '', //所属区域
				communityName: '', //小区名称
				roomName: '', //房间号
				pickerShow: false,
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				uploadType: 'image',
				companyName: '',
				companyCode: ''
			}
		},
		onLoad() {
		    that = this
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
			// 选择城市位置
			showPickerArea() {
				if (this.setpAll) {
					return
				}
				this.pickerShow = true
			},
			// 选择地区回调
			regionConfirm(e) {
				let	province=e.province.label
				let	city=e.city.label
				let	area=e.area.label
				city = city == '市辖区' ? province : city
				this.region = province+ '-' + city + '-' +area;
			},
			// 选择图片
			chooseImage: async function () {
			    let that = this;
			    uni.showModal({
			        title: '温馨提示',
			        content: '获取相机或相册权限才可以上传图片',
					showCancel: false,
					confirmText: '继续',
			        success(res) {
			            if (res.confirm) {
			                uni.chooseImage({
			                    sourceType: sourceType[that.sourceTypeIndex],
			                    sizeType: sizeType[that.sizeTypeIndex],
			                    count: that.imageList.length + that.count[that.countIndex] > 9 ? 9 - that.imageList.length : that.count[that.countIndex],
			                    success: (res) => {
			                        // #ifdef APP-PLUS
			                        // 提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
			                        res.tempFilePaths.forEach(item => {
			                            compressImg(item).then(cp_images => {
			                                that.imageList = that.imageList.concat(cp_images)
			                            })
			                        })
			                        // #endif
			                        // #ifndef APP-PLUS
			                        // 非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
			                        that.imageList = that.imageList.concat(res.tempFilePaths)
			                        // #endif
			                    }
			                })
			            }
			        }
			    });
			},
			// 查看放大图片
			previewImage: function (e) {
			    var current = e.target.dataset.src
			    uni.previewImage({
			        current: current,
			        urls: this.imageList
			    })
			},
			// 移除照片
			close(e) {
			    this.imageList.splice(e, 1);
			},
			// 用户反馈内容提交
			async formSubmit(e) {
				if(!this.companyName){
					showToastTit('请填写企业名称')
					return
				}
				if(!this.companyCode){
					showToastTit('请填写社会信用代码')
					return
				}
				if(!this.region){
					showToastTit('请选择房源位置')
					return
				}
				if(!this.communityName){
					showToastTit('请填写小区名称')
					return
				}
				if(!this.roomName){
					showToastTit('请填写详细地址')
					return
				}
				if(this.imageList.length == 0){
					showToastTit('请上传图片依据')
					return
				}
				if(!this.content){
					showToastTit('请填写描述信息')
					return
				}
				// 获取上传图片地址
				let images;
				if (this.imageList.length == 0) {
				    images = [];
				} else {
				    images = await attachUpload(this.imageList);
				}
				let data={
					userId: this.$store.state.userInfo.id,
					username: this.$store.state.userInfo.username,
					region: this.region,
					communityName: this.communityName,
					roomName: this.roomName,
					imageList: images.toString(),
					content: this.content,
					companyName: this.companyName,
					companyCode: this.companyCode
				}
				this.$H.post('/zf/v1/feel/feels',data,true).then(res=>{
					if(res.status){
						showToastTit( '反馈体验已成功提交')
						// 返回上一页
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						},2000)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scope>
	.footer {
	    margin: 5rpx 20rpx;
	}
	.commit {
		width: 380rpx;
		border-radius: 10px;
	}
	uni-textarea{
		height: 100%;
		width: 100%;
	}
	.uni-textarea {
	    width: 97%;
		padding: 10upx 15upx;
	    margin: 10upx 15upx;
	    line-height: 1.6;
	    height: 200px;
		border-top: 1px solid #f2f2f2;
		border-bottom: 1px solid #f2f2f2;
		border-radius: 20rpx;
		background:#f6f8f9;
		box-sizing: border-box;
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
	.uni-uploader__video{
	    width: 100px;
	    height: 100px;
	}
	.uni-uploader__input-box {
	    position: relative;
	    margin: 4px;
	    width: 99px;
	    height: 99px;
	    border: 1px solid #D9D9D9;
	}
	.uni-uploader__input-box {
	    position: relative;
	    width: 160upx;
	    height: 160upx;
	    border-radius: 10px;
	    border: 2upx solid #D9D9D9;
		.choose-image{
			top: 50%;
			left: 50%;
			position: absolute;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
		}
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
	.upload-type {
	    height: 50px;
	    display: flex;
	    flex-flow: row nowrap;
	    justify-content: space-between;
	    align-items: center;
	    margin: 0 30upx;
	}
	uni-image {
	    width: 100px;
	    height: 100px;
	}
	.cell-pd {
    padding: 10upx 15upx;
	}
	.uni-list::before {
	    height: 0;
	}
	.uni-list:after {
	    height: 0;
	}
	.list-pd {
	    margin-top: 0;
		border-bottom: 1px solid #f2f2f2;
	}
	.close-view {
	    text-align: center;
	    line-height: 30upx;
	    height: 35upx;
	    width: 35upx;
	    background: #ef5350;
	    color: #FFFFFF;
	    position: absolute;
	    top: 1upx;
	    right: 1upx;
	    font-size: 35upx;
	    border-radius: 8upx;
	    z-index: 100;
	}
	.page {
	    width: 100%;
	    height: 100%;
	}
	.feedback-submit {
	    border-radius: 10px;
	    width: 200px;
	}
	.reward_text{
		font-size: 28rpx;
		width: 100%;
		margin: 0 auto;
		color: #AAAAAA;
		padding: 6px 10px;
		view{
			margin-bottom: 11rpx;
			line-height: 150%;
		}
	}
</style>
