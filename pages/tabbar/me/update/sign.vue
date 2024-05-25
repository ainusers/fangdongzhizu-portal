<style>
    page{
        width: 100%;
        height: 100%;
		background-color: #f7f7f7;
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
			// 向后端发送请求，修改用户簽名
			var that = this;
      let data={
			id: that.userInfo.id,
			signature: htmlEncode(that.value)
      }
      this.$H.patch('/zf/v1/user/attr',data,true).then(res=>{
          		if(res.status&&res.code==200){
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
				}else{
				uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 2000
					})
              }
		})
		}
    }
</script>