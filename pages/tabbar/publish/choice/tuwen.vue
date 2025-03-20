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
.uni-uploader__video{
    width: 100%;
    height: 100%;
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

.uni-uploader__img,.uni-uploader__video{
	width: 100px;
	height: 100px;
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

.footer {
    margin: 20upx;
}

.cell-pd {
    padding: 10upx 15upx;
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
	border-bottom: 2px solid #f2f2f2;
}
.close-view-video{
    height: 35upx;
    width: 35upx;
    position: absolute;
    top: 1upx;
    right: 1upx;
    z-index: 200;
}
.close-text{
    border-radius: 8upx;
    background: #ef5350;
    color: #FFFFFF;
    text-align: center;
    line-height: 20upx;
    height: 35upx;
    width: 35upx;
}
.close-view {
    text-align: center;
    height: 35upx;
    width: 35upx;
    line-height: 1;
    border-radius: 8upx;
    background: #ef5350;
    color: #FFFFFF;
    position: absolute;
    top: 1upx;
    right: 1upx;
    z-index: 200;
}
.hide{
	display:none;
	opacity:0;
	left:-99999px;
	height:0;
	width:0;
}
.page {
    width: 100%;
    height: 100%;
}

.feedback-submit {
    border-radius: 10px;
    width: 200px;
}
</style>
<template>
    <view class="page" @touchstart="touchStart" @touchend="touchEnd">
        <form>
            <view class="uni-textarea">
                <textarea placeholder="在这里，你的声音将被世界听见..." v-model="content" />
            </view>
            <view class="upload-type">
                <view>上传类型：</view>
                <u-radio-group v-model="uploadType" placement="column" @change="uploadTypeChange">
                    <u-radio name="image">图片</u-radio>
                    <u-radio name="video">视频</u-radio>
                </u-radio-group>
            </view>
            <view class="uni-list list-pd">
                <view class="uni-list-cell cell-pd">
                    <view class="uni-uploader">
                        <view class="uni-uploader-body">
                            <view class="uni-uploader__files">
                                <block v-for="(image, index) in imageList" :key="index">
                                    <view class="uni-uploader__file" style="position: relative;">
                                        <image v-if="uploadType==='image'" class="uni-uploader__img" mode="aspectFit" :src="image" :data-src="image" @tap="previewImage"></image>
                                        <video v-if="uploadType==='video'" class="uni-uploader__video" :controls="false" :src="image" :data-src="image"></video>
                                        <cover-view v-if="uploadType==='video'" class="close-view-video">
                                          <cover-view @click="close(index)" class="close-text">x</cover-view>
                                        </cover-view>
                                        <view v-if="uploadType==='image'" class="close-view" @click="close(index)">x</view>
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
                            <view class="uni-uploader-info">{{ imageList.length }}/{{ uploadType === 'image' ? 9: 1 }}</view>
                        </view>
                    </view>
                </view>
            </view>
			<view style="padding: 5px 5px 0px 5px;color: #AAAAAA;">
				为了营造更加友好的社区环境，平台引入了评分机制。您的每条动态都会根据评分来决定排名，评分标准：动态内容是否包含位置、图片、面积、价格、联系方式，上传图片/视频数量和质量，近期活跃度等。让我们共同努力，提升社区内容质量
			</view>
            <view class="footer">
                <button style="color: #5199ff;border-color: #5199ff;" type="primary" class="feedback-submit" plain="true" @click="publish" @tap="$u.throttle(publish, 3000)">发布</button>
            </view>
        </form>
    </view>
</template>

<script>
import image from '@/store/image.js';
import { attachUpload,htmlEncode,compressImg,checkPush,gotoAppSetting } from '@/utils/utils.js'
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
            imageList: [],
            sourceTypeIndex: 2,
            sourceType: ['拍照', '相册', '拍照或相册'],
            sizeTypeIndex: 2,
            sizeType: ['压缩', '原图', '压缩或原图'],
            countIndex: 8,
            count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            uploadType: 'image',
			      content:''
        }
    },
    onLoad() {
        that = this;
		// 显示温馨提示框
		that.show = true;
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
		// 切换类型
        uploadTypeChange(val){
            this.imageList = []
        },
        async publish() {
            if (!this.content) {
                uni.showToast({
                    title: '文字内容不能为空',
                    duration: 1000,
                    icon: "none"
                });
                return;
            }
            // 检查发布动态数量是否达到上限
            checkPush().then(async res => {
                if (res.status) {
					// 判断是否授权定位
					uni.showToast({ title: '发布中', duration: 60000, icon: 'loading' });
					// 获取上传图片地址
					let images;
					if (this.imageList.length == 0) {
						images = [];
					} else {
						images = await attachUpload(this.imageList);
					}
					let data = {
					  'imgUrl': images.toString(),
					  'nickname': this.$store.state.userInfo.nickname,
					  'avatar': this.$store.state.userInfo.avatar,
					  'userId': this.$store.state.userInfo.id,
					  'words': htmlEncode(this.content),
					  'fileType': this.uploadType
					}
					// 当上传类型为视频时，解析images的格式为List<Map>(包含视频和首帧图片),当上传类型为图片时，解析images的格式为List<String>
					if("video" == this.uploadType) {
            // [{"firstImage":"http://43.143.148.105:9090/album/2025-03-09/13473015185/DAYLIGHT_HAMBURG_AERIAL_00048_preview.jpeg"},{"video":"http://43.143.148.105:9090/album/2025-03-09/13473015185/DAYLIGHT_HAMBURG_AERIAL_00048_preview.mp4"}]
            let video = images.find(url => url.video);
            let firstImage = images.find(url => url.firstImage);
					  data.videoFirstImage = firstImage.firstImage
					  data.imgUrl = video.video
					}
					// 上传动态信息
					this.$H.post('/zf/v1/dynamic/dynamics', data, true).then(res => {
						if (res.status) {
							uni.hideToast();
							uni.showToast({
								icon: 'success',
								title: "发布成功"
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/tabbar/community/community'
								})
							}, 1000)
						} else {
							uni.hideToast();
							uni.showToast({
								icon: 'success',
								title: "发布失败，请重试!"
							})
						}
					})
				}
				else {
				    uni.showToast({
				        icon: 'none',
				        title: "每天发布动态不能超过三个!"
				    })
				}
			})
        },
        close(e) {
            this.imageList.splice(e, 1);
        },
        // 选择图片
        chooseImage: async function () {
            let that = this;
            if (this.uploadType == 'video') {
				uni.showModal({
				    title: '温馨提示',
				    content: '获取相机或相册(视频)权限才可以上传图片',
					showCancel: false,
					confirmText: '继续',
				    success(res) {
				        if (res.confirm) {
							uni.chooseVideo({
								success: (res) => {
									const maxSize = 10 * 1024 * 1024; // 10M
									const maxDuration = 15; // 15秒
									// 判断文件大小
									if (res.size > maxSize) {
										uni.showToast({
											title: '视频大小不能超过10M',
											icon: 'none',
										});
										return;
									}
									// 判断视频时长
									if (res.duration > maxDuration) {
										uni.showToast({
											title: '视频时长不能超过15秒',
											icon: 'none',
										});
										return;
									} 
									that.imageList = [res.tempFilePath]
								}
							})
						}
					}
				});
            } else if (this.uploadType == 'image') {
				uni.showModal({
				    title: '温馨提示',
				    content: '获取相机或相册(图片)权限才可以上传图片',
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
        },
        // 查看放大图片
        previewImage: function (e) {
            var current = e.target.dataset.src
            uni.previewImage({
                current: current,
                urls: this.imageList
            })
        },
        touchStart: function (e) {
            this.startX = e.mp.changedTouches[0].pageX;
        },
        touchEnd: function (e) {
            this.endX = e.mp.changedTouches[0].pageX;
            if (this.endX - this.startX > 200) {
                uni.navigateBack();
            }
        }
    }
}
</script>