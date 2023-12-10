<template>
	<view>
		<form report-submit @submit="formSubmit">
			<view>
				<view class="screen_view">
					<!-- 租房用这个 -->
					<view class="screen_list f_r_b">
						<view hover-class="none" form-type="submit" @click="screenBtn('region')"
							class="screen_item f_r_c">
							<view
								:style="{color: screenFormData.erHouse.region.show || screenFormData.erHouse.region.text != '区域' ? '#5199ff' : '#494949'}"
								class="screent_text f_c_c">{{areaName}}</view>
							<image :class="{screen_icon_active : screenFormData.erHouse.region.show}"
								class="screen_icon" :src="screenFormData.erHouse.region.show ? topIcon : downIcon">
							</image>
						</view>
						<view hover-class="none" form-type="submit" @click="screenBtn('price')"
							class="screen_item f_r_c">
							<view
								:style="{color: screenFormData.erHouse.price.show || screenFormData.erHouse.price.text != priceApiDataMap[from].defaultText ? '#5199ff' : '#494949'}"
								class="screent_text f_c_c">{{ screenFormData.erHouse.price.text }}</view>
							<image :class="{screen_icon_active: screenFormData.erHouse.price.show}" class="screen_icon"
								:src="screenFormData.erHouse.price.show ? topIcon : downIcon"></image>
						</view>
						<view hover-class="none" form-type="submit" @click="screenBtn('room')"
							class="screen_item f_r_c">
							<view
								:style="{color: screenFormData.erHouse.room.show || screenFormData.erHouse.room.text != '户型' ? '#5199ff' : '#494949'}"
								class="screent_text f_c_c">{{ screenFormData.erHouse.room.text }}</view>
							<image :class="{screen_icon_active: screenFormData.erHouse.room.show}" class="screen_icon"
								:src="screenFormData.erHouse.room.show ? topIcon : downIcon"></image>
						</view>
						<view hover-class="none" form-type="submit" @click="screenBtn('more')"
							class="screen_item f_r_c">
							<view
								:style="{color: screenFormData.erHouse.more.show || screenFormData.erHouse.more.text != '更多' ? '#5199ff' : '#494949'}"
								class="screent_text f_c_c">更多</view>
							<image :class="{screen_icon_active: screenFormData.erHouse.more.show}" class="screen_icon"
								:src="screenFormData.erHouse.more.show ? topIcon : downIcon"></image>
						</view>
					</view>
					<view @click="screenClose" :style="{height: fixedContHeight+'px', top: fixedTcTop}"
						class="screen_fixed_list" v-show="listTcShow">
						<!-- 区域 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'region'" class="region_list_view f_r_b">
							<scroll-view class="region_scroll_left" scroll-y>
								<block v-for="(item, index) in regionLeftList" :key="index">
									<view hover-class="none" form-type="submit"
										:class="{region_left_active: regionLeftIndex == index}"
										@click="regionLeftBtn(item, index)" class="region_list_item" v-if="index==0">
										{{ item.text }}</view>
									<view hover-class="none" form-type="submit"
										:class="{region_left_active: regionLeftIndex == index}"
										@click="regionLeftBtn(item, index)" class="region_list_item" v-if="index>0">
										{{ item.text }}</view>
								</block>
							</scroll-view>
							<scroll-view class="region_scroll_right" scroll-y>
								<block v-for="(item, index) in regionRightMap['region']" :key="index">
									<view hover-class="none" form-type="submit"
										:class="{screen_active: areaOrLineIndex == index}"
										@click="regionRightBtn(item, index,1)" class="region_list_item">
										{{ item.name || item.line }}</view>
								</block>
							</scroll-view>
							<!-- 地铁站名称 -->
							<scroll-view class="region_scroll_right" scroll-y v-if="stationData.length>0">
								<block v-for="(item, index) in stationData" :key="index">
									<view hover-class="none" form-type="submit"
										:class="{screen_active: stationIndex == index}"
										@click="regionRightBtn(item, index,2)" class="region_list_item">{{ item }}
									</view>
								</block>
							</scroll-view>
							<scroll-view class="region_scroll_right" scroll-y v-else="stationData.length==0">
								<block v-for="(item, index) in stationData" :key="index">
									<view hover-class="none" form-type="submit" class="region_list_item">{{ item }}
									</view>
								</block>
							</scroll-view>
						</view>
						<!-- 价格 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'price' && enterType != 'newHouse'"
							class="region_list_view f_r_b">
							<scroll-view class="scroll_view_list" scroll-y>
								<view class="region_new_title">价格区间（元/月）</view>
								<view class="region_new_cont f_r_s">
									<block v-for="(item, index) in roomPriceRange" :key="index">
										<view hover-class="none" form-type="submit"
											:class="{screen_active: item.text == priceItem.text}" v-if="item.id"
											@click="priceBtn(item.id,item.text,item.value, index)" class="region_new_list_item">{{ item.text }}
										</view>
									</block>
								</view>
							</scroll-view>
							<view class="room_new_btn_view">
								<view hover-class="none" form-type="submit" @click='priceReset()'>重置</view>
								<view hover-class="none" form-type="submit" @click="confirmPrice"
									class="price_bottom_confirm">确认</view>
							</view>
						</view>
						<!-- 户型 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'room'" class="region_list_view f_r_b">
							<scroll-view class="scroll_view_list" scroll-y>
								<view class="region_new_title">户型选择</view>
								<view class="region_new_cont f_r_s">
									<block v-for="(item, index) in roomList" :key="index">
										<view hover-class="none" form-type="submit"
											:class="{screen_active: item.text == roomItem.text}" v-if="item.id"
											@click="roomBtn(item, index)" class="region_new_list_item">{{ item.text }}
										</view>
									</block>
								</view>
							</scroll-view>
							<view class="room_new_btn_view">
								<view hover-class="none" form-type="submit" @click='roomReset()'>重置</view>
								<view hover-class="none" form-type="submit" @click='roomConfirm(roomItem, 0)'
									class="room_new_btn_confirm">确认</view>
							</view>
						</view>
						<!-- 更多 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'more'" class="region_list_view f_r_b">
							<scroll-view class="scroll_view_list" scroll-y>
								<view class="more_list_cont">
									<!-- 更多选项 -->
									<view v-for="(item,index) in moreType" :key="index">
										<view class="more_list">
											<view class="more_title">{{item.name}}</view>
											<view class="more_cont f_r_s">
												<block v-for="(item1, index1) in item.type" :key="index1">
													<view hover-class="none" form-type="submit"
														:class="{ more_item_active: index1 == item.currentIndex}"
														@click="sourceBtn(index,item1, index1)" class="more_item">
														{{ item1.text }}</view>
												</block>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="f_r_b more_btn_view">
								<view hover-class="none" form-type="submit" @click="resetBtn" class="resetBtn">重置</view>
								<view hover-class="none" form-type="submit" @click="confirmBtn" class="confirmBtn">确认</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import {constant} from "@/utils/constant.js";
	export default {
		props: ["screenFormData", "from", "regionLeftList", "regionRightMap", "enterType", "roomPriceRange", "roomList","fixedContHeight"],
		data() {
			return {
				areaName: '区域',
				downIcon:require('../../../static/home/filter_btn_nomal.png'),
				topIcon: require('../../../static/home/down-active.png'),
				listTcShow: false, //筛选框显示状态
				fixedTcTop: "80rpx", // 筛选条件距离顶部高度43px
				currentClickType: '',
				contHeight: "800rpx", // 筛选条件高度
				subwayline: 0,
				regionLeftIndex: 0,
				areaOrLineIndex: 0,
				stationIndex: 0,
				roomListIndex: 0,
				// 价格输入
				minPriceVal: "",
				maxPriceVal: "",
				roomItem: {
					text: "不限",
					id: ""
				},
				//更多type数组
				moreType: [{
						name: '租赁方式',
						type: constant.leaseType,
						currentIndex: -1,
						currentStr: ''
					},
					{
						name: '有无电梯',
						type: constant.noHas,
						currentIndex: -1,
						currentStr: ''
					},
					{
						name: '供暖方式',
						type: constant.heatingType,
						currentIndex: -1,
						currentStr: ''
					},
					{
						name: '房屋类型',
						type: constant.houseType,
						currentIndex: -1,
						currentStr: ''
					},
				],
				// 面积
				// areaLsit: constant.areaList,
				// areaLsitIndex: -1,
				stationData: [], //地铁站数据
				stationStr: '', //地铁站线
				// 价格列表的map
				priceApiDataMap: {
					"erHouse": {
						apiKey: "SALE_PRICE_DATA",
						unit: "万",
						defaultText: "价格"
					},
					"lease": {
						apiKey: "LEASE_PRICE_DATA",
						unit: "元",
						defaultText: "租金"
					},
					"newHouse": {
						apiKey: "NEW_HOUSE_PRICE",
						unit: "万",
						defaultText: "价格"
					},
					"apartment": {
						apiKey: "APARTMENT_PRICE_DATA",
						unit: "元",
						defaultText: "租金"
					},
				},
				priceItem: {
					id:'',
					text:'',
					val:''
				}
			}
		},
		onShow() {},
		mounted() {},
		onLoad() {},
		methods: {
			screenBtn(str) {
				if(this.currentClickType==str){
					this.listTcShow=this.listTcShow?false:true
				}else{
					this.listTcShow=true
				}
				this.currentClickType = str
			},
			// 点击外部空白区域，弹窗关闭
			screenClose() {
				this.listTcShow = false;
				let screenFormData = this.screenFormData;
				let enterType = this.enterType;
				let moreIds = ["source", "area"];
				for (let key in (screenFormData[enterType] || {})) {
					let item = screenFormData[enterType][key];
					if (key === "region") {
						if (item.text == '区域') {
							screenFormData[enterType][key].show = false;
						}
						continue;
					}
					if (key === "more") {
						uni.getStorage({
							key:'moreType',
							success: (res) => {
								this.moreType=res.data
								return
							}
						})
						if (this.screenFormData.erHouse.more.text == '更多') {
							this.moreScreenInit(key)
						}
						continue;
					}
					if (key == 'price') {
						uni.getStorage({
							key:'priceArea',
							success: (res) => {
								let priceArea=res.data
								this.minPriceVal=priceArea.minPriceVal
								this.maxPriceVal=priceArea.maxPriceVal
								screenFormData.erHouse.price.show=true
								this.priceItem.id=''
								this.priceItem.text=''
								this.priceItem.val=''
								screenFormData.erHouse.price.text =this.minPriceVal+'-'+this.maxPriceVal
								return
							}
						})
						uni.getStorage({
							key:'price',
							success: (res) => {
								this.priceItem=res.data
								screenFormData.erHouse.price.show=true
								 screenFormData.erHouse.price.text =this.priceItem.text	
								 return
							}
						})
						if (screenFormData[enterType].price.text == '价格') {
							screenFormData[enterType][key].show = false;
							this.priceItem.id=''
							this.priceItem.text=''
						}
					}
					if (key == 'room') {
						uni.getStorage({
							key:'roomItem',
							success: (res) => {
								this.roomItem=res.data
								screenFormData[enterType][key].show = true;
								screenFormData[this.enterType].room.text =this.roomItem.text
								return
							}
						})
						if (screenFormData[enterType].room.text == '户型' || screenFormData[enterType].room.text == '不限') {
							screenFormData[enterType].room.text='户型'
							screenFormData[enterType][key].show = false;
							this.roomListIndex = -1
							this.roomItem.id=''
							this.roomItem.text=''
						}
					}
				}
				this.screenFormData = screenFormData;
			},
			moreScreenInit(key) {
				let screenFormData = this.screenFormData;
				let enterType = this.enterType;
				screenFormData[enterType][key].show = false;
				this.moreType.forEach(item => {
					item.currentIndex = -1
					item.currentStr = ''
				})
			},
			// 选项卡点击事件
			screenContBtn() {},
			regionLeftBtn(item, index) {
				this.regionLeftIndex = index
				this.areaOrLineIndex = 0
				this.$emit('regionLeftBtn', item, index)
				setTimeout(() => {
					if (this.regionLeftIndex == 1) {
						this.$nextTick(() => {
							this.stationData = this.regionRightMap['region'][0].station ? this
								.regionRightMap['region'][0].station : []
						})
					} else {
						this.stationData = []
					}
				}, 100)
			},
			regionRightBtn(item, index, type) {
				// type  1区域  2 地铁站
				this.areaOrLineIndex = index
				let screenFormData = this.screenFormData
				if (item.line == '不限' || item.name == '不限') {
					this.areaName = '区域'
					screenFormData[this.enterType]['region'].show = false;
					screenFormData[this.enterType].region.text = '区域'
					this.stationIndex = -1
					this.$emit('regionRightBtn', '')
					return
				} else {
					screenFormData[this.enterType]['region'].show = true;
					screenFormData[this.enterType].region.text = '选中了'
				}
				// 当前点击的是地铁线路名称
				if (this.regionLeftIndex == 1 && item.line) { 
					this.stationData = this.regionRightMap['region'][index].station
					this.stationIndex = 0
					this.subwayline = index
				}
				//当前点击的是区域名称
				else if (this.regionLeftIndex == 0 && item.name) { 
					this.stationIndex = index
					this.areaOrLineIndex = index
					this.areaName = item.name || item
					this.$emit('regionRightBtn', item)
				}
				//当前点击的是地铁站名称
				else if (this.regionLeftIndex == 1 && type == 2) { 
					this.stationIndex = index
					this.areaOrLineIndex = this.subwayline
					this.areaName = item.name || item
					this.$emit('regionRightBtn', item)
				}
			},
			// 价格选项卡
			minPriceBlur(e) {
				this.screenFormData[this.enterType].price.text = '不限'
				this.minPriceVal = e.detail.value;
			},
			maxPriceBlur(e) {
				this.screenFormData[this.enterType].price.text = '不限'
				this.maxPriceVal = e.detail.value;
			},
			// 价格选择
			priceBtn(id,text,val, index, isInput = false) {
				if (!isInput) {
					this.minPriceVal = "";
					this.maxPriceVal = "";
				}
				this.priceItem.id=id
				this.priceItem.text=text
				this.priceItem.val=val
			},
			//更多提交
			confirmBtn() {
				let that=this
				let screenFormData = this.screenFormData;
				let enterType = this.enterType;
				screenFormData[enterType].more.show = false;
				let arr = []
				this.moreType.forEach((item, index) => {
					arr.push(item.currentStr)
				})
				let emArr = arr.filter(item => {
					return item == ''
				})
				if (arr.length != emArr.length) {
					screenFormData[enterType].more.text = "选中了 ";
					screenFormData[enterType]['more'].show = true;
				}
				uni.setStorage({
					key:'moreType',
					data:that.moreType
				})
				this.$emit('confirmBtn', arr)
			},
			//更多重置
			resetBtn() {
				let screenFormData = this.screenFormData;
				let enterType = this.enterType;
				screenFormData[enterType].more.text = '更多'
				screenFormData[enterType].more.isReset=true
				this.moreType.forEach(item => {
					item.currentIndex = -1
					item.currentStr = ''
				})
			},
			sourceBtn(fIndex, item, index) {
				let currentObj = this.moreType[fIndex]
				if(item.text==currentObj.currentStr){
					currentObj.preCurrentStr=currentObj.currentStr //记录上次点击的是谁
					currentObj.preIndex=index
					currentObj.currentIndex = -1
					currentObj.currentStr = ''	
				}else{
					currentObj.currentIndex = index
					currentObj.currentStr = item.text
				}
				
			},
			roomBtn(item, index) {
				this.roomListIndex = index
				this.roomItem = this.roomList[index]
			},
			//户型重置
			roomReset() {
				let screenFormData = this.screenFormData
				screenFormData[this.enterType].room.text = '户型'
				screenFormData[this.enterType].room.show = false
				this.roomListIndex = -1
				this.roomItem = {
					text: "不限",
					id: ""
				}
			},
			//户型确认
			roomConfirm(item, index) {
				let screenFormData = this.screenFormData
				if (item.id) {
					screenFormData[this.enterType]['room'].show = true;
				}
				uni.setStorage({
					key:'roomItem',
					data:this.roomItem
				})
				this.$emit('roomConfirm', item)
			},
			formSubmit() {},
			// 价格确认
			confirmPrice() {
				if (!this.minPriceVal && this.priceItem.text == '不限' || !this.maxPriceVal && this.priceItem.text == '不限') {
					uni.showToast({
						title: '请输入价格',
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				if (Number(this.minPriceVal) > Number(this.maxPriceVal)) {
					uni.$u.toast('最低价格不能大于最高价格')
					return;
				}
				let screenFormData = this.screenFormData;
				let val = this.priceItem.val
				let enterType = this.enterType;
				screenFormData[enterType].price.id = this.priceItem.id;
				screenFormData[enterType].price.show = false;
				screenFormData[enterType].price.text = this.priceItem.text;
				if (!this.priceItem.id) {
					screenFormData[enterType].price.text = this.priceApiDataMap[this.from].defaultText;
					uni.removeStorage({
						key:'price'
					})
					this.priceItem.id=''
					this.priceItem.text=''
				}
				this.screenFormData = screenFormData
				if (this.minPriceVal || this.maxPriceVal) {
					this.priceItem.id=''
					this.priceItem.text=''
					val = this.minPriceVal + '-' + this.maxPriceVal
					uni.setStorage({
						key:'priceArea',
						data:{
							minPriceVal:this.minPriceVal,
							maxPriceVal:this.maxPriceVal
						}
					})
					uni.removeStorage({
						key:'price'
					})
					uni.removeStorage({
						key:'priceArea'
					})
					screenFormData[this.enterType].price.text = this.minPriceVal + '-' + this.maxPriceVal
				}
				if (val || this.priceItem.id) {
					this.screenFormData[this.enterType]['price'].show = true;
				}
				if(this.priceItem.id){
					uni.setStorage({
						key:'price',
						data:this.priceItem
					})
					uni.removeStorage({
						key:'priceArea'
					})
				}
				this.$emit('confirmPrice', val)
			},
			priceReset() {
				let screenFormData = this.screenFormData
				screenFormData[this.enterType].price.show = false
				screenFormData[this.enterType].price.text = '价格'
				this.priceItem = {
					id: '',
					text: '',
					val:''
				}
				this.minPriceVal = ''
				this.maxPriceVal = ''
			}
		}
	}
</script>

<style lang="scss">
	/* 弹窗 */
	.screen_fixed_list {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 99999;
		font-size: 30upx;
	}

	/* #ifdef H5 */
	.screen_fixed_list {
		max-width: 640px;
		width: 100%;
		transform: translateX(-50%);
		left: 50%;
	}

	/* #endif */
	.region_list_view {
		height: 70%;
		background: #FFFFFF;
		width: 100%;
		position: relative;
	}

	.region_scroll_left {
		width: 300rpx;
		height: 100%;
		background: #FFFFFF;
		box-sizing: border-box;
	}

	.region_scroll_right {
		width: 36%;
		height: 100%;
		background: #F8F8F9;
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.scroll_view_list {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		box-sizing: border-box;
		position: relative;
	}

	.region_scroll_right .region_list_item {
		padding-left: 0;
	}

	.region_list_item {
		text-align: left;
		padding-left: 30upx;
		width: 100%;
		box-sizing: border-box;
		height: 100upx;
		line-height: 100upx;
		box-sizing: border-box;
		font-size: 30upx;
	}

	.screen_fixed_list .region_left_active {
		background: #fff;
		color: #5199ff;
	}

	.price_scroll_list .screen_active {
		color: #5199ff;
	}

	.region_scroll_right .screen_active {
		background: #F8F8F9;
		color: #5199ff;
	}

	.region_new_cont .screen_active {
		background: #5199ff;
		color: #FFFFFF;
	}

	.room_list_view {
		width: 100%;
	}

	/* 更多 */
	.more_list_cont {
		padding-left: 30upx;
		box-sizing: border-box;
		padding-bottom: 190upx;
	}

	.more_title {
		height: 90upx;
		line-height: 90upx;
		color: #2d2c2c;
		letter-spacing: 1upx;
		font-family: '黑体';
		font-size: 36upx;
		font-weight: 600;
	}

	.more_cont {
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
	}

	.more_item {
		width: 150upx;
		height: 62upx;
		background: #f2f2f2;
		line-height: 62upx;
		text-align: center;
		color: #101d36;
		border-radius: 6upx;
		font-size: 26upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		letter-spacing: 1px;
		box-sizing: border-box;
	}

	.more_list .more_item_active {
		background: #5199ff;
		color: #fff;
	}

	.more_btn_view {
		width: 100%;
		height: 156upx;
		position: absolute;
		bottom: 0;
		align-items: center;
		background: #ffffff;
		z-index: 99;
		padding: 0 39upx 0 39upx;
		box-sizing: border-box;
	}

	.more_btn_view view {
		width: 48%;
		height: 80upx;
		border-radius: 6upx;
		background: #f1f3f6;
		text-align: center;
		line-height: 85upx;
		font-size: 30upx;
		letter-spacing: 10upx;
		border-radius: 40upx;
	}

	.more_btn_view .confirmBtn {
		background-image: linear-gradient(246deg, #87d8f1 0%, #5199ff 100%), linear-gradient(#eeeff5, #eeeff5);
		color: #fff;
	}

	.screen_view {
		position: relative;
		height: 80upx;
		border-bottom: 1upx solid #f6f6f6;
		box-sizing: border-box;
		line-height: 80upx;
		
		.screen_list {
			width: 100%;
			height: 100%;

			.screen_item {
				width: 100%;
				height: 100%;
				position: relative;
				overflow: inherit;
			}

			.f_r_c {
				display: flex;
				flex-direction: row;
				justify-content: center;

				.screent_text {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
					font-size: 30upx;
					color: #494949;
					flex-shrink: 0;
				}

				.f_c_c {
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
			}

			.screen_item .screen_icon_active {
				width: 16upx;
				height: 10upx;
				margin: auto 10upx auto 15upx;
				flex-shrink: 0;
			}

			.screen_icon {
				width: 20upx;
				height: 18upx;
				margin: auto 10upx auto 11upx;
				flex-shrink: 0;
			}
		}

		.f_r_b {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	/* 新房价格切换 */
	.new_house_price_change_view {
		width: 28%;
		flex-shrink: 0;
		background: #FFFFFF;
	}

	.new_house_price_change_view>view {
		text-align: center;
		line-height: 100upx;
	}

	.new_house_price_change_view>.new_price_tab_active {
		color: #5199ff;
	}


	.screen_view .price_scroll_list {
		padding-bottom: 140upx;
		box-sizing: border-box;
	}

	.price_bottom_view {
		position: absolute;
		bottom: 160rpx;
		left: 0;
		height: 140upx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 40upx 0;
		background-color: #ffffff;
	}

	.price_bottom_view .price_input_val {
		width: 40%;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border: 1px solid #cccccc;
		border-radius: 6upx;
		font-size: 24upx;
		margin: auto 0;
	}

	.price_bottom_view .price_input_val:last-child {
		margin-left: 50upx;
	}

	.f_r_s {
		display: flex;
		flex-direction: row;
	}

	.region_list_item {
		border-bottom: 1px solid #ddd;
	}

	.price_bottom_confirm {
		width: 200upx;
		height: 74upx;
		background-image: linear-gradient(246deg, #87d8f1 0%, #5199ff 100%), linear-gradient(#eeeff5, #eeeff5) !important;
		border-radius: 37upx;
		color: #ffffff;
		font-size: 28upx;
		line-height: 74upx;
		text-align: center;
		margin: auto 0;
	}

	//户型筛选
	.region_new_title {
		font-size: 36upx;
		font-weight: 600;
		color: #101d36;
		margin-top: 20upx;
		padding-left: 30upx;
		box-sizing: border-box;
		margin-bottom: -10upx;
	}

	.region_new_list_item {
		min-width: 150upx;

		height: 62upx;
		background-color: #f2f2f2;
		border-radius: 6upx;
		float: left;
		margin-right: 23upx;
		text-align: center;
		line-height: 62upx;
		color: #101d36;
		font-size: 24upx;
		margin-top: 24upx;
		padding: 0 20rpx;
	}

	.region_new_cont {
		padding-left: 30upx;
		box-sizing: border-box;
		flex-wrap: wrap;
	}

	.room_new_btn_view {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 156upx;
		position: absolute;
		bottom: 0;
		align-items: center;
		background: #ffffff;
		z-index: 99;
		padding: 0 39upx 0 39upx;
		box-sizing: border-box;
	}

	.room_new_btn_view view,
	.room_new_btn_view view,
	.room_new_btn_view button {
		width: 48%;
		height: 80upx;
		border-radius: 40upx;
		background: #f1f3f6;
		text-align: center;
		line-height: 85upx;
		letter-spacing: 10upx;
		font-size: 30upx;
	}

	.room_new_btn_view .room_new_btn_confirm {
		background-image: linear-gradient(246deg, #87d8f1 0%, #5199ff 100%), linear-gradient(#eeeff5, #eeeff5);
		color: #fff;
	}
</style>
