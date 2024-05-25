<template>
	<form>
		<view class="flex-row">
			<u-radio-group v-model="value" >
				<u-radio 
					@change="checkTarget(index)" 
					v-for="(item, index) in list" :key="index" 
					:name="item.word">
					{{item.word}}
				</u-radio>
			</u-radio-group>
		</view>
		<view class="middle">
			<textarea name="content" class="recordContent" maxlength="100" @input = "descInput($event)"
				placeholder="输入内容帮我们了解您的意见或建议" />
			<span class="wordwrap">{{number}}/100</span>
		</view>
		<view class="bottom">
			<view class="concact">
				<text class="way">请留下真实联系方式 (邮箱/QQ/微信/手机号)</text>
			</view>
			<input name="contact" class="concactContent" placeholder="请留下任一联系方式" bindinput="userNameInput" />
		</view>
		<view class="footer">
			<button @click="formSubmit" class="commit" type="primary" plain="true" @tap="$u.throttle(formSubmit, 3000)">提交</button>
		</view>
		<view class="reward_text">
			<view style="text-align: center;">
				———— 温馨提示 ————
			</view>
			<view>
				1、您的每一条建议，都是我们前进的动力
			</view>
			<view>
				2、期待您的宝贵反馈，共同完善这个app
			</view>
			<view>
				3、所有合理反馈都将纳入后续版本更新，敬请关注
			</view>
		</view>
	</form>
</template>

<script>
	import {htmlEncode,showToastTit} from '@/utils/utils.js'
	export default {
		data() {
			return {
				value:'',//建议反馈枚举
				number: 0, // 已输入字数
				contact: '', // 联系方式
				content: '', // 反馈内容
				list: [
					{"word": "页面闪退"},
					{"word": "程序崩溃"},
					{"word": "操作体验"},
					{"word": "界面审美"},
					{"word": "功能建议"},
					{"word": "其他反馈"}
				]
			}
		},
		methods: {
			// 判断当前是否之选中一个反馈建议
			checkTarget(index) {
				this.list.forEach(item=>{
					item.check=false
				})
				this.list[index].check = this.list[index].check == false ? true : false;
			},
			// 用户反馈内容提交
			formSubmit(e) {
				let words = this.list.filter(item => item.check == true).map(n => {
					let {word} = {...n};
					return {word}.word;
				});
				if(!words.toString()){
					showToastTit('请选择反馈类型')
					return
				}
				if(!e.detail.value.content){
					showToastTit('请输入意见或建议')
					return
				}
				if(!e.detail.value.contact){
					showToastTit('请添加联系方式')
					return
				}
				let data={
					username: this.$store.state.userInfo.username,
					type: words.toString(),
					content: htmlEncode(e.detail.value.content),
					contact: htmlEncode(e.detail.value.contact)
				}
				this.$H.post('/zf/v1/advise/advises',data,true).then(res=>{
					if(res.status){
						showToastTit( '反馈建议已成功提交')
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
	.footer {
	    margin: 20upx;
	}
	/* 反馈选项 */
	.flex-row {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		padding: 14px 10px 0px 10px;
	}
	/deep/.u-radio__label{
		margin-bottom: 10upx;
		font-size: 25upx;
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
		height: 35vh;
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
		height: 97%;
		border-radius: 20rpx;
		margin: 5px;
		font-size:26upx;
		padding:20upx;
		background:#f6f8f9;
		box-sizing: border-box;
	}
	.wordwrap {
		position: absolute;
		bottom: 32rpx;
		right: 32rpx;
	}
	/* 联系方式 */
	.bottom {
		height: 11vh;
		width: 100%;
	}
	.concact {
		font-size: 26upx;
		font-weight: 500;
		padding-bottom: 12rpx;
		padding-left: 20rpx;
	}
	.communication {
		font-size: 14px;
		color: #b9bece;
		padding-left: 10px;
	}
	.concactContent {
		width: 97%;
		margin: 4px 5px 0px 5px;
		height: 90rpx;
		background-color: #f8f9fd;
		border-radius: 20rpx;
		font-size: 26upx;
		padding:10upx;
		padding-left: 20upx;
		font-size:#f6f8f9;
		box-sizing: border-box;
	}
	/* 按钮 */
	.commit {
		width: 200px;
		border-radius: 10px;
	}
	.commitContent {
		color: #fff;
		border-radius: 30rpx;
	}
	.reward_text{
		font-size: 28rpx;
		width: 90%;
		margin: 0 auto;
		color: #AAAAAA;
		padding: 10px;
		view{
			margin-bottom: 11rpx;
			line-height: 150%;
		}
	}
</style>
