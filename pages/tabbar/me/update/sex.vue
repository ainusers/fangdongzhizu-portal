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
		<u-form-item :label-position="labelPosition" label="性别 :" prop="region" label-width="150" class="region">
			<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.sex" placeholder="请选择性别" @click="pickerShow = true"></u-input>
		</u-form-item>
		<u-select v-model="pickerShow" :list="list" @confirm="regionConfirm"></u-select>
	</view>
</template>
<script>
    export default {
        data() {
			return {
				userInfo: '',
				labelPosition: 'left',
				border: false,
				pickerShow: false,
				region: [
					{
						required: true,
						message: '请选择性别',
						trigger: 'change',
					}
				],
				model: {},
				list: [
					{
						value: '1',
						label: '男'
					},
					{
						value: '0',
						label: '女'
					}
				],
			}
		},
        onLoad(data) {
			this.userInfo = this.$store.state.userInfo
			this.model.sex = this.userInfo.sex == 1 ? '男' : '女';
        },
        onShow() {
        },
        onUnload() {
        },
        methods: {
			// 选择地区回调
			regionConfirm(e) {
				this.model.sex = e[0].label;
			}
		},
		onNavigationBarButtonTap(e) {
			// 向后端发送请求，修改用户性別
        var that = this;
        let data={
                id: that.userInfo.id,
                sex: that.model.sex == '男' ? 1 : 0
              }
			this.$H.patch('/zf/v1/user/attr',data,true).then(res=>{
						if(res.status&&res.code==200){
							uni.showToast({
								title: '修改成功',
								icon: 'none',
								duration: 2000
							})
							that.userInfo.sex=that.model.sex == '男' ? 1 : 0
							that.$store.commit('userInfo',that.userInfo)
							// 返回上一页
							setTimeout(() => {
								uni.navigateBack();
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