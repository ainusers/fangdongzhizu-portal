<style lang="scss">
    page{
        width: 100%;
        height: 100%;
		background-color: #f7f7f7;
    }
	.content{
		height: 100%;
		background-color: #ffffff;
		border-radius: 10px;
		.top{
			display: flex;
			align-items: center;
			flex-direction: column;
			width:100%;
			height:40%;
			image{
				width:240rpx;
				height:240rpx;
				margin-bottom: 40rpx;
				margin-top:100rpx;
			}
		}
		.bottom{
			position: relative;
			display: flex;
			justify-content: center;
			width:100%;
			height: 60%;
			color: #aaa;
			.app_info{
				padding: 40rpx;
				.item{
					display: flex;
					justify-content: space-between;
					padding: 40rpx 0;
					border-bottom: 1px solid #f2f2f2;
				}
			}
			.text{
				width:100%;
				.txt{
					display: flex;
					justify-content: center;
					margin-bottom: 5rpx;
				}
				.txt1{
					text-align: center;
				}
			}
			.high{
				color: blue;
			}
			.txt_con{
				position: absolute;
				width: 100%;
				bottom:50rpx;
			}
		}
	}
	.slogan{
		color: #AAAAAA;
	}
	.mb20{
		margin-bottom: 20rpx;
	}
	.about_tit{
		font-size: 36upx;
	}
	.icon{
		display: inline-flex;
		align-items: center;
		width:15rpx;
		height:15rpx;
		background-color: red;
		border-radius: 50%;
		margin-left: 10rpx;
	}
</style>
<template>
	<view class="content">
		<view class="top">
			<image src="../../../../static/me/logo.png" mode=""></image>
			<view class="mb20 about_tit">
				房东直租
			</view>
			<view class="slogan">
				面对面交易，拒绝中间商
			</view>
		</view>
		<view class="bottom">
			<view class="text">
				<view class="app_info">
					<view class="item" @click="update">
						<view>
							版本号
						</view>
						<view>
							{{$store.state.version}}
							<view class="icon"  v-show="isShow"></view>
						</view>
					</view>
					<view class="item">
						<view>
							商务合作
						</view>
						<view>
							5730473@qq.com
						</view>
					</view>
				</view>
				<view class="txt_con">
					<view class="txt1">京ICP备2023028039号-2A</view>
					<view class="txt">
						<view class="high" @click="goto('/pages/tabbar/me/text/register')">《注册协议》</view>
						<view class="high" @click="goto('/pages/tabbar/me/text/privacy')">《隐私协议》</view>
						<view class="high" @click="goto('/pages/tabbar/me/text/server')">《用户协议》</view>
					</view>
					<view class="txt1">版权所有&nbsp;&nbsp;违法必究 </view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {getLatest,MycheckUpdate} from '@/utils/utils.js'
    export default {
        data() {
			return {
				isShow:false
			}
		},
        onLoad() {
			getLatest().then(res=>{
				if(res.version!=this.$store.state.version){
					this.isShow=true
				}
			})
		},
        methods: {
			goto(uri){
				uni.navigateTo({
					url: uri
				})
			},
			update(){
				if(this.isShow){
					MycheckUpdate(1)
				}
			}
		}
    }
</script>