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
							<view :style="{color: screenFormData.erHouse.price.show || screenFormData.erHouse.price.text != priceApiDataMap[from].defaultText ? '#5199ff' : '#494949'}"
								class="screent_text f_c_c">{{ screenFormData.erHouse.price.text }}</view>
							<image :class="{screen_icon_active: screenFormData.erHouse.price.show}"
								class="screen_icon" :src="screenFormData.erHouse.price.show ? topIcon : downIcon"></image>
						</view>
						<view hover-class="none" form-type="submit" @click="screenBtn('room')" class="screen_item f_r_c">
							<view :style="{color: screenFormData.erHouse.room.show || screenFormData.erHouse.room.text != '户型' ? '#5199ff' : '#494949'}"
								class="screent_text f_c_c">{{ screenFormData.erHouse.room.text }}</view>
							<image :class="{screen_icon_active: screenFormData.erHouse.room.show}"
								class="screen_icon" :src="screenFormData.erHouse.room.show ? topIcon : downIcon"></image>
						</view>
						<view hover-class="none" form-type="submit" @click="screenBtn('more')" class="screen_item f_r_c">
							<view :style="{color: screenFormData.erHouse.more.show || screenFormData.erHouse.more.text != '更多' ? '#5199ff' : '#494949'}"
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
										@click="regionLeftBtn(item, index)" class="region_list_item" v-if="index==0">{{ $store.state.currentCity}}</view>
									<view hover-class="none" form-type="submit" :class="{region_left_active: regionLeftIndex == index}"
										@click="regionLeftBtn(item, index)" class="region_list_item" v-if="index>0">{{ item.text }}</view>
								</block>
							</scroll-view>
							<scroll-view class="region_scroll_right" scroll-y>
								<block v-for="(item, index) in regionRightMap['region']" :key="index">
									<view hover-class="none" form-type="submit" :class="{screen_active: regionRightIndex == index}"
										@click="regionRightBtn(item, index)" class="region_list_item">{{ item.name ||item.line }}</view>
								</block>
							</scroll-view>
						</view>
						<!-- 价格 -->
						<view :style="{height: contHeight}" @click.stop="screenContBtn"
							v-if="currentClickType == 'price' && enterType != 'newHouse'" class="region_list_view f_r_b">
							<scroll-view class="scroll_view_list price_scroll_list"  v-if="erHousePriceList.length>0" scroll-y>
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
								<view hover-class="none" form-type="submit" @click='roomConfirm(roomItem, 0)' class="room_new_btn_confirm">确认</view>
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
	import { Const } from "@/utils/const/Const.js";
	export default {
		props:["screenFormData","priceApiDataMap","from","regionLeftList","regionRightMap","enterType","erHousePriceList","roomList"],
		data() {
			return {
				downIcon: "http://cdn.haofang.net/static/uuminiapp/pageNewUi/list/filter_btn_nomal.png",
				topIcon: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/newUiStyle/down-active.png",
				listTcShow:false,
				fixedContHeight: "100%", // 弹窗的高度
				fixedTcTop:  "173upx",   // 筛选条件距离顶部高度43px
				currentClickType:'',
				contHeight: "50%",   // 筛选条件高度
				regionLeftIndex: 0,
				regionRightIndex: 0,
				erHousePriceIndex: 99,
				roomListIndex: 0,
				// 价格输入
				minPriceVal: "",
				maxPriceVal: "",
				roomItem: {text:"不限", id: ""},
				// 来源
				sourceLsit: Const.sourceLsit,
				sourceLsitIndex: -1,
				// 面积
				areaLsit: Const.areaList,
				areaLsitIndex: -1,
			}
		},
		onShow(){
			console.log(this.regionRightMap)
			console.log(this.regionRightMap[region])
		},
		onLoad(){
			console.log('页面加载')
		},
		methods: {
			screenBtn(str){
					this.currentClickType=str
					this.listTcShow=true
			},
			// 点击外部空白区域，弹窗关闭
			screenClose() {
			    this.listTcShow = false;
			    let screenFormData = this.screenFormData;
			    let enterType = this.enterType;
			    let moreIds = ["source", "area"];
			    for(let key in (screenFormData[enterType] || {})) {
			        let item = screenFormData[enterType][key];
			        if(key === "region" && !item.rightId) {
			            screenFormData[enterType][key].show = false;
			            continue;
			        }
			        if(key === "more") {
			            let moreNotIdNum = 0;
			            for(let i = 0;i<moreIds.length;i++) {
			                if(!screenFormData[enterType][moreIds[i]].id) {
			                    moreNotIdNum++;
			                }
			            }
			            if(moreNotIdNum === moreIds.length) {
			                screenFormData[enterType][key].show = false;
			                screenFormData[enterType][key].text = "更多";
			            }
			            continue;
			        }
			        if(!item.rightId) {
			            screenFormData[enterType][key].show = false;
			        }
			    }
			    this.screenFormData = screenFormData;
			},
			// 选项卡点击事件
			screenContBtn() {},
			regionLeftBtn(item,index){
				this.regionLeftIndex=index
				this.$emit('regionLeftBtn',item,index)
			},
			regionRightBtn(item,index){
				this.regionRightIndex=index
				this.$emit('regionRightBtn',item,index)
			},
			roomBtn(item,index){
				this.roomListIndex=index
				this.$emit('roomBtn',item,index)
			},
			// 价格选项卡
			minPriceBlur(e) {
				this.minPriceVal = e.detail.value;
			},
			maxPriceBlur(e) {
				this.maxPriceVal = e.detail.value;
			},
			//选择价格
			priceBtn(item,index){
				this.erHousePriceIndex=index
				this.$emit('priceBtn',item,index)
			},
			confirmPrice(){
				this.$emit('confirmPrice',1)
			},
			confirmBtn(){
				this.$emit('confirmBtn',1)
			},
			resetBtn(){
				this.$emit('resetBtn',1)
			},
			areaBtn(item, index){
				this.areaLsitIndex=index
				this.$emit('areaBtn',1)
			},
			sourceBtn(item,index){
				this.sourceLsitIndex=index
				this.$emit('sourceBtn',item,index)
			},
			roomConfirm(item,index){
				this.$emit('roomConfirm',item)
			},
			formSubmit(){
				
			}
		}
	}
</script>

<style lang="scss">
	/* 弹窗 */
	.screen_fixed_list{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 99999;
		font-size: 30upx;
	}
	/* #ifdef H5 */
	.screen_fixed_list{
		max-width: 640px;
		width: 100%;
		transform: translateX(-50%);
		left: 50%;
	}
	
	/* #endif */
	.region_list_view{
		height: 70%;
		background: #FFFFFF;
		width: 100%;
		position: relative;
	}
	.region_scroll_left{
		width: 35%;
		height: 100%;
		background: #FFFFFF;
		box-sizing: border-box;
	}
	.region_scroll_right{
		width: 65%;
		height: 100%;
		background: #F8F8F9;
		padding-left: 30upx;
		box-sizing: border-box;
	}
	.scroll_view_list{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		box-sizing: border-box;
		position: relative;
	}
	.region_scroll_right .region_list_item{
		padding-left: 0;
	}
	.region_list_item{
		text-align: left;
		padding-left: 30upx;
		width:100%;
		box-sizing:border-box;
		height:100upx;
		line-height:100upx;
		box-sizing: border-box;
		font-size: 30upx;
	}
	.screen_fixed_list .region_left_active{
		background:#fff;
		color:#5199ff;
	}
	.price_scroll_list .screen_active{
		color:#5199ff;
	}
	.region_scroll_right .screen_active{
		background: #F8F8F9;
		// border: none;
		color:#5199ff;
	}
	.region_new_cont .screen_active{
		background: #ffd900;
	}
	.room_list_view{
		width: 100%;
	}
	/* 更多 */
	.more_list_cont{
		padding-left: 30upx;
		box-sizing: border-box;
		padding-bottom: 190upx;
	}
	.more_list{
	/* border-bottom:1px solid #f3f3f3; */
	}
	.more_title{
		height:90upx;
		line-height:90upx;
		color:#2d2c2c;
		letter-spacing:1upx;
		font-family:'黑体';
		font-size:36upx;
		font-weight:600;
	}
	.more_cont{
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
	}
	.more_item{
		width:150upx;
		height:62upx;
		background:#f2f2f2;
		line-height:62upx;
		text-align:center;
		color:#101d36;
		border-radius:6upx;
		font-size:26upx;
		margin-right:20upx;
		margin-bottom:20upx;
		letter-spacing:1px;
		box-sizing:border-box;
	}
	.more_list .more_item_active{
		background:#ffd900;
	}
	.more_btn_view{
		width:100%;
		height:156upx;
		position:absolute;
		bottom:0;
		align-items:center;
		background:#ffffff;
		z-index:99;
		padding:0 39upx 0 39upx;
		box-sizing:border-box;
	}
	.more_btn_view view{
		width:48%;
		height:80upx;
		border-radius:6upx;
		background:#f1f3f6;
		text-align:center;
		line-height:85upx;
		font-size:30upx;
		letter-spacing:10upx;
		border-radius:40upx;
	}
	.more_btn_view .confirmBtn{
		background:-webkit-linear-gradient(left, #ffd900 , rgb(255,84,0));
		color:#fff;
	}
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
/* 新房价格切换 */
.new_house_price_change_view{
	width: 28%;
	flex-shrink: 0;
	background: #FFFFFF;
}
.new_house_price_change_view>view{
	text-align: center;
	line-height: 100upx;
}
.new_house_price_change_view>.new_price_tab_active{
	color: #5199ff;
}


.screen_view .price_scroll_list{
	padding-bottom: 140upx;
	box-sizing: border-box;
}
.price_bottom_view{
	position:absolute;
	bottom: 0;
	left: 0;
	height:140upx;
	width:100%;
	box-sizing:border-box;
	padding:0 40upx 0;
	background-color:#ffffff;
}
.price_bottom_view .price_input_val{
	width:160upx;
	height:60upx;
	line-height: 60upx;
	text-align:center;
	border:1px solid #cccccc;
	border-radius:6upx;
	font-size:24upx;
	margin: auto 0;
}
.price_bottom_view .price_input_val:last-child{
	margin-left: 50upx;
}
.f_r_s {
	display: flex;
	flex-direction: row;
}
.region_list_item{
	border-bottom: 1px solid #ddd;
}
.price_bottom_confirm{
	width:200upx;
	height:74upx;
	background-image:linear-gradient(246deg, #87d8f1 0%, #5199ff 100%), linear-gradient( #eeeff5, #eeeff5);
	border-radius:37upx;
	color:#ffffff;
	font-size:28upx;
	line-height:74upx;
	text-align:center;
	margin: auto 0;
}
//户型筛选
.region_new_title{
	font-size:36upx;
	font-weight:600;
	color:#101d36;
	margin-top:20upx;
	padding-left: 30upx;
	box-sizing: border-box;
	margin-bottom: -10upx;
}
.region_new_list_item{
	width:150upx;
	height:62upx;
	background-color:#f2f2f2;
	border-radius:6upx;
	float:left;
	margin-right:23upx;
	text-align:center;
	line-height:62upx;
	color:#101d36;
	font-size:24upx;
	margin-top:24upx;
}
.region_new_cont{
	padding-left: 30upx;
	box-sizing: border-box;
	flex-wrap: wrap;
}
.room_new_btn_view{
	display:flex;
	justify-content:space-between;
	width:100%;
	height:156upx;
	position:absolute;
	bottom:0;
	align-items:center;
	background:#ffffff;
	z-index:99;
	padding:0 39upx 0 39upx;
	box-sizing:border-box;
}
.room_new_btn_view view, .room_new_btn_view view, .room_new_btn_view button{
	width:48%;
	height:80upx;
	border-radius:40upx;
	background:#f1f3f6;
	text-align:center;
	line-height:85upx;
	letter-spacing:10upx;
	font-size:30upx;
}
.room_new_btn_view .room_new_btn_confirm{
	background:-webkit-linear-gradient(left, #ffd900 , rgb(255,84,0));
	color:#fff;
}
</style>
