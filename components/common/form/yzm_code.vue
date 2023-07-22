<template>
	<view class="flex a-center form-item">
		<view class="label">
			<text>验证码</text>
		</view>
		<image class="label_icon" src="/static/login/code.png" mode=""></image>
		<view class="label_fgs"></view>
		<view class="flex-1">
			<input placeholder-class="placeholder"  class="qui-input" type="number" value=""
				v-model="code" placeholder="请输入验证码" maxlength="6"/>
		</view>
		<view>
			<view style="opacity: 0.8;" class="yzm fs28 ptb20 main-color" @click="sendCode">
				{{codeDuration ? codeDuration + 's' : '获取验证码' }}</view>
		</view>
	</view>
</template>

<script>
	var that, timer;
	export default{
		data(){
			return {
				code:'',
				codeDuration: 0,
				username:''
			}
		},
		
		created() {
			that=this
			uni.$on('getUserName',val=>{
				this.username=val
			})
		},
		methods:{
			sendCode() {
				if (this.username.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				this.checkExist().then(res=>{
					if(res.status){
						// 获取验证码
						this.$H.get('/zf/v1/code/sendCode', {
							phone: this.username
						},false).then(res => {
							console.log(res)
							if (res.code === 200) {
								this.$u.toast('发送成功！');
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
							}
						});
					}
				})
			},
			checkExist(){
				return this.$H.get('/zf/v1/user/exist',{username:that.username},false).then(res=>{
					console.log(res)
					if(res.code==200){
						return res.data[0]
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
</style>