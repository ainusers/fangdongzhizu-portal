<template>
	<view>
		<form report-submit @submit="formSubmit">
			<view>
				<view class="screen_view">
					<!-- 租房用这个 -->
					<view class="screen_list f_r_b">
						<view hover-class="none" form-type="submit" @click="screenBtn('region')" class="screen_item f_r_c">
							<view :style="{color: screenFormData.erHouse.region.show || screenFormData.erHouse.region.text != '区域' ? '#ff5a1f' : '#494949'}"
								class="screent_text f_c_c">{{ screenFormData.erHouse.region.text }}</view>
							<image :class="{screen_icon_active : screenFormData.erHouse.region.show}"
								class="screen_icon" :src="screenFormData.erHouse.region.show ? topIcon : downIcon"></image>
						</view>
						<view hover-class="none" form-type="submit" @click="screenBtn('price')" class="screen_item f_r_c">
							<view :style="{color: screenFormData.erHouse.price.show || screenFormData.erHouse.price.text != priceApiDataMap[from].defaultText ? '#ff5a1f' : '#494949'}"
								class="screent_text f_c_c">{{ screenFormData.erHouse.price.text }}</view>
							<image :class="{screen_icon_active: screenFormData.erHouse.price.show}"
								class="screen_icon" :src="screenFormData.erHouse.price.show ? topIcon : downIcon"></image>
						</view>
						<view hover-class="none" form-type="submit" @click="screenBtn('room')" class="screen_item f_r_c">
							<view :style="{color: screenFormData.erHouse.room.show || screenFormData.erHouse.room.text != '户型' ? '#ff5a1f' : '#494949'}"
								class="screent_text f_c_c">{{ screenFormData.erHouse.room.text }}</view>
							<image :class="{screen_icon_active: screenFormData.erHouse.room.show}"
								class="screen_icon" :src="screenFormData.erHouse.room.show ? topIcon : downIcon"></image>
						</view>
						<view hover-class="none" form-type="submit" @click="screenBtn('more')" class="screen_item f_r_c">
							<view :style="{color: screenFormData.erHouse.more.show || screenFormData.erHouse.more.text != '更多' ? '#ff5a1f' : '#494949'}"
								class="screent_text f_c_c">{{ screenFormData.erHouse.more.text }}</view>
							<image :class="{screen_icon_active: screenFormData.erHouse.more.show}"
								class="screen_icon" :src="screenFormData.erHouse.more.show ? topIcon : downIcon"></image>
						</view>
					</view>
					<view @click="screenClose" :style="{height: fixedContHeight, top: fixedTcTop}"
						class="screen_fixed_list" v-if="listTcShow">
						<!-- 区域 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'region'" class="region_list_view f_r_b">
							<scroll-view class="region_scroll_left" scroll-y>
								<block v-for="(item, index) in regionLeftList" :key="index">
									<view hover-class="none" form-type="submit" :class="{region_left_active: regionLeftIndex == index}"
										@click="regionLeftBtn(item, index)" class="region_list_item">{{ item.text }}</view>
								</block>
							</scroll-view>
							<scroll-view class="region_scroll_right" scroll-y>
								<block v-for="(item, index) in regionRightMap[screenFormData[enterType].region.leftId]" :key="index">
									<view hover-class="none" form-type="submit" :class="{screen_active: regionRightIndex == index}"
										@click="regionRightBtn(item, index)" class="region_list_item">{{ item.text }}</view>
								</block>
							</scroll-view>
						</view>
						<!-- 价格 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'price' && enterType != 'newHouse'" class="region_list_view f_r_b">
							<scroll-view class="scroll_view_list price_scroll_list" scroll-y>
								<block v-for="(item, index) in erHousePriceList" :key="index">
									<view hover-class="none" form-type="submit" :class="{screen_active: erHousePriceIndex == index}"
										@click="priceBtn(item, index)" class="region_list_item">{{ item.text }}</view>
								</block>
							</scroll-view>
							<view class="price_bottom_view f_r_b">
								<view class="f_r_s">
									<input :value="minPriceVal" @blur="minPriceBlur" class="price_input_val" placeholder="最低价格" />
									<input :value="maxPriceVal" @blur="maxPriceBlur" class="price_input_val" placeholder="最高价格" />
								</view>
		
								<view hover-class="none" form-type="submit" @click="confirmPrice" class="price_bottom_confirm">确认</view>
							</view>
						</view>
						<!-- 户型 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'room'" class="region_list_view f_r_b">
							<scroll-view class="scroll_view_list" scroll-y>
								<view class="region_new_title">户型选择</view>
								<view class="region_new_cont f_r_s">
									<block v-for="(item, index) in roomList" :key="index">
										<view hover-class="none" form-type="submit" :class="{screen_active: roomListIndex == index}"
											v-if="item.id"
											@click="roomBtn(item, index)" class="region_new_list_item">{{ item.text }}</view>
									</block>
								</view>
							</scroll-view>
							<view class="room_new_btn_view">
								<view hover-class="none" form-type="submit" @click='roomBtn({text:"不限", id: ""}, 0)'>重置</view>
								<view hover-class="none" form-type="submit" @click='roomBtn(roomItem, 0)' class="room_new_btn_confirm">确认</view>
							</view>
						</view>
						<!-- 更多 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'more'" class="region_list_view f_r_b">
							<scroll-view class="scroll_view_list" scroll-y>
								<view class="more_list_cont">
									<!-- 来源 -->
									<view class="more_list">
										<view class="more_title">来源</view>
										<view class="more_cont f_r_s">
											<block v-for="(item, index) in sourceLsit" :key="index">
												<view hover-class="none" form-type="submit" :class="{ more_item_active: index == sourceLsitIndex }"
													@click="sourceBtn(item, index)"
													class="more_item">{{ item.text }}</view>
											</block>
										</view>
									</view>
									<!-- 面积 -->
									<view class="more_list">
										<view class="more_title">面积</view>
		
										<view class="more_cont f_r_s">
											<block v-for="(item, index) in areaLsit" :key="index">
												<view hover-class="none" form-type="submit" :class="{ more_item_active: index == areaLsitIndex }"
													@click="areaBtn(item, index)"
													class="more_item">{{ item.text }}</view>
											</block>
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
	export default {
		props:["screenFormData","listTcShow","priceApiDataMap","from","fixedContHeight","fixedTcTop","currentClickType","contHeight","regionLeftList","regionRightMap","enterType"],
		data() {
			return {
				downIcon: "http://cdn.haofang.net/static/uuminiapp/pageNewUi/list/filter_btn_nomal.png",
				topIcon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/newUiStyle/down-active.png",
			}
		},
		methods: {
			screenBtn(str){
				this.$emit('screenBtn',str)
			}
		}
	}
</script>

<style lang="scss">
.screen_view {
	height:80upx;
	border-bottom:1upx solid #f6f6f6;
	box-sizing: border-box;
	line-height: 80upx;
	.screen_list {
		width: 100%;
		height: 100%;
		.screen_item {
			width: 100%;
			height: 100%;
			position:relative;
			overflow: inherit;
		}
		.f_r_c{
			display: flex;
			flex-direction: row;
			justify-content: center;
			.screent_text{
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
				text-align:center;
				font-size:30upx;
				color:#494949;
				flex-shrink: 0;
			}
			.f_c_c {
			    display: flex;
			    flex-direction: column;
			    justify-content: center;
			}
		}
		.screen_item .screen_icon_active{
			width: 16upx;
			height: 10upx;
			margin: auto 10upx auto 15upx;
			flex-shrink: 0;
		}
		.screen_icon{
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
</style>
