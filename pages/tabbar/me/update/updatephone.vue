<template>
	<view class="main">
		<form action="">
			<u-form-item :label-position="labelPosition" label="当前手机号 :" prop="region" label-width="200">
				<u-input v-model="currenphone" type="number" :border="border" placeholder="请输入当前手机号"/>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="更换手机号 :" prop="region" label-width="200">
						<u-input v-model="newphone" type="number" :border="border" placeholder="请输入需要更换的手机号"/>
			</u-form-item>
			<view class="flex a-center form-item">
				<view class="flex-1">
					<input placeholder-class="placeholder"  class="qui-input" type="number" value=""
						v-model="Verification" placeholder="请输入验证码" />
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
	var that, timer;
	export default {
		data() {
			return {
				border:true,
				currenphone:'',
				newphone:'',
				Verification:'',
				codeDuration: 0,
				labelPosition: 'left',
				userInfo:''
			}
		},
		onLoad(options){
			that=this
			this.userInfo=this.$store.state.userInfo
			// console.log(this.userInfo)
		},
		methods: {
			sendCode() {
				if (this.newphone.length < 1) {
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
					phone: this.newphone
				}).then(res => {
					if (res.code === 200) {
						this.$u.toast(res.msg);
					}
				});
			},
		},
		onNavigationBarButtonTap(e) {
				console.log(this.value);
				// 向后端发送请求，修改用户簽名
				console.log(that.currenphone) //校验手机号
				console.log(that.newphone)
				console.log(that.Verification)
						uni.request({
							method: 'patch',
							data: {
								id: that.userInfo.id,
								username: that.newphone,
								code:that.Verification
							},
							header: {
								'content-type': 'application/json',
								'Authorization': 'Bearer ' + that.$store.state.token
							},
							url: 'http://81.70.163.240:11001/zf/v1/user/attr',
							success: (res) => {
								console.log(res)
								if(res.data.status){
									uni.showToast({
										title: '修改成功',
										icon: 'none',
										duration: 2000
									})
									// 返回上一页
									setTimeout(() => {
										uni.navigateBack({
										    delta: 1
										});
									},2000)
								}else{
									uni.showToast({
										title: res.data.message,
										icon: 'none',
										duration: 2000
									})
								}
							},
							fail(e) {
								console.log(e)
							}
						})
			
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
