<template></template>
<script>
	export default{
		onLoad() {
			var isLogin=false
			// 判断用户是否登录
			uni.getStorage({
				key:'token',
				success(res) {
					if(res.data){
						isLogin=true
					}
				}
			})
			// 判断用户进入页面
			setTimeout(function(){
				if(isLogin){
					uni.switchTab({
						url: '/pages/tabbar/home/home'
					})
				}else{
					uni.navigateTo({
						url: '/pages/auth/login'
					})
				}
				plus.navigator.closeSplashscreen()
			},500)
		}
	}
</script>