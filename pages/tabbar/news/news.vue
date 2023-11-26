<template>
	<view class="container" :class="{'active':active}">
		<u-cell-group v-if="InfoList&&InfoList.length>0">
			<uni-swipe-action>
				<uni-list>
					<block v-for="(item,index) in InfoList" :key="index">
						<uni-swipe-action-item :right-options="options"  @click="bindClick" @change="swipeChange($event, index)" :show="item.actionShow">
							<uni-list-chat :avatar-circle="true" :title="item.fromName" :avatar="item.fromAvatar || '../../../static/me/avtar.png'" :note="item.data[item.data.length-1].typename" :time="item.data[item.data.length-1].datetime" :show-badge="true" :badge-text="item.unReadCount" clickable   @click="goChat(item)"></uni-list-chat>
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
	import {initStorestate,setBarUnreadCount} from '../../../utils/utils.js'
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
						if(tempVal instanceof Array){
							that.InfoList=tempVal.reverse()
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
			let chatList=''
			try{
				chatList=JSON.parse(JSON.stringify(this.$store.state.chatList ))
			}catch(e){
				console.log(e)
			}
			if(chatList.length==0){
				uni.getStorage({
					key:'chatList',
					success: (res) => {
						chatList=res.data
					}
				})
			}
			if(!Array.isArray(chatList)){
				try{
					chatList=JSON.parse(chatList)
				}catch(e){
					console.log(e)
				}
			}
			that.InfoList=chatList.reverse()
			this.initData(that.InfoList)
		},
		onHide() {
			this.active = false;
		},
		methods: {
			// 初始化会话列表
			initData(arr){
				this.InfoList =arr.filter(item=>{
					return item.currentName==this.$store.state.userInfo.username
				})
				let narr=this.InfoList
				narr.forEach(item=>{
					if(!item.fromName){
						item.fromName=this.$store.state.userInfo.nickname
						item.fromAvatar=this.$store.state.userInfo.avatar
						
					}
				})
			},
			//删除消息
			bindClick(e){
				this.actionShow='none'
				let tempT=''
				tempT=setInterval(()=>{
					if(this.deleteItem){
						this.InfoList.splice(this.deleteIndex,1)
						let chatList=this.InfoList.reverse()
						this.$store.commit('chatList',chatList)
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
			// 进入消息聊天页面
			goChat(info){
				this.$store.commit('currentChatList',info)
				initStorestate()
				let count=info.unReadCount
				let all = Number(this.$store.state.unReadCount)-count
				this.$store.commit('unReadCount',all)
				if(all>0){
					setBarUnreadCount()
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
				//保留当前页面，跳转到应用内的某个页面
				uni.navigateTo({
					url: '/pages/tabbar/news/chat?userId='+info.targetName+'&chatId='+info.room+'&isNewsList=1'
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
