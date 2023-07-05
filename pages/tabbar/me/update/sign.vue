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
		<u-input v-model="value" :type="type" :border="border" :maxlength="18" placeholder="展示你的个性签名吧"/>
	</view>
</template>
<script>
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
			this.userInfo = this.$store.state.userInfo
			this.value = this.userInfo.signature;
        },
        onShow() {
        },
        onUnload() {
        },
        methods: {
		},
		onNavigationBarButtonTap(e) {
			console.log(this.value);
			// 向后端发送请求，修改用户簽名
			var that = this;
					uni.request({
						method: 'patch',
						data: {
							id: that.userInfo.id,
							signature: htmlEncode(that.value)
						},
						header: {
							'content-type': 'application/json',
							'Authorization': 'Bearer ' + that.$store.state.token
						},
						url: 'http://www.fangdongzhizu.top:31001/zf/v1/user/attr',
						success: (res) => {
							if(res.data.status){
								uni.showToast({
									title: '修改成功',
									icon: 'none',
									duration: 2000
								})
								that.userInfo.signature=that.value
								that.$store.commit('userInfo',that.userInfo)
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
    }
</script>