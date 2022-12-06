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
		
	</view>
</template>
<script>
    export default {
        data() {
			return {
				
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
			// 向后端发送请求，设置性别
		}
    }
</script>