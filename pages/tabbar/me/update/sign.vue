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
		<u-input v-model="value" :type="type" :border="border" placeholder="展示你的个性签名吧"/>
	</view>
</template>
<script>
    export default {
        data() {
			return {
				value: '',
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
			console.log(this.value);
			// 向后端发送请求，修改用户昵称
		}
    }
</script>