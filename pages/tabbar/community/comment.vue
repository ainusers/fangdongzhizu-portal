<style lang="scss" scoped>
.comment_main{
	padding-bottom: 200rpx;
}
.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 28rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.desc {
				display: flex;
			}
			.name {
				color: #5677fc;
				font-size:14px;
			}
			.date {
				padding-left: 20rpx;
				color: #999999;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				padding:20rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #5677fc;
				.num {
					color: #5677fc;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
			font-size: 14px;
		}
		.reply-box {
			border-radius: 12rpx;
			.item {
				display: flex;
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.text{
					font-size: 14px;
				}
				.desc {
					display: flex;
					.username {
						font-size: 14px;
						color: #5677fc;
					}
					.date {
						padding-left: 20rpx;
						font-size: 28rpx;
						color: #999999;
					}
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
		}
	}
}
/* 评论tool */
.comment-tool {
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #fff;
	padding: 20rpx;
	display: flex;
	z-index: 999;
}
.comment-tool textarea {
	background-color: #f5f5f5;
	padding: 20rpx;
	border-radius: 10rpx;
	min-height: 40rpx;
}
.comment-tool .u-btn {
	margin-left: 10rpx;
}
</style>
<template>
	<view>
		<!-- 展示区 -->
		<post-list :list="tuwen_data" :loadStatus="load_status_tuwen" :isDetail="true" @changeStatus="changeStatus" @clickLike="clickLikes" @commontInt="commontInt" @deletePostFn="deletePostFn"></post-list>
		
		<!-- 评论区 -->
		<view class="comment_main">
					<block v-show="commentList.length > 0&&commentListShow" >
							<view class="comment_con">
								<view   class="comment" v-for="(res, index1) in commentList" :key="res.id">
									<view class="left">
											<u-avatar class="avatar" :src="res.avatar" level-bg-color="#8072f3"></u-avatar>
										</view>
									<view class="right">
										<view @longpress="delComment(res, index1)">
											<view class="top">
												<view class="desc">
													<view class="name"  @tap.stop="onReply(res, index1,1)">{{ res.username }}</view>
													<view class="date"  @tap.stop="onReply(res, index1,1)">{{res.create_time  }}</view>
												</view>
												<!-- <view class="like" :class="{ highlight: res.love }"  @click="clickLike(res.comment_id,res.love,index1)">
													<view class="num">{{ res.love }}</view>
													<u-icon v-if="!res.love" name="thumb-up" :size="30" color="#9a9a9a"></u-icon>
													<u-icon v-if="res.love" name="thumb-up-fill" :size="30" ></u-icon>
												</view> -->
											</view>
											<view class="content"  @tap.stop="onReply(res, index1,1)">{{ res.words }}</view>
										</view>
										
										<view class="reply-box">
											<view v-if="res.AllReply">
												<view class="item" @tap.stop="onReply(item, index,2,res)" v-for="(item, index) in res.replyList" :key="item.index">
													<view class="left"><image :src="item.avatar" mode="aspectFill"></image></view>
													<view class="right" @longpress="delComment(item, index,index1)">
														<view class="desc">
															<view class="username">{{ item.username }}</view>
															<view class="date">{{ item.create_time?item.create_time:'' }}</view>
														</view>
														<view class="text">{{ item.words }}</view>
													</view>
												</view>
											</view>
											<view :class="[res.commentText?'all-reply':'']" @tap="toAllReply(index1,res.comment_id)" v-show="res.replyList&&res.replyList.length>0">
												 {{res.commentText}}
												<u-icon class="more" name="arrow-right" :size="26"v-if="res.commentText"></u-icon>
											</view>
										</view>
									</view>
								</view>
							</view>
						</block>
						<view v-show="commentList.length <= 0" >
							<u-empty text="暂无评论" mode="message"></u-empty>
						</view>
		</view>
		<!-- 评论输入框 -->
		<view class="comment-tool">
			<textarea :placeholder="placeholder" :focus="focus" fixed="true" cursor-spacing="10"
				v-model="content" auto-height="true" placeholder-class="txt-placeholder"></textarea>
			<u-button type="primary" @click="addComment" :disabled="isSubmitD" style="border-radius: 0;" >发布</u-button>
		</view>
	</view>
</template>

<script>
	import {htmlEncode ,tranfTime} from '../../../utils/utils.js'
export default {
	data() {
		return {
			content: '',
			focus: false,
			isSubmitD: false,
			placeholder: '说点什么...',
			commlistOne:[],//一级评论
			beCommentUserId:0,//被回复id，如果没有就默认0
			AllReply:false,
			commentListShow:true,
			commentText:"展开查看更多",
			commentList: [],
			pageNum:1,
			pageNumOne:1,
			tuwen_data:[],
			beforeIndex:'9999',//点击评论查看更多的index
			load_status_tuwen: 'loadmore',
			loadStatus: 'loadmore', //用于控制是否可以再继续加载
			comment_id:'',//评论id
			dyId:'',//动态id
			parentId:'',//二级评论的父id
			expand:0,//当前展开的第几层
		};
	},
	props:{
		index:String
	},
	onLoad(options) {
		if(options.id){
			this.dyId=options.id
		}
		this.getOneList()
		this.getdyDetail()
		this.lookCount(this.dyId)
	},
	onPullDownRefresh(){
		this.pageNumOne=1
		this.commentList=[]
		this.getOneList()
		this.getdyDetail()
		this.tuwen_data=[]
		uni.stopPullDownRefresh();
	},
	onReachBottom(){
		if(this.loadStatus=='loadmore'){
			this.pageNumOne++
			this.getOneList()
		}
		
	},
	methods: {
		commontInt(){
			this.comment_id=''
			this.beCommentUserId=0
			this.parentId=0
			this.placeholder='说点什么...'
		},
		changeStatus(index,status,isDelete){
			this.tuwen_data[index].isReport=status
			if(isDelete){
				uni.navigateBack()
			}
		},
		getdyDetail(){
			this.load_status_tuwen='loading'
			let data={
					  "id": this.dyId,
					  "page":1 ,
					  "size": "10",
					  "userId":this.$store.state.userInfo.id
				}
			this.$H.get('/zf/v1/dynamic/detail',data,true).then(res=>{
				this.load_status_tuwen='nomore'
					if(res.status){	
							this.tuwen_data = res.data
							this.tuwen_data.forEach(item=>{
								this.$set(item,'status',false)
								this.$set(item,'like',0)
								item.image=item.imgurl.split(',')
								this.$set(item,'isReport',false)
							})
					uni.stopPullDownRefresh();
					}
				})
			},
		// 跳转到全部回复
		toAllReply(index,id) {
			this.expand++
			this.AllReply=true
			this.commentList.forEach((item)=>{
				item.AllReply=false
				if(item.replyList&&item.replyList.length>0){
					item.commentText='展开查看更多'
				}
			})
			this.commentList[index].AllReply=true
			if(Number(this.beforeIndex)!=Number(index) ||this.commentList[index].replyList.length<10 ){
				this.pageNum=1
			}else{
				this.pageNum++
			}
			this.beforeIndex=index
			this.getTwoList(this.commentList[index].comment_user_id,index,id,this.commentList[index])
		},
		//动态点赞
		clickLikes(id,index){
			let data={
				userId:this.$store.state.userInfo.id,
				id:id?id:0
			}
			this.$H.patch('/zf/v1/dynamic/like',data,true).then(res=>{
				if(res.status&&res.status!=500){
					res.data[0].status?this.tuwen_data[index].like+=1 :this.tuwen_data[index].like-=1
					res.data[0].status?this.tuwen_data[index].status=1 :this.tuwen_data[index].status=0
				}
			})
		},
		// 回复评论
		onReply(e,index,type,item) {
			if(item){
				this.parentId=item.comment_id
			}else if(!item){
				this.parentId=e.comment_id
			}
			if(type==1){
				this.beforeIndex=index
				this.expand=0
			}
			this.placeholder = '回复' + e.username + '：';
			if(e.comment_user_id){
				this.beCommentUserId= e.comment_user_id
			}else{
				this.beCommentUserId=e.commentUserId
			}
			this.comment_id=e.comment_id ||e.id
			this.focus = true;
			
		},
		// 添加评论
		addComment() {
			this.isSubmitD = true;
			if (this.content == '') {
				this.$u.toast('评论不能为空');
				this.isSubmitD = false;
				return;
			}
			let addComment={
				words:htmlEncode(this.content),
				comment_user_id:this.$store.state.userInfo.id,
				commentUserId:this.$store.state.userInfo.id,//回复用户id，也就是用户本人
				beCommentUserId:this.beCommentUserId,//被回复id也就别人id
				dynamicId:this.$store.state.communityInfo.id,//动态id
				avatar:this.$store.state.userInfo.avatar,
				username:this.$store.state.userInfo.username,
				beCommentId:this.beCommentUserId?this.comment_id:0,
				create_time:'刚刚',
				love:0,
				parentId:this.parentId? this.parentId:0
			}
			let data={
				words:htmlEncode(this.content),
				commentUserId:this.$store.state.userInfo.id,//回复用户id，也就是用户本人
				beCommentUserId:this.beCommentUserId,//被回复id也就别人id
				dynamicId:this.$store.state.communityInfo.id,//动态id
				beCommentId:this.beCommentUserId?this.comment_id:0,
				parentId:this.parentId? this.parentId:0
			}
			let that=this
			this.$H.post('/zf/v1/comment/increase',data,true).then(res=>{	
				if(res.status&&res.status!=500){
					addComment['comment_id']=res.data[0].commentId
					if(res.status&&this.beCommentUserId){
						//回复二级评论  expand 当前没有展开不去添加
						if(!this.commentList[this.beforeIndex].replyList && this.expand==0){
							this.$set(this.commentList[this.beforeIndex],'replyList',[])
							this.$set(this.commentList[this.beforeIndex],'commentText','展开查看更多')
							this.expand=1
						}
						this.expand>0?this.commentList[this.beforeIndex].replyList.unshift(addComment):''
						let time=new Date()
						let y=time.getFullYear()
						let m=time.getMonth()+1
						let d=time.getDate()
						let h=time.getHours()
						let mm=time.getMinutes()
						let s=time.getSeconds()
						let create_time=y+'-'+m+'-'+d +'  '+h+':'+mm+':'+s
						// this.commentList[this.beforeIndex].create_time=tranfTime(create_time)
					}
					if(res.status&&!this.beCommentUserId){
						this.commentList.unshift(addComment);
					}
					this.pageNum=1
					this.content = '';
					this.$u.toast('评论成功');
					this.isSubmitD = false;
				}else{
					this.isSubmitD = false;
				}
				
			})	
		},
		// 删除评论
		delComment(e, index,index1) {
			let user = uni.getStorageSync('userInfo');
			// 判断用户id
			if (e.username != user.username) {
				return;
			}
			uni.showModal({
				title: '提示',
				content: '确定删除该评论？',
				success: function(res) {
					if (res.confirm) {
						let data={
							id:e.comment_id||e.id,
							status:0
						}
						this.$H.patch('/zf/v1/comment/status',data,true).then(res=>{
							if(res.status&&res.status!=500){
								// 一级评论
								if(e.comment_id){
									this.commentList = this.commentList.filter(item => {
										return item.comment_id != e.comment_id 
									})
								}else if(e.id&&!e.comment_id){
									this.commentList[index1].replyList = this.commentList[index1].replyList.filter(item => {
										return item.id != e.id 
									})
								}
							}
						})
						
					} else if (res.cancel) {
						// 用户取消删除操作
					}
				}.bind(this)
			});
		},
		//获取一级评论的
		getOneList(){
			let that=this
			let data={
				dynamicId:this.$store.state.communityInfo.id,
				pageNum:this.pageNumOne,
				pageSize:10,
			}
			this.$H.post('/zf/v1/comment/list',data,true).then(res=>{
						if(res.status){
							let commentList=res.data
							if(commentList&&commentList.length<10){
								this.loadStatus='state'
							}
							if(commentList){
								commentList.forEach((item,index)=>{
										this.$set(item,'replyList',[])
										// item.replyList=[]
										item.AllReply=false
										item.commentText='展开查看更多'
										let time=new Date(item.create_time)
										let y=time.getFullYear()
										let m=time.getMonth()+1
										let d=time.getDate()
										let h=time.getHours()
										let mm=time.getMinutes()
										let s=time.getSeconds()
										if(h<10){
											h='0'+h
										}
										if(mm<10){
											mm='0'+mm
										}
										item.create_time=tranfTime(y+'-'+m+'-'+d +'  '+h+':'+mm)
										that.commentList.push(item)
										item.likeNum=0
										that.getTwoList(item.comment_user_id,index,item.comment_id,item)
									})
								
							}
						}
			})

		},
		getTwoList(beCommentUserId,index,id,item){
			let that=this
			let data={
				pageNum:this.pageNum,
			    pageSize:10,
				// status:1,
				parentId:id,
				dynamicId:this.dyId
			}
			this.$H.post('/zf/v1/comment/second/list',data,true).then(res=>{
				if(res.status){
					if(item.AllReply &&res.data.length<10){
						item.commentText=''
					}
					if(this.pageNum>1){
						item.replyList=[...item.replyList,...res.data]
					}else{
						item.replyList=res.data
					}
					if(res.data.length>0){
						item.replyList.forEach(item=>{
							if(item.create_time.length>10){
								item.create_time=tranfTime(item.create_time)
							}
							
						})
					}
					
				}
			})
		},
		//一级评论和动态评论的点赞
		clickLike(id,isLove,index){
			let data={
				dynamicId:this.$store.state.communityInfo.id,
				commentId:id?id:0,
				type:isLove?'reduce':'plus',
			}
			this.$H.patch('/zf/v1/comment/love',data,true).then(res=>{
				if(res.status&&res.status!=500)
				if (isLove == 1) {
					this.commentList[index].love=0;
					this.commentList[index].likeNum=res.data[0].count;
				} else {
					this.commentList[index].love=1;
					this.commentList[index].likeNum=res.data[0].count;
				}
			})
		},
		deletePostFn(id){
			let data={
				id:id,
				status:0
			}
			this.$H.patch('/zf/v1/dynamic/dynamics',data,true).then(res=>{
				// console.log(res)
			})
		},
		lookCount(id){
			let data={
				id:id,
				userId:this.$store.state.userInfo.id,
				type:'plus'
			}
			this.$H.patch('/zf/v1/dynamic/look',data,true).then(res=>{
				// console.log(res)
			})
		}
	}
}
</script>