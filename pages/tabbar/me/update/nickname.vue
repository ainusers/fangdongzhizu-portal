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
		<u-input v-model="value" :type="type" :border="border" placeholder="起一个有趣的名字吧" maxlength="10"/>
	</view>
</template>
<script>
	var that;
	import {htmlEncode} from '../../../../utils/utils.js'
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
			that=this
			this.userInfo = this.$store.state.userInfo;
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
			console.log(that.userInfo)
					uni.request({
						method: 'patch',
						data: {
							id: that.userInfo.id,
							nickname: htmlEncode(that.value)
						},
						header: {
							'content-type': 'application/json',
							'Authorization': 'Bearer ' + that.$store.state.token
						},
						url: 'http://81.70.163.240:11001/zf/v1/user/attr',
						success: (res) => {
							console.log(res)
							if(res.data.status){
								uni.showToast({
									title: '修改成功',
									icon: 'none',
									duration: 2000
								})
								that.userInfo.nickname=that.value
								that.$store.commit('userInfo',that.userInfo)
								// 返回上一页
								setTimeout(() => {
									uni.navigateBack({
									    delta: 1
									});
								},2000)
							}else{
								uni.showToast({
									title: res.data.message,
									icon: 'none',
									duration: 2000
								})
							}
						}
					})
		
		}
    }
</script>