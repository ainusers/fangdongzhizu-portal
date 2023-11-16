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
	import {htmlEncode} from '../../../../utils/utils.js'
	var that=''
    export default {
        data() {
			return {
				username:'',
				pwd: '',
				newpwd: '',
				newpwd2: '',
				type: 'text',
				border: true
			}
		},
        onLoad(options) {
			that=this
			this.username=options.username
        },
        onShow() {
        },
        onUnload() {
        },
        methods: {
		},
		onNavigationBarButtonTap(e) {
			if(this.pwd==this.newpwd){
				uni.showToast({
					title: '原密码与新密码相同',
					icon: 'none',
					duration: 2000
				})
				return
			}
			if(this.newpwd!=this.newpwd2){
				uni.showToast({
					title: '两次密码输入不相同',
					icon: 'none',
					duration: 2000
				})
				return
			}
			// 向后端发送请求，修改用户密码
			let data={
				// 向后端发送请求，修改用户昵称
				userId: htmlEncode(this.$store.state.userInfo.id),
				oldPassword:htmlEncode(this.pwd) , //原有密码
				newPassword:htmlEncode(this.newpwd),  //新密码
				secondPassword:htmlEncode(this.newpwd2)
			}
			this.$H.patch('/zf/v1/user/pwd',data,true).then(res=>{
			if(res.status&&res.code==200){
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