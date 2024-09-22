<template>
	<view class="flex a-center form-item">
		<view class="label_icon" v-if="type=='user' || type=='phone'">账号</view>
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