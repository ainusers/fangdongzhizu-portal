<style>
    page{
        width: 100%;
        height: 100%;
		background-color: #f2f2f2;
    }
	.content {
		background-color: #fff;
	}
</style>
<template>
	<view class="content">
		<u-input v-model="pwd" :type="type" :border="border" placeholder="请输入原密码"/>
		<u-input v-model="newpwd" :type="type" :border="border" placeholder="请输入新密码"/>
		<u-input v-model="newpwd2" :type="type" :border="border" placeholder="请重复输入新密码"/>
	</view>
</template>
<script>
    export default {
        data() {
			return {
				pwd: '',
				newpwd: '',
				newpwd2: '',
				type: 'text',
				border: true
			}
		},
        onLoad() {
        },
        onShow() {
        },
        onUnload() {
        },
        methods: {
		},
		onNavigationBarButtonTap(e) {
			console.log(this.pwd +  " - " + this.newpwd + " - " + this.newpwd2);
			// 向后端发送请求，修改用户昵称
		}
    }
</script>