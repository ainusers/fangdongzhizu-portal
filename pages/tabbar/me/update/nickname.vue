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
			// 向后端发送请求，修改用户昵称
			var that = this;
			uni.getStorage({
				key: 'token',
				success: function (auth) {
					uni.request({
						method: 'patch',
						data: {
							id: that.userInfo.id,
							nickname: that.value
						},
						header: {
							'content-type': 'application/json',
							'Authorization': 'Bearer ' + auth.data
						},
						url: 'http://www.fangdongzhizu.top:11001/zf/v1/user/attr',
						success: (res) => {
							if(res.data.data[0].status){
								uni.showToast({
									title: '修改成功',
									icon: 'none',
									duration: 2000
								})
								// 返回上一页
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									});
								},2000)
							}
						}
					})
				}
			})
		}
    }
</script>