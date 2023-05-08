<template>
	<view class="container" :class="{'active':active}">
		<u-cell-group v-if="InfoList.length>0">
			<block v-for="(item,index) in InfoList" :key="index">
				<u-cell-item :icon="item.data[item.data.length-1].otherAvatar || '../../../static/me/avtar.png'"  mode="circle" icon-size="100" :icon-style="iconStype" :title="item.data[0].from" :label='(item.data[item.data.length-1].msg.indexOf("url")!=-1)?"图片":item.data[item.data.length-1].msg' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"  :value="timestampToTime(item.data[0].datetime)" @click="goInfo(item)" v-if="item.data[0]" ></u-cell-item>
			</block>
		</u-cell-group>
		<view v-else class="noData">
			暂无消息!
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false,
				avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
				iconStype:{
					"margin-right":"15px",
					"border-radius":"50px",
					"width":'50px',
					"height":'50px',
					"overflow":"hidden"
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
				InfoList:[],
				newsmsg:''
				
			};
		},
		onLoad() {
			console.log('news')
			// uni.getStorage({
			// 	key:'chatList',
			// 	success(res){
			// 		that.InfoList=JSON.parse(res.data).reverse()
			// 	}
			// })
			// console.log(this.InfoList[0].data[0].msg)
		},
		onShow() {
			console.log('newshow')
			var that=this
			this.active = true;
			uni.getStorage({
				key:'chatList',
				success(res){
					console.log('res',res)
					that.InfoList=JSON.parse(res.data).reverse()
				}
			})
			console.log('InfoList',that.InfoList)
			// that.InfoList.forEach((item)=>{
			// 	console.log(item)
			// 	item.data.reverse()
			// })
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
			goInfo(info){
				console.log(info)
				 uni.navigateTo({
				            //保留当前页面，跳转到应用内的某个页面
				            url: '/pages/tabbar/community/tools/news?houseId='+info.houseId
				        })
			},
			 timestampToTime(timestamp) {
			  // 时间戳为10位需*1000，时间戳为13位不需乘1000
			  console.log(timestamp)
			  var date = new Date(Number(timestamp));
			  var Y = date.getFullYear() + "-";
			  var M =
			    (date.getMonth() + 1 < 10
			      ? "0" + (date.getMonth() + 1)
			      : date.getMonth() + 1) + "-";
			  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
			  var h = date.getHours() + ":";
			  var m = date.getMinutes() + ":";
			  var s = date.getSeconds();
			  return Y + M + D + h + m + s;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		>>>.u-cell__value{
			margin-top: -31px;
		}
		>>>.u-icon__img{
			border-radius: 50%;
		}
	}
	.noData{
		text-align: center;
		padding: 20upx 0;
		color: #aaa;
	}
	
</style>
