<style lang="scss">
	@import "@/style/chat/style.scss"; 
</style>
<template>
	<view class="news">
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据的滚动动画 -->
				<view class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<!-- 判断展示的内容类型 -->
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.id">
					<!-- 系统消息 -->
					<block v-if="row.type=='system'">
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.type=='system'" class="text">
								{{row.msg}}
							</view>
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type == 'text' || row.type == 'img' || row.type == 'voice'">
						<!-- 1. 自己发出的消息 -->
						<view class="my" v-if="row.from=='zhangjun8' || row.from=='zhangjun4' || row.from=='zhangjun7' || row.from=='zhangjun3' || row.from=='zhangjun5' || row.from=='zhangjun6'">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="row.type=='text'" class="bubble">
									<rich-text :nodes="row.msg"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.id?'play':''">
									<view class="length">{{JSON.parse(row.msg).length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="JSON.parse(row.msg).url" :style="{'width': JSON.parse(row.msg).w + 'px','height': JSON.parse(row.msg).w + 'px'}"></image>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.face"></image>
							</view>
						</view>
						<!-- 2. 别人发出的消息 -->
						<view class="other" v-if="row.from == 'zhangjun1' || row.from=='zhangjun2' || row.from=='zhangjun9' || row.from=='zhangjun10'">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.face"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.from}}</view> <view class="time">{{dateFormat(row.datetime)}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.type=='text'" class="bubble">
									<rich-text :nodes="row.msg"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{JSON.parse(row.msg).length}}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="JSON.parse(row.msg).url" :style="{'width': JSON.parse(row.msg).w + 'px','height': JSON.parse(row.msg).w + 'px'}"></image>
								</view>
							</view>
						</view>
					</block>
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
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
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
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" cursor-spacing="20"/>
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
	export default {
		data() {
			return {
				//文字消息
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				myuid:'zhangjun5',
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
					[{"url":"100.gif",alt:"[微笑]"},{"url":"101.gif",alt:"[伤心]"},{"url":"102.gif",alt:"[美女]"},{"url":"103.gif",alt:"[发呆]"},{"url":"104.gif",alt:"[墨镜]"},{"url":"105.gif",alt:"[哭]"},{"url":"106.gif",alt:"[羞]"},{"url":"107.gif",alt:"[哑]"},{"url":"108.gif",alt:"[睡]"},{"url":"109.gif",alt:"[哭]"},{"url":"110.gif",alt:"[囧]"},{"url":"111.gif",alt:"[怒]"},{"url":"112.gif",alt:"[调皮]"},{"url":"113.gif",alt:"[笑]"},{"url":"114.gif",alt:"[惊讶]"},{"url":"115.gif",alt:"[难过]"},{"url":"116.gif",alt:"[酷]"},{"url":"117.gif",alt:"[汗]"},{"url":"118.gif",alt:"[抓狂]"},{"url":"119.gif",alt:"[吐]"},{"url":"120.gif",alt:"[笑]"},{"url":"121.gif",alt:"[快乐]"},{"url":"122.gif",alt:"[奇]"},{"url":"123.gif",alt:"[傲]"}],
					[{"url":"124.gif",alt:"[饿]"},{"url":"125.gif",alt:"[累]"},{"url":"126.gif",alt:"[吓]"},{"url":"127.gif",alt:"[汗]"},{"url":"128.gif",alt:"[高兴]"},{"url":"129.gif",alt:"[闲]"},{"url":"130.gif",alt:"[努力]"},{"url":"131.gif",alt:"[骂]"},{"url":"132.gif",alt:"[疑问]"},{"url":"133.gif",alt:"[秘密]"},{"url":"134.gif",alt:"[乱]"},{"url":"135.gif",alt:"[疯]"},{"url":"136.gif",alt:"[哀]"},{"url":"137.gif",alt:"[鬼]"},{"url":"138.gif",alt:"[打击]"},{"url":"139.gif",alt:"[bye]"},{"url":"140.gif",alt:"[汗]"},{"url":"141.gif",alt:"[抠]"},{"url":"142.gif",alt:"[鼓掌]"},{"url":"143.gif",alt:"[糟糕]"},{"url":"144.gif",alt:"[恶搞]"},{"url":"145.gif",alt:"[什么]"},{"url":"146.gif",alt:"[什么]"},{"url":"147.gif",alt:"[累]"}],
					[{"url":"148.gif",alt:"[看]"},{"url":"149.gif",alt:"[难过]"},{"url":"150.gif",alt:"[难过]"},{"url":"151.gif",alt:"[坏]"},{"url":"152.gif",alt:"[亲]"},{"url":"153.gif",alt:"[吓]"},{"url":"154.gif",alt:"[可怜]"},{"url":"155.gif",alt:"[刀]"},{"url":"156.gif",alt:"[水果]"},{"url":"157.gif",alt:"[酒]"},{"url":"158.gif",alt:"[篮球]"},{"url":"159.gif",alt:"[乒乓]"},{"url":"160.gif",alt:"[咖啡]"},{"url":"161.gif",alt:"[美食]"},{"url":"162.gif",alt:"[动物]"},{"url":"163.gif",alt:"[鲜花]"},{"url":"164.gif",alt:"[枯]"},{"url":"165.gif",alt:"[唇]"},{"url":"166.gif",alt:"[爱]"},{"url":"167.gif",alt:"[分手]"},{"url":"168.gif",alt:"[生日]"},{"url":"169.gif",alt:"[电]"},{"url":"170.gif",alt:"[炸弹]"},{"url":"171.gif",alt:"[刀子]"}],
					[{"url":"172.gif",alt:"[足球]"},{"url":"173.gif",alt:"[瓢虫]"},{"url":"174.gif",alt:"[翔]"},{"url":"175.gif",alt:"[月亮]"},{"url":"176.gif",alt:"[太阳]"},{"url":"177.gif",alt:"[礼物]"},{"url":"178.gif",alt:"[抱抱]"},{"url":"179.gif",alt:"[拇指]"},{"url":"180.gif",alt:"[贬低]"},{"url":"181.gif",alt:"[握手]"},{"url":"182.gif",alt:"[剪刀手]"},{"url":"183.gif",alt:"[抱拳]"},{"url":"184.gif",alt:"[勾引]"},{"url":"185.gif",alt:"[拳头]"},{"url":"186.gif",alt:"[小拇指]"},{"url":"187.gif",alt:"[拇指八]"},{"url":"188.gif",alt:"[食指]"},{"url":"189.gif",alt:"[ok]"},{"url":"190.gif",alt:"[情侣]"},{"url":"191.gif",alt:"[爱心]"},{"url":"192.gif",alt:"[蹦哒]"},{"url":"193.gif",alt:"[颤抖]"},{"url":"194.gif",alt:"[怄气]"},{"url":"195.gif",alt:"[跳舞]"}],
					[{"url":"196.gif",alt:"[发呆]"},{"url":"197.gif",alt:"[背着]"},{"url":"198.gif",alt:"[伸手]"},{"url":"199.gif",alt:"[耍帅]"},{"url":"200.png",alt:"[微笑]"},{"url":"201.png",alt:"[生病]"},{"url":"202.png",alt:"[哭泣]"},{"url":"203.png",alt:"[吐舌]"},{"url":"204.png",alt:"[迷糊]"},{"url":"205.png",alt:"[瞪眼]"},{"url":"206.png",alt:"[恐怖]"},{"url":"207.png",alt:"[忧愁]"},{"url":"208.png",alt:"[眨眉]"},{"url":"209.png",alt:"[闭眼]"},{"url":"210.png",alt:"[鄙视]"},{"url":"211.png",alt:"[阴暗]"},{"url":"212.png",alt:"[小鬼]"},{"url":"213.png",alt:"[礼物]"},{"url":"214.png",alt:"[拜佛]"},{"url":"215.png",alt:"[力量]"},{"url":"216.png",alt:"[金钱]"},{"url":"217.png",alt:"[蛋糕]"},{"url":"218.png",alt:"[彩带]"},{"url":"219.png",alt:"[礼物]"},]				
				],
				//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
				onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"},
				//红包相关参数
				windowsState:'',
				redenvelopeData:{
					rid:null,	//红包ID
					from:null,
					face:null,
					blessing:null,
					money:null
				}
			};
		},
		onLoad(option) {
			this.getMsgList();
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
			// 进入页面就创建万人群链接
			this.initSocket();
		},
		onShow(){
			this.scrollTop = 9999999;
			// 模板借由本地缓存实现发红包效果，实际应用中请不要使用此方法。
			uni.getStorage({
				key: 'redEnvelopeData',
				success:  (res)=>{
					console.log(res.data);
					let nowDate = new Date();
					let lastid = this.msgList[this.msgList.length-1].id;
					lastid++;
					let row = {type:"user",msg:{id:lastid,type:"redEnvelope",time:nowDate.getHours()+":"+nowDate.getMinutes(),userinfo:{uid:0,username:"大黑哥",face:"/static/chat/face.jpg"},content:{blessing:res.data.blessing,rid:Math.floor(Math.random()*1000+1),isReceived:false}}};
					this.screenMsg(row);
					uni.removeStorage({key: 'redEnvelopeData'});
				}
			});
		},
		methods:{
			// 创建websocket连接方法
			initSocket() {
				// 创建socketInstance对象实例，进行所有操作
				this.socketInstance = uni.connectSocket({
					// 确保你的服务器是运行态
					url: "ws://81.70.163.240:17180/websocket",
					success(data) {
						// console.log("websocket连接状态：" + JSON.stringify(data.errMsg));
					}
				});
				// 打开socket链接
				this.socketInstance.onOpen((res) => {
					console.log("WebSocket连接正常打开中..." + JSON.stringify(res));
					this.socket_status = true;
					// 发送认证消息
					this.authSocket();
				});
				// 接受服务端消息
				this.socketInstance.onMessage((res) => {
					console.log("收到服务器内容：" + res.data);
					let data = eval("(" + res.data + ")");
					switch (data.type) {
						case 'system':
							this.addSystemTextMsg(data);
							break;
						case 'text':
							this.addTextMsg(data);
							break;
						case 'voice':
							this.addVoiceMsg(data);
							break;
						case 'img':
							this.addImgMsg(data);
							break;
					}
					// 非自己的消息震动
					// if(data.from != 'zhangjun8' || data.from != 'zhangjun4' || data.from != 'zhangjun7' || data.from != 'zhangjun3' || data.from != 'zhangjun5' || data.from != 'zhangjun6'){
					// 	console.log('振动');
					// 	uni.vibrateLong();
					// }
					// 滚动到底
					this.$nextTick(function() {
						this.scrollToView = 'msg' + data.id
					});
				});
				// 监听socket关闭链接
				this.socketInstance.onClose(() => {
					console.log("已经被关闭了")
				})
			},
			// 关闭socket
			closeSocket() {
				this.socketInstance.close({
					success(res) {
						this.socket_status = false;
						console.log("关闭通信服务成功", res)
					},
					fail(err) {
						console.log("关闭通信服务失败", err)
					}
				})
			},
			// 点击发送数据按钮
			sendGenernalMsg() {
				if (this.socket_status) {
					this.socketInstance.send({
						data: "{'type':'text','msg':'" + this.textMsg + "','target':'all'}",
						async success() {
							console.log("普通消息发送成功");
						},
					});
				}
			},
			// 发送认证消息
			authSocket() {
				if (this.socket_status) {
					this.socketInstance.send({
						data: "{'type':'signal','from':'zhangjun" + Math.floor(Math.random() * 10 + 1) + "'}",
						async success() {
							console.log("认证消息发送成功");
						},
					});
				}
			},
			// 触发滑动到顶部 (加载历史信息记录)
			loadHistory(e){
				if(this.isHistoryLoading){
					return;
				}
				this.isHistoryLoading = true; //参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false; //关闭滑动动画
				//本地模拟请求历史记录效果
				setTimeout(()=>{
					// 消息列表
					let list = [
						{"auth":true,"datetime":"1657357976767","from":"zhangjun8","id":826627537346224360,"msg":"大家聊的挺好呀","status":"true","target":"all","type":"text",face:"/static/chat/head/face_7.jpg"},
						{"auth":true,"datetime":"1654355976768","from":"zhangjun9","id":826623537546224361,"msg":"你们都是哪儿的","status":"true","target":"all","type":"text",face:"/static/chat/head/face_8.jpg"},
						{"auth":true,"datetime":"1654355976768","from":"zhangjun9","id":826623537546224361,"msg":"你们都是哪儿的","status":"true","target":"all","type":"text",face:"/static/chat/head/face_8.jpg"},
						{"auth":true,"datetime":"1657358976769","from":"zhangjun10","id":826227537546224362,"msg":"北京","status":"true","target":"all","type":"text",face:"/static/chat/head/face_9.jpg"},
						{"auth":true,"datetime":"1657358976769","from":"zhangjun10","id":826227537546224362,"msg":"北京","status":"true","target":"all","type":"text",face:"/static/chat/head/face_9.jpg"},
						{"auth":true,"datetime":"1657358976769","from":"zhangjun10","id":826227537546224362,"msg":"北京","status":"true","target":"all","type":"text",face:"/static/chat/head/face_9.jpg"},
						{"auth":true,"datetime":"1657355976770","from":"zhangjun7","id":826627557546224363,"msg":"天津","status":"true","target":"all","type":"text",face:"/static/chat/head/face_10.jpg"},
						{"auth":true,"datetime":"1657355976770","from":"zhangjun7","id":826627557546256363,"msg":"河北","status":"true","target":"all","type":"text",face:"/static/chat/head/face_11.jpg"},
						{"auth":true,"datetime":"1657355976770","from":"zhangjun7","id":826627557346224363,"msg":"西安","status":"true","target":"all","type":"text",face:"/static/chat/head/face_12.jpg"},
						{"auth":true,"datetime":"1657355976770","from":"zhangjun7","id":826627557546434363,"msg":"河南","status":"true","target":"all","type":"text",face:"/static/chat/head/face_13.jpg"},
						{"auth":true,"datetime":"1657355976770","from":"zhangjun7","id":826627532546224363,"msg":"海南","status":"true","target":"all","type":"text",face:"/static/chat/head/face_14.jpg"}
					]
					// 获取消息中的图片,并处理显示尺寸
					for(let i=0;i<list.length;i++){
						if(list[i].type=='user'&&list[i].type=="img"){
							list[i].msg.content = this.setPicSize(list[i].msg.content);
							this.msgImgList.unshift(list[i].msg.content.url);
						}
						list[i].id = Math.floor(Math.random()*1000+1);
						this.msgList.unshift(list[i]);
					}
					let Viewid = list[0].id; //记住第一个信息ID
					//这段代码很重要，不然每次加载历史数据都会跳到顶部
					this.$nextTick(function() {
						this.scrollToView = 'msg' + Viewid; // 跳转上次的第一行信息位置
						this.$nextTick(function() {
							this.scrollAnimation = true; // 恢复滚动动画
						});
					});
					this.isHistoryLoading = false;
				},1000)
			},
			// 加载初始页面消息
			getMsgList(){
				// 消息列表
				let list = [
					{"auth":true,"datetime":"1657355976760","from":"zhangjun1","id":826627537546224360,"msg":"你好？","status":"true","target":"all","type":"text",face:"/static/chat/head/face.jpg"},
					{"auth":true,"datetime":"1657355976761","from":"zhangjun2","id":826627537546224361,"msg":"嗯嗯","status":"true","target":"all","type":"text",face:"/static/chat/head/face_1.jpg"},
					{"auth":true,"datetime":"1657355976762","from":"zhangjun3","id":826627537546224362,"msg":"你是谁呀","status":"true","target":"all","type":"text",face:"/static/chat/head/face_2.jpg"},
					{"auth":true,"datetime":"1657355976763","from":"zhangjun4","id":826627537546224363,"msg":"我在万人群","status":"true","target":"all","type":"text",face:"/static/chat/head/face_3.jpg"},
					{"auth":true,"datetime":"1657355976764","from":"zhangjun5","id":826627537546224364,"msg":"你俩不认识？","status":"true","target":"all","type":"text",face:"/static/chat/head/face_4.jpg"},
					{"auth":true,"datetime":"1657355976765","from":"zhangjun6","id":826627537546224365,"msg":"吃饭了没有","status":"true","target":"all","type":"text",face:"/static/chat/head/face_5.jpg"},
					{"auth":true,"datetime":"1657355976766","from":"zhangjun7","id":826627537546224366,"msg":"你猜","status":"true","target":"all","type":"text",face:"/static/chat/head/face_6.jpg"},
					{"auth":true,"datetime":"1657355976767","from":"zhangjun8","id":826627537546224366,"msg":"猜个屁","status":"true","target":"all","type":"text",face:"/static/chat/head/face_6.jpg"},
					{"auth":true,"datetime":"1657325976766","from":"zhangjun9","id":826627537546224366,"msg":"说不说","status":"true","target":"all","type":"text",face:"/static/chat/head/face_6.jpg"},
					{"auth":true,"datetime":"1657355976766","from":"zhangjun10","id":826627537546224366,"msg":"不说","status":"true","target":"all","type":"text",face:"/static/chat/head/face_6.jpg"},
					{"auth":true,"datetime":"1657355976766","from":"zhangjun1","id":826627537546224366,"msg":"欢迎进入万人群","status":"true","target":"all","type":"system",face:"/static/chat/head/face_6.jpg"}
				]
				// 获取消息中的图片,并处理显示尺寸
				for(let i=0;i<list.length;i++){
					if(list[i].type=='user' && list[i].type=="img"){
						list[i].msg.content = this.setPicSize(list[i].msg.content);
						this.msgImgList.push(list[i].msg.content.url);
					}
				}
				this.msgList = list;
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
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
					let scale = content.w/content.h;
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
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
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
								url: 'http://81.70.163.240:15329/uploadFile?buketName=asiatrip',
								buketName: 'asiatrip',
								filePath: res.tempFilePaths[i],
								success: uploadFileRes => {
									let image = JSON.parse(uploadFileRes.data).data.originUrl;
									let msg = {url:image,w:200,h:200};
									this.sendMsg(msg,'img');
								},
								fail(err) {
									console.log(err);
								}
							});
							// uni.getImageInfo({
							// 	src: res.tempFilePaths[i],
							// 	success: (image)=>{
							// 		let msg = {url:res.tempFilePaths[i],w:image.width,h:image.height};
							// 		this.sendMsg(msg,'img');
							// 	}
							// });
						}
					}
				});
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 添加表情
			addEmoji(em){
				this.textMsg+=em.alt;
			},
			// 获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText(){
				this.hideDrawer(); // 隐藏抽屉
				if(!this.textMsg){
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = ''; // 清空输入框
			},
			// 替换表情符号为图片
			replaceEmoji(str){
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					console.log("item: " + item);
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								let imgstr = '<img src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return '<div style="display: flex;align-items: center;word-wrap:break-word;">'+replacedStr+'</div>';
			},
			// 发送消息
			sendMsg(content,type){
				// 如果socket状态正常连接，则可以发送消息
				if (this.socket_status) {
					switch (type) {
						case 'text':
							this.socketInstance.send({
								data: "{'type':'" + type + "','msg':'" + this.textMsg + "','target':'all'}",
								async success() {
									console.log("普通消息发送成功");
								},
							});
							break;
						case 'voice':
							let voice = JSON.stringify(content);
							this.socketInstance.send({
								data: "{'type':'" + type + "','msg':'" + voice + "','target':'all'}",
								async success() {
									console.log("语音发送成功");
								},
							});
							break;
						case 'img':
							let img = JSON.stringify(content);
							this.socketInstance.send({
								data: "{'type':'" + type + "','msg':'" + img + "','target':'all'}",
								async success() {
									console.log("图片发送成功");
								},
							});
							break;
					}
				}
			},
			// 添加文字消息到列表
			addTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg){
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg){
				msg.msg = this.setPicSize(msg.msg);
				this.msgImgList.push(JSON.parse(msg.msg).url);
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){
				this.msgList.push(msg);
			},
			sendSystemMsg(content,type){
				let lastid = this.msgList[this.msgList.length-1].id;
				lastid++;
				let row = {type:"system",msg:{id:lastid,type:type,content:content}};
				this.screenMsg(row)
			},
			// 预览图片
			showPic(msg){
				uni.previewImage({
					indicator:"none",
					current:JSON.parse(msg).url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=JSON.parse(msg).id;
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
						url: 'http://81.70.163.240:11001/uploadFile?buketName=asiatrip',
						buketName: 'zufang-chat',
						filePath: res.tempFilePath,
						success: uploadFileRes => {
							let voice = JSON.parse(uploadFileRes.data).data.originUrl;
							let msg = {url:voice, length:8};
							this.sendMsg(msg,'voice');
						},
						fail(err) {
							console.log(err);
						}
					});
					// console.log("e: " + JSON.stringify(e));
					// let msg = {
					// 	length:0,
					// 	url:e.tempFilePath
					// }
					// let min = parseInt(this.recordLength/60);
					// let sec = this.recordLength%60;
					// min = min<10?'0'+min:min;
					// sec = sec<10?'0'+sec:sec;
					// msg.length = min+':'+sec;
					// this.sendMsg(msg,'voice');
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
			// 格式化时间戳
			dateFormat(timestamp) {
				let date = new Date(Number(timestamp));
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				let m = date.getMinutes() + ':';
				let s = date.getSeconds();
				return Y+M+D+h+m+s;
			}
		}
	}
</script>