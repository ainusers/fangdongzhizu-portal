<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";     
	.forget_btn{
		position: absolute;
		bottom:100rpx;
		width: $boxWidth
	}
</style>
<template>
	<view class="abslrtb flex-column a-center wrap">
		<view class="topbox flex-column aj-center">
			<image class="logoimg" src="/static/logo.png" mode=""></image>
		</view>
		<view class="flex tabs mb30">
			<view @click="tab(0)" class="flex-1 flex aj-center" :class="tabIndex==0&&'active'">
				<text class="fs34 fw600 text-gray" :class="tabIndex==0&&'curtext'">账号登录</text>
			</view>
			<view @click="tab(1)" class="flex-1 flex aj-center" :class="tabIndex==1&&'active'">
				<text class="fs34 fw600 text-gray" :class="tabIndex==1&&'curtext'">手机登录</text>
			</view>
		</view>
		<view class="form" v-show="tabIndex ==0">
			<!-- //用户名 -->
			<phoneTab type="user" ref="userName"></phoneTab>
			<!-- //密码 -->
			<pwdTab ref="passWord"/>
		</view>

		<view class="form" v-if="tabIndex ==1">
			<!-- 手机号 -->
			<phoneTab type="phone" ref="phone"></phoneTab>
			<!-- 验证码 -->
			<yzmCode ref="yzmCode" />
		</view>
		
		<view class="btns">
			<button @click="bindLogin" class="qbtn">
				<view class="btn-text-color fs30">登录</view>
			</button>
			<view class="blue_link" :class="{'animShake':isShow}">
				<u-checkbox-group>
							<u-checkbox 
								@change="checkboxChange" 
								v-model="checked" 
								name="隐私协议"
								shape="circle"
								active-color="#7dc3f2"
							>
							</u-checkbox>
				</u-checkbox-group>
				<view class="blue" @click="goUrl">
					隐私协议
				</view>
			</view>
				
			<view class="flex ptb30 mlr20 space-between forget_btn">
				<view @click="goRegister" class="">
					<text class="fs28 nav-text-color ">注册用户</text>
				</view>
				<view @click="goForget" class="">
					 <!-- underline -->
					<text class="fs28 nav-text-color">忘记密码</text>
				</view>
			</view>
		</view>

	<!-- 	<view class="other">
			<view class="other-title">—————— 其他登录方式 ——————</view>
			<view class="other-img">
				<image class="other-qq" src="/static/login/qq.png" mode="" @tap="useQQ"></image>
				<image class="other-wx" src="/static/login/wx.png" mode="" @tap="useWX"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	var that, timer;
	import phoneTab from '../../components/common/form/phone_tab.vue'
	import pwdTab from '../../components/common/form/pwd_tab.vue'
	import yzmCode from'../../components/common/form/yzm_code.vue'
	import {MycheckUpdate} from '@/utils/utils.js'
	export default {
		data() {
			return {
				password: true,
				tabIndex: 0,
				username: '',
				password: '',
				phone: '',
				code: '',
				codeDuration: 0,
				phoneInfo:'',
				checked:false,
				isShow:false,
				onlyOne:false
			}
		},
		components:{
			phoneTab,
			pwdTab,
			yzmCode
		},
		onLoad() {
			that = this;
			//这里去获取权限了
			uni.getSystemInfo({
				success(res){
					uni.setStorage({
						key:'phoneInfo',
						data:res
					})
					
				}
			})
		},
		onShow(){
			
		},
		onUnload() {
			clearInterval(timer);
		},
		methods: {
			checkboxChange(e){

			},
			goUrl(){
				uni.navigateTo({
					url:'/pages/tabbar/me/text/privacy'
				})
			},
			bindLogin() {
				switch (this.tabIndex) {
					case 0:
						this.loginByUser()
						this.username=this.$refs.userName.username
						break;
					case 1:
						this.username=this.$refs.phone.username
						this.loginByMsg()
						break;
					default:
						break;
				}
			},
			loginByMsg() {
				if(!this.$refs.phone.username){
					uni.showToast({
						icon: 'none',
						title: '请填写手机号'
					});
					return;
				}
				if (!/^1\d{10}$/.test(this.$refs.phone.username)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				if (this.$refs.yzmCode.code.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				uni.showToast({
					icon: 'none',
					title: this.checkXie()
				});
				if(!this.checkXie()){
					return
				}
			
				let data={
					username: this.$refs.phone.username,
					code: this.$refs.yzmCode.code
				}
				uni.showToast({
					icon: 'none',
					title: data
				});
				this.$H.post('/zf/v1/user/login',data,false).then(res=>{
							if (res.status) {
								this.$store.commit('token',res.data[0].token)
								this.getUserInfo()
								uni.switchTab({
									url: '/pages/tabbar/home/home'
								})
							}
				})
			},
			loginByUser() {
				if(!this.$refs.userName.username){
					uni.showToast({
						icon: 'none',
						title: '请填写账号'
					});
					return;
				}
				if (!/^1\d{10}$/.test(this.$refs.userName.username)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				if (this.$refs.passWord.password.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				if(!this.checkXie()){
					return
				}
				let data={
                    username: this.$refs.userName.username,
                    password: this.$refs.passWord.password
                }
				this.$H.post('/zf/v1/user/login',data,false).then(res=>{
                    if(res.status) {
                        this.$store.commit('token',res.data[0].token)
                        this.getUserInfo()
                        uni.switchTab({
                            url: '/pages/tabbar/home/home'
                        })

                    }
				})
			},
			checkXie(){
				let statu=false
				if(!this.checked){
					uni.showToast({
						icon: 'none',
						title: '请选择隐私协议！'
					});
					this.isShow=true
					setTimeout(()=>{
						this.isShow=false
					},500)
					statu=false
				}else{
					statu=true
				}
				return statu
			},
			getUserInfo() {
				this.$H.get('/zf/v1/user/attr/token',{},true).then(res=>{
					if(res.status){
						that.userInfo = res.data[0].user;
						that.$store.commit('userInfo',that.userInfo)
						uni.setStorage({
							key:'userInfo',
							data:that.userInfo
						})
					}
				})
			},
		useWX() {
				uni.login({
					provider: 'weixin',
					success(loginRes) {
						let obj=loginRes.authResult
						uni.getUserInfo({
                          provider: 'weixin',
                          success: function (infoRes) {
                              that.$store.commit('isWx',true)
                              that.$store.commit('ThreeInfo',infoRes.userInfo)
                              that.checkUser(infoRes.userInfo)
                          }
                        });
					}
				});
			},
			useQQ() {
				
				uni.login({
					provider: 'qq',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'qq',
							success: function(infoRes) {
								// 查看需要保存的信息
								that.$store.commit('isWx',false)
								that.$store.commit('ThreeInfo',infoRes.userInfo)
								that.checkUser(infoRes.userInfo)
				 		}
				 	});
					}
				})
			},
			//判断当前元素是否注册过
		async checkUser(obj,phoneInfo){
				this.$H.get('/zf/v1/user/third/check',{openid:obj.openId},false).then(res=>{
					if(res.status){
						let token=res.data[0].token
						if(token){
							this.$store.commit('token',token)
						 this.getUserInfo()
							uni.switchTab({
								url: '/pages/tabbar/home/home'
							})
						}else{
							uni.navigateTo({
								url: '/pages/auth/binding'
							})
						}
					}
				})			
			},
			tab(index) {
				this.tabIndex = index;
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/auth/login'
				})
			},
			goRegister() {
				uni.navigateTo({
					url: '/pages/auth/register'
				})
			},
			goForget() {
				uni.navigateTo({
					url: '/pages/auth/forget'
				})
			}
		}
	}
</script>
