<template>
	<view class="flex a-center form-item">
		<view class="label">
			<text>账号</text>
		</view>
		<image class="label_icon" src="/static/login/user.png" mode="" v-if="type=='user'"></image>
			<image class="label_icon" src="/static/login/phone.png" mode="" v-if="type=='phone'"></image>
		<view class="label_fgs"></view>
		<view class="flex-1">
			<input placeholder-class="placeholder" class="qui-input" type="text" value="" v-model="username"
				placeholder="请输入手机号" @input="inputPhone"/>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			type: {
				type: String,
				default: "phone"
			},
		},
		data(){
			return{
				username:''
			}
		},
		onLoad(){
			
		},
		methods:{
			inputPhone(e){
				if(this.type=='phone'){
					uni.$emit('getUserName',this.username)
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
</style>