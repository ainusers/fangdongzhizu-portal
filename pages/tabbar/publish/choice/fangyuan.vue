<style lang="scss" scoped>
	.region_new_title{
		font-size:28upx;
		font-weight:600;
		color:#101d36;
		padding-left: 26upx;
		box-sizing: border-box;
		margin-bottom: -10upx;
	}
	.fabuleixing{ 
		padding: 7px 7px 7px 15px;
	}
	.u-form-item{
		padding: 7px 15px 7px 12px;
	}
	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.uni-uploader__input-box{
		position: relative;
		margin: 4px;
		width: 99px;
		height: 99px;
		border: 1px solid #D9D9D9;
	}
	.uni-uploader__input-box {
		position: relative;
		margin:10upx;
		width: 208upx;
		height: 208upx;
		border: 2upx solid #D9D9D9;
	}
	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}
	.uni-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}
	.uni-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}
	.uni-uploader__input-box:active {
		border-color: #999999;
	}
	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}
	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.uni-uploader__file {
	    margin: 4px;
	    width: 100px;
	    height: 100px;
	}
	uni-image{
		width: 100px;
		height: 100px;
	}
	.footer {
		margin: 20upx;
	}
	
	.cell-pd {
		padding: 20upx 30upx;
	}
	textarea {
		border-bottom: 2px solid #f2f2f2;
		height: 130px;
		width: 100%;
	}
	.uni-list::before {
		height: 0;
	}
	.uni-list:after {
		height: 0;
	}
	.list-pd {
		margin-top: 0;
	}
	.close-view{
	    text-align: center;
		line-height:30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}
	.page {
		width: 100%;
		height: 100%;
	}
	.more_item {
		width:150upx;
		height:62upx;
		background:#f2f2f2;
		line-height:62upx;
		text-align:center;
		color:#101d36;
		border-radius:6upx;
		font-size:26upx;
	}
	.more_item_active{
		background:#ffd900;
	}
	.content{
		text-align: center;
		margin-top: 10%;
	}
	.confirm_con{
		text-align: center;
		padding:20upx 0;
		.confirm{
			width: 30%;
			margin-top: 10px;
		}
	}
	
	.select_btn{
		color: #ddd;
	}
</style>
<template>
	<view class="page" @touchstart="touchStart" @touchend="touchEnd">
		<form>
			<!-- 发布类型 -->
			<view class="region_new_title">发布类型</view>
			<u-radio-group class="fabuleixing" v-model="radio" @change="radioGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
				<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">{{ item.name }}</u-radio>
			</u-radio-group>
			
			<!-- 资质上传 -->
			<view class="region_new_title">资质上传</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 9">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 房源照片 -->
			<view class="region_new_title">房源照片</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 9">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 房屋位置 -->
			<view class="region_new_title">房屋位置</view>
			<u-form-item :label-position="labelPosition" label="所属区域 :" prop="region" label-width="150">
				<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
			</u-form-item>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
			<!-- 小区名称 -->
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="小区名称 :" prop="name">
				<u-input :border="border" placeholder="请输入小区名称" type="text"></u-input>
			</u-form-item>
			
			<!-- 房屋信息 -->
			<view class="region_new_title">房屋信息</view>
			<u-form-item :label-position="labelPosition" label="房屋布局 :" prop="region" label-width="150">
				<u-input :border="border" placeholder="请选择房屋结构" v-model="model.layout" type="select" @click="layoutShow = true"></u-input>
				<u-select :mode="mode" v-model="layoutShow" :list="layoutList" @confirm="layoutConfirm" @cancel="layoutCancel"></u-select>
			</u-form-item>
			<!-- 出租房屋 -->
			<u-form-item :label-position="labelPosition" label="出租房屋 :" prop="region" label-width="150">
				<u-input :border="border" placeholder="请选择房屋结构" v-model="model.lease" type="select" @click="leaseShow = true"></u-input>
				<u-select mode="mutil-column-auto" v-model="leaseShow" :list="leaseList" @confirm="leaseConfirm" @cancel="leaseCancel"></u-select>
			</u-form-item>
			<!-- 几室 -->
			<view class="" v-for="(item,index) in homeArr">
				<u-form-item :label-position="labelPosition" :label="item.name" prop="region" label-width="150" v-if="chekcNum!=0&&index<chekcNum">
					<u-input :border="border" placeholder="请填写房屋情况" v-model="item.tenantStr"  type="select"  @click="popUpShowFn('tenant',index)"></u-input>
				</u-form-item>
			</view>
			<!-- homeArr -->
			<!-- 供暖方式 -->
			<u-form-item :label-position="labelPosition" label="供暖方式 :" prop="region" label-width="150">
					<view v-for="(item, index) in heatList" :key="index" 
					:class="{ more_item_active:heatActiveVar == index }" @click="heatType(item, index)" class="more_item">
						{{ item }}
					</view>
			</u-form-item>
			<!-- 房屋面积 -->
			<u-form-item :label-position="labelPosition" label="房屋面积 :" prop="region" label-width="150">
					<u-input :border="border" placeholder="请输入平方数" type="text"></u-input>m²
			</u-form-item>
			<!-- 房屋朝向 -->
			<u-form-item :label-position="labelPosition" label="房屋朝向 :" prop="region" label-width="150">
				<u-input :border="border" placeholder="请选择房屋朝向" v-model="model.orientation" type="select" @click="orientationShow = true"></u-input>
				<u-select :mode="mode" v-model="orientationShow" :list="orientationList" @confirm="orientationConfirm" @cancel="orientationCancel"></u-select>
			</u-form-item>
			<!-- 有无电梯 -->
			<u-form-item :label-position="labelPosition" label="有无电梯 :" prop="region" label-width="150">
					<view v-for="(item, index) in elevatorList" :key="index" 
					:class="{ more_item_active:elevatorActiveVar == index }" @click="hasElevator(item, index)" class="more_item">
						{{ item }}
					</view>
			</u-form-item>
			<!-- 楼层位置 -->
			<u-form-item :label-position="labelPosition" label="楼层位置 :" prop="region" label-width="150">
				<u-input :border="border" placeholder="请输入楼层" type="text" @click="popUpShowFn('floor')" v-model="model.floor"></u-input>层
			</u-form-item>
			
			<!-- 费用详情 -->
			<view class="region_new_title">费用详情</view>
			<u-form-item :label-position="labelPosition" label="付款方式 :" prop="region" label-width="150">
				<view @click="showPicker('pay')" :class="[{'select_btn':currentObj['pay'].valueName.indexOf('请选择')!=-1}]">{{currentObj['pay'].valueName}}</view>
			<!-- 	<u-input :border="border" placeholder="请选择付款方式" v-model="model.pay" type="select" @click="payShow = true"></u-input> -->
				<!-- <u-select :mode="mode" v-model="payShow" :list="payList" @confirm="payConfirm" @cancel="payCancel"></u-select> -->
			</u-form-item>
			<!-- 月度租金 -->
			<u-form-item :label-position="labelPosition" label="月度租金 :" prop="region" label-width="150">
				<u-input :border="border" :type="Number" placeholder="请输入月度租金" type="text"></u-input>
			</u-form-item>
			<!-- 房屋押金 -->
			<u-form-item :label-position="labelPosition" label="房屋押金 :" prop="region" label-width="150">
				<u-input :border="border" :type="Number" placeholder="请输入房屋押金" type="text"></u-input>
			</u-form-item>
			<!-- 服务费用 -->
			<u-form-item :label-position="labelPosition" label="服务费用 :" prop="region" label-width="150">
				<u-input :border="border" :type="Number" placeholder="请输入服务费用" type="text"></u-input>
			</u-form-item>
			<!-- 中介费用 -->
			<u-form-item :label-position="labelPosition" label="中介费用 :" prop="region" label-width="150">
				<u-input :border="border" :type="Number" placeholder="请输入中介费用" type="text"></u-input>
			</u-form-item>
			<!-- 取暖费用 -->
			<u-form-item :label-position="labelPosition" label="取暖费用 :" prop="region" label-width="150">
				<view @click="showPicker('warm')" :class="[{'select_btn':currentObj['warm'].valueName.indexOf('请选择')!=-1}]">{{currentObj['warm'].valueName}}</view>
			</u-form-item>
			<!-- 无线费用 -->
			<u-form-item :label-position="labelPosition" label="无线费用 :" prop="region" label-width="150">
			<view @click="showPicker('wireless')" :class="[{'select_btn':currentObj['wireless'].valueName.indexOf('请选择')!=-1}]">{{currentObj['wireless'].valueName}}</view>
			</u-form-item>
			<!-- 物业费用 -->
			<u-form-item :label-position="labelPosition" label="物业费用 :" prop="region" label-width="150">
			<view @click="showPicker('property')" :class="[{'select_btn':currentObj['property'].valueName.indexOf('请选择')!=-1}]">{{currentObj['property'].valueName}}</view>
			</u-form-item>
			<!-- 水电费用 -->
			<u-form-item :label-position="labelPosition" label="水电费用 :" prop="region" label-width="150">
				<view @click="showPicker('hydropower')" :class="[{'select_btn':currentObj['hydropower'].valueName.indexOf('请选择')!=-1}]">{{currentObj['hydropower'].valueName}}</view>
			</u-form-item>
			<!-- 房源配置 -->
			<u-form-item :label-position="labelPosition" label="房源配置" label-width="150" prop="houseConfig">
				<u-checkbox-group @change="houseConfig" :width="radioCheckWidth" :wrap="false">
					<u-checkbox v-model="item.checked" v-for="(item, index) in houseConfigList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<!-- picker -->
			<u-picker mode="selector" v-model="selectShow"  :default-selector="[0]" :range="selectList" @confirm="ConfirmFn" @cancel="CancelFn" range-key="value"></u-picker>
			<!-- u-popup 弹窗 -->
			<u-popup border-radius="10" v-model="popUpShow"
					@close="close" @open="open" :mode="position" length="30%" :mask="mask"
					:closeable="closeable" :close-icon-pos="closeIconPos">
					<view class="content" v-if="floorShow">
						<view class="current">
							<view>当前楼层</view>
							<u-number-box :min="1" :max="100" v-model="currentValue" @change="currentChange"></u-number-box>
						</view>
						<view class="max">
							<view>最高楼层</view>
							<u-number-box :min="1" :max="100" v-model="maxValue" @change="maxChange"></u-number-box>
						</view>
					</view>
					<view v-if="tenantShow">
						<!-- 出租情况 -->
						<u-form-item :label-position="labelPosition" label="出租情况 :" prop="region" label-width="150">
							<view @click="showPicker('hire')" :class="[{'select_btn':currentObj['hire'].valueName.indexOf('请选择')!=-1}]">{{currentObj['hire'].valueName}}</view>
						</u-form-item>
						<!-- 性别 -->
						<u-form-item :label-position="labelPosition" label="性别 :" prop="region" label-width="150" v-if='currentObj["hire"].valueName=="已出租"'>
							<view @click="showPicker('sex')" :class="[{'select_btn':currentObj['sex'].valueName.indexOf('请选择')!=-1}]">{{currentObj['sex'].valueName}}</view>
						</u-form-item>
					<!-- 价钱 -->
						<u-form-item :label-position="labelPosition" label="价钱 :" prop="region" label-width="150" v-if='currentObj["hire"].valueName=="未出租"'>
							<u-input :border="border" :type="Number" placeholder="请输入出租价钱" type="text" v-model="tenantPrice"></u-input>元/月
						</u-form-item>
						<!-- 面积 -->
						<u-form-item :label-position="labelPosition" label="面积 :" prop="region" label-width="150" >
							<u-input :border="border" :type="Number" placeholder="请输入房屋面积" type="text" v-model="tenantArea"></u-input>m²
						</u-form-item>
						
					</view>
					<view class="confirm_con">
						<u-button size="mini" @click="confirmPopup" class="confirm">确认</u-button>
					</view>
					
			</u-popup>
			<view class="footer">
				<button type="default" class="feedback-submit" @click="publish">发布</button>
			</view>
		</form>
	</view>
</template>

<script>
	import image from '@/store/image.js';
	
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				homeNum:'', //当前一共有几间房
				rentNum:'',//当前出租几间
				chekcNum:0,//当前入住的有几位
				currentType:'',
				tenantObj:[],//每个租户的信息
				tenantStr:'',//租户A
				tenantArea:'',//入住房间面积
				tenantPrice:'',//未入住价格
				currentObj:{  //所有picker选中的内容
					warm:{
						valueName:'请选择取暖费用',
						valueCode:''
					},
					wireless:{
						valueName:'请选择无线费用',
						valueCode:''
					},
					property:{
						valueName:'请选择无线费用',
						valueCode:''
					},
					hydropower:{
						valueName:'请选择水电费用',
						valueCode:''
					},
					pay:{
						valueName:'请选择付款方式',
						valueCode:''
					},
					hire:{
						valueName:'请选择出租情况',
						valueCode:''
					},
					sex:{
						valueName:'请选择性别',
						valueCode:''
					}
				},
				//用于配置所有picker的数据
				listPickerConfig:{
					hire:[
						{
							value: '已出租',
							label: '已出租'
						},
						{
							value: '未出租',
							label: '未出租'
						}
					],
					sex:[
						{
							value: '男',
							label: '男'
						},
						{
							value: '女',
							label: '女'
						}
					]
				},
				popUpType:'', //当前展示的是什么pop弹窗
				houseTypeList:{	
				},
				homeArr:[
					{name:'A室',tenantStr:''},
					{name:'B室',tenantStr:''},
					{name:'C室',tenantStr:''},
					{name:'D室',tenantStr:''},
					{name:'E室',tenantStr:''},
				],
				homeArrIndex:'',//当前点击的是什么室
				// 发布类型
				labelPosition: 'left',
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				radio: '个人转租',
				radioList: [
					{
						name: '个人转租',
						checked: true,
						disabled: false
					},
					{
						name: '房东直租',
						checked: false,
						disabled: false
					},
					{
						name: '个人换租',
						checked: false,
						disabled: false
					}
				],
				rules: {
					payType: [
						{
							required: true,
							message: '请选择任意一种支付方式',
							trigger: 'change'
						}
					]
				},
				model: {
					payType: '支付宝',
					houseConfig: '',
				},
				selectShow:false,
				payTypeList:[
					{
						value: '租客支付',
						label: '租客支付'
					},
					{
						value: '房东支付',
						label: '房东支付'
					},
				],
				// 房屋位置
				border: false,
				pickerShow: false,
				region: [
					{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					}
				],
				// 房屋信息
				layoutShow: false,
				mode: 'mutil-column',
				selectList:[],
				layoutList: [
					[
						{
							value: '1',
							label: '一居室'
						},
						{
							value: '2',
							label: '两居室'
						},
						{
							value: '3',
							label: '三居室'
						},
						{
							value: '4',
							label: '四居室'
						},
						{
							value: '5',
							label: '五居室'
						}
					],
					[
						{
							value: '1客厅',
							label: '1客厅'
						},
						{
							value: '2客厅',
							label: '2客厅'
						},
						{
							value: '3客厅',
							label: '3客厅'
						}
					],
					[
						{
							value: '1厨房',
							label: '1厨房'
						},
						{
							value: '2厨房',
							label: '2厨房'
						},
						{
							value: '3厨房',
							label: '3厨房'
						}
					],
					[
						{
							value: '1卫生间',
							label: '1卫生间'
						},
						{
							value: '2卫生间',
							label: '2卫生间'
						},
						{
							value: '3卫生间',
							label: '3卫生间'
						}
					]
				],
				// 出租房屋
				leaseShow: false,
				leaseList: [
					{
						value: 1,
						label: '整租',
						children:
							[
								{}
								// {
								// 	value: 1,
								// 	label: '一居室',
								// 	children:[
								// 			{value: '',
								// 			label: ''}
								// 		]
								// },
								// {
								// 	value:2,
								// 	label: '两居室',
								// 	children:[
								// 		{
								// 			value: '',
								// 			label: '',
								// 		}
								// 	]
								// },
								// {
								// 	value: 3,
								// 	label: '三居室',
								// 	children:[
								// 		{
								// 			value: '',
								// 			label: '',
								// 		}
								// 	]
								// },	
								// {
								// 	value: 4,
								// 	label: '四居室',
								// 	children:[
								// 		{
								// 			value: '',
								// 			label: '',
								// 		}
								// 	]
								// },
								// {
								// 	value: 5,
								// 	label: '五居室',
								// 	children:[
								// 		{
								// 			value: '',
								// 			label: '',
								// 		}
								// 	]
								// }
							],
					},
					{
						value: 8,
						label: '合租',
						children: [
											
							{
								value: '1',
								label: '一居室',
								children:[
										// {
										// 	value: '主卧',
										// 	label: '主卧'
										// },
										// {
										// 	value: '次卧',
										// 	label: '次卧'
										// },
										// {
										// 	value: '单间',
										// 	label: '单间'
										// }
										]
							},
							{
								value: '2',
								label: '两居室',
								children:[
										// {
										// 	value: '主卧',
										// 	label: '主卧'
										// },
										// {
										// 	value: '次卧',
										// 	label: '次卧'
										// },
										// {
										// 	value: '单间',
										// 	label: '单间'
										// }
										]
							},
							{
								value: '3',
								label: '三居室',
								children:[
										// {
										// 	value: '主卧',
										// 	label: '主卧'
										// },
										// {
										// 	value: '次卧',
										// 	label: '次卧'
										// },
										// {
										// 	value: '单间',
										// 	label: '单间'
										// }
										]
							},
							{
								value: '4',
								label: '四居室',
								children:[
										// {
										// 	value: '主卧',
										// 	label: '主卧'
										// },
										// {
										// 	value: '次卧',
										// 	label: '次卧'
										// },
										// {
										// 	value: '单间',
										// 	label: '单间'
										// }
																			
										]
							},
							{
								value: '5',
								label: '五居室',
								children:[
										// {
										// 	value: '主卧',
										// 	label: '主卧'
										// },
										// {
										// 	value: '次卧',
										// 	label: '次卧'
										// },
										// {
										// 	value: '单间',
										// 	label: '单间'
										// }
										]
							}
						]
					}
				],
				// // 供暖方式
				heatActiveVar: 0, 
				heatList:[
					"集体供暖",
					"自供暖"
				],
				// 有无电梯
				elevatorActiveVar: 0, 
				elevatorList:[
					"有电梯",
					"无电梯"
				],
				// 房屋朝向
				orientationShow: false,
				orientationList: [
					[
						{
							value: '南',
							label: '南'
						},
						{
							value: '北',
							label: '北'
						},
						{
							value: '东',
							label: '东'
						},
						{
							value: '西',
							label: '西'
						},
						{
							value: '西北',
							label: '西北'
						},
						{
							value: '西南',
							label: '西南'
						},
						{
							value: '东北',
							label: '东北'
						},
						{
							value: '东南',
							label: '东南'
						}
					]
				],
				// 付款方式
				payShow: false,
				payList: [
						{
							value: '月付',
							label: '月付'
						},
						{
							value: '季付',
							label: '季付'
						},
						{
							value: '年付',
							label: '年付'
						}
				],
				
				// 房源配置
				houseConfigList: [
					{
						name: '洗衣机',
						checked: false,
						disabled: false
					},
					{
						name: '热水器',
						checked: false,
						disabled: false
					},
					{
						name: '天然气',
						checked: false,
						disabled: false
					},
					{
						name: '冰箱',
						checked: false,
						disabled: false
					},
					{
						name: '电视',
						checked: false,
						disabled: false
					},
					{
						name: '空调',
						checked: false,
						disabled: false
					},
					{
						name: '暖气',
						checked: false,
						disabled: false
					},
					{
						name: '无线网',
						checked: false,
						disabled: false
					},
					{
						name: '微波炉',
						checked: false,
						disabled: false
					},
					{
						name: '电磁炉',
						checked: false,
						disabled: false
					}
				],
				// 楼层位置
				floorShow: false, //楼层
				popUpShow:false,//底部弹窗显隐
				tenantShow:false, //房屋情况
				position: 'bottom',
				mask: true, // 是否显示遮罩
				closeable: true,
				closeIconPos: 'top-right',
				currentValue: 1,
				maxValue: 1,
				input_content:'',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				//侧滑返回
				startX: 0, //点击屏幕起始位置
				movedX: 0, //横向移动的距离
				endX: 0, //接触屏幕后移开时的位置
				isJoint:false
			}
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		methods: {
				//展示picker
			showPicker(type){
				this.selectShow=true
				this.currentType=type
				switch(type){ //费用支付方式
					case "warm":
					case "wireless":
					case "property":
					case "hydropower":
						this.selectList=this.payTypeList
					break;
					case "pay":
						this.selectList=this.payList
						console.log(this.selectList)
						break;
					case "hire":
					case "sex":
					this.popUpShow=false
					break;
				}
				this.selectList=this.listPickerConfig[type]
			},
			//点击确认picker 选择
			ConfirmFn(val){
				let name=this.currentType
				if(name=='hire' || name=='sex'){
					this.popUpShow=true
				}
				this.currentObj[name].valueName=this.selectList[val[0]].value
				this.currentObj[name].valueCode=this.selectList[val[0]].label	
			
			},
			popUpShowFn(type,index){
				this.popUpType=type
				this.popUpShow=true
				if(type=='tenant'){  //仅针对房屋情况
					this.tenantInit()
					this.homeArrIndex=index
				}
				this[type+'Show']=true
			},
			tenantInit(){
				this.currentObj['hire'].valueName='请选择出租情况'
				this.currentObj['hire'].valueCode=''
				this.currentObj['sex'].valueName='请选择性别'
				this.currentObj['sex'].valueCode=''
				this.tenantArea=''
				this.tenantPrice=''
			},
			CancelFn(){
				this.selectShow=false
			},
			
			// 发布类型选择发生变化
			radioGroupChange(e) {
				this.model.payType = e;
			},
			// 选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			// 房屋概况
			layoutConfirm(e) {
				let result = '';
				console.log(e)
				e.map((val, index) => {
					if(index==0){
						this.homeNum=val.value
					}
					result += result == '' ? val.label : '-' + val.label;
				})
				this.isJoint?this.chekcNum=Number(this.homeNum)-Number(this.rentNum):this.chekcNum=0
				this.model.layout = result;
			},
			layoutCancel(e) {
				console.log(e);
			},
			// 出租房屋
			leaseConfirm(e) {
				let result = '';
				console.log(e)
				e.map((val, index) => {
					//当前为合租
					if(index==0&&val.value==8){
						this.isJoint=true
					}
					if(index==1){
						this.rentNum=val.value
					}
					if(val.label) result += result == '' ? val.label : '-' + val.label;	
				})
				this.isJoint?this.chekcNum=Number(this.homeNum)-Number(this.rentNum):this.chekcNum=0
				this.model.lease = result;
				console.log(result)
			},
			leaseCancel(e) {
				console.log(e);
			},
			// 供暖方式
			heatType(item,index){
				this.heatActiveVar=index
		    },
			// 有无电梯
			hasElevator(item,index){
				this.elevatorActiveVar=index
		    },
			// 房屋朝向
			orientationConfirm(e) {
				let result = '';
				e.map((val, index) => {
					result += result == '' ? val.label : '-' + val.label;
				})
				this.model.orientation = result;
			},
			orientationCancel(e) {
				console.log(e);
			},
			// 付款方式
			payConfirm(e) {
				let result = '';
				e.map((val, index) => {
					result += result == '' ? val.label : '-' + val.label;
				})
				this.model.pay = result;
			},
			payCancel(e) {
				console.log(e);
			},
			// 房源配置
			houseConfig(e) {
				this.model.houseConfig = e;
			},
			//将所有的底部弹窗都隐藏
			popupinit(){
				this.popUpShow=false
				this.floorShow = false;
				this.tenantShow=false
			},
			// 楼层位置
			floorClick() {
				this.popupinit()
			},
			close() {},
			open() {},
			currentChange(e){
				this.currentValue = e.value;
			},
			maxChange(e){
				this.maxValue = e.value;
			},
			confirmPopup(e){
				switch(this.popUpType){
					case "floor":
						this.model.floor = this.currentValue + "/" + this.maxValue;
					break;
					case "tenant":
						let obj={
							hirecircum:this.currentObj['hire'].valueName,//出租情况
							sex:this.currentObj['sex'].valueName,
							area:this.tenantArea,
							price:this.tenantPrice,
						}
						let tenantStr=obj.hirecircum + '-'+(obj.sex.indexOf('请选择')==-1?obj.sex:obj.price+'元/月')+'-'+obj.area+'m²'
						this.tenantObj.push(obj)
						this.homeArr[this.homeArrIndex].tenantStr=tenantStr
					break;
				}
				
				this.popupinit()
			},
			async publish(){
				if (!this.input_content) {
					uni.showModal({ content: '内容不能为空', showCancel: false, });
					return;
				}
				uni.showLoading({title:'发布中'});
				setTimeout(function () {
					uni.hideLoading();
				}, 2000);
				var location = await this.getLocation();//位置信息,可删除,主要想记录一下异步转同步处理
				var images = [];
				for(var i = 0,len = this.imageList.length; i < len; i++){
					var image_obj = {name:'image-'+i,uri:this.imageList[i]};
					images.push(image_obj);
				}
				uni.uploadFile({//该上传仅为示例,可根据自己业务修改或封装,注意:统一上传可能会导致服务器压力过大
					url: 'moment/moments', //仅为示例，非真实的接口地址
					files:images,//有files时,会忽略filePath和name
					filePath: '',
					name: '',
					formData: {//后台以post方式接收
						'user_id':'1',//自己系统中的用户id
						'text': this.input_content,//moment文字部分
						'longitude':location.longitude,//经度
						'latitude':location.latitude//纬度
					},
					success: (uploadFileRes) => {
						uni.hideLoading();
						uni.showToast({
							icon:'success',
							title:"发布成功"
						})
						uni.navigateBack({//可根据实际情况使用其他路由方式
							delta:1
						});
					},
					fail: (e) => {
						console.log("e: " + JSON.stringify(e));
						uni.hideLoading();
						uni.showToast({
							icon:'none',
							title:"发布失败,请检查网络"
						})
					}
				});
			},
			getLocation(){//h5中可能不支持,自己选择
				return new Promise((resolve, reject) => {
					uni.getLocation({
						type: 'wgs84',
						success: function (res) {
							resolve(res);
						},
						fail: (e) => {  
							reject(e);
						}
					});
				} )
			},
			close(e){
			    this.imageList.splice(e,1);
			},
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						var compressd = cp_images=> {
							this.imageList = this.imageList.concat(cp_images)//压缩后的图片路径
						}
						image.compress(res.tempFilePaths,compressd);
						// #endif
						
						// #ifndef APP-PLUS
						this.imageList = this.imageList.concat(res.tempFilePaths)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						// #endif
						
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			touchStart: function(e) {
				this.startX = e.mp.changedTouches[0].pageX;
			},
			
			touchEnd: function(e) {
				this.endX = e.mp.changedTouches[0].pageX;
				if (this.endX - this.startX > 200) {
					uni.navigateBack();
				}
			}
		}
	}
</script>