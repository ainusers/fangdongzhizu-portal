<style lang="scss">
	/* 每个页面公共css */
	@import "@/style/login/weex.scss";
	@import "@/style/login/skin.scss";
</style>
<template>
	<view class="abslrtb flex-column a-center wrap">
		<view class="topbox flex-column aj-center">
			<image class="logoimg" src="/static/logo.png" mode=""></image>
		</view>
		<view class="flex tabs mb30">
			<view @click="tab(0)" class="flex-1 flex aj-center" :class="tabIndex==0&&'active'">
				<text class="fs30 fw600 text-gray" :class="tabIndex==0&&'curtext'">账号登录</text>
			</view>
			<view @click="tab(1)" class="flex-1 flex aj-center" :class="tabIndex==1&&'active'">
				<text class="fs30 fw600 text-gray" :class="tabIndex==1&&'curtext'">手机登录</text>
			</view>
		</view>
		<view class="form" v-if="tabIndex ==0">
			<view class="flex a-center form-item">
				<view class="label">
					<text>账号</text>
				</view>
				<image class="label_icon" src="/static/login/user.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" class="qui-input" type="text" value="" placeholder="请输入账号" />
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label">
					<text>密码</text>
				</view>
				<image class="label_icon" src="/static/login/pw.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" :password="password" class="qui-input" type="text" value="" placeholder="请输入密码" />
				</view>
			</view>
		</view>
		
		<view class="form" v-if="tabIndex ==1">
			<view class="flex a-center form-item">
				<view class="label">
					<text>手机号</text>
				</view>
				<image class="label_icon" src="/static/login/phone.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" class="qui-input" type="text" value="" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="flex a-center form-item">
				<view class="label">
					<text>验证码</text>
				</view>
				<image class="label_icon" src="/static/login/code.png" mode=""></image>
				<view class="label_fgs"></view>
				<view class="flex-1">
					<input placeholder-class="placeholder" :password="password" class="qui-input" type="text" value="" placeholder="请输入验证码" />
				</view>
				<view>
					<text style="opacity: 0.8;" class="yzm fs28 ptb20 main-color">获取验证码</text>
				</view>
			</view>
		</view>
		
		<view class="btns">
			<view class="qbtn">
				<text class="btn-text-color fs30">登录</text>
			</view>
			<view class="flex ptb30 mlr20 space-between">
				<view @click="goRegister" class="">
					<text class="fs26 nav-text-color underline">注册</text>
				</view>
				<view class="" @click="goForget">
					<text class="fs26 nav-text-color underline">忘记密码</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: true,
				tabIndex: 0
			}
		},
		methods: {
			tab(index) {
				this.tabIndex = index;
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
			}
		}
	}
</script>