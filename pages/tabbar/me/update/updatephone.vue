<template>
	<view class="main">
		<form action="">
			<u-form-item :label-position="labelPosition" label="当前手机号 :" prop="region" label-width="200">
				<u-input v-model="oldPhone" type="number" :border="border" placeholder="请输入当前手机号"/>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="更换手机号 :" prop="region" label-width="200">
						<u-input v-model="newphone" type="number" :border="border" placeholder="请输入需要更换的手机号" maxlength="11"/>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="确认手机号 :" prop="region" label-width="200">
						<u-input v-model="newphone1" type="number" :border="border" placeholder="请输入需要确认手机号"  maxlength="11"/>
			</u-form-item>
			<view class="flex a-center form-item">
				<view class="flex-1">
					<input placeholder-class="placeholder"  class="qui-input" type="number" value=""
						v-model="Verification" placeholder="请输入验证码" maxlength="6" />
				</view>
				<view>
					<view style="opacity: 0.8;" class="yzm fs28 ptb20 main-color" @click="sendCode">
						{{codeDuration ? codeDuration + 's' : '获取验证码' }}</view>
				</view>
			</view>
		</form>
		
	</view>
</template>

<script>
	import {checkExist} from '@/utils/utils.js'
	var that, timer;
	export default {
		data() {
			return {
				border:true,
				oldPhone:'',
				newphone:'',
				newphone1:'',
				Verification:'',
				codeDuration: 0,
				labelPosition: 'left',
				userInfo:''
			}
		},
		onLoad(options){
			that=this
			this.userInfo=this.$store.state.userInfo
		},
		methods: {
			sendCode() {
				if(this.newphone!=this.newphone1){
					uni.showToast({
						icon: 'none',
						title: '更换手机号与确认手机号填写不一样'
					});
					return;
				}
				if (!/^1[3-9]\d{9}$/.test(this.newphone)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					});
					return;
				}
				
				checkExist(this.newphone).then(res=>{
					if(!res.status){
						this.codeDuration = 60;
						this.$H.get('/zf/v1/code/sendCode', {
							phone: this.newphone
						},false).then(res => {
							if (res.code === 200) {
								this.$u.toast('发送成功');
								// 倒计时
								timer = setInterval(function() {
									that.codeDuration--;
									if (that.codeDuration <=0) {
										clearInterval(timer);
									}
								}, 1000)
							}
						});
					}else{
						this.$u.toast('当前手机号已被注册！');
					}
				})
				// 获取验证码
				
			},
		onNavigationBarButtonTap(e) {
				if(!that.oldPhone) {
					uni.showToast({
						title: '请输入当前手机号',
						icon: 'none',
						duration: 2000
					}) 
					return
				}
				if (!/^1\d{10}$/.test(this.oldPhone)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的当前手机号'
					});
					return;
				}
				if(!that.newphone) {
					uni.showToast({
						title: '请输入更换手机号',
						icon: 'none',
						duration: 2000
					}) 
					return
				}
				if (!/^1\d{10}$/.test(this.oldPhone)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的更换手机号'
					});
					return;
				}
				if(this.newphone!=this.newphone1){
					uni.showToast({
						icon: 'none',
						title: '更换手机号与确认手机号填写不一样'
					});
					return;
				}
				if(!that.Verification) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 2000
					}) 
					return
				}
				if(that.oldPhone==that.newPhone){
					uni.showToast({
						title: '新老手机号相同',
						icon: 'none',
						duration: 2000
					}) 
					return
				}
				let data={
						userId: that.userInfo.id,
						oldPhone: that.oldPhone,
						newPhone:that.newphone,
						code:that.Verification
					}
						this.$H.patch('/zf/v1/user/phone',data,true).then(res=>{
							if(res.code==200){
								uni.showToast({
									title: '修改成功',
									icon: 'none',
									duration: 2000
								})
								this.userInfo.username=that.newphone;
								that.$store.commit('userInfo',that.userInfo)
								clearInterval(timer);
								// 返回上一页
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								},2000)
							}else{
								uni.showToast({
									title: res.message,
									icon: 'none',
									duration: 2000
								})
							}
						})
			}	
			}
	}
</script>

<style lang="scss" scoped>
@import "@/style/login/weex.scss";
@import "@/style/login/skin.scss";
.main{
	width:95%;
	margin:0 auto;
}
.a-center{
	padding: 0;
}
</style>
