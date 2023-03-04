<template>
	<view class="screen_main">
		<u-input
		    placeholder="出发地铁站名称"
		    border="surround"
		    v-model="startValue"
		    @change="change"
		  ></u-input>
		  <img src="../../../static/home/toend.png" alt="" srcset=""/>
		  <u-input
		      placeholder="目的地铁站名称"
		      border="surround"
		      v-model="endValue"
		      @change="change"
		    ></u-input>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				startValue:'',
				endValue:''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.screen_main{
		display: flex;
		padding:10upx 20upx;
		align-items: center;
		// background: #fff;
		img{
			width:50upx;
			height: 30upx;
			margin: 0 10upx;
		}
	}
</style>