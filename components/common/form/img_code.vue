<template>
	<view v-if='isTwelveDigits' class="flex a-center form-item">
		<view class="label_icon">图形码</view>
		<view class="label_fgs"></view>
		<view class="flex-1">
			<input 
				placeholder-class="placeholder"  
				class="qui-input"
				v-model="code" 
				placeholder="请输入图形码" 
				maxlength="4"
				@input="inputCode"
				@blur="onBlurCode"/>
		</view>
		<view class="code-canvas" @click="updateImageCode">
		  {{this.dataMsg.code}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				code:'',
				phone:'',
				dataMsg: {
					code: [],
					key: ''
				},
				isTwelveDigits: false,
			}
		},
		created() {
			uni.$on('getUserName',val=>{
				this.phone=val
			})
		},
		watch: {
			phone(newValue) {
				const cleanedValue = newValue.replace(/\D/g, '');
				if(cleanedValue.length === 11){
					this.isTwelveDigits = true
					this.getImgCode()
				}
			}
		},
		methods:{
			inputCode() {
				uni.$emit('getImgCode',this.code)
			},
			onBlurCode() {
				uni.$emit('random',this.dataMsg.key)
				if(this.code!== this.dataMsg.code){
					uni.showToast({
						icon: 'none',
						title: '请填写正确的图形码'
					});
					return
				}
			},
			// 刷新验证码
			updateImageCode() {
				this.getImgCode()
			},
			getImgCode() {
				const phone = this.phone
				if(phone) {
					this.$H.get(`/zf/v1/user/code/${phone}`, {},false).then(res => {
						if (res.code === 200) {
							if(res.data && res.data.length > 0) {  
								this.dataMsg.code = res.data[0].code
								this.dataMsg.key = res.data[0].key
								uni.$emit('random',res.data[0].key)
							}
						} else{
							uni.showToast({
								icon: 'none',
								title: res.message
							});
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
	.code-canvas {
		box-sizing: border-box;
	    margin: 2px 0px 0px 2px;
	    width: 80px;
	    height: 38px;
	    background: #e9f1d9a6;
	    font-size: 22px;
	    text-align: center;
	    line-height: 38px;
	    color: #efcb9b;
	    letter-spacing: 3px;
	    font-style: italic;
	    border-radius: 3px;
	}
</style>
