<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
	.qradio{
		transform: scale(0.6);
		color: #FF5A5F;
	}
</style>
<template>
	<view class="abslrtb flex-column a-center wrap">
		<view class="topbox flex-column aj-center">
			<image class="logoimg" src="/static/logo.png" mode=""></image>
		</view>
		<!-- 用户信息表单 -->
		<view class="form">
			<view class="flex a-center form-item">
				<view class="label">
					<text>手机号</text>
				</view>
				<image class="label_icon" src="/static/login/phone.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" class="qui-input" type="number" value="" v-model="phone" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label">
					<text>验证码</text>
				</view>
				<image class="label_icon" src="/static/login/code.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder"  class="qui-input" type="number" value="" maxlength="6" v-model="code" placeholder="请输入验证码" />
				</view>
				<view>
					<text style="opacity: 0.8;" class="fs28 ptb20 main-color yzm"@tap="sendCode">{{codeDuration ? codeDuration + 's' : '获取验证码' }}</text>
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label">
					<text>密码</text>
				</view>
				<image class="label_icon" src="/static/login/pw.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input :password="password" placeholder-class="placeholder" class="qui-input" type="text" value="" v-model="password" placeholder="请输入密码" />
				</view>
			</view>
		</view>
		<view class="btns">
			<view class="qbtn" @tap="bindRegister">
				<text class="btn-text-color fs30">绑定手机号</text>
			</view>
		</view>
		<view class="bottom"></view>
	</view>
</template>

<script>
	var that=''
	import {getUserInfo} from '../../utils/utils.js'
	export default {
		data() {
			return {
				phone: '',
				code: '', //验证码
				password: '',
				codeDuration: 0,
				ThreeInfo:{},
				phoneInfo:''
			}
		},
		onLoad(){
			that=this
			this.ThreeInfo=this.$store.state.ThreeInfo
			
		},
		methods: {
			
			//三方登录 没有绑定过调用
			threeLogin(userInfo){
				let params={
					  // "openid": this.ThreeInfo.openId,
					  "username": userInfo.username,
					  "nickname": this.ThreeInfo.nickName,
					  "sex": this.ThreeInfo.gender=='男'?this.ThreeInfo.gender=1:this.ThreeInfo.gender=0,
					  "headimgurl":this.ThreeInfo.avatarUrl,
					  "city": this.ThreeInfo.avatarUrl,
					  "province": this.ThreeInfo.province,
					  "country": this.ThreeInfo.country,
					  "password": userInfo.password,
					  "code": userInfo.code
				}
				console.log(this.$store.state)
				let isWx=this.$store.state.isWx
				console.log(isWx)
				if(isWx){
					params["wxid"]=this.ThreeInfo.openId
				}else{
					params["qqid"]=this.ThreeInfo.openId
				}
				console.log(params)
				this.$H.post('/zf/v1/user/third/login',params,false).then(res=>{
					if(res.status&&res.code==200){
						let token=res.data[0].token	
						if(token){
							that.$store.commit('token',token)	
							this.getUserInfo()
							console.log('获取userINfo')
							uni.switchTab({
								url: '/pages/tabbar/home/home'
							})
						}
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

			bindRegister() {
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
				let userInfo={
					username: this.phone,
					password: this.password,
					code: this.code,
				}
				this.threeLogin(userInfo)
			},
		}
	}
</script>