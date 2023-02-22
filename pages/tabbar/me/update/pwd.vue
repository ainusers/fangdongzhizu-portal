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
	.u-input{
		margin-top: 10px;
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
			uni.getStorage({
				key: 'token',
				success: function (auth) {
					uni.request({
						method: 'patch',
						data: {
							id: that.userInfo.id,
							signature: that.value
						},
						header: {
							'content-type': 'application/json',
							'Authorization': 'Bearer ' + auth.data
						},
						url: 'http://81.70.163.240:11001/zf/v1/user/attr',
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
			// 向后端发送请求，修改用户昵称
		}
    }
</script>