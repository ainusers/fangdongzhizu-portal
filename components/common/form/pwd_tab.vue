<template>
	<view class="flex a-center form-item">
		<view class="label_icon">密码</view>
		<view class="label_fgs"></view>
		<view class="flex-1">
			<input placeholder-class="placeholder" :password="password" class="qui-input" type="text"
				v-model="password" placeholder="请输入密码" />
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				password:''
			}
		}
	}
</script>

<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
</style>