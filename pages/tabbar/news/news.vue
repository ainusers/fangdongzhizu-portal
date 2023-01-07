<template>
	<view class="container" :class="{'active':active}">
		<u-cell-group>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
				<u-cell-item icon="https://cdn.uviewui.com/uview/example/button.png" icon-size="100" :icon-style="iconStype" title="个人设置" label='消息信息' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"@click="goInfo" ></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false,
				avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
				iconStype:{
					"margin-right":"15px"
				},
				titStyle:{
					"font-weight":"bold",
					"color":"#333",
					"font-size":"16px"
				},
				lableStyle:{
					"color":"#333",
					"font-weight":"normal"
				}
			};
		},
		onLoad() {},
		onShow() {
			// setTimeout(() => {
			this.active = true;
			// }, 500);
		},
			
		onPullDownRefresh(){
			console.log('页面下拉数显了')
		},
		onReachBottom(){
			console.log('滚动到底部了')
		},
		onHide() {
			this.active = false;
		},
		methods: {
			goInfo(){
				console.log('点击跳转到消息页面')
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
