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
			this.userInfo = JSON.parse(decodeURIComponent(data.userInfo));
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
			console.log(this.model.region);
			// 向后端发送请求，设置性别
		}
    }
</script>