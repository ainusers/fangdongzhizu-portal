<style scoped>
	.pei_tao_she_shi{
		box-sizing: border-box;
		margin-top: 20upx;
		flex-direction: column;
	}
</style>
<template>
	<view class="f_r_s pei_tao_she_shi" @click="click()" >
		<map style="width: 100%; height: 200px;" :scale="12" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				markers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				}]
			}
		},
		onLoad() {
			this.init();
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		methods: {
			init(){
				uni.getLocation({
					type: 'wgs84',
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