<template>
	<view class="container" :class="{'active':active}">
		<u-cell-group>
			<block v-for="(item,index) in InfoList" :key="index">
				<u-cell-item :icon="item.data[0].otherAvatar" icon-size="100" :icon-style="iconStype" :title="item.data[0].from" :label='item.data[0].msg' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"  value="星期一" @click="goInfo" v-if="item.data[0]"></u-cell-item>
			</block>
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
				},
				InfoList:[]
			};
		},
		onLoad() {
			var that=this
			uni.getStorage({
				key:'chatList',
				success(res){
					that.InfoList=JSON.parse(res.data)
				}
			})
			console.log(this.InfoList[0].data[0].msg)
		},
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
				 uni.navigateTo({
				            //保留当前页面，跳转到应用内的某个页面
				            url: '/pages/tabbar/community/tools/news'
				        })
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		>>>.u-cell__value{
			margin-top: -31px;
		}
	}
</style>
