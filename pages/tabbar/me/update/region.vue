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
		<u-form-item :label-position="labelPosition" label="所属区域 :" prop="region" label-width="150" class="region">
			<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
		</u-form-item>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
	</view>
</template>
<script>
    export default {
        data() {
			return {
				userInfo: '',
				// 房屋位置
				labelPosition: 'left',
				border: false,
				pickerShow: false,
				region: [
					{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					}
				],
				model: {
					payType: '支付宝',
					houseConfig: '',
				},
			}
		},
        onLoad(data) {
			this.userInfo = this.$store.state.userInfo
			this.model.region = this.userInfo.province;
        },
        onShow() {
        },
        onUnload() {
        },
        methods: {
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			}
		},
		onNavigationBarButtonTap(e) {
			// 向后端发送请求，设置地区
			var that = this;
			let data= {
				id: that.userInfo.id,
				province: that.model.region
			}
      this.$H.patch('/zf/v1/user/attr',data,true).then(res=>{
        			if(res.status&&res.code==200){
							uni.showToast({
								title: '修改成功',
								icon: 'none',
								duration: 2000
							})
							that.userInfo.province=that.model.region
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