<template>
	<view class="flex a-center form-item">
		<view class="label_icon">验证码</view>
		<view class="label_fgs"></view>
		<view class="flex-1">
			<input placeholder-class="placeholder"  class="qui-input" type="number"
				v-model="code" placeholder="请输入验证码" maxlength="6"/>
		</view>
		<view>
			<view class="yzm fs28  main-color" @click="sendCode">
				{{codeDuration ? codeDuration + 's' : '获取验证码' }}</view>
		</view>
	</view>
</template>

<script>
	var that, timer;
	import {checkExist} from '../../../utils/utils.js'
	export default{
		data(){
			return {
				code:'',
				codeDuration: 0,
				username: '',
				random: '',
				imgCode: ''
			}
		},
		created() {
			that=this
			uni.$on('getUserName',val=>{
				this.username = val
			})
			uni.$on('random',val=>{
				this.random = val
			})
			uni.$on('getImgCode',val=>{
				this.imgCode = val
			})
		},
		onHide(){
			clearInterval(timer);
		},
		methods:{
			sendCode() {
				if (this.username.length < 1) {
					this.$u.toast('请填写正确的手机号');
					return;
				}
				if (this.imgCode.length < 1) {
					this.$u.toast('请填写正确的图形码');
					return;
				}
				checkExist(this.username).then(res=>{
					if(res.status){
						// 获取验证码
						this.$H.get('/zf/v1/code/sendCode', {
							phone: this.username,
							random: this.random,
							code: this.imgCode
						},false).then(res => {
							if (res.code === 200) {
								this.$u.toast('发送成功！');
								if (this.codeDuration > 0) {
									return;
								}
								this.codeDuration = 60;
								// 倒计时
								timer = setInterval(function() {
									if(that.codeDuration>0){
										that.codeDuration--;
									}
									if (that.codeDuration <= 0) {
										clearInterval(timer);
									}
								}, 1000)
							} else{
								uni.showToast({
									icon: 'none',
									title: res.message
								});
							}
						});
					}else{
						this.$u.toast('请先注册再登录！');
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
</style>