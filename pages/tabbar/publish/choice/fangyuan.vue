

<style lang="scss" scoped>
	.required{
		color: #ef5350;
		display: inline;
	}
	/deep/.u-drawer-content{
		padding: 30upx;
	}
	//发布类型
	.Hometype_con{
		display: flex;
		justify-content: space-between;
		color:#333;
		.item{
			display: flex;
			align-items: center;
			justify-content: center;
			width:100%;
			height:135rpx;
			background: #f2f2f2;
			color: #333;
			margin-right: 34rpx;
			border-radius: 10rpx;
			font-size: 22rpx;
			&:last-child{
				margin-right: 0;
			}
		}
		.active{
			background: #5199ff;
			color: #fff;
		}
	}
	//弹窗
	.slot-content{
		width:100%;
		text-align: center;
		padding:30upx 0;
	}
	.u-checkbox{
		margin-bottom: 20upx;
	}
	.uni-list{
		padding-bottom: 40upx;
	}
	.region_new_title{
		font-size:28upx;
		font-weight:600;
		color:#101d36;
		padding-left: 26upx;
		box-sizing: border-box;
		border-left: 6rpx solid #5199ff;
		margin-top: 24upx;
	}
	.fabuleixing{ 
		padding: 7px 7px 7px 15px;
	}
	.u-form-item--right{
		position: relative;
		.uni-uploader-head{
			position: absolute;
			right:30upx;
			// bottom:10upx;
		}
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
		align-items: flex-start;
		justify-content: flex-start;
	}
	.uni-uploader__input-box{
		position: relative;
		margin: 4px 31upx 4px 0;
		width: 200upx;
		height: 200upx;
		border: 1px solid #D9D9D9;
		margin-bottom: 20upx;
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
	.uni-uploader-info{
		position: relative;
		right:0
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
	    margin: 4px 31upx;
	    width: 200upx;
	    height: 200upx;
		margin-left: 0;
	}
	uni-image{
		width: 200upx;
		height: 200upx;
	}
	.footer {
		margin: 20upx;
		display: flex;
		justify-content: space-around;
		.feedback-next{
			width:30%;
			background:#5199ff;
			color: #fff;
			border-radius: 50upx;
		}
		.feedback-pre{
			background: none;
			color: #5199ff;
			&:after{
				border:none
			}
		}
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
		padding: 24rpx;
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
		background:#5199ff;
		color: #fff;
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
		<u-form
		labelPosition="left"
		:model="houseModel"
		ref="form1"
		>
			<!-- 发布类型 -->
			<view class="Hometype_con">
				<view class="item" v-for ="(item,index) in radioList" :key="index" @click="radioGroupChange(index)" :class="[{'active':item.checked}]">
					{{ item.name }}
				</view>
			</view>
			<view class="step_1" v-show="stepNum==1||setpAll">
				<!-- 资质上传 -->
				<view class="region_new_title">资质上传</view>
				<u-form-item prop="naturalImageList" required  :border-bottom="false">
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<view class="uni-uploader__input-box" v-show="houseModel.naturalImageList.length < 9">
										<view class="uni-uploader__input" @tap="chooseImage('natural')"></view>
									</view>
									<block v-for="(image,index) in houseModel.naturalImageList" :key="index">
										<view class="uni-uploader__file" style="position: relative;">
											<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
											<view class="close-view" @click="deletImg(index,'natural')">×</view>
										</view>
									</block>
								</view>
							</view>
							<view class="uni-uploader-head">
								<view class="uni-uploader-title"></view>
								<view class="uni-uploader-info">{{houseModel.naturalImageList.length}}/9</view>
							</view>
						</view>
					</view>
				</view>
				</u-form-item>
	
				<!-- 房屋位置 -->
				<view class="region_new_title">您的房屋位置</view>
				<u-form-item :label-position="labelPosition"  prop="region1" label-width="150"  borderBottom required>
					<u-input :border="border" type="select" v-model="houseModel.region1" placeholder="请选择所属区域"   @click="pickerShow = true"></u-input>
				</u-form-item>
				<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
				<!-- 小区名称 -->
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150" :label-position="labelPosition" label="小区名称 :" prop="communityName" ref="item1" required>
					<u-input :border="border" placeholder="请输入小区名称" type="text" v-model="houseModel.communityName"></u-input>
				</u-form-item>
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="200" :label-position="labelPosition" label="具体房间号 :" prop="communityName" ref="item1" required>
					<u-input :border="border" placeholder="请输入具体房间号" type="text" v-model="houseModel.roomName"></u-input>
				</u-form-item>
			</view>
			
			<view class="step_2" v-show="stepNum==2 ||setpAll">
				<!-- 费用信息 -->
				<view class="region_new_title">您的房屋费用信息</view>
				<u-form-item :label-position="labelPosition" label="房屋布局 :" prop="layout" label-width="150">
					<u-input :border="border" placeholder="请选择房屋结构" v-model="houseModel.layout" type="select" @click="layoutShow = true"></u-input>
					<u-select :mode="mode" v-model="layoutShow" :list="layoutList" @confirm="layoutConfirm" @cancel="layoutCancel"></u-select>
				</u-form-item>
				<!-- 付款方式 -->
				<u-form-item :label-position="labelPosition" label="付款方式 :"  label-width="150" prop="payType" required>
					<view @click="showPicker('pay')" :class="[{'select_btn':currentObj['pay'].valueName.indexOf('请选择')!=-1}]">{{currentObj['pay'].valueName}}</view>
				</u-form-item>
				
				  <!-- 月度租金 -->
				  <u-form-item :label-position="labelPosition" label="房屋租金 :" prop="money" label-width="150" required>
				  	<u-input :border="border" :type="Number" placeholder="请输入房屋租金" type="text" v-model="houseModel.money"></u-input>
				  </u-form-item>
				  <!-- 房屋押金 -->
				  <u-form-item :label-position="labelPosition" label="房屋押金 :" prop="mortgageMoney" label-width="150">
				  	<u-input :border="border" :type="Number" placeholder="请输入房屋押金" type="text" v-model="houseModel.mortgageMoney"></u-input>
				  </u-form-item>
				  <!-- 服务费用 -->
				  <u-form-item :label-position="labelPosition" label="服务费用 :" prop="serviceMoney" label-width="150">
				  	<u-input :border="border" :type="Number" placeholder="请输入服务费用" type="text" v-model="houseModel.serviceMoney"></u-input>
				  </u-form-item>
				  <!-- 中介费用 -->
				  <u-form-item :label-position="labelPosition" label="中介费用 :" prop="proxyMoney" label-width="150">
				  	<u-input :border="border" :type="Number" placeholder="请输入中介费用" type="text" v-model="houseModel.proxyMoney"></u-input>
				  </u-form-item>
				  <!-- 取暖费用 -->
				  <u-form-item :label-position="labelPosition" label="取暖费用 :"  label-width="150" prop="warmType">
				  	<view @click="showPicker('warm')" :class="[{'select_btn':currentObj['warm'].valueName.indexOf('请选择')!=-1}]">{{currentObj['warm'].valueName}}</view>
				  </u-form-item>
				  <!-- 无线费用 -->
				  <u-form-item :label-position="labelPosition" label="无线费用 :"  label-width="150" prop="wirelessType">
				  <view @click="showPicker('wireless')" :class="[{'select_btn':currentObj['wireless'].valueName.indexOf('请选择')!=-1}]">{{currentObj['wireless'].valueName}}</view>
				  </u-form-item>
				  <!-- 物业费用 -->
				  <u-form-item :label-position="labelPosition" label="物业费用 :"  label-width="150" prop="propertyType">
				  <view @click="showPicker('property')" :class="[{'select_btn':currentObj['property'].valueName.indexOf('请选择')!=-1}]">{{currentObj['property'].valueName}}</view>
				  </u-form-item>
				  <!-- 水电费用 -->
				  <u-form-item :label-position="labelPosition" label="水电费用 :"  label-width="150" prop="hydropowerType">
				  	<view @click="showPicker('hydropower')" :class="[{'select_btn':currentObj['hydropower'].valueName.indexOf('请选择')!=-1}]">{{currentObj['hydropower'].valueName}}</view>
				  </u-form-item>
				  <!-- 供暖方式 -->
				  <u-form-item :label-position="labelPosition" label="供暖方式 :"  label-width="150">
				  		<view v-for="(item, index) in heatList" :key="index" 
				  		:class="{ more_item_active:heatActiveVar == index }" @click="heatTypeFn(item, index)" class="more_item">
				  			{{ item }}
				  		</view>
				  </u-form-item>
			</view>
			
			<view class="step_3" v-show="stepNum==3 || setpAll">
				<!-- 费用信息 -->
				<view class="region_new_title">您的房屋信息（必填项）</view>
				<!-- 出租房屋 -->
				<u-form-item :label-position="labelPosition" label="出租房屋 :" prop="lease" label-width="150">
					<u-input :border="border" placeholder="请选择房屋结构" v-model="houseModel.lease" type="select" @click="leaseShow = true"></u-input>
					<u-select mode="mutil-column-auto" v-model="leaseShow" :list="leaseList" @confirm="leaseConfirm" @cancel="leaseCancel"></u-select>
				</u-form-item>
				<!-- 几室 -->
				<view class="" v-for="(item,index) in houseModel.homeArr">
					<u-form-item :label-position="labelPosition" :label="item.name" prop="homeArr" label-width="150" v-if="houseModel.chekcNum!=0&&index<houseModel.chekcNum" >
						<u-input :border="border" placeholder="请填写房屋信息" v-model="item.tenantStr"  type="select"  @click="popUpShowFn('tenant',index)"></u-input>
					</u-form-item>
				</view>   
				<!-- 房屋朝向 -->
				<u-form-item :label-position="labelPosition" label="房屋朝向 :" prop="orientation" label-width="150">
					<u-input :border="border" placeholder="请选择房屋朝向" v-model="houseModel.orientation" type="select" @click="orientationShow = true"></u-input>
					<u-select :mode="mode" v-model="orientationShow" :list="orientationList" @confirm="orientationConfirm" @cancel="orientationCancel"></u-select>
				</u-form-item>
				<!-- 房屋面积 -->
				<u-form-item :label-position="labelPosition" label="房屋面积 :" prop="homesize" label-width="150">
						<u-input :border="border" placeholder="请输入平方数" type="text" v-model="houseModel.homesize"></u-input>m²
				</u-form-item>
				<!-- 有无电梯 -->
				<u-form-item :label-position="labelPosition" label="有无电梯 :"  label-width="150">
						<view v-for="(item, index) in elevatorList" :key="index" 
						:class="{ more_item_active:elevatorActiveVar == index }" @click="hasElevator(item, index)" class="more_item">
							{{ item }}
						</view>
				</u-form-item>
				<!-- 楼层位置 -->
				<u-form-item :label-position="labelPosition" label="楼层位置 :" prop="floor" label-width="150">
					<u-input :border="border" placeholder="请输入楼层" type="text" @click="popUpShowFn('floor')" v-model="houseModel.floor"></u-input>层
				</u-form-item>
				<!-- 房源照片 -->
				<view class="region_new_title">房源照片</view>
				<u-form-item prop="houseImageList" :border-bottom="false" required >
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<view class="uni-uploader__input-box" v-show="houseModel.houseImageList.length < 9">
										<view class="uni-uploader__input" @tap="chooseImage('house')"></view>
									</view>
									<block v-for="(image,index) in houseModel.houseImageList" :key="index">
										<view class="uni-uploader__file" style="position: relative;">
											<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
											<view class="close-view" @click="deletImg(index,'house')">×</view>
										</view>
									</block>
								</view>
							</view>
							<view class="uni-uploader-head">
								<view class="uni-uploader-title"></view>
								<view class="uni-uploader-info">{{houseModel.houseImageList.length}}/9</view>
							</view>
						</view>
					</view>
				</view>
				</u-form-item >
					<view class="region_new_title">房源设施</view>
				<!-- 房源配置 -->
				<u-form-item :label-position="labelPosition"  label-width="150" prop="houseConfigStr">
					<u-checkbox-group @change="houseConfig" :width="radioCheckWidth" :wrap="false">
						<u-checkbox v-model="item.checked" v-for="(item, index) in houseConfigList" :key="index" :name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
			</view>
			<!-- picker -->
			<u-picker mode="selector" v-model="selectShow"  :default-selector="[0]" :range="selectList" @confirm="ConfirmFn" @cancel="CancelFn" range-key="value"></u-picker>
			<!-- u-popup 弹窗 -->
			<u-popup border-radius="10" v-model="popUpShow"
					@close="close" @open="open" :mode="position" length="36%" :mask="mask"
					:closeable="closeable" :close-icon-pos="closeIconPos" :safe-area-inset-bottom="true">
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
						<u-form-item :label-position="labelPosition" label="出租情况 :" label-width="150">
							<view @click="showPicker('hire')" :class="[{'select_btn':currentObj['hire'].valueName.indexOf('请选择')!=-1}]">{{currentObj['hire'].valueName}}</view>
						</u-form-item>
						<!-- 性别 -->
						<u-form-item :label-position="labelPosition" label="性别 :"  label-width="150" v-if='currentObj["hire"].valueName=="已出租"'>
							<view @click="showPicker('sex')" :class="[{'select_btn':currentObj['sex'].valueName.indexOf('请选择')!=-1}]">{{currentObj['sex'].valueName}}</view>
						</u-form-item>
						<!-- 价钱 -->
						<u-form-item :label-position="labelPosition" label="价钱 :" label-width="150" v-if='currentObj["hire"].valueName=="未出租"'>
							<u-input :border="border" :type="Number" placeholder="请输入出租价钱" type="text" v-model="tenantPrice"></u-input>元/月
						</u-form-item>
						<!-- 面积 -->
						<u-form-item :label-position="labelPosition" label="面积 :"  label-width="150" >
							<u-input :border="border" :type="Number" placeholder="请输入房屋面积" type="text" v-model="tenantArea"></u-input>m²
						</u-form-item>
						
					</view>
					<view class="confirm_con">
						<u-button size="mini" @click="confirmPopup" class="confirm">确认</u-button>
					</view>
					
			</u-popup>
			<u-modal v-model="modalShow" :show-cancel-button="true" cancel-text="不保存" confirm-text="保存" @cancel="deleteHouseInfo" @confirm="saveBack">
						<view class="slot-content">
							{{content}}
						</view>
			</u-modal>
			<view class="footer">
				<button type="default" class="feedback-pre" @click="preStep" v-show="stepNum>1||setpAll">上一步</button>
				<button type="default" class="feedback-next" @click="nextStep" v-show="stepNum==1 || stepNum<3 ">下一步</button>
				<button type="default" class="feedback-pre" @click="showHouseInfo" v-show="stepNum==3&!setpAll">预览</button>
				<button type="default" class="feedback-next" @click="publish" v-show="setpAll">发布</button>
			</view>
		</u-form>
	</view>
</template>

<script>
import image from '@/store/image.js';
import { attachUpload } from '../../../../utils/utils';
	
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
	var that;
	export default {
		data() {
			return {
				modalShow:false,
				content:'是否保存为草稿',
				//from表单 model
				houseModel:{
					publishType:'1',				
					province:'', //省
					city:'',//市
					area:'',//区，县城
					communityName:'', //小区名称
					roomName:'',//房间号
					heatType:'集体供暖',//供暖方式
					homeArr:[
						{name:'A室',tenantStr:''},
						{name:'B室',tenantStr:''},
						{name:'C室',tenantStr:''},
						{name:'D室',tenantStr:''},
						{name:'E室',tenantStr:''},
					],
					homesize:'',
					money:'',//月度租金
					mortgageMoney:'',//押金
					serviceMoney:'',//服务费用
					proxyMoney:'',//中介费用
					houseImageList:[],
					naturalImageList:[],
					houseConfig: '',
					hasElevatorStr:'有电梯',
					roomType:'',//房屋类型
					region1:'' ,//所属区域
					payType:'',//付款方式
					warmType:'',//取暖费用
					wirelessType:'',//无线费用
					propertyType:'',//物业费用
					hydropowerType:'',//水电费用
					houseConfigStr:'',//房屋配置
					chekcNum:0,//当前入住的有几位
					
				},
				//表单规则
				rules:{
					naturalImageList:{
						type:'array',
						required: true,
						message: '请上传资质证明',
						trigger: ['change', 'blur']
					},
					houseImageList:{
						type:'array',
						required: true,
						message: '请上传房源证明',
						trigger: ['change', 'blur']
					},
					region1:[{
						required: true,
						message: '请选择所属区域',
						trigger: ['change', 'blur']
					}],
					communityName:{
						type: 'string',
						required: true,
						message: '请填写小区名称',
						trigger: ['change', 'blur']
					},
					roomName:{
						type:'string',
						required:true,
						message:'请填写房间号',
						trigger:['change','blur']
					},
					layout:{
						type: 'string',
						required: true,
						message: '请选择房屋布局',
						trigger: ['change', 'blur']
					},
					lease:{
						type:'string',
						required:true,
						message:'请选择出租房屋',
						trigger: ['change', 'blur']
					},
					homesize:{
						type:'string',
						required:true,
						message:'请填写房屋面积',
						trigger: ['change', 'blur']
					},
					homeArr:[
					    {
								type:'array',
								required: true, 
								message: '请输入手机号',
								trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								let isT=true
									value.forEach((item,index)=>{
										if(index<this.houseModel.chekcNum&&item.tenantStr==""&&this.houseModel.chekcNum==this.homeArrIndex){
											isT=false
										}
									})
								
									return isT;
							},
							message: '请填写房屋信息',
										// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
					orientation:{
						type:'string',
						required:true,
						message:'请选择房屋朝向',
						trigger: ['change', 'blur']
					},
					floor:{
						type:'string',
						required:true,
						message:'请选择楼层位置',
						trigger: ['change', 'blur']
					},
					payType: [
							{
							required: true,
							message: '请选择付款方式',
							trigger: ['change', 'blur']
							}
					],
					money:[
						{
							required: true,
							message: '请填写房屋租金',
							trigger: ['change', 'blur']
						}
					],
					mortgageMoney:{
						required: true,
						message: '请填写房屋租金',
						trigger: ['change', 'blur']
					},
					serviceMoney:{
						required: true,
						message: '请填写服务费用',
						trigger: ['change', 'blur']
					},
					proxyMoney:{
						required: true,
						message: '请填写中介费用',
						trigger: ['change', 'blur']
					},
					warmType:{
						required: true,
						message: '请选择取暖费用',
						trigger: ['change', 'blur']
					},
					wirelessType:{
						required: true,
						message: '请选择无线费用',
						trigger: ['change', 'blur']
					},
					propertyType:{
						required: true,
						message: '请选择物业费用',
						trigger: ['change', 'blur']
					},
					hydropowerType:{
						required: true,
						message: '请选择水电费用',
						trigger: ['change', 'blur']
					},
					houseConfigStr:{
						required: true,
						message: '请选择房屋配置',
						trigger: ['change', 'blur']
					},
					
				},
				userInfo:'',
				homeNum:'', //当前一共有几间房
				rentNum:'',//当前出租几间
				
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
					],
					pay: [
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
				},
				popUpType:'', //当前展示的是什么pop弹窗
				houseTypeList:{	
				},
				
				homeArrIndex:'',//当前点击的是什么室
				// 发布类型
				labelPosition: 'left',
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				radio: '个人转租',
				radioList: [
					{
						name: '我要转租',
						checked: true,
						disabled: false
					},
					{
						name: '我是房东',
						checked: false,
						disabled: false
					},
					// {
					// 	name: '个人换租',
					// 	checked: false,
					// 	disabled: false
					// }
				],
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
								{
									value: 1,
									label: '', //一居室
									children:[
											{value: '',
											label: ''}
										]
								},
								{
									value:2,
									label: '', //两居室
									children:[
										{
											value: '',
											label: '',
										}
									]
								},
								{
									value: 3,
									label: '',//三居室
									children:[
										{
											value: '',
											label: '',
										}
									]
								},	
								{
									value: 4,
									label: '',//四居室
									children:[
										{
											value: '',
											label: '',
										}
									]
								},
								{
									value: 5,
									label: '',//五居室
									children:[
										{
											value: '',
											label: '',
										}
									]
								}
							],
					},
					{
						value: 8,
						label: '合租',
						children: [
											
							{
								value: '1',
								label: '', //一居室
								children:[
										{
											value: '主卧',
											label: '主卧'
										},
										{
											value: '次卧',
											label: '次卧'
										},
										{
											value: '单间',
											label: '单间'
										}
										]
							},
							{
								value: '2',
								label: '', //两居室
								children:[
										{
											value: '主卧',
											label: '主卧'
										},
										{
											value: '次卧',
											label: '次卧'
										},
										{
											value: '单间',
											label: '单间'
										}
										]
							},
							{
								value: '3',
								label: '',//三居室
								children:[
										{
											value: '主卧',
											label: '主卧'
										},
										{
											value: '次卧',
											label: '次卧'
										},
										{
											value: '单间',
											label: '单间'
										}
										]
							},
							{
								value: '4',
								label: '', //四居室
								children:[
										{
											value: '主卧',
											label: '主卧'
										},
										{
											value: '次卧',
											label: '次卧'
										},
										{
											value: '单间',
											label: '单间'
										}
																			
										]
							},
							{
								value: '5',
								label: '', //五居室
								children:[
										{
											value: '主卧',
											label: '主卧'
										},
										{
											value: '次卧',
											label: '次卧'
										},
										{
											value: '单间',
											label: '单间'
										}
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
							value: '朝南',
							label: '朝南'
						},
						{
							value: '朝北',
							label: '朝北'
						},
						{
							value: '朝东',
							label: '朝东'
						},
						{
							value: '朝西',
							label: '朝西'
						},
						{
							value: '朝西北',
							label: '朝西北'
						},
						{
							value: '朝西南',
							label: '朝西南'
						},
						{
							value: '朝东北',
							label: '朝东北'
						},
						{
							value: '朝东南',
							label: '朝东南'
						}
					]
				],
				// 付款方式
				payShow: false,
				
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
				isJoint:false,
				isCheck:false,
				stepNum:1, //当前是第几步
				isDone:false, //当点击预览的时候才显示发布
				setpAll:false,//所有步骤都展示
				isPublish:false,
				isEdit:false,//当前是否为编辑房源
			}
		},
		onLoad(options){
			console.log(options)
			this.isEdit=options.isUpdate
			console.log(',isEdit',this.isEdit)
			that=this
			// 其他选项值
			uni.getStorage({
				key:'houseModel',
				success:function(data){
					that.houseModel=JSON.parse(data.data)
					if(that.houseModel.roomType=='整租'){
						that.houseModel.homeArr=[]
					}
					console.log('渲染数据',data.data)
					let newArr=that.houseModel.houseConfigStr.split(',')
					that.houseConfigList.forEach((item,index)=>{
						if(newArr.indexOf(item.name)!=-1){
							that.$nextTick(()=>{
								that.$set(that.houseConfigList[index],'checked',true)
							})
						}
					})
				}
			})
			//下拉选择值
			uni.getStorage({
				key:'currentObj',
				success:function(data){
					that.currentObj=data.data
					console.log('下拉选择',that.currentObj)
				}
			})
			//供暖方式
			uni.getStorage({
				key:'heatActiveVar',
				success:function(data){
					that.heatActiveVar=data.data
					console.log('供暖方式')
				}
			})
			//房源配置
			uni.getStorage({
				key:'houseConfigList',
				success:function(data){
					that.houseConfigList=data.data
					console.log('房源配置')
				}
			})
			this.userInfo=this.$store.state.userInfo
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		watch:{
			houseConfigList:{
				handler(newVal,oldVal){
					console.log(newVal)
					this.houseModel.houseConfigStr=''
					 for(let i=0;i<newVal.length;i++){
						 if(newVal[i].checked){
							 this.houseModel.houseConfigStr+=newVal[i].name+','
						 }
					 }
					 console.log(this.houseModel)
				},
				deep:true
			}
		},
		onBackPress(e){
			console.log(e)
			console.log('监听页面返回')
			this.modalShow=true
			return true
		},
		methods: {
			nextStep(){
				console.log('下一步')
				// if(this.houseModel.naturalImageList.length==0){
				// 	uni.$u.toast('请上传资质图片')
				// 	return
				// }
					
				// if(!this.houseModel.region1){
				// 	uni.$u.toast('请选择所属区域')
				// 	return
				// }
				// if(!this.houseModel.communityName){
				// 	uni.$u.toast('请填写小区名称')
				// 	return
				// }
				this.saveLocal()
				this.stepNum++
				this.setpAll=false
				console.log(this.stepNum)
			},
			saveLocal(){
				//保存信息到本地
				uni.setStorage({
					key:'houseModel',
					data:JSON.stringify(this.houseModel)
				})
				uni.setStorage({
					key:'currentObj',
					data:this.currentObj
				})
				uni.setStorage({
					key:'heatActiveVar',
					data:this.heatActiveVar
				})
				uni.setStorage({
					key:'houseConfigList',
					data:this.houseConfigList
				})
			},
			preStep(){
				this.stepNum--
				this.setpAll=false
				this.saveLocal()
			},
			showHouseInfo(){
				this.saveLocal()
				this.setpAll=true
			},
			deleteHouseInfo(){
				console.log('不保存草稿')
				uni.removeStorage({
					key:'houseModel'
				})
				uni.removeStorage({
					key:'currentObj'
				})
				uni.removeStorage({
					key:'houseConfigList'
				})
				uni.removeStorage({
					key:'heatActiveVar'
				})
				//返回首页
				uni.switchTab({
				        url: '/pages/tabbar/home/home'
				       })
			},
			saveBack(){
				console.log('保存草稿回到首页')
				// 返回首页
				uni.switchTab({
				        url: '/pages/tabbar/home/home'
				       })
			},
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
					case "hire":
					case "sex":
					this.popUpShow=false
					this.selectList=this.listPickerConfig[type]
					break;
					default:
					this.selectList=this.listPickerConfig[type]
				
					break;
				}
				
			},
			//点击确认picker 选择
			ConfirmFn(val){
				let name=this.currentType
				if(name=='hire' || name=='sex'){
					this.popUpShow=true
				}
				this.houseModel[name+'Type']=this.selectList[val[0]].value
				this.currentObj[name].valueName=this.selectList[val[0]].value
				this.currentObj[name].valueCode=this.selectList[val[0]].label	
				console.log(this.houseModel)
				if(this.isPublish){
					this.validateParam()
				}
				
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
			radioGroupChange(index) {
				console.log(index)
				this.radioList.forEach((item,key)=>{
					item.checked=false
					if(index==key){
						item.checked=true
					}
				})
				this.houseModel.publishType=index+1
			},
			// 选择地区回调
			regionConfirm(e) {
				this.houseModel.region1 = e.province.label + '-' + e.city.label + '-' + e.area.label;
				this.houseModel.province=e.province.label
				this.houseModel.city=e.city.label=='市辖区'?this.houseModel.province:e.city.label
				this.houseModel.area=e.area.label
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
				this.isJoint?this.houseModel.chekcNum=Number(this.homeNum)-1:this.houseModel.chekcNum=0
				this.houseModel.layout = result;
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
					if(index==2){
						this.houseModel.roomType=val.value
					}
					if(val.label) result += result == '' ? val.label : '-' + val.label;	
				})
				this.isJoint?this.houseModel.chekcNum=Number(this.homeNum)-Number(this.rentNum):this.houseModel.chekcNum=0
				this.houseModel.lease = result;
			},
			leaseCancel(e) {
				console.log(e);
			},
			// 供暖方式
			heatTypeFn(item,index){
				console.log(item)
				this.heatType=item
				this.heatActiveVar=index
		    },
			// 有无电梯
			hasElevator(item,index){
				console.log(item)
				this.houseModel.hasElevatorStr=item
				this.elevatorActiveVar=index
		    },
			// 房屋朝向
			orientationConfirm(e) {
				let result = '';
				e.map((val, index) => {
					result += result == '' ? val.label : '-' + val.label;
				})
				this.houseModel.orientation = result;
			},
			orientationCancel(e) {
				console.log(e);
			},
			// 房源配置
			houseConfig(e) {
				this.houseModel.houseConfig = e;
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
						this.houseModel.floor = this.currentValue + "/" + this.maxValue;
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
						this.houseModel.homeArr[this.homeArrIndex].tenantStr=tenantStr
					break;
				}
				
				this.popupinit()
			},
			async validateParam(){
				uni.setStorage({
					key:'houseModel',
					data:JSON.stringify(this.houseModel)
				})
				console.log('发布校验',this.houseModel)
				return new Promise((resolve,reject)=>{
					this.$refs.form1.validate().then(res => {
							if(res){
								resolve(true)
									this.isCheck=true
							}else{
								resolve(false)
								this.isCheck=false
							}
						})
				})
				
			},

			async publish(){
			 this.validateParam().then( async (res)=>{
									this.isPublish=true
									this.homeArrIndex=this.houseModel.chekcNum
									if(!this.isCheck){
										return
									}
									let imagesNatureArr=''
									let imagesHouseArr=''
									if(this.isEdit){
										 imagesNatureArr=this.houseModel.naturalImageList
										 imagesHouseArr=this.houseModel.houseImageList
									}else{
										 imagesNatureArr=await  attachUpload(this.houseModel.naturalImageList)
										 imagesHouseArr=await attachUpload(this.houseModel.houseImageList)
									}

									uni.showLoading({title:'发布中'});
									// var location = await this.getLocation();//位置信息,可删除,主要想记录一下异步转同步处理
						let params={
									 userId:this.userInfo.id,
									 imgUrl:imagesHouseArr.toString(), //房源图片
									 condition:imagesNatureArr.toString(),//资质图片
									 publishType:this.houseModel.publishType, //1 个人转租  2.房东直租  3.个人换租
									 province:this.houseModel.province,
									 city:this.houseModel.city,
									 area:this.houseModel.area,
									 communityName:this.houseModel.communityName,
									 roomName:this.houseModel.roomName,
									layout:this.houseModel.layout, //房屋布局
									 orientation:this.houseModel.orientation,
									 size:this.houseModel.homesize, //房屋面积
									 floor:this.houseModel.floor,
									 distanceSubway:'距离西二旗地铁站600米',
									 subway:'西二旗',
									 rentalHouse:this.houseModel.roomType,
									 payType:this.currentObj['pay'].valueName,
									 heatType:this.houseModel.heatType, //供暖方式
									 hasElevator:this.houseModel.hasElevatorStr,
									 money:this.houseModel.money, //月度租金
									 mortgageMoney:this.houseModel.mortgageMoney,//押金
									 serviceMoney:this.houseModel.serviceMoney,
									 proxyMoney:this.houseModel.proxyMoney,//代理
									 heatMoney:this.currentObj['warm'].valueName,//取暖费用
									 wifiMoney:this.currentObj['wireless'].valueName,//无线费用
									 manageMoney:this.currentObj['property'].valueName, //物业费用
									 waterElectricMoney:this.currentObj['hydropower'].valueName,
									 longitude:'1.1',
									 latitude:'1.3',
									 position:'北京动物园',
									 support:this.houseModel.houseConfigStr,
									 status:1,
									
					}
					 let roommate=[]
					 this.houseModel.homeArr.forEach(item=>{
						 if(item.tenantStr){
							 roommate.push(item)
						 }
					 })
					if( this.houseModel.lease ){//出租房屋
							params['roomType'] =this.houseModel.lease
							params['roommate']=roommate
						
					}
					let url='/zf/v1/room/increase'
					if(this.isEdit){
						url='/zf/v1/room/status'
						params['id']=this.houseModel.id
						params['status']=1
					}
					console.log('参数',params)
					this.$H.post(url,params,true).then(res=>{
						uni.hideLoading();
						if(res.data&&res.status){
							uni.$u.toast('发布成功')
							setTimeout(()=>{
								uni.switchTab({
								        url: '/pages/tabbar/home/home'
								       })
							},2000)
						}else{
							uni.$u.toast('发布失败')
						}
					})
				})
		
			
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
			deletImg(e,type){
				if(type=='natural'){
					this.houseModel.naturalImageList.splice(e,1);
				}else{
					 this.houseModel.houseImageList.splice(e,1);
				}
			   
			},
			chooseImage: async function(type) {
				this.chooseImageFn(type)
			},
			chooseImageFn:async function(type){
				let imageList=[]
				let count=0
				if(type=='natural'){
					imageList=this.houseModel.naturalImageList
					count=this.houseModel.naturalImageList.length + this.count[this.countIndex] > 9 ? 9 - this.houseModel.naturalImageList.length : this.count[this.countIndex]
				}else{
					imageList=this.houseModel.houseImageList
					count=this.houseModel.houseImageList.length + this.count[this.countIndex] > 9 ? 9 - this.houseModel.houseImageList.length : this.count[this.countIndex]
				}
				if (imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: count,
					success: (res) => {
						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						var compressd = cp_images=> {
							if(type=='natural'){
								this.houseModel.naturalImageList = this.houseModel.naturalImageList.concat(cp_images)//压缩后的图片路径
							}else{
								this.houseModel.houseImageList = this.houseModel.houseImageList.concat(cp_images)//压缩后的图片路径
							}
							
						}
						image.compress(res.tempFilePaths,compressd);
						// #endif
						
						// #ifndef APP-PLUS
						
						if(type=='natural'){
							this.houseModel.naturalImageList = this.houseModel.naturalImageList.concat(res.tempFilePaths)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						}else{
							this.houseModel.houseImageList = this.houseModel.houseImageList.concat(res.tempFilePaths)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						}
						// #endif
						if(this.isPublish){
							this.validateParam()
						}
						
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
			previewImage: function(e,type) {
				var current = e.target.dataset.src
				console.log(current)
				console.log(this.houseModel.naturalImageList)
				if(type=='natural'){
					uni.previewImage({
						current: current,
						urls: this.houseModel.naturalImageList
					})
				}else{
					uni.previewImage({
						current: current,
						urls: this.houseModel.houseImageList
					})
				}
				
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
		},
	onReady() {
			this.$refs.form1.setRules(this.rules);
		},
	}
</script>