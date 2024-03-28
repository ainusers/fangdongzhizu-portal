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
</style>
<template>
	<form report-submit>
		<view class="choose_city" :style="{height: pageHeight}">
			<scroll-view :scroll-with-animation="scrollAnimate" enable-back-to-top :scroll-into-view="scrollIntoId"
				class="choose_city_scroll" scroll-y>
				<view class="choose_city_cont">
					<view class='city_title'>当前定位城市 :</view>
					<view class="choose_title">
						<button form-type="submit" hover-class="none" class="gps_city f_r_s" @click="cityBtn(gpsCityInfo)">
								  {{ gpsCityInfo.cityName }}
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
				   		@click="showPickerArea"></u-input>
				   </u-form-item>
				   <!-- 适用全国 -->
				   <uPicker mode="region" v-model="pickerShow" @confirm="regionConfirm"></uPicker>
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
                gpsCityInfo: {
                    cityName: "定位中..",
                    cityId: "1"
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
				bindList:{}
			};
		},
        onLoad() {
			this.resetAddress(false);
        },
        onReady() {
        	this.getPhoneInfo();
        },
        methods: {
			showPickerArea() {
				if (this.setpAll) {
					return
				}
				this.pickerShow = true
			},
			// 选择地区回调
			regionConfirm(e) {
				let that = this;
				let	province=e.province.label
				let	city=e.city.label
				let	area=e.area.label
				this.position.city = city == '市辖区' ? province : city
				this.$store.commit('currentCity', this.position.city)
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
						that.gpsCityInfo.cityName=res.address.city
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
			cityBtn(item){
				this.$store.commit('currentCity',item.cityName)
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