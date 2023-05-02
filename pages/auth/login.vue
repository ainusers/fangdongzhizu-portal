<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
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
			<view class="flex ptb30 mlr20 space-between">
				<view @click="goRegister" class="">
					<text class="fs28 nav-text-color underline">注册用户</text>
				</view>
				<view @click="goForget" class="">
					<text class="fs28 nav-text-color underline">忘记密码</text>
				</view>
			</view>
		</view>

		<view class="other">
			<view class="other-title">—————— 其他登录方式 ——————</view>
			<view class="other-img">
				<image class="other-qq" src="/static/login/qq.png" mode="" @tap="useQQ"></image>
				<image class="other-wx" src="/static/login/wx.png" mode="" @tap="useWX"></image>
			</view>
		</view>
	</view>
</template>

<script>
	var that, timer;
	import phoneTab from '../../components/common/form/phone_tab.vue'
	import pwdTab from '../../components/common/form/pwd_tab.vue'
	import yzmCode from'../../components/common/form/yzm_code.vue'
	export default {
		data() {
			return {
				password: true,
				tabIndex: 0,
				username: '',
				password: '',
				phone: '',
				code: '',
				codeDuration: 0
			}
		},
		components:{
			phoneTab,
			pwdTab,
			yzmCode
		},
		onLoad() {
			that = this;
			uni.getStorage({
				key:'token',
				success(res) {
					if(res.data){
						uni.switchTab({
							url: '/pages/tabbar/home/home'
						})
					}
				}
			})
		},
		onUnload() {
			clearInterval(timer);
		},
		methods: {
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
				console.log(this.$refs.phone.username)
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
				let data={
					username: this.$refs.phone.username,
					code: this.$refs.yzmCode.code
				}
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
			getUserInfo() {
				this.$H.get('/zf/v1/user/attr/token',{},true).then(res=>{
					console.log(res)
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
				// uni.login({
				//   provider: 'weixin',
				//   success: function (loginRes) {
				//     console.log(loginRes.authResult);
				//     // 获取用户信息
				//     uni.getUserInfo({
				//       provider: 'weixin',
				//       success: function (infoRes) {
				//         console.log('用户信息为：' + JSON.stringify(infoRes));
				//       }
				//     });
				//   }
				// })
				uni.getSystemInfo({
					success: function(res) {
						// （设备品牌）brand：Xiaomi
						// （设备型号）model：Redmi Note 8
						// （屏幕宽度）screenWidth：851
						// （屏幕高度）screenHeight：393
						// （应用设置的语言）language：zh-CN
						// （操作系统名称及版本）system：Android 9
						// （引擎版本号）version：1.9.9.81308
						// （客户端平台）platform：android
					}
				});
				uni.login({
					provider: 'weixin',
					success(loginRes) {
						console.log(loginRes.authResult)
						uni.request({
							method: 'post',
							header: {
								'cotent-type': 'application/json',
							},
							data: loginRes.authResult,
							url: 'http://81.70.163.240:11001/users/wxlogin',
							success(infoRes) {
								console.log('登录成功回到')
								// 查看需要保存的信息
								console.log('返回信息：' + JSON.stringify(infoRes))
								if(loginRes.authResult.openid){
									uni.navigateTo({
										url: '/pages/auth/binding'
									})
								}
							}
						})
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
								console.log('用户信息为：' + JSON.stringify(infoRes))
								let infoUser=JSON.stringify(infoRes)
								console.log('userInfo',infoRes.userInfo)
								if(infoRes.userInfo){
									console.log('页面跳转')
									uni.navigateTo({
										url: '/pages/auth/binding'
									})
								}
				 		}
				 	});
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
				console.log('注册')
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
