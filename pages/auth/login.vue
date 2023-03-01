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
		<view class="form" v-if="tabIndex ==0">
			<view class="flex a-center form-item">
				<view class="label">
					<text>账号</text>
				</view>
				<image class="label_icon" src="/static/login/user.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" class="qui-input" type="text" value="" v-model="username"
						placeholder="请输入账号" />
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label">
					<text>密码</text>
				</view>
				<image class="label_icon" src="/static/login/pw.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" :password="password" class="qui-input" type="text" value=""
						v-model="password" placeholder="请输入密码" />
				</view>
			</view>
		</view>

		<view class="form" v-if="tabIndex ==1">
			<view class="flex a-center form-item">
				<view class="label">
					<text>手机号</text>
				</view>
				<image class="label_icon" src="/static/login/phone.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" class="qui-input" type="number" value="" maxlength="11"
						v-model="phone" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label">
					<text>验证码</text>
				</view>
				<image class="label_icon" src="/static/login/code.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" :password="password" class="qui-input" type="number" value=""
						v-model="code" placeholder="请输入验证码" />
				</view>
				<view>
					<view style="opacity: 0.8;" class="yzm fs28 ptb20 main-color" @click="sendCode">
						{{codeDuration ? codeDuration + 's' : '获取验证码' }}</view>
				</view>
			</view>
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
		onLoad() {
			that = this;
		},
		onUnload() {
			clearInterval(timer);
		},
		methods: {
			sendCode() {
				if (this.phone.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				if (this.codeDuration > 0) {
					return;
				}
				this.codeDuration = 60;
				// 倒计时
				timer = setInterval(function() {
					that.codeDuration--;
					if (that.codeDuration == 0) {
						clearInterval(timer);
					}
				}, 1000)
				// 获取验证码
				this.$H.get('http://sc.tujingzg.com/api/user/phoneReg', {
					phone: this.phone
				}).then(res => {
					if (res.code === 200) {
						this.$u.toast(res.msg);
					}
				});
			},
			bindLogin() {
				console.log(this.tabIndex)
				switch (this.tabIndex) {
					case 0:
						this.loginByUser()
						break;
					case 1:
						this.loginByMsg()
						break;
					default:
						break;
				}
			},
			loginByMsg() {
				if (!/^1\d{10}$/.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				if (this.code.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				uni.request({
					method: 'post',
					header: {
						'content-type': 'application/json'
					},
					data: {
						username: this.phone,
						password: this.code
					},
					url: 'http://81.70.163.240:11001/users/login',
					success: (res) => {
						if (res.data.success) {
							uni.switchTab({
								url: '/pages/tabbar/home/home'
							})
						}
					}
				});
			},
			loginByUser() {
				// uni.switchTab({
				// 	url: '/pages/tabbar/home/home'
				// })
				if (!/^1\d{10}$/.test(this.username)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				if (this.password.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				uni.request({
					method: 'post',
					header: {
						'content-type': 'application/json'
					},
				    data: {
				    	username: this.username,
				    	password: this.password
				    },
					url: 'http://81.70.163.240:11001/zf/v1/user/login',
				    success: (res) => {
						console.log(res)
						if(res.data.status) {
							uni.setStorage({
								key: 'token',
								data: res.data.data[0].token
							});
							uni.switchTab({
								url: '/pages/tabbar/home/home'
							})
						}
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
						uni.request({
							method: 'post',
							header: {
								'cotent-type': 'application/json',
							},
							data: loginRes.authResult,
							url: 'http://81.70.163.240:11001/users/wxlogin',
							success(infoRes) {
								// 查看需要保存的信息
								console.log('返回信息：' + JSON.stringify(infoRes))
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
								console.log('用户信息为：' + JSON.stringify(infoRes));
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
