<style scoped>
	.map_item{
		margin-top: 20upx;
	}
</style>
<template>
	<view class="f_r_s map_item" @click="click()" >
		<map style="width: 100%; height: 284upx;" :scale="15" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
			}
		},
		mounted(){
			console.log(this.markers)
		},
		
		onLoad() {
			this.markers[0].latitude=this.latitude
			this.markers[0].longitude=this.longitude
		},
		props: {
			list: {
				type: Array,
				default: []
			},
			latitude: {
				type: String,
				default: '0'
			},
			longitude: {
				type: String,
				default:  '0'
			},
			markers:{
				type:Array,
				default:[]
			}
		},
		methods: {
			click() {
				uni.getLocation({
					type: 'gcj02',
					isHighAccuracy:true,
					success: function (res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function () {
							}
						});
					}
				});
			},
			//设置地图坐标
			setMap(res){
				this.longitude = res.longitude
				this.latitude  = res.latitude
				this.markers[0].longitude =  res.longitude
				this.markers[0].latitude  =  res.latitude
			}
		}
	}
</script>