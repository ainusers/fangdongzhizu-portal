<template>
	<view>
		<u-modal v-model="reportShow" title="请选择举报类型" :show-cancel-button="true" confirm-text="提交举报" cancel-text="再想想" @confirm="goReport" @cancel="cancelReport">
				<view class="report_con">
					<u-radio-group v-model="reportValue" @change="radioGroupChange" width="50%">
								<u-radio 
									v-for="(item, index) in reportList" :key="index" 
									:name="item.name"
									v-model="item.checked"
									:disabled="item.disabled"
								>
									{{item.name}}
								</u-radio>
					</u-radio-group>
					<u-input v-model="otherReport" :type="typeStr" :border="border" :height="height" :auto-height="autoHeight" v-if="isOtherR"/>
					<view class="hink">
						注：举报次数大于100次，将自动屏蔽该记录
					</view>
				</view>
			</u-modal> 
	</view>
</template>

<script>
	export default{
		props:{
			typeStr:{
				type:String
			},
			reportId:{
				type:Number|String
			}
		},
		data(){
			return{
				reportShow:false,
				isOtherR:false,
				type:'textarea',
				otherReport:'',
				border: true,
				reportValue:'',
				border: true,
				height: 100,
				autoHeight: true,
				reportList:[
					{
						name:'涉政有害',
						checked:false
					},
					{
						name:'违规违法',
						checked:false
					},
					{
						name:'垃圾广告',
						checked:false
					},
					{
						name:'色情低俗',
						checked:false
					},
					{
						name:'虚假房源',
						checked:false
					},
					{
						name:'涉嫌抄袭',
						checked:false
					},
					{
						name:'网络暴力',
						checked:false
					},
					{
						name:'其它',
						checked:false
					}
				]
			}
		},
		methods:{
			radioGroupChange(e){
				this.tipcontent=e
				if(e=='其它'){
					this.isOtherR=true
				}else{
					this.isOtherR=false
				}
			},
			cancelReport(){
				this.$emit('cancelReport')
			},
			goReport(){
				let statu=true
				if(!this.tipcontent) {
					this.$u.toast('请选择举报类型')
					statu=false
					return
				}
				let data={
					userId:this.$store.state.userInfo.id,
					type:this.typeStr,
					typeId:this.reportId,
					content:this.tipcontent
				}
				this.$H.post('/zf/v1/tip/tips',data,true).then(res=>{
					if(res.status){
						this.$u.toast('举报成功')
					}else{
						this.$u.toast(res.message)
					}
				})
				if(statu){
					this.$emit('goReport')
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.report_con{
		  width:100%;
		  padding: 35upx 60upx;
		  ::v-deep .u-radio{
			  width: 50%;
			  margin-bottom: 30upx;
		  }
	}
	.hink{
		font-size: 26upx;
		color: #aaa;
		margin: 15upx 0;
	}
</style>