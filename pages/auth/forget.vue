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
		<view class="form">
			<view class="flex a-center form-item">
				<view class="label">
					<text>手机号</text>
				</view>
				<image class="label_icon" src="/static/login/phone.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" class="qui-input" type="number" value="" v-model="phone" maxlength="11" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label">
					<text>验证码</text>
				</view>
				<image class="label_icon" src="/static/login/code.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder"  class="qui-input" type="number" v-model="code" value="" placeholder="请输入验证码" maxlength="6"/>
				</view>
				<view>
					<text style="opacity: 0.8;" class="fs28 ptb20 main-color yzm" @tap="sendCode">{{codeDuration ? codeDuration + 's' : '获取验证码' }}</text>
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label">
					<text>新密码</text>
				</view>
				<image class="label_icon" src="/static/login/pw.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input :password="password" placeholder-class="placeholder" class="qui-input" type="text" v-model="password" value="" placeholder="请输入新密码" />
				</view>
			</view>
		</view>
		<view class="btns">
			<view class="qbtn" @tap="bindOk">
				<text class="btn-text-color fs30">确认</text>
			</view>
			<view class="flex ptb30 mlr20 aj-center">
				<view @click="goLogin()" class="">
					<text class="fs28 nav-text-color underline">返回登录</text>
				</view>
			</view>
		</view>
		<view class="bottom"></view>
	</view>
</template>

<script>
	var that='';
	export default {
		data() {
			return {
				password: '',
				phone: '',
				code: '',
				codeDuration: 0
			}
		},
		onLoad(){
			that=this
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
				let timer = setInterval(function() {
				  that.codeDuration--;
				  if (that.codeDuration == 0) {
				    clearInterval(timer);
				  }
				}, 1000)
				// 获取验证码
				this.$H.get('http://sc.tujingzg.com/api/user/phoneReg',{
					phone:this.phone
				}).then(res => {
					if (res.code === 200) {
						this.$u.toast(res.msg);
					}
				});
			},
			bindOk() {
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
				if (this.password.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				this.$H.post('/zf/v1/user/reset',{
					username: this.phone,
					code: this.code,
					password: this.password
				}).then(res => {
					if (res.code === 200) {
						this.$u.toast('修改成功');
						setTimeout(function(){
							uni.navigateTo({
								url: '/pages/auth/login'
							})
						},2000)
						
					}else{
						this.$u.toast(res.message);
					}
				});
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