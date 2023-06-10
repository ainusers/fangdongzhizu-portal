<style scoped>
	.map_item{
		margin-top: 20upx;
	}
</style>
<template>
	<view class="f_r_s map_item" @click="click()" >
		<map style="width: 100%; height: 284upx;" :scale="12" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				// latitude: 39.909,
				// longitude: 116.39742,
				// markers: [{
				// 	latitude: "",
				// 	longitude:"",
				// 	title:'乃东村',
				// 	iconPath: require('../../static/logo.png')
				// }]
			}
		},
		onLoad() {
			// this.init();
			console.log('titu')
			this.markers[0].latitude=this.latitude
			this.markers[0].longitude=this.longitude
			console.log(this.markers)
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
			init(){
				uni.getLocation({
					type: 'wgs84',
					isHighAccuracy:true,
					success:(res) => {
						if(res.errMsg=="getLocation:ok"){
							this.setMap(res)
						}
					}
				});
			},
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
								console.log('success');
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