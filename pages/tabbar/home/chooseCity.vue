<style lang="scss" scoped>
    .choose_city_cont{
        box-sizing: border-box;
    }
	.city_title{
		padding: 10px 10px 10px 15px;
	}
    .choose_title{
		display: flex;
		align-items: center;
        height:80upx;
        line-height:80upx;
        font-size:27upx;
        box-sizing: border-box;
    }
    .gps_city{
		width:186upx;
		height:60upx;
		line-height:60upx;
		font-size:27upx;
		letter-spacing:1upx;
		text-align:center;
        position:relative;
		border-radius:6upx;
        color:#0f0f0f;
		margin-left: 0px;
    }
	.dingwei{
		display: flex;
		flex-direction: row;
		padding-right: 35upx;
		.reset{
			height:60upx;
			line-height:60upx;
			font-size:27upx;
			letter-spacing:1upx;
			text-align:center;
		    position:relative;
			border-radius:6upx;
		    color:#0f0f0f;
		}
		.gps_icon{
		    width: 35upx;
		    height: 35upx;
			padding-top: 7px;
		}
	}
    .hot_city_item{
        margin-left: 33upx;
        width:186upx;
        height:60upx;
        line-height:60upx;
        font-size:27upx;
        letter-spacing:1upx;
        text-align:center;
        position:relative;
        border-radius:6upx;
        color:#0f0f0f;
		display: inline-block;
    }
	.choose_title{
		height:60upx;
		line-height:60upx;
		display: flex;
		align-items: center;
		height:80upx;
		line-height:80upx;
		font-size:27upx;
		margin-left: 33upx;
		box-sizing: border-box;
	}
</style>
<template>
	<form report-submit>
		<view class="choose_city" :style="{height: pageHeight}">
			<scroll-view :scroll-with-animation="scrollAnimate" enable-back-to-top :scroll-into-view="scrollIntoId"
				class="choose_city_scroll" scroll-y>
				<view class="choose_city_cont">
					<view class='city_title'>当前定位城市 :</view>
					<view class="choose_title">
						<button form-type="submit" hover-class="none" class="gps_city f_r_s" @click="chooseCity(gpsCityName)">
								  {{ gpsCityName.cityName }}
						</button>
						<view class="dingwei">
							<image class="gps_icon" src="@/static/home/position.svg"></image>
							<view class="reset"  @click="resetAddress(true)">
								重新定位
							</view>
						</view>
					</view>
					
				   <view class='city_title'>手动选择城市：</view>
				   <u-form-item label-position="left" prop="region" label-width="150" style="padding: 10px 15px" borderBottom >
				   <u-input :border="false" type="select" v-model="position.region" placeholder="请选择所属区域"
				   		@click="pickerShow = true"></u-input>
				   </u-form-item>
				   <uPicker mode="region" v-model="pickerShow" @confirm="regionConfirm"></uPicker>
				   
				   <view class="choose_title">热门城市：</view>
				   <view class="hot_city_list f_r_s">
					   <block v-for="(item, hotIndex) in hotCityList" :index="hotIndex" :key="hotIndex">
						   <button form-type="submit" hover-class="none" @click="chooseCity(item)"
								class="hot_city_item">{{ item.cityName }}</button>
					   </block>
				   </view>
				</view>
			</scroll-view>
		</view>
	</form>
</template>

<script>
	import uPicker from '@/components/common/u-picker.vue';
	import permision from "@/sdk/wa-permission/permission.js";
	export default {
		components: {
			uPicker
		},
		data() {
			return {
                scrollIntoId: "",
                gpsCityName: {
                    cityName: "定位中.."
                },
                pageHeight: "100%",
				pickerShow: false,
				position: {
					province: '', //省
					city: '', //市
					area: '', //区，县城
					region: '', //所属区域
				},
                scrollAnimate: true,
				hotCityList: [
					{ cityName: "北京市" },
					{ cityName: "上海市" },
					{ cityName: "广州市" },
					{ cityName: "深圳市" },
					{ cityName: "成都市" },
					{ cityName: "重庆市" },
					{ cityName: "杭州市" },
					{ cityName: "西安市" },
					{ cityName: "武汉市" },
					{ cityName: "苏州市" },
					{ cityName: "郑州市" },
					{ cityName: "南京市" },
					{ cityName: "天津市" },
					{ cityName: "长沙市" },
					{ cityName: "沈阳市" }
				],
			};
		},
        onLoad() {
			this.resetAddress(false);
        },
        onReady() {
        	this.getPhoneInfo();
        },
        methods: {
			// 选择地区回调
			regionConfirm(e) {
				let that = this;
				let	province=e.province.label
				let	city=e.city.label
				let	area=e.area.label
				this.position.city = city == '市辖区' ? province : city
				uni.navigateBack({
					delta: 1,
					success() {
						uni.$emit('chooseCity',{cityName: that.position.city})
					}
				});
			},
			async resetAddress(status){
				// 检查是否开启位置信息权限
                let result = await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION');
                if (result != 1) {
                    // 打开权限设置界面
                    permision.gotoAppPermissionSetting();
                } else {
                    //手机定位服务（GPS）已授权
                    this.getlocation(status);
                }
			},
            // 获取设备信息
            getPhoneInfo() {
                let res = uni.getSystemInfoSync();
                this.pageHeight = res.screenHeight + "px";
            },
			// 定位获取
			getlocation(status) {
				let that = this;
				uni.getLocation({
					type: 'gcj02',
					// isHighAccuracy:true,
					geocode: true,
					success: function (res) {
						that.gpsCityName.cityName=res.address.city
						//只有点击重新定位的时候出来
						if (status) {
							uni.showToast({
								title: "已更新定位",
								icon: 'none',
								duration: 2000
							})
						}
					},
					fail: (e) => {
						uni.showToast({
							title: "定位失败，未开启定位服务",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			changeTwoDecimal_f(num){
				return num.toFixed(2)
			},
			chooseCity(item){
				uni.navigateBack({
					delta: 1,
					success() {
						uni.$emit('chooseCity',{cityName: item.cityName})
					}
				});
			}
        }
	}
</script>