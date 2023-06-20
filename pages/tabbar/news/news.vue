<template>
	<view class="container" :class="{'active':active}">
		<u-cell-group v-if="InfoList.length>0">
			<block v-for="(item,index) in InfoList" :key="index">
				<u-cell-item :icon="item.fromAvatar || '../../../static/me/avtar.png'"  mode="circle" icon-size="100" :icon-style="iconStype" :title="item.fromName" :label='item.data[item.data.length-1].typename' :arrow="false" :title-style="titStyle"  :label-style="lableStyle"  :value="item.data[item.data.length-1].datetime" @click="goInfo(item)" v-if="item.data[0]" >
					 <u-badge :count="item.unReadCount" :absolute="true" slot="right-icon" v-if="item.unReadCount" :offset="offset"></u-badge>
				</u-cell-item>
			</block>
		</u-cell-group>
		<view v-else class="noData">
			暂无消息!
		</view>
	</view>
</template>

<script>
	let that=''
	import {initStorestate,setBarBadgeNum} from '../../../utils/utils.js'
	export default {
		data() {
			return {
				active: false,
				avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
				iconStype:{
					"margin-right":"15px",
					"border-radius":"50px",
					"width":'50px',
					"height":'50px',
					"overflow":"hidden"
				},
				titStyle:{
					"font-weight":"bold",
					"color":"#333",
					"font-size":"16px"
				},
				lableStyle:{
					"color":"#333",
					"font-weight":"normal"
				},
				InfoList:[],
				newsmsg:'',
				offset:[20,20]
				
			};
		},
		onLoad() {
			that=this
		},
		watch:{
			"$store.state.chatList":{
				handler:(val,oldval)=>{
					let tempVal=JSON.parse(JSON.stringify(val))
					console.log(tempVal)
					that.InfoList=tempVal.reverse()	
					console.log(that.InfoList)
					that.initData(that.InfoList)
				},
				deep:true
			}
		},
		onShow() {
			var that=this
			this.active = true;
			let chatList=JSON.parse(JSON.stringify(this.$store.state.chatList ))
			if(chatList.length==0){
				uni.getStorage({
					key:'chatList',
					success: (res) => {
						chatList=res.data
					}
				})
			}
			if(!Array.isArray(chatList)){
				chatList=JSON.parse(chatList)
			}
			that.InfoList=chatList.reverse()
			this.initData(that.InfoList)
		},
			
		onPullDownRefresh(){
			console.log('页面下拉数显了')
		},
		onReachBottom(){
			console.log('滚动到底部了')
		},
		onHide() {
			this.active = false;
		},
		methods: {
			initData(arr){
				arr.forEach(item=>{
					if(!item.fromName){
						item.fromName=this.$store.state.userInfo.nickname
						item.fromAvatar=this.$store.state.userInfo.avatar
					}
				})
			},
			goInfo(info){
				initStorestate()
				console.log(info)
				let count=info.unReadCount
				console.log(this.$store.state.unReadCount)
				console.log(count)
				let all =Number(this.$store.state.unReadCount)-count
				this.$store.commit('unReadCount',all)
				if(all>0){
					setBarBadgeNum(all)
				}else{
					uni.removeTabBarBadge({
						index:3
					})
				}
				let chatList=this.$store.state.chatList
				console.log(chatList)
				for(let i=0;i<chatList.length;i++){
					if(chatList[i].room==info.room){
						chatList[i].unReadCount=0
						break;
					}
				}
				this.$store.commit('chatList',chatList)
				 uni.navigateTo({
				 //            //保留当前页面，跳转到应用内的某个页面
				            url: '/pages/tabbar/community/tools/news?userId='+info.targetName+'&chatId='+info.room+'&isNewsList=1'
				        })
			},
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		>>>.u-cell__value{
			margin-top: -31px;
		}
		>>>.u-icon__img{
			border-radius: 50%;
		}
	}
	.noData{
		text-align: center;
		padding: 20upx 0;
		color: #aaa;
	}
	
</style>
