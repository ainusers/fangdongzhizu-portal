<template>
	<form @submit="formSubmit">
		<view class="flex-row">
			<u-radio-group v-model="value" >
				<u-radio 
							@change="checkTarget(index)" 
							v-for="(item, index) in list" :key="index" 
							:name="item.word"
				>
					{{item.word}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="middle">
			<textarea name="content" class="recordContent" maxlength="500" @input = "descInput($event)"
				placeholder="输入内容帮我们了解您的意见和建议" />
			<span class="wordwrap">{{number}}/500</span>
		</view>
		<view class="bottom">
			<view class="concact">
				<text class="way">请留下真实联系方式(邮箱，QQ,微信,手机号)，方便我们答疑解惑</text>
				<!-- <text class="communication">　注：手机号/微信/QQ</text> -->
			</view>
			<input name="contact" class="concactContent" placeholder="请留下任一联系方式" bindinput="userNameInput" />
		</view>
		<button form-type='submit' class="commit" type="primary" plain="true">
			<text class="commitContent">提交</text>
		</button>
	</form>
</template>

<script>
	import {htmlEncode} from '../../../../utils/utils.js'
	export default {
		data() {
			return {
				value:'',//建议反馈枚举
				number: 0, // 已输入字数
				contact: '', // 联系方式
				content: '', // 反馈内容
				list: [
					{
						"src": "/static/me/tools/quit.png",
						"word": "页面闪退",
						"color": "#f8f9fd",
						"wordColor": "#a5acc0",
						"check": false
					},
					{
						"src": "/static/me/tools/transform.png",
						"word": "传输问题",
						"color": "#f8f9fd",
						"wordColor": "#a5acc0",
						"check": false
					},
					{
						"src": "/static/me/tools/operation.png",
						"word": "操作体验",
						"color": "#f8f9fd",
						"wordColor": "#a5acc0",
						"check": false
					},
					{
						"src": "/static/me/tools/mei.png",
						"word": "界面审美",
						"color": "#f8f9fd",
						"wordColor": "#a5acc0",
						"check": false
					},
					{
						"src": "/static/me/tools/function.png",
						"word": "功能建议",
						"color": "#f8f9fd",
						"wordColor": "#a5acc0",
						"check": false
					},
					{
						"src": "/static/me/tools/other.png",
						"word": "其他反馈",
						"color": "#f8f9fd",
						"wordColor": "#a5acc0",
						"check": false
					}
				]
			}
		},
		onLoad() {},
		onShow() {},
		onUnload() {},
		methods: {
			checkTarget(index) {
				this.list.forEach(item=>{
					item.check=false
				})
				// 判断当前是否之选中一个反馈建议
				this.list[index].wordColor = this.list[index].wordColor == '#ffffff' ? '#a5acc0' : '#ffffff';
				this.list[index].color = this.list[index].color == '#f8f9fd' ? '#5199ff' : '#f8f9fd';
				this.list[index].check = this.list[index].check == false ? true : false;
				switch(index){
					case 0: 
						this.list[index].src = this.list[index].src == '/static/me/tools/quit.png' ? '/static/me/tools/quit-select.png' : '/static/me/tools/quit.png';;
					break;
					case 1: 
						this.list[index].src = this.list[index].src == '/static/me/tools/transform.png' ? '/static/me/tools/transform-select.png' : '/static/me/tools/transform.png';;
					break;
					case 2: 
						this.list[index].src = this.list[index].src == '/static/me/tools/operation.png' ? '/static/me/tools/operation-select.png' : '/static/me/tools/operation.png';;
					break;
					case 3: 
						this.list[index].src = this.list[index].src == '/static/me/tools/mei.png' ? '/static/me/tools/mei-select.png' : '/static/me/tools/mei.png';;
					break;
					case 4: 
						this.list[index].src = this.list[index].src == '/static/me/tools/function.png' ? '/static/me/tools/function-select.png' : '/static/me/tools/function.png';;
					break;
					case 5: 
						this.list[index].src = this.list[index].src == '/static/me/tools/other.png' ? '/static/me/tools/other-select.png' : '/static/me/tools/other.png';;
					break;
				}
			},
			// 用户反馈内容提交
			formSubmit(e) {
				let contact=e.detail.value.contact
				let words = this.list.filter(item => item.check == true).map(n => {
					let {word} = {...n};
					return {word}.word;
				});
				var regQQ = /^[1-9]\d{4,9}$/ //qq号
				var regPhone = /^1[358497]\d{9}$/;  //手机号
				var regWx = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;  //微信号
				var regEmail=/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
				console.log(words.toString())
				if(!words.toString()){
					uni.showToast({
						title: '请选择反馈建议',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if(contact&&!regQQ.test(contact)&&!regPhone.test(contact)&&!regWx.test(contact)&&!regEmail.test(regPhone)){
					uni.showToast({
						title: '请正确填写联系方式',
						icon: 'none',
						duration: 2000
					})
					return
				}else if(!contact){
					uni.showToast({
						title: '请添加联系方式',
						icon: 'none',
						duration: 2000
					})
					return
				}
				let data={
					type: words.toString(),
					content: htmlEncode(e.detail.value.content),
					contact: htmlEncode(e.detail.value.contact)
				}
				this.$H.post('/zf/v1/advise/advises',data,true).then(res=>{
					if(res.status){
							uni.showToast({
								title: '反馈建议已成功提交',
								icon: 'none',
								duration: 2000
							})
							// 返回上一页
							setTimeout(() => {
								uni.navigateBack({
								    delta: 1
								});
							},2000)		
					}
				})
			},
			// // 监听输入内容
			descInput(e) {
				this.number = e.detail.cursor
			}
		}
	}
</script>

<style lang="scss" scope>
	/* pages/record/record.wxss */
	/* 反馈选项 */
	.flex-row {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		padding:30upx;
	}
	/deep/.u-radio__label{
		margin-bottom: 10upx;
		font-size: 24upx;
		color: #333;
	}

	.flex-view-item {
		height: 80px;
		width: 30%;
		margin-top: 10px;
		background-color: #f8f9fd;
		border-radius: 15rpx;
	}

	.model {
		padding-left: 50rpx;
		padding-top: 10rpx;
	}

	.reasonImg {
		width: 80rpx;
		height: 80rpx;
		display: block;
		padding-left: 10px;
	}

	/* 反馈内容 */
	.middle {
		height: 36vh;
		width: 100%;
		position: relative;
	}

	.record {
		font-size: 16px;
		font-weight: 500;
		padding-bottom: 12rpx;
		padding-left: 10rpx;
	}

	.recordContent {
		width: 97%;
		height: 87%;
		border-radius: 20rpx;
		margin: 5px;
		font-size:24upx;
		padding:20upx;
		background:#f6f8f9;
	}

	.wordwrap {
		position: absolute;
		bottom:50upx;
		right: 10rpx;
	}

	/* 联系方式 */
	.bottom {
		height: 31.7vh;
		width: 100%;
	}

	.concact {
		font-size: 24upx;
		font-weight: 500;
		padding-bottom: 12rpx;
		padding-left: 10rpx;
	}

	.communication {
		font-size: 14px;
		color: #b9bece;
		padding-left: 10px;
	}

	.concactContent {
		margin: 4px 5px 0px 5px;
		height: 90rpx;
		background-color: #f8f9fd;
		border-radius: 20rpx;
		font-size:24upx;
		padding:10upx;
		padding-left: 20upx;
		font-size:#f6f8f9;
	}

	/* 按钮 */
	.commit {
		position: absolute;
		bottom:0;
		width:100%;
		border-radius: 0;
		background-color: #5199ff !important;
		&::after{
			border:none;
		}
	}

	.commitContent {
		color: #fff;
		border-radius: 30rpx;
	}
</style>
