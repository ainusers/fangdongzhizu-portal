<style lang="scss">
    page{
        width: 100%;
        height: 100%;
        background-color: #f7f7f7;
    }
    .cont_view{
        width: 100%;
        height: 100%;
        background-color: #f7f7f7;
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
	.report_con{
		  width:100%;
		  padding: 15upx 60upx 0upx 80upx;
		  /deep/.u-radio{
			  width: 50%;
			  margin-bottom: 30upx;
		  }
	}
	.hink{
		font-size: 26upx;
		color: #aaa;
		margin: 0upx 30upx 10upx 40upx;
	}
	.commit{
		border-radius: 10px;
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
					  <u-avatar class="avatar" :src="userInfo.avatar" level-bg-color="#8072f3" size="110" img-mode="scaleToFill"></u-avatar>
					</view>
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
                </view>
            </view>
            <!--昵称-->
            <view class="item f_r_b" @click="goto('/pages/tabbar/me/update/nickname')">
                <view class="item_text">昵称</view>
                <view class="item_val">
					{{ userInfo.nickname }}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
            <!--性别-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/sex`)">
                <view class="item_text">性别</view>
                <view class="item_val">
					{{ userInfo.sex == 1 ? '男' : '女'}}
					<u-icon class="arrow_right" name="arrow-right"></u-icon>
				</view>
            </view>
            <!--地区-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/region`)">
                <view class="item_text">地区</view>
				<block v-if="!userInfo.province">
					<view class="item_val">
						请选择地区
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
				</block>
                <block v-else>
					<view class="item_val">
						{{ userInfo.province }} 
						<u-icon class="arrow_right" name="arrow-right"></u-icon>
					</view>
				</block>
            </view>
            <!--手机号-->
            <view class="item f_r_b" @click="goto(`/pages/tabbar/me/update/updatephone`)">
                <view class="item_text">手机号</view>
                <view class="item_val">
					{{ userInfo.username ? userInfo.username.replace(/^(.{3})(?:\d+)(.{4}$)/,"$1****$2"):'' }}
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
					{{ userInfo.signature }}
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
			<button type="primary" plain="true" class="commit" style="border-color: #5199ff;color:#5199ff;">退出登录</button>
		</view>
		<!-- 注销用户 - 温馨提示 -->
		<u-modal :async-close="true" v-model="show" title="请选择注销用户原因" :content="content" confirm-text="确认注销" :show-cancel-button="true" cancel-text="再想想" @confirm="confirm">
			<view class="report_con">
				<u-radio-group v-model="reportValue" @change="radioGroupChange" width="50%">
							<u-radio 
								v-for="(item, index) in reportList" :key="index" 
								:name="item.name"
								v-model="item.checked"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
				</u-radio-group>
			</view>
			<view class="hink">
				注：非常感谢您一直以来对房东直租app的支持与关注，我们深知房源的数量和质量对于用户来说至关重要，因此我们一直在努力拓展房源和丰富功能，以满足更多用户的需求，我们真诚地希望您能够继续留在这里，一同见证app的成长与发展
			</view>
		</u-modal>
    </view>
</template>
<script>
	var that;
	import {compressImg,attachUpload} from '@/utils/utils.js'

    export default {
        data() {
            return {
				userInfo: '',
				reportValue:'',
				content: '',
				show: false,
				reportList:[
					{
						name:'虚假房源',
						checked:false
					},
					{
						name:'房源较少',
						checked:false
					},
					{
						name:'已租到房',
						checked:false
					},
					{
						name:'用户体验',
						checked:false
					},
					{
						name:'信息安全',
						checked:false
					},
					{
						name:'其它',
						checked:false
					}
				]
			}
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
				let that = this;
				uni.showModal({
					title: '温馨提示',
					content: '获取相机和相册权限才可以选择图片',
					showCancel: false,
					confirmText: '继续',
					success(res) {
						if (res.confirm) {
							uni.showActionSheet({
							    itemList: ['拍照', '从手机相册选择'],
							    success: (res) => {
							        that.uploadImg(res.tapIndex === 0 ? "camera" : "album")
							    }
							});
						}
					}
				});
            },
            // 上传图片
            uploadImg(sourceType = "camera") {
				var that = this;
				uni.chooseImage({
					count: 1,
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
					 }else{
						 uni.showToast({
						 	title:res.message,
						 	icon: 'none',
						 	duration: 2000
						 })
					 }
				})
			},
			// 切换注销原因事件
			radioGroupChange(e){
				this.reason=e
			},
			// 注销账号
			deleteUser() {
				this.show = true;
			},
			confirm(e) {
				if(!this.reason) {
					this.$u.toast('请选择注销用户原因')
					return
				}
				let data={
					userId: this.$store.state.userInfo.id,
					reason:this.reason
				}
				this.$H.get('/zf/v1/user/remove',data,true).then(res=>{
					if (res.status) {
						// 退出登录
						this.logout()
					}
				})
				this.show = false;
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
					key: 'communityInfo',
					success: function (res) {}
				});
				uni.removeStorage({
					key: 'cityName',
					success: function (res) {}
				});
				// 断开链接
				uni.navigateTo({
					url: '/pages/auth/login'
				})
			}
        }
    }
</script>