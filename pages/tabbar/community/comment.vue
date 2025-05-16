<style lang="scss" scoped>
.comment_main{
	padding-bottom: 200rpx;
}
.comment {
	display: flex;
	padding: 15rpx;
	border-bottom: 1px #e5e5e5 solid;
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
				.text{
					font-size: 14px;
				}
				.desc {
					display: flex;
					.nickname {
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
  // 一二级回复新增几天前和IP归属城市的样式
  .newtimeip{
    display: flex;
    .date{
      margin-right:10rpx;
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
	padding: 25rpx 20rpx 20rpx 20rpx;
	border-radius: 10rpx;
	min-height: 40rpx;
	font-size: 14px;
}
.comment-tool .u-btn {
	margin-left: 10rpx;
	border-radius: 20rpx;
}
</style>
<template>
	<view>
		<!-- 展示区 -->
		<post-list :showRow="'-webkit-line-clamp: 10'"  :list="tuwen_data"  
		:isDetail="true"
		:imageFlag="true"
		@changeStatus="changeStatus" @clickLike="clickLike" @commontInt="commontInt" @deletePostFn="deletePostFn"></post-list>
		
		<!-- 评论区 -->
		<view class="comment_main">
			<block v-if="commentList.length > 0&&commentListShow" >
				<view class="comment_con">
					<view   class="comment" v-for="(res, index1) in commentList" :key="res.id">
						<view class="left"  @click.stop="toUcenter(res.comment_user_id)">
							<u-avatar class="avatar" :src="res.avatar" mode="square"></u-avatar>
						</view>
						<view class="right">
							<view @longpress="delComment(res, index1)">
								<view class="top">
									<view class="desc">
										<view class="name"  @tap.stop="onReply(res, index1,1)">{{ res.nickname }}</view>
									</view>
								</view>
								<view class="content"  @tap.stop="onReply(res, index1,1)">{{ res.words }}</view>
								<!-- 新增几天前和获取IP归属城市 -->
								<view class="newtimeip">
									<view class="date"  @tap.stop="onReply(res, index1,1)" style="color: #999;font-size: 12px;">{{ tranfTime(res.create_time) }}</view>
									<view style="color: #999;font-size: 12px;">{{ getCity(res.location) }}</view>
								</view>
							</view>
							
							<view class="reply-box">
								<view v-if="res.AllReply">
									<view class="item" @tap.stop="onReply(item, index,2,res)" v-for="(item, index) in res.replyList" :key="item.index">
										<view class="left" @click.stop="toUcenter(item.comment_user_id)">
											<u-avatar class="avatar" :src="item.avatar" mode="square"></u-avatar>
										</view>
										<view class="right" @longpress="delComment(item, index,index1)">
											<view class="desc">
												<view class="nickname">{{ item.nickname }}</view>
											</view>
											<view class="text">{{ item.words }}</view>
											<view class="newtimeip">
												<view class="date"  @tap.stop="onReply(item, index1,1)" style="color: #999;font-size: 12px;">{{ tranfTime(item.create_time) }}</view>
												<view style="color: #999;font-size: 12px;">{{ getCity(item.location) }}</view>
											</view>
										</view>
									</view>
								</view>
								<view :class="[res.commentText?'all-reply':'']" @tap="toAllReply(index1,res.comment_id)" v-if="res.replyList&&res.replyList.length>0">
									 {{res.commentText}}
									<u-icon class="more" name="arrow-right" :size="26" v-if="res.commentText"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<view v-if="commentList.length < 1" >
				<u-empty text="暂无评论" mode="message"></u-empty>
			</view>
		</view>
		<!-- 评论输入框 -->
		<view class="comment-tool" :style="{ bottom: keyboardHeight + 'px' }">
			<textarea fixed :placeholder="placeholder" cursor-spacing="10"
				:adjust-position="false"
				auto-height="true"
				v-model="content"
				@keyboardheightchange="changeKeyboard"></textarea>
			<u-button type="primary" @click="addComment" :disabled="isSubmitD">发布</u-button>
		</view>
	</view>
</template>

<script>
import {htmlEncode,tranfTime} from '@/utils/utils.js'
export default {
	data() {
		return {
			content: '',
			focus: false,
			isSubmitD: false,
			placeholder: '文字是桥梁，连接心与心的距离...',
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
			options:'',//动态
			dyId:'',//动态id
			parentId:'',//二级评论的父id
			expand:0,//当前展开的第几层
			locationCicy:'',//IP归属的城市
			userId:'',// 登录用户id
			keyboardHeight:0 ,// 键盘高度
			dynamicUserId:''//动态用户id
		};
	},
	props:{
		index: String
	},
	onLoad(datas) {
		if(datas){
			this.dyId=datas.id
			if(this.$store.state.userInfo.id){
				this.userId=this.$store.state.userInfo.id
			}
			this.getOneList()
			this.getdyDetail()
			this.lookCount(this.dyId)
		}
	},
	onReachBottom(){
		if(this.loadStatus=='loadmore'){
			this.pageNumOne++
			this.getOneList()
		}
	},
	methods: {
		tranfTime(autoTime) {
			return tranfTime(new Date(autoTime));
		},
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
		// 进入动态详情页
		getdyDetail(){
			this.$H.get("/zf/v1/dynamic/detail?id="+this.dyId+"&userId="+this.userId, {}, true).then(res => {
				if (200 == res.code) {
					let detail = res.data;
					detail.forEach(item=>{
						item.image=item.imgurl.split(',')
						this.$set(item,'isReport',false)
					})
					if(detail){
						this.tuwen_data = detail
						this.dynamicUserId = this.tuwen_data[0].userid
						uni.stopPullDownRefresh();
					}
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
		// 动态点赞
		clickLike(id,index){
			let data={
				userId:this.$store.state.userInfo.id,
				id:id?id:0
			}
			this.$H.patch('/zf/v1/dynamic/like',data,true).then(res=>{
				if(res.status && res.code==200){
					res.data[0].status ? this.tuwen_data[index].like+=1 : this.tuwen_data[index].like-=1
					res.data[0].status ? this.tuwen_data[index].status=1 : this.tuwen_data[index].status=0
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
			this.placeholder = '回复' + e.nickname + '：';
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
				dynamicId:this.dyId,//动态id
				avatar:this.$store.state.userInfo.avatar,
				nickname:this.$store.state.userInfo.nickname,
				beCommentId:this.beCommentUserId?this.comment_id:0,
				create_time:new Date(),
				love:0,
				parentId:this.parentId? this.parentId:0
			}
			let data={
				words:htmlEncode(this.content),
				dynamicUserId: this.dynamicUserId,
				commentUserId:this.$store.state.userInfo.id,//回复用户id，也就是用户本人
				beCommentUserId:this.beCommentUserId,//被回复id也就别人id
				dynamicId:this.dyId,//动态id
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
						this.commentList[this.beforeIndex].replyList.unshift(addComment)
						// this.expand>0?this.commentList[this.beforeIndex].replyList.unshift(addComment):''
						let time=new Date()
						let y=time.getFullYear()
						let m=time.getMonth()+1
						let d=time.getDate()
						let h=time.getHours()
						let mm=time.getMinutes()
						let s=time.getSeconds()
						let create_time=y+'-'+m+'-'+d +'  '+h+':'+mm+':'+s
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
			if (e.nickname != user.nickname) {
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
                // 获取动态详情 (刷新评论)
								this.getdyDetail();
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
			if(this.loadStatus=='loadmore'){
				let that=this
				let data={
					dynamicId:this.dyId,
					pageNum:this.pageNumOne,
					pageSize:10,
				}
				this.$H.post('/zf/v1/comment/list',data,true).then(res=>{
					if(res.status){
						let commentList=res.data
						if(commentList && commentList.length<10){
							this.loadStatus='nomore'
						}
						if(commentList){
							commentList.forEach((item,index)=>{
								this.$set(item,'replyList',[])
								item.AllReply=false
								item.commentText='展开查看更多'
								that.commentList.push(item)
								item.likeNum=0
								that.getTwoList(item.comment_user_id,index,item.comment_id,item)
							})
						}
					}
				})
			}
		},
		getTwoList(beCommentUserId,index,id,item){
			let that=this
			let data={
				pageNum:this.pageNum,
			    pageSize:10,
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
								if (uni.getSystemInfoSync().platform == 'ios') {
								    // 解决ios手机时间格式化NaN问题
								    item.create_time = item.create_time.replace(/-/g, '/')
								}
							}
						})
					}
				}
			})
		},
		deletePostFn(id){
			let data={
				id:id,
				status:0
			}
			this.$H.patch('/zf/v1/dynamic/dynamics',data,true).then(res=>{
			})
		},
		// 动态详情浏览统计
		lookCount(id){
      // 登录后才会触发浏览计数
			if(this.$store.state.userInfo.id){
				let data={
					id:id,
					userId:this.$store.state.userInfo.id,
					type:'plus',
					dynamicUserId:this.dynamicUserId
				}
				this.$H.patch('/zf/v1/dynamic/look',data,true).then(res=>{
				})
			}
		},
		// 获取IP属地
		getCity(location){
			// 中国|0|北京|北京市|联通
			// 将字符串按“|”分割成数组
			if(!location) return '';
			let parts = location.split('|');
			if(location){
				if (parts[2] === '0') {
				  return '';
				} else{
					return parts[2]
				}
			}
		},
		// 跳转至个人中心
		toUcenter(userId) {
			uni.navigateTo({
				url: '/pages/tabbar/me/personal?userId=' + userId
			})
		},
		// 获取键盘高度
		changeKeyboard(event){
			event.detail.height?this.keyboardHeight = event.detail.height:this.keyboardHeight=0;
		}
	}
}
</script>