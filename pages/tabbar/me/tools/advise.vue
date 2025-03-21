<template>
	<form>
		<view class="flex-row">
			<u-radio-group v-model="value" >
				<u-radio 
					@change="checkTarget(index)" 
					v-for="(item, index) in list" :key="index" 
					:name="item.word">
					{{item.word}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="middle">
			<textarea name="content" v-model="content" class="recordContent" maxlength="100" @input = "descInput($event)"
				placeholder="输入内容帮我们了解您的意见或建议" />
			<span class="wordwrap">{{number}}/100</span>
		</view>
		
		<!-- 图片依据 -->
		<view class="uni-list list-pd">
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
									<uni-icons custom-prefix="iconfont" type="icon-zhaoxiangji" size="30"></uni-icons>
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

		<view class="bottom">
			<view class="concact">
				<text class="way">请留下真实联系方式 (微信/手机号)</text>
			</view>
			<input name="contact" v-model="contact" class="concactContent" placeholder="请留下任一联系方式" bindinput="userNameInput" />
		</view>
		<view class="footer">
			<button style="color: #5199ff;border-color: #5199ff;" @click="formSubmit" class="commit" type="primary" plain="true" @tap="$u.throttle(formSubmit, 3000)">提交</button>
		</view>
		<view class="reward_text">
			<view style="text-align: center;">
				——— 温馨提示 ———
			</view>
			<view>
				1、您的每一条建议，都是我们前进的动力
			</view>
			<view>
				2、期待您的宝贵反馈，共同完善这个app
			</view>
			<view>
				3、所有合理反馈都将纳入后续版本更新，敬请关注
			</view>
			<view>
				4、我们会在合适的时机与您联系
			</view>
		</view>
		
		<!-- 信息流广告 -->
		<ad adpid="1804384865"></ad>
	</form>
</template>

<script>
	import {attachUpload,htmlEncode,showToastTit,compressImg} from '@/utils/utils.js';
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
				value:'', // 反馈建议枚举
				number: 0, // 已输入字数
				contact: '', // 联系方式
				content: '', // 反馈内容
				list: [
					{"word": "页面闪退"},
					{"word": "程序崩溃"},
					{"word": "操作体验"},
					{"word": "界面审美"},
					{"word": "功能建议"},
					{"word": "其他反馈"}
				],
				imageList: [],//反馈图片列表
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				uploadType: 'image',
				show: false,
			}
		},
		methods: {
			// 判断当前是否之选中一个反馈建议
			checkTarget(index) {
				this.list.forEach(item=>{
					item.check=false
				})
				this.list[index].check = this.list[index].check == false ? true : false;
			},
			// 用户反馈内容提交
			formSubmit: async function (e) {
				let words = this.list.filter(item => item.check == true).map(n => {
					let {word} = {...n};
					return {word}.word;
				});
				if(!words.toString()){
					showToastTit('请选择反馈类型')
					return
				}
				if(!this.content){
					showToastTit('请输入意见或建议')
					return
				}
				if(!this.contact){
					showToastTit('请添加联系方式')
					return
				}
				// 获取上传图片地址
				let images = [];
				if (this.imageList.length != 0) {
					images = await attachUpload(this.imageList);
				}
				let data={
					username: this.$store.state.userInfo.username,
					type: words.toString(),
					content: htmlEncode(this.content),
					contact: htmlEncode(this.contact),
					images: images.join(',')
				}
				this.$H.post('/zf/v1/advise/advises',data,true).then(res=>{
					if(res.status){
						showToastTit( '反馈建议已成功提交')
						// 返回上一页
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						},2000)		
					}
				})
			},
			// // 监听输入内容
			descInput(e) {
				this.number = e.detail.cursor
			},
			// 切换类型
			uploadTypeChange(val){
			    this.imageList = []
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
			}
		}
	}
</script>

<style lang="scss" scope>
	.footer {
	    margin: 20upx;
	}
	/* 反馈选项 */
	.flex-row {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		padding: 14px 10px 0px 10px;
	}
	/deep/.u-radio__label{
		margin-bottom: 10upx;
		font-size: 25upx;
		color: #333;
	}
	.flex-view-item {
		height: 80px;
		width: 30%;
		margin-top: 10px;
		background-color: #f8f9fd;
		border-radius: 15rpx;
	}
	.model {
		padding-left: 50rpx;
		padding-top: 10rpx;
	}
	.reasonImg {
		width: 80rpx;
		height: 80rpx;
		display: block;
		padding-left: 10px;
	}
	/* 反馈内容 */
	.middle {
		height: 15vh;
		width: 100%;
		position: relative;
	}
	.record {
		font-size: 16px;
		font-weight: 500;
		padding-bottom: 12rpx;
		padding-left: 10rpx;
	}
	.recordContent {
		width: 97%;
		height: 97%;
		border-radius: 20rpx;
		margin: 5px;
		font-size:26upx;
		padding:20upx;
		background:#f6f8f9;
		box-sizing: border-box;
	}
	.wordwrap {
		position: absolute;
		bottom: 32rpx;
		right: 32rpx;
	}
	/* 联系方式 */
	.bottom {
		margin-top: 20rpx;
		height: 11vh;
		width: 100%;
	}
	.concact {
		font-size: 26upx;
		font-weight: 500;
		padding-bottom: 12rpx;
		padding-left: 20rpx;
	}
	.communication {
		font-size: 14px;
		color: #b9bece;
		padding-left: 10px;
	}
	.concactContent {
		width: 97%;
		margin: 4px 5px 0px 5px;
		height: 90rpx;
		background-color: #f8f9fd;
		border-radius: 20rpx;
		font-size: 26upx;
		padding:10upx;
		padding-left: 20upx;
		font-size:#f6f8f9;
		box-sizing: border-box;
	}
	/* 按钮 */
	.commit {
		width: 200px;
		border-radius: 10px;
	}
	.commitContent {
		color: #fff;
		border-radius: 30rpx;
	}
	.reward_text{
		font-size: 28rpx;
		width: 90%;
		margin: 0 auto;
		color: #AAAAAA;
		padding: 10px;
		view{
			margin-bottom: 11rpx;
			line-height: 150%;
		}
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
	.cell-pd {
	    padding: 10upx 15upx;
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
	.uni-uploader__img{
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
</style>
