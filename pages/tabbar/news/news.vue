<template>
	<view class="container" :class="{'active':active}">
		<u-cell-group v-if="InfoList.length>0">
			<uni-swipe-action>
				<uni-list>
					<block v-for="(item,index) in InfoList" :key="index">
						 <uni-swipe-action-item :right-options="options"  @click="bindClick" @change="swipeChange($event, index)" :show="item.actionShow">
								<uni-list-chat :avatar-circle="true" :title="item.fromName" :avatar="item.fromAvatar || '../../../static/me/avtar.png'" :note="item.data[item.data.length-1].typename" :time="item.data[item.data.length-1].datetime" :show-badge="true" :badge-text="item.unReadCount" clickable   @click="goInfo(item)"></uni-list-chat>
							</uni-swipe-action-item>
					</block>
				</uni-list>
			</uni-swipe-action>
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
				options:[
					 {
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					 }
				],
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
				offset:[20,20],
				deleteIndex:0,
				deleteItem :0,
				actionShow:'none'
			};
		},
		onLoad() {
			that=this
		},
		watch:{
			"$store.state.chatList":{
				handler:(val,oldval)=>{
					setTimeout(function(){
						let tempVal=JSON.parse(JSON.stringify(val))
						console.log(tempVal)
						if(tempVal instanceof Array){
							that.InfoList=tempVal.reverse()
							console.log(that.InfoList)
							that.initData(that.InfoList)
						}
						
					},100)
					
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
			setTimeout(function(){
				uni.stopPullDownRefresh();
			},2000)
		},
		onReachBottom(){
			console.log('滚动到底部了')
		},
		onHide() {
			this.active = false;
		},
		methods: {
			initData(arr){
				console.log(arr)
				this.getHistory()
				arr.forEach(item=>{
					this.getHistory(item.room,item).then(res=>{
						if(res){
							item.data=item.data.concat(res)
						}
						
						if(!item.fromName){
							item.fromName=this.$store.state.userInfo.nickname
							item.fromAvatar=this.$store.state.userInfo.avatar
							
						}
					})
					
				})
			},
			bindClick(e){
				this.actionShow='none'
					let tempT=''
					tempT=setInterval(()=>{
						if(this.deleteItem){
							this.InfoList.splice(this.deleteIndex,1)
							clearInterval(tempT)
						}
					},500)
					
			},
			swipeChange(e,index){
				this.InfoList[index].actionShow=e
				if(e=='none'){
					this.deleteItem=1
				}else{
					this.deleteItem=0
				}
				this.deleteIndex=index
			},
			getHistory(roomId,item){
				return this.$H.get('/zf/v1/const/community/offline/msg',null,true).then(res=>{
					if(res.data.length>0){
						return res.data
					}	
				})
			},
			goInfo(info){
				initStorestate()
				let count=info.unReadCount
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
	.noData{
		text-align: center;
		padding: 20upx 0;
		color: #aaa;
	}
	
</style>
