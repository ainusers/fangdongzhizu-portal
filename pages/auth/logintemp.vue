<template>
	
</template>

<script>
	export default{
		onLoad() {
			var that = this;
			var isLogin=false
			uni.getStorage({
					key:'token',
					success(res) {
						if(res.data){
							isLogin=true
						}
					}
				})
			if(isLogin){
				uni.switchTab({
					url: '/pages/tabbar/home/home'
				})
			}else{
				uni.navigateTo({
					url: '/pages/auth/login'
				})
			}	
		}
	}
</script>

<style>
</style>