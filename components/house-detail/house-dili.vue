<template>
	<view style="margin-top: 20rpx;">
		<map style="width: 100%; height: 420rpx;" :scale="15" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
	</view>
</template>
<script>
	export default {
		onLoad() {
			this.markers[0].latitude=this.latitude
			this.markers[0].longitude=this.longitude
			this.markers[0].width=80
			this.markers[0].height=80
		},
		props: {
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
		}
	}
</script>