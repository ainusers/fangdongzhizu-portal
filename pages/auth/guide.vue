<template></template>
<script>
	export default{
		onLoad() {
			// 直接进入首页
			setTimeout(function(){
				uni.switchTab({
					url: '/pages/tabbar/home/home'
				})
				plus.navigator.closeSplashscreen()
			},300)
		}
	}
</script>