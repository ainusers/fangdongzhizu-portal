
<style lang="scss">
	@import "@/style/chat/style.scss"; 
	.send .btn{
		background: linear-gradient(to right, #129ef1, #2c93eb) !important;
	}
	.userImage{
		.avatar{
			width:80upx;
			height:80upx
		}
	}
</style>
<template>
	<view class="news">
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView"  upper-threshold="50" @scrolltoupper="loadHistory" >
				<view class="main_con" :style="{paddingBottom:keyHeight+'px'}">
				<!-- 加载历史数据的滚动动画 -->
					<view class="loading" v-if="!isHistoryLoading">
						<view class="spinner">
							<view class="rect1"></view>
							<view class="rect2"></view>
							<view class="rect3"></view>
							<view class="rect4"></view>
							<view class="rect5"></view>
						</view>
					</view>
				<!-- 判断展示的内容类型 -->
					<view v-if="msgList&&msgList.length>0">
						<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.id">
							<!-- 用户消息 -->
							<block v-if="row.type == 'text' || row.type == 'img' || row.type == 'voice'">
								<!-- 1. 自己发出的消息 -->
								<view class="my" v-if="row.from==currentName">
									<!-- 左-消息 -->
									<view class="time" v-if="row.datetime1">{{row.datetime1}}</view>
									<view class="my_item">
										<view class="left">
											<!-- 文字消息 -->
											<view v-if="row.type=='text'" class="bubble">
												<rich-text :nodes="row.msg" ></rich-text>
											</view>
											<!-- 语言消息 -->
											<view v-if="row.type=='voice'" class="bubble voice" @tap="playVoice(row.msg,row.id)" :class="playMsgid == row.id?'play':''">
												<view class="length">{{JSON.parse(row.msg).length}}</view>
												<view class="icon my-voice"></view>
											</view>
											<!-- 图片消息 -->
											<view v-if="row.type=='img'" class="bubble img" @tap="showPic(row.msg)">
												<image :src="JSON.parse(row.msg).url" :style="{'width': JSON.parse(row.msg).w + 'px','height': JSON.parse(row.msg).w + 'px'}" mode="widthFix"></image>
											</view>
										</view>
										<!-- 右-头像 -->
										<view class="right">
											<view class="userImage">
											  <u-avatar class="avatar" :src="$store.state.userInfo.avatar" level-bg-color="#8072f3" size="140rpx" img-mode="scaleToFill"></u-avatar>
											
											</view>
										</view>
									</view>
									</view>
								<!-- 2. 别人发出的消息 -->
								<view class="other" v-else>
									<!-- 左-头像 -->
									<view class="time" v-if="row.datetime1">{{row.datetime1}}</view>
									<view class="other_item">
										<view class="left">
											<view class="userImage">
											  <u-avatar class="avatar" :src="otherAvatar" level-bg-color="#8072f3" size="140rpx" img-mode="scaleToFill"></u-avatar>
											</view>
										</view>
										<!-- 右-用户名称-时间-消息 -->
										<view class="right">
											<view class="username">
												<view class="name">{{otherName}}</view> 
											</view>
											<!-- 文字消息 -->
											<view v-if="row.type=='text'" class="bubble">
												<rich-text :nodes="row.msg"></rich-text>
											</view>
											<!-- 语音消息 -->
											<view v-if="row.type=='voice'" class="bubble voice" @tap="playVoice(row.msg,row.id)" :class="playMsgid == row.id?'play':''">
												<view class="icon other-voice"></view>
												<view class="length">{{JSON.parse(row.msg).length}}</view>
											</view>
											<!-- 图片消息 -->
											<view v-if="row.type=='img'" class="bubble img" @tap="showPic(row.msg)">
												<image :src="JSON.parse(row.msg).url" :style="{'width': JSON.parse(row.msg).w + 'px','height': JSON.parse(row.msg).w + 'px'}"></image>
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情模块 -->
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/chat/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon photos"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard" :style="{bottom:inputOffsetBottom >0?inputOffsetBottom +'px':'0',position:poType}">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" cursor-spacing="20" ref="textA" :focus="isFocus" :adjust-position="false" :fixed="true" @linechange="changeLine" @input="textInput"/>
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
	</view>
</template>

<script>
	let that=''
	import {getPlatform,initStorestate,getStoreData,getuserInfo,dateTime1,spaceTime} from '@/utils/utils.js'
    import config from '@/utils/request/config.js'
	export default {
		data() {
			return {
				//文字消息
				textMsg:'',
				//消息列表
				isHistoryLoading:true, // 当为false的时候，加载历史记录
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				emojiList:[
						[{"url":"100.gif",alt:"[微笑]"},{"url":"101.gif",alt:"[伤心]"},{"url":"102.gif",alt:"[美女]"},{"url":"103.gif",alt:"[发呆]"},{"url":"104.gif",alt:"[墨镜]"},{"url":"105.gif",alt:"[哭]"},{"url":"106.gif",alt:"[羞]"},{"url":"107.gif",alt:"[哑]"},{"url":"108.gif",alt:"[睡]"},{"url":"109.gif",alt:"[哭]"},{"url":"110.gif",alt:"[吃瓜]"},{"url":"111.gif",alt:"[怒]"},{"url":"112.gif",alt:"[调皮]"},{"url":"113.gif",alt:"[笑]"},{"url":"114.gif",alt:"[惊讶]"},{"url":"115.gif",alt:"[难过]"},{"url":"116.gif",alt:"[好奇]"},{"url":"117.gif",alt:"[汗]"},{"url":"118.gif",alt:"[抓狂]"},{"url":"119.gif",alt:"[吐]"},{"url":"120.gif",alt:"[笑]"},{"url":"121.gif",alt:"[快乐]"},{"url":"122.gif",alt:"[鄙视]"},{"url":"123.gif",alt:"[傲慢]"}],
						[{"url":"124.gif",alt:"[饿]"},{"url":"125.gif",alt:"[累]"},{"url":"126.gif",alt:"[吓]"},{"url":"127.gif",alt:"[汗]"},{"url":"128.gif",alt:"[高兴]"},{"url":"129.gif",alt:"[闲]"},{"url":"130.gif",alt:"[努力]"},{"url":"131.gif",alt:"[骂]"},{"url":"132.gif",alt:"[疑问]"},{"url":"133.gif",alt:"[秘密]"},{"url":"134.gif",alt:"[乱]"},{"url":"135.gif",alt:"[疯]"},{"url":"136.gif",alt:"[哀]"},{"url":"137.gif",alt:"[再见]"},{"url":"138.gif",alt:"[打击]"},{"url":"139.gif",alt:"[抱抱]"},{"url":"140.gif",alt:"[蛋糕]"},{"url":"141.gif",alt:"[闪电]"},{"url":"142.gif",alt:"[炸弹]"},{"url":"143.gif",alt:"[刀]"},{"url":"144.gif",alt:"[便]"},{"url":"145.gif",alt:"[咖]"},{"url":"146.gif",alt:"[饭]"},{"url":"147.gif",alt:"[药]"}],
						[{"url":"148.gif",alt:"[玫瑰]"},{"url":"149.gif",alt:"[凋谢]"},{"url":"150.gif",alt:"[爱心]"},{"url":"151.gif",alt:"[心碎]"},{"url":"152.gif",alt:"[礼物]"},{"url":"153.gif",alt:"[太阳]"},{"url":"154.gif",alt:"[月亮]"},{"url":"155.gif",alt:"[赞]"},{"url":"156.gif",alt:"[踩]"},{"url":"157.gif",alt:"[握手]"},{"url":"158.gif",alt:"[胜利]"},{"url":"159.gif",alt:"[飞吻]"},{"url":"160.gif",alt:"[西瓜]"},{"url":"161.gif",alt:"[冷汗]"},{"url":"162.gif",alt:"[鼓掌]"},{"url":"163.gif",alt:"[糗大了]"},{"url":"164.gif",alt:"[坏笑]"},{"url":"165.gif",alt:"[左哼哼]"},{"url":"166.gif",alt:"[右哼哼]"},{"url":"167.gif",alt:"[哈欠]"},{"url":"168.gif",alt:"[委屈]"},{"url":"169.gif",alt:"[快哭了]"},{"url":"170.gif",alt:"[阴险]"},{"url":"171.gif",alt:"[亲亲]"}],
						[{"url":"172.gif",alt:"[吓]"},{"url":"173.gif",alt:"[可怜]"},{"url":"174.gif",alt:"[菜刀]"},{"url":"175.gif",alt:"[抱拳]"},{"url":"176.gif",alt:"[拳头]"},{"url":"177.gif",alt:"[OK]"},{"url":"178.gif",alt:"[喝彩]"},{"url":"179.gif",alt:"[祈祷]"},{"url":"180.gif",alt:"[棒棒糖]"},{"url":"181.gif",alt:"[飞机]"},{"url":"182.gif",alt:"[眨眼睛]"},{"url":"183.gif",alt:"[无奈]"},{"url":"184.gif",alt:"[小纠结]"},{"url":"185.gif",alt:"[斜眼笑]"},{"url":"186.gif",alt:"[doge]"},{"url":"187.gif",alt:"[惊喜]"},{"url":"188.gif",alt:"[笑哭]"},{"url":"189.gif",alt:"[我最美]"},{"url":"190.gif",alt:"[口罩护体]"},{"url":"191.gif",alt:"[捂脸]"},{"url":"192.gif",alt:"[头秃]"},{"url":"193.gif",alt:"[暗中观察]"},{"url":"194.gif",alt:"[我酸了]"},{"url":"195.gif",alt:"[比心]"}],
						[{"url":"196.gif",alt:"[白眼笑]"},{"url":"197.gif",alt:"[不你不想]"},{"url":"198.gif",alt:"[打call]"},{"url":"199.gif",alt:"[滚]"},{"url":"200.gif",alt:"[敬礼]"},{"url":"201.gif",alt:"[考虑中]"},{"url":"202.gif",alt:"[狂笑]"},{"url":"203.gif",alt:"[没眼看]"},{"url":"204.gif",alt:"[摸鱼]"},{"url":"205.gif",alt:"[魔鬼笑]"},{"url":"206.gif",alt:"[哦]"},{"url":"207.gif",alt:"[让我康康]"},{"url":"208.gif",alt:"[猪头]"},{"url":"209.gif",alt:"[捂脸]"},{"url":"210.gif",alt:"[抠鼻]"},{"url":"211.gif",alt:"[鄙视]"},{"url":"212.gif",alt:"[勾引]"},{"url":"213.gif",alt:"[泪崩]"},{"url":"214.gif",alt:"[卖萌]"},{"url":"215.gif",alt:"[喷血]"},{"url":"216.gif",alt:"[骚扰]"},{"url":"217.gif",alt:"[托腮]"},{"url":"218.gif",alt:"[加油必胜]"},{"url":"219.gif",alt:"[加油抱抱]"}],
						[{"url":"220.gif",alt:"[脑壳疼]"},{"url":"221.gif",alt:"[沧桑]"},{"url":"222.gif",alt:"[辣眼睛]"},{"url":"223.gif",alt:"[问号脸]"},{"url":"224.gif",alt:"[emm]"}]
				],
				currentName:'',//当前登录人的name
				chatList:[],//所有聊天记录的数据
				isChat:false,//有没有曾经聊天过
				otherAvatar:'',//对方的头像
				otherName:'',//对方的昵称
				myAvatar:'',//自己的头像
				Platform:'',
				chatId:'', //聊天室id
				targetUserId:'',//目标userid
				currentUserId:'' ,//当前userid
				isNewsList:'0',// 1 从消息列表过来的  0 否
				lock:0,
				isFocus:false,
				emojLen:0,
				historyArr:[],
				historyIndex:0,
				inputOffsetBottom:0,//键盘的高度
				poType:'fixed',
				screenH:'',
				inputOffsetTop:0,
				oldTime:new Date(),
				keyHeight:0,
			};
		},
		onLoad(option) {
			that=this
			// 获取屏幕高度
			uni.getSystemInfo({
				success: (res) => {
					that.screenH=res.safeArea.height
				}
			})
			//解决输入框遮挡问题
			uni.onKeyboardHeightChange(res=>{
				this.inputOffsetTop=that.screenH-res.height-50
				this.inputOffsetBottom=res.height
				if(res.height){
					this.keyHeight=res.height
				}
				this.scrollBottom()
				if(res.height==0){
					this.isFocus=false
					this.poType='fixed'
				}
			})
			initStorestate()
			getStoreData('currentChatList')
			this.msgList=this.$store.state.currentChatList.data || []
			this.otherName=this.$store.state.currentChatList.fromName
			this.otherAvatar=this.$store.state.currentChatList.fromAvatar	
			this.Platform=getPlatform()
			this.chatId=option.chatId
			this.isNewsList=option.isNewsList
			this.currentUserId=this.$store.state.userInfo.id
			this.targetUserName=option.userId //发送目标用户名
			this.currentName=this.$store.state.userInfo.username
			this.myAvatar=this.$store.state.userInfo.avatar 
			this.$store.commit('currentNameChat',this.targetUserName)
			this.chatSaveLocal()

			// 语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
			// #ifndef H5
			// 录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			// 录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
		},
		onUnload(){
			this.chatList=[]//所有聊天记录的数据
			this.$store.commit('currentNameChat','')
			this.$store.commit('currentChatList',[])
		},
		watch:{
			"$store.state.chatList":{
				handler:(val,oldval)=>{
					that.oldTime=new Date()
					let tempVal='';
					try{
						tempVal=JSON.parse(JSON.stringify(val))
					}catch(e){
						console.log(e)
					}
                    that.chatList=tempVal
                    if(Array.isArray(tempVal)){
                        tempVal.forEach(item=>{
                            if(item.room==that.chatId&&item.currentName==that.$store.state.userInfo.username){
                                if(!that.otherAvatar|| !that.otherAvatar){
                                    that.otherName=item.fromName
                                    that.otherAvatar=item.fromAvatar
                                }
                                that.msgList=item.data
                                that.initMsgList()
                            }
                        })
                        that.scrollAnimation = false
                        if(that.msgList&&that.msgList[that.msgList.length-1]){
                            that.$nextTick(function() {
                                //进入页面滚动到底部
                                that.scrollToView="msg"+that.msgList[that.msgList.length-1].id
                                that.$nextTick(function() {
                                    that.scrollAnimation = true;
                                });
                            });
                        }
                        that.getMsgList()
                    }
				},
				deep:true
			},
			"$store.state.isChatStatus":{
				handler(newval,old){
					initStorestate()
					if(newval==true){
						that.sendText()
					}
				}
			},
			"$store.state.currentChatList":{
				handler(newval,old){
				}
			}
		},
		methods:{
			initMsgList(){
				let data=this.msgList
				if(!data||data&&data.length==0){
					return
				}
				//聊天记录大于两条 当前 聊天记录和上一条聊天记录比较   如果小于两条聊天记录，与当前时间比较
				that.oldTime=this.msgList[this.msgList.length-1].datetime
				let currentT='';
				let lastT='';
				for(let i=0;i<=data.length-1;i++){
					if(i-1<0){
						data[i].datetime1=dateTime1(data[i].datetime)
					}else {
						currentT=data[i].datetime;
						lastT=data[i-1].datetime;
						let f=	spaceTime(currentT,lastT);
						if(f){
							data[i].datetime1=dateTime1(data[i].datetime)
						}
					}
				};
				if(data.length>30){
					that.historyArr=data.slice(0,data.length-29)
					that.msgList=data.slice(data.length-30)
					that.isHistoryLoading=false
				}else{
					that.isHistoryLoading=true
				}
			},
			//聊天记录初始化
			chatSaveLocal(){
				this.initMsgList()
				this.getMsgList()
			},
			changeLine(e){
				if(e.target.lineCount>1){
					this.keyHeight+=20
					this.scrollBottom()
				}
			},
			textInput(){
				uni.getSelectedTextRange({
				  success: res => {
				  }
				})
			},
			// 触发滑动到顶部 (加载历史信息记录)
			loadHistory(e){
				if(this.isHistoryLoading){
					return;
				}
				this.isHistoryLoading = true; //参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false; //关闭滑动动画
				// 消息列表
				let list =this.historyArr
				let len=list.length
				let startIndex=''
					startIndex=len-29
				let endIndex=len
				this.isHistoryLoading = false; //可以在加载了
				if(list.length<=30){
					startIndex=0
					this.isHistoryLoading = true; //不可以在加载了
				}
				// 获取消息中的图片,并处理显示尺寸
				for(let i=endIndex-1;i>=startIndex ;i--){
					if(list[i].type=='user'&&list[i].type=="img"){
						list[i].msg.content = this.setPicSize(list[i].msg.content);
						this.msgImgList.unshift(list[i].msg.content.url);
					}
					this.msgList.unshift(list[i]);
				}
				let Viewid = list[startIndex].id; //记住第一个信息ID
				list.splice(startIndex-1)
				//这段代码很重要，不然每次加载历史数据都会跳到顶部
				this.$nextTick(function() {
					this.scrollToView = 'msg' + Viewid; // 跳转上次的第一行信息位置
					this.$nextTick(function() {
						this.scrollAnimation = true; // 恢复滚动动画
					});
				});
			},
			// 加载初始页面消息
			getMsgList(){
				// 获取消息中的图片,并处理显示尺寸
				let list=this.msgList
				if(!list){
					return
				}
				for(let i=0;i<list.length;i++){
					if(list[i].type=='user' || list[i].type=="img"){
						if(JSON.parse(list[i].msg) instanceof Array){
							this.msgImgList.push(JSON.parse(list[i].msg)[0]);
						}else{
							let url=JSON.parse(list[i].msg).url
							if(url instanceof Array){
								this.msgImgList.push(url[0]);
							}else{
								this.msgImgList.push(url);
							}
						}
					}
				}
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 99999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});
				});
			},
			// 处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = Number(content.w)/Number(content.h);
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			// 更多功能(点击 + 弹出) 
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(type){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
					if(type!=1){
						this.keyHeight=0
					}
				},150);
			},
			// 选择图片发送
			chooseImage(){
				this.getImage('album');
			},
			// 拍照发送
			camera(){
				this.getImage('camera');
			},
			// 选照片 or 拍照
			getImage(type){
				this.hideDrawer();
				uni.chooseImage({
					sourceType:[type],
					sizeType: ['original', 'compressed'],
					success: (res)=>{
						for(let i=0;i<res.tempFilePaths.length;i++){
							uni.uploadFile({
								name: 'multipartFile',
								url: config.domain+'/zf/v1/file/uploads',
								formData: {
									'buketName': 'chat'
								},
								filePath: res.tempFilePaths[i],
									name:'file',
									header: {
										'Authorization': 'Bearer ' + this.$store.state.token
									},
								success: uploadFileRes => {
									let image = JSON.parse(uploadFileRes.data).data[0];
									uni.getImageInfo({
										src: image,
										success: (res1)=>{
											let msg = {url:image,w:res1.width,h:res1.height};
											this.sendMsg(msg,'img');
										}
									});
								},
								fail(err) {
									console.log(err);
								}
							});
						}
					}
				});
			},
			getElementHeight(){
				const query=uni.createSelectorQuery().in(this)
				query.select('.popup-layer').boundingClientRect(data=>{
					this.keyHeight=data.height
					this.scrollBottom()
				}).exec()
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					setTimeout(()=>{
						this.getElementHeight()
					},100)
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 添加表情
			addEmoji(em){
				let temp=this.textMsg.split('')
					this.textMsg+=em.alt
					this.hideMore = true;	
			},
			// 获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				this.$nextTick(()=>{
					uni.getSelectedTextRange({
						success:res=>{
							this.emojLen=res.start
						}
					})
				})
				this.hideMore =false
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer(1);
				}
			},
			// 发送文字消息
			async sendText(){
				getStoreData('isChatStatus')
				if(this.$store.state.isChatStatus){
					if(!this.textMsg){
						return
					}
					let content = this.replaceEmoji(this.textMsg);
					let msg = {text:content}
					this.sendMsg(msg,'text');
					this.textMsg = ''; // 清空输入框
				}
			},
			// 替换表情符号为图片
			replaceEmoji(str){
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = config.emojiUrl + '/emoji/'
								let imgstr = '<img src="'+onlinePath+EM.url+'"  width="18rpx" height="18rpx" alt="'+str+'">';
								return imgstr;
							}
						}
					}
				});
				return replacedStr
			},
			// 发送消息
			sendMsg(content,type){
				// 如果socket状态正常连接，则可以发送消息
				if (this.$store.state.socket_status) {
					switch (type) {
						case 'text':
							let data={
								'type': type,
								'msg':content.text,
								'target': this.targetUserName,
								'face':this.$store.state.userInfo.avatar,
								"from":this.currentName,
								"room":this.chatId
							}
							this.$socketInstance.send({
								data: JSON.stringify(data),
								async success() {
									console.log("普通消息发送成功");
								},
								async fail(err){
									console.log(err)
								}
							});
							break;
						case 'voice':
							let voice = JSON.stringify(content);
							let data1={
								'type': type,
								'msg':voice,
								'target':this.targetUserName,
								'face':this.$store.state.userInfo.avatar,
								"from":this.currentName,
								"room":this.chatId
								}
							this.$socketInstance.send({
								data: JSON.stringify(data1),
								async success() {
									console.log("语音发送成功");
								},
							});
							break;
						case 'img':
							let img = JSON.stringify(content);
							let data2={
								'type': type,
								'msg':img,
								'target':this.targetUserName,
								'face':this.$store.state.userInfo.avatar,
								"from":this.currentName,
								"room":this.chatId
								}
							this.$socketInstance.send({
								data: JSON.stringify(data2) ,
								async success() {
									console.log("图片发送成功");
								},
							});
							break;
					}
				}
			},
			// 预览图片
			showPic(msg){
				let currentUrl=''
				if(JSON.parse(msg).url instanceof Array){
					currentUrl=JSON.parse(msg).url[0]
				}else{
					currentUrl=JSON.parse(msg).url
				}
				this.msgImgList.push(currentUrl)
				uni.previewImage({
					indicator:"none",
					current:currentUrl,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg,id){
				this.playMsgid=id;
				this.AUDIO.src=JSON.parse(msg).url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){
					return ;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"mp3"});//录音开始,
			},
			// 录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){
					return;
				}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			// 录音结束(回调文件)
			recordEnd(res){
				clearInterval(this.recordTimer);
				if(!this.willStop){
					uni.uploadFile({
						name: 'multipartFile',
						url: config.domain+'/zf/v1/file/uploads',
						formData: {
							'buketName': 'chat'
						},
						filePath: res.tempFilePath,
						header: {
							'Authorization': 'Bearer ' + this.$store.state.token
						},
						success: uploadFileRes => {
							  let voice ='';
							  try{
								voice = JSON.parse(uploadFileRes.data).data[0];
							  }catch(e){
								console.log(e)
							  }
							let msg = {
								length:0,
								url:voice
							}
							let min = parseInt(this.recordLength/60);
							let sec = this.recordLength%60;
							min = min<10?'0'+min:min;
							sec = sec<10?'0'+sec:sec;
							msg.length = min+':'+sec;
							this.sendMsg(msg,'voice');
						},
						fail(err) {
							console.log(err);
						}
					});		
				}else{
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			},
			//滚动到底部
			scrollBottom(){
				that.scrollToView=''
				that.scrollAnimation = false
				that.$nextTick(function() {
					//进入页面滚动到底部
					if(that.msgList&&that.msgList.length>0){
						that.scrollToView="msg"+that.msgList[that.msgList.length-1].id
					}
					that.$nextTick(function() {
						that.scrollAnimation = true;
					});
				});
			}
		}
	}
</script>