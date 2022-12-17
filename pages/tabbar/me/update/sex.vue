<style>
    page{
        width: 100%;
        height: 100%;
		background-color: #f2f2f2;
    }
	.content {
		background-color: #fff;
	}
	.region {
		padding: 8px;
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
        onLoad() {
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
			console.log(this.model.sex);
			// 向后端发送请求，设置性别
		}
    }
</script>