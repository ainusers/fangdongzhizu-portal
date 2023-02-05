<template>
	<form @submit="formSubmit">
		<view class="flex-row">
			<block v-for="(item, index) in list" :key="index">
				<view class="flex-view-item" :style="{backgroundColor:item.color}">
					<view class="model" @click.stop="checkTarget(index)" >
						<image class="reasonImg" :src="item.src"></image>
						<text :style="{color: item.wordColor}">{{item.word}}</text>
					</view>
				</view>
			</block>
		</view>
		<view class="middle">
			<view class="record">我要反馈</view>
			<textarea name="content" class="recordContent" maxlength="500" @input = "descInput($event)"
				placeholder="您想说点什么?" />
			<span class="wordwrap">{{number}}/500</span>
		</view>
		<view class="bottom">
			<view class="concact">
				<text class="way">联系方式</text>
				<text class="communication">　注：手机号/微信/QQ</text>
			</view>
			<input name="contact" class="concactContent" placeholder="请留下任一联系方式" bindinput="userNameInput" />
		</view>
		<button form-type='submit' class="commit" type="primary" plain="true">
			<text class="commitContent">提交</text>
		</button>
	</form>
</template>

<script>
	export default {
		data() {
			return {
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
				let words = this.list.filter(item => item.check == true).map(n => {
					let {word} = {...n};
					return {word}.word;
				});
				uni.request({
					method: 'post',
					header: {
						'content-type': 'application/json',
						'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSMjQ2MjO3NDU2sjRU0lFKrShQsjI0Mzc2NjY0sDSsBQAkcQnqJgAAAA.xrwwffvn6-vek2iTmx6Cmt6sSbwWMLDf4Hducz83oWehPd6GrSTKmX0zYX_qAY4vcjA3T9_VXZhkM7EJe15J3Q'
					},
					data: {
						type: words.toString(),
						content: e.detail.value.content,
						contact: e.detail.value.contact
					},
					url: 'http://81.70.163.240:11001/zf/v1/advise/advises',
					success: (res) => {
						if(res.data.code == 200) {
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
					},
					fail: (e) => {
						console.log("e: " + JSON.stringify(e));
					}
				});
			},
			// // 监听输入内容
			descInput(e) {
				this.number = e.detail.cursor
			}
		}
	}
</script>

<style>
	/* pages/record/record.wxss */
	/* 反馈选项 */
	.flex-row {
		width: 100%;
		height: 26vh;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
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
	}

	.record {
		font-size: 16px;
		font-weight: 500;
		padding-bottom: 12rpx;
		padding-left: 10rpx;
	}

	.recordContent {
		background-color: #f8f9fd;
		width: 97%;
		height: 87%;
		border-radius: 20rpx;
		margin: 5px;
	}

	.wordwrap {
		position: absolute;
		top: 61vh;
		right: 10rpx;
	}

	/* 联系方式 */
	.bottom {
		height: 31.7vh;
		width: 100%;
	}

	.concact {
		font-size: 16px;
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
	}

	/* 按钮 */
	.commit {
		background-color: #2f7af1 !important;
	}

	.commitContent {
		color: #fff;
		border-radius: 30rpx;
	}
</style>
