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
					<u-input v-model="otherReport" :type="typeStr" :border="border" :height="height" :auto-height="autoHeight" v-show="isOtherR"/>
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
			userId:{
				type:String|Number
			},
			reportId:{
				type:Number|String
			}
		},
		data(){
			return{
				reportShow:true,
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
				],
				
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
				console.log(this.userId)
				console.log(this.typeStr)
				if(!this.tipcontent) {
					this.$u.toast('请选择举报类型')
					return
				}
				let data={
					userId:this.userId,
					type:this.typeStr,
					typeId:this.reportId,
					content:this.tipcontent
				}
				this.$H.post('/zf/v1/tip/tips',data,true).then(res=>{
					if(res.status){
						this.$u.toast('举报成功')
					}
				})
				this.$emit('goReport')
			}
		}
	}
</script>

<style scoped lang="scss">
	.report_con{
		  width:100%;
		  padding: 35upx 60upx;
		  /deep/.u-radio{
			  width: 50%;
			  margin-bottom: 30upx;
		  }
	}
</style>