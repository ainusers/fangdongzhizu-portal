<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
	.top{
		display: flex;
		align-items: center;
		flex-direction: column;
		width:100%;
		image{
			width:150rpx;
			height:150rpx;
			margin-top:100rpx;
		}
	}
</style>
<template>
	<view class="abslrtb flex-column a-center wrap">
		<view class="top">
			<image src="@/static/me/logo.png"></image>
		</view>
		<!-- 用户信息表单 -->
		<view class="form">
			<view class="flex a-center form-item">
				<view class="label_icon">账号</view>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" class="qui-input" type="number" value="" v-model="phone" @input="inputPhone" placeholder="请输入手机号" />
				</view>
			</view>
			<!-- 图形码 -->
			<imgCode ref="imgCode" />
			<view class="flex a-center form-item">
				<view class="label_icon">验证码</view>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder"  class="qui-input" type="number" value="" maxlength="6" v-model="code" placeholder="请输入验证码" />
				</view>
				<view>
					<text style="opacity: 0.8;" class="fs28 ptb20 main-color yzm"@tap="sendCode">{{codeDuration ? codeDuration + 's' : '获取验证码' }}</text>
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label_icon">密码</view>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input :password="password" placeholder-class="placeholder" class="qui-input" type="text" value="" v-model="password" placeholder="请输入密码" />
				</view>
			</view>
		</view>
		<view class="btns">
			<view class="qbtn" @click="bindRegister" @tap="$u.throttle(bindRegister, 3000)">
				<text class="btn-text-color fs30">立即注册</text>
			</view>
			<view class="blue_link" :class="{'animShake':isShow}" style="display: flex;flex-direction: inherit;">
				<u-checkbox-group width="25px">
							<u-checkbox 
								@change="checkboxChange" 
								v-model="checked" 
								name="注册协议"
								shape="square"
								active-color="#7dc3f2">
							</u-checkbox>
				</u-checkbox-group>
				<view>我已阅读并同意</view>
				<view class="blue" @click="goUrl">
					《注册协议》
				</view>
			</view>
			<view class="flex ptb30 mlr20 aj-center">
				<view @click="goLogin()">
					<text class="fs28 nav-text-color underline">返回登录</text>
				</view>
			</view>
		</view>
		<view class="bottom"></view>
	</view>
</template>

<script>
	var that=''
	import {checkExist} from '@/utils/utils.js'
	import imgCode from '@/components/common/form/img_code.vue'
	export default {
		data() {
			return {
				phone: '',
				code: '', //验证码
				password: '',
				codeDuration: 0,
				checked:false,
				isShow:false,
				random:'',
				imgCode: ''
			}
		},
		components:{
			imgCode
		},
		created() {
			uni.$on('random',val=>{
				this.random = val
			})
			uni.$on('getImgCode',val=>{
				this.imgCode = val
			})
		},
		onLoad(){
			that=this
		},
		methods: {
			inputPhone(){
				uni.$emit('getUserName',this.phone)
			},
			checkboxChange(){},
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
				checkExist(this.phone).then(res=>{
					if(!res.status){
						// 获取验证码
						this.$H.get('/zf/v1/code/sendCode',{
							phone:this.phone,
							random:this.random,
							code: this.imgCode
						}).then(res => {
							if (res.code === 500) {
								this.$u.toast(res.message);
								return
							}
							if (res.code === 200) {
								this.$u.toast('短信发送成功');
								this.codeDuration = 60;
								// 倒计时
								let timer = setInterval(function() {
								  that.codeDuration--;
								  if (that.codeDuration <= 0) {
								    clearInterval(timer);
								  }
								}, 1000)
							}
						});
					}else{
						this.$u.toast('当前手机号已注册，可直接登录！');
						return
					}
				})
			},
			bindRegister() {
				if (!/^1[3-9]\d{9}$$/.test(this.phone)) {
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
				if(!this.checked){
					uni.showToast({
						icon: 'none',
						title: '请勾选注册协议！'
					});
					this.isShow=true
					setTimeout(()=>{
						this.isShow=false
					},500)
					return
				}
				this.$H.post('/zf/v1/user/register',{
					username: this.phone,
					code: this.code,
					password: this.password,
					rememberMe: 'true'
				}).then(res => {
					if (res.code === 200) {
						this.$u.toast(`您是第${res.data[0]}位注册成功！`);
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/auth/login'
							})
						},2000)
						 clearInterval(timer);
					}else if(res.code!=200){
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
			},
			goUrl(){
				uni.navigateTo({
					url:'/pages/tabbar/me/text/register'
				})
			},
		}
	}
</script>