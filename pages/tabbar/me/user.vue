<style lang="scss">
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
	.userImage {
	  background-color: white;
	  position: relative;
	  margin: 0 auto;
	  width: 105rpx;
	  height: 105rpx;
	  overflow: hidden;
	  border-radius: 50%;
	  border: 1px solid #eee;
				image {
					display: initial;
				}
				/deep/.avatar{
					width: 105rpx;
					height: 105rpx;
				}
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
					<view class="userImage">
					  <u-avatar class="avatar" :src="this.userInfo.avatar" level-bg-color="#8072f3" size="110rpx" img-mode="scaleToFill"></u-avatar>
					</view>
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
                </view>
            </view>
            <!--昵称-->
            <view class="item f_r_b" @click="goto('/pages/tabbar/me/update/nickname')">
                <view class="item_text">昵称</view>
                <view class="item_val">
					{{ this.userInfo.nickname }}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
            <!--性别-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/sex`)">
                <view class="item_text">性别</view>
                <view class="item_val">
					{{ this.userInfo.sex == 1 ? '男' : '女'}}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
            <!--地区-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/region`)">
                <view class="item_text">地区</view>
				<block v-if="!this.userInfo.province">
					<view class="item_val">
						请选择地区
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
				</block>
                <block v-else>
					<view class="item_val">
						{{ this.userInfo.province }} 
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
				</block>
            </view>
            <!--手机号-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/updatephone`)">
                <view class="item_text">手机号</view>
                <view class="item_val">
					{{ this.userInfo.username?this.userInfo.username.replace(/^(.{3})(?:\d+)(.{4}$)/,"$1****$2"):'' }}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
            <!--实名认证-->
            <view class="item f_r_b"  @click="goto(`/pages/tabbar/me/update/realname?username=${userInfo.username}`,'auth')">
                <view class="item_text">实名认证</view>
                <view class="item_val" v-if="!userInfo.auth" >
					未认证
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
				<view class="item_val" v-if="userInfo.auth">
					已认证
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
			<view class="item f_r_b"  @click="goto(`/pages/tabbar/me/update/sign`)">
			    <view class="item_text">个性签名</view>
			    <view class="item_val">
					{{ this.userInfo.signature }}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
			</view>
			<!--注销账号-->
			<view class="item f_r_b"  @click="deleteUser">
			    <view class="item_text">注销账号</view>
			    <view class="item_val">
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
			</view>
        </view>
		<!-- 退出登录 -->
		<view class="logout" @click="logout()">
			<button type="default" class="feedback-submit">退出登录</button>
		</view>
    </view>
</template>
<script>
	var that;
	import {compressImg,attachUpload} from '@/utils/utils.js'
	// import {stopHeartbeat} from '@/utils/scoket.js'
    export default {
        data() {
            return {
				userInfo: '',
			}
        },
        onLoad(options) {
			
        },
        onShow(){
		    that=this
			this.userInfo =this.$store.state.userInfo
        },
        methods: {
			goto(uri,type){
				if(type=='auth'&&!this.userInfo.auth || type!='auth'){
					uni.navigateTo({
						url: uri
					})
				}
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
				var that = this;
                uni.chooseImage({
                    count: 1,
                    // sizeType: ['compressed'],
                    sourceType: [sourceType],
                    success: function (res) {
                        uni.showLoading({title: '上传中...'});
                  // #ifdef APP-PLUS
                    compressImg(res.tempFilePaths[0]).then(file=>{
                      attachUpload([file]).then(res=>{
                        that.updateImg(res[0])
                      })
                    })
                  //#endif
                  // #ifndef APP-PLUS
                      attachUpload(res.tempFilePaths).then(res=>{
                        that.updateImg(res[0])
                      })
                  // #endif
                          }
                      });
            },
			//更改头像
			updateImg(imgAvtar){
				let that=this
				let data= {
					id: that.userInfo.id,
					avatar: imgAvtar
					}
				this.$H.patch('/zf/v1/user/attr',data,true).then(res=>{
					 uni.hideLoading();
					 if(res.status&&res.code==200){
							uni.showToast({
								title: '修改成功',
										icon: 'none',
								duration: 2000
							})
							that.userInfo.avatar=imgAvtar
							that.$store.commit('userInfo',that.userInfo) 
							let chatList=that.$store.state.chatList
							chatList.forEach(item=>{
								if(item.targetName==that.userInfo.username){
									item.fromAvatar=imgAvtar
								}
							})
							that.$store.commit('chatList',chatList) 
					 }else{
						 uni.showToast({
						 	title:res.message,
						 	icon: 'none',
						 	duration: 2000
						 })
					 }
				
				})
			},
			// 注销账号
			deleteUser() {
				uni.showToast({
					title: "请联系客服：5730473@qq.com",
					icon: 'none',
					duration: 2000
				})
			},
			// 退出登录
			logout() {
				uni.removeStorage({
					key: 'userInfo',
					success: function (res) {}
				});
				uni.removeStorage({
					key: 'phoneInfo',
					success: function (res) {}
				});
				uni.removeStorage({
					key: 'token',
					success: function (res) {}
				});
				uni.removeStorage({
					key: 'socketStatus',
					success: function (res) {}
				});
				uni.removeStorage({
					key: 'chatList',
					success: function (res) {}
				});
				uni.removeStorage({
					key: 'currentChatList',
					success: function (res) {}
				});
				uni.removeStorage({
					key: 'currentNameChat',
					success: function (res) {}
				});
				uni.removeStorage({
					key: 'unReadCount',
					success: function (res) {}
				});
				// 断开链接
				uni.navigateTo({
					url: '/pages/auth/login'
				})
				// 停止心跳
				// stopHeartbeat();
			}
        }
    }
</script>