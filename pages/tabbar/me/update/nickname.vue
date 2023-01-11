<style>
    page{
        width: 100%;
        height: 100%;
		background-color: #f2f2f2;
    }
	.content {
		background-color: #fff;
		padding: 8px 15px 8px 15px;
	}
</style>
<template>
	<view class="content">
		<u-input v-model="value" :type="type" :border="border" placeholder="起一个有趣的名字吧"/>
	</view>
</template>
<script>
    export default {
        data() {
			return {
				userInfo: '',
				value: '',
				type: 'text',
				border: true
			}
		},
        onLoad(data) {
			this.userInfo = JSON.parse(decodeURIComponent(data.userInfo));
			this.value = this.userInfo.nickname;
        },
        onShow() {
        },
        onUnload() {
        },
        methods: {
		},
		onNavigationBarButtonTap(e) {
			console.log(this.value);
			// 向后端发送请求，修改用户昵称
		}
    }
</script>