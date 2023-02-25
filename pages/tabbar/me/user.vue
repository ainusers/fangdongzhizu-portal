<style>
    page{
        width: 100%;
        height: 100%;
        background-color: #f2f2f2;
    }
    .cont_view{
        width: 100%;
        height: 100%;
        background-color: #f2f2f2;
        overflow-y: auto;
        box-sizing: border-box;
    }
    .person_info_view{
        padding: 0 40upx;
        box-sizing: border-box;
        background-color: #ffffff;
		box-shadow: 0 0 15px 1px rgba(224, 224, 224, 50%);
    }
    .item:last-child{
        border-bottom: none;
    }
    .item{
        height: 110upx;
        border-bottom: 1upx solid #ebebeb;
        box-sizing: border-box;
        justify-content: space-between;
		display: flex;
        align-items: center;
    }
    .item_text{
        font-family: PingFang-SC-Medium;
        font-size: 30upx;
        color: #191f25;
        flex-shrink: 0;
    }
    .img_view_info{
        align-items: center;
        flex-shrink: 0;
    }
    .img_view{
        width: 110upx;
        height: 110upx;
        margin: auto 0;
        flex-shrink: 0;
		display: flex;
        border-radius: 100%;
    }
    .img_view > image{
        width: 100%;
        height: 100%;
        display: flex;
		image{
			float: right;
		}
    }
    .arrow_right{
        width: 28upx;
        height: 28upx;
        flex-shrink: 0;
        margin: auto 0;
		color: #a3a5a8;
		margin-left: 5px;
    }
    .item_val{
        font-size: 30upx;
        color: #a3a5a8;
        text-align: right;
        max-width: 100%;
        padding-left: 120upx;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
	.box-bg {
		background-color: #F5F5F5;
		padding: 5px 0;
	}
	.logout{
		padding: 25px 10px 0px 10px;
	}
</style>
<template>
    <view class="cont_view">
        <view class="person_info_view">
            <!--头像-->
            <view class="item f_r_b" @click="chooseAvatar">
                <view class="item_text">头像</view>
                <view class="f_r_e img_view_info">
                    <view class="img_view">
						<image @error="imgError" :src="this.userInfo.avatar" mode="aspectFit"></image>
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
                </view>
            </view>
            <!--昵称-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/nickname?userInfo=${encodeURIComponent(JSON.stringify(userInfo))}`)">
                <view class="item_text">昵称</view>
                <view class="item_val">
					{{ this.userInfo.nickname }}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
            <!--性别-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/sex?userInfo=${encodeURIComponent(JSON.stringify(userInfo))}`)">
                <view class="item_text">性别</view>
                <view class="item_val">
					{{ this.userInfo.sex == 1 ? '男' : '女'}}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
            <!--地区-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/region?userInfo=${encodeURIComponent(JSON.stringify(userInfo))}`)">
                <view class="item_text">地区</view>
				<block v-if="this.userInfo.province == ''">
					<view class="item_val">
						请选择地区
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
				</block>
                <block v-else>
					<view class="item_val">
						{{ this.userInfo.province }} - {{ this.userInfo.city }}
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
				</block>
            </view>
            <!--手机号-->
            <view class="item f_r_b">
                <view class="item_text">手机号</view>
                <view class="item_val">
					{{ this.userInfo.username }}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
            <!--实名认证-->
            <view class="item f_r_b">
                <view class="item_text">实名认证</view>
                <view class="item_val">
					未认证
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
			<!--修改密码-->
			<view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/pwd?username=${userInfo.username}`)">
			    <view class="item_text">修改密码</view>
			    <view class="item_val">
					修改密码
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
			</view>
			<!--个性签名-->
			<view class="item f_r_b"  @click="goto(`/pages/tabbar/me/update/sign?userInfo=${encodeURIComponent(JSON.stringify(userInfo))}`)">
			    <view class="item_text">个性签名</view>
			    <view class="item_val">
					{{ this.userInfo.signature }}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
			</view>
        </view>
		<!-- 退出登录 -->
		<view class="logout" @click="logout()">
			<button type="default" class="feedback-submit" @click="logout">退出登录</button>
		</view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
				userInfo: ''
			}
        },
        onLoad(options) {
		   console.log(options.userInfo)
           this.userInfo = JSON.parse(options.userInfo);
        },
        onShow() {},
        methods: {
			goto(uri){
				console.log(uri)
				uni.navigateTo({
					url: uri
				})
			},
            imgError() {
                // 这里填充一个默认图片
            },
            // 更新头像
            chooseAvatar() {
                uni.showActionSheet({
                    itemList: ['拍照', '从手机相册选择'],
                    success: (res) => {
                        this.uploadImg(res.tapIndex === 0 ? "camera" : "album")
                    }
                });
            },
            // 上传图片
            uploadImg(sourceType = "camera") {
                uni.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: [sourceType],
                    success: function (res) {
                        uni.showLoading({title: '上传中...', mask: Config.mask});
                        // 上传图片操作 (.then().catch(err => {}))
                    }
                });
            },
			// 退出登录
			logout() {
				uni.removeStorage({
					key: 'token',
					success: function (res) {
						console.log('success');
					}
				});
				uni.navigateTo({
					url: '/pages/auth/login'
				})
			}
        }
    }
</script>