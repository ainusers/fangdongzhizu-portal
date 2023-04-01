<style lang="scss">
	.community {
		display: flex;
		width: 100%;
		height: 280upx;
		align-items: center;
		background-color: #FFFFFF;
		flex-wrap: wrap;
		.option {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 140upx;
			.icon {
				image {
					height: 80upx;
					width: 80upx;
				}
			}
			.name {
				color: #333;
				line-height: 30upx;
			}
		}
	}
</style>
<template>
	<view>
		<!-- 轮播图 -->
		<u-swiper :list="swiperList" @click="click" radius="20rpx"></u-swiper>
		
		<!-- 功能菜单 -->
<!-- 		<view class="community">
			<view class="option" @click="goto('/pages/index/check/index')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/ad.png"></image>
				</view>
				<view class="name">热点资讯</view>
			</view>								
			<view class="option" @click="goto('/pages/tabbar/community/tools/news')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/churuku.png"></image>
				</view>
				<view class="name">万人群聊</view>
			</view>
		
			<view class="option" @click="goto('/pages/tabbar/me/tools/advise')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/jiaoyu.png"></image>
				</view>
				<view class="name">吐槽专区</view>
			</view>
			<view class="option" @click="goto('/pages/index/news/state')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/fujin.png"></image>
				</view>
				<view class="name">分享返现</view>
			</view>
			<view class="option" @click="goto('/pages/index/news/kepu')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/qushi.png"></image>
				</view>
				<view class="name">房屋清洁</view>
			</view>
			<view class="option" @click="goto('/pages/index/news/yaoyan')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/tongzhi.png"></image>
				</view>
				<view class="name">设备维修</view>
			</view>
			<view class="option" @click="goto('/pages/index/minsheng/index')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/wuye.png"></image>
				</view>
				<view class="name">货运搬家</view>
			</view>
			<view class="option" @click="goto('/pages/index/wuye/index')">
				<view class="icon">
					<image mode="aspectFit" src="../../../static/community/function/zhoubianzhanlichaxun.png"></image>
				</view>
				<view class="name">商务合作</view>
			</view>
		</view>
 -->
		<!-- 朋友圈 -->
		<post-list :list="tuwen_data" :loadStatus="load_status_tuwen"></post-list>
		
	</view>
</template>

<script>
	import postList from '../../../components/post-list/post-list.vue';
	export default {
		components: {
			postList
		},
		data() {
			return {
				swiperList: [
					'../../../static/community/banner/banner-1.png',
					'../../../static/community/banner/banner-2.png',
					'../../../static/community/banner/banner-3.png',
				],
				tuwen_data: [ {
								"id": 4048,
								"cid": 1,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"follow": false,
								"followCount": 0,
								"comment_count": 0,
								"share_count": 0,
								"avatar": "http://192.168.3.101:9090/asiatrip/63de0f9551b4bbd2cf765c361675497360154_mmexport1579505430486.jpg",
								"words": "今天是周一，我来上班了，手里的任务好多呀，安排好优先级，一件一件的做！！！",
								"imgUrl": ["https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281","https://img.tukuppt.com/photo-big/00/00/94/6152bc0ce6e5d805.jpg","https://img0.baidu.com/it/u=2028084904,3939052004&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500","https://img0.baidu.com/it/u=1472391233,99561733&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"],
								"longitude": "116.34125",
								"latitude": "39.936784",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "西城区-西直门外南路-26号院-北京建筑大学(西城校区)",
								"type": "gcj02",
								"updateTime": "2022-12-26T02:52:23.018+00:00",
								"createTime": "2022-12-26T02:52:23.018+00:00"
							},
							{
								"id": 1607350262874345473,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "现在我在地铁上，准备回家了。",
								"imgUrl": ["https://img2.baidu.com/it/u=3442493809,2528798933&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375","https://img95.699pic.com/xsj/19/8l/m1.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast"],
								"longitude": "116.344058",
								"latitude": "39.93243",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "西城区-展览馆路-12-4号-壹零捌道(车公庄店)",
								"type": "gcj02",
								"updateTime": "2022-12-26T12:19:00.451+00:00",
								"createTime": "2022-12-26T12:19:00.451+00:00"
							},
							{
								"id": 1607351406937870337,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "我现在到花园桥地铁站了",
								"imgUrl": ["http://81.70.163.240:9090/asiatrip/63afbfc474b82586c57f77271672462271452_IMG_20221219_204659.jpg",
											"http://81.70.163.240:9090/asiatrip/63afbfc474b82586c57f77271672462271452_IMG_20221219_204659.jpg",
											"http://81.70.163.240:9090/asiatrip/63afbfc474b82586c57f77271672462271452_IMG_20221219_204659.jpg"],
								"longitude": "116.310484",
								"latitude": "39.932368",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "海淀区-西三环北路辅路-38号-汉堡王(花园桥店)",
								"type": "gcj02",
								"updateTime": "2022-12-26T12:23:33.217+00:00",
								"createTime": "2022-12-26T12:23:33.217+00:00"
							},
							{
								"id": 1607356633464279042,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "我现在到金安桥地铁站了。",
								"imgUrl": ["http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f77291672462860233_IMG_20221219_204421.jpg",
											"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f77291672462860233_IMG_20221219_204421.jpg",
											"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f77291672462860233_IMG_20221219_204421.jpg",
											"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f77291672462860233_IMG_20221219_204421.jpg"],
								"longitude": "116.162621",
								"latitude": "39.923336",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "石景山区-北辛安路-9号院-麦当劳(北京北辛安路中海金安环宇荟餐厅)",
								"type": "gcj02",
								"updateTime": "2022-12-26T12:44:19.319+00:00",
								"createTime": "2022-12-26T12:44:19.319+00:00"
							},
							{
								"id": 1607358511279345666,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "这里是桥户营地铁站",
								"imgUrl": ["http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg",
								"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg",
								"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg",
								"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg",
								"http://81.70.163.240:9090/asiatrip/63afc22074b82586c57f772a1672462861375_IMG_20221219_204659.jpg"],
								"longitude": "116.124302",
								"latitude": "39.911615",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "门头沟区-石龙东路-32号院-北京市门头沟区华葳幼儿园",
								"type": "gcj02",
								"updateTime": "2022-12-26T12:51:47.023+00:00",
								"createTime": "2022-12-26T12:51:47.023+00:00"
							},
							{
								"id": 1607359154152902657,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "上岸地铁站",
								"imgUrl": ["http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
								"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
								"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
								"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
								"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp",
								"http://81.70.163.240:9090/asiatrip/63b045d399a03cc34c40d5d12.webp"],
								"longitude": "116.122243",
								"latitude": "39.907237",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "门头沟区-新城大街-9号-绿茶(门头沟龙湖店)",
								"type": "gcj02",
								"updateTime": "2022-12-26T12:54:20.296+00:00",
								"createTime": "2022-12-26T12:54:20.296+00:00"
							},
							{
								"id": 1607359704114237441,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "栗园庄地铁站",
								"imgUrl": ["http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772b1672462958086_Screenshot_2022-12-29-20-23-03-233_com.tencent.mm.png",
								"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
								"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
								"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
								"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
								"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png",
								"http://81.70.163.240:9090/asiatrip/63afc2ac74b82586c57f772c1672462958526_Screenshot_2022-12-29-20-21-50-035_com.tencent.mm.png"],
								"longitude": "116.122921",
								"latitude": "39.897435",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "门头沟区-新城大街-甲14号-艺优艺术培训中心",
								"type": "gcj02",
								"updateTime": "2022-12-26T12:56:31.418+00:00",
								"createTime": "2022-12-26T12:56:31.418+00:00"
							},
							{
								"id": 1607535086738182145,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "马上到西黄村地铁站了",
								"imgUrl": ["http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png"],
								"longitude": "116.187053",
								"latitude": "39.927891",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "石景山区-苹果园南路-18号-漫咖啡(苹果园大街店)",
								"type": "gcj02",
								"updateTime": "2022-12-27T00:33:25.895+00:00",
								"createTime": "2022-12-27T00:33:25.895+00:00"
							},
							{
								"id": 1607753669191766017,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "慈寿寺",
								"imgUrl": ["http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png"
								],
								"longitude": "116.293655",
								"latitude": "39.932642",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "海淀区-玲珑路-10号-星巴克(北京琨御府新址店)",
								"type": "gcj02",
								"updateTime": "2022-12-27T15:02:00.012+00:00",
								"createTime": "2022-12-27T15:02:00.012+00:00"
							},
							{
								"id": 1608089157253566466,
								"userId": 1606522650501607400,
								"username": "俊哥",
								"avatar": "http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png",
								"words": "海淀五路居",
								"imgUrl": ["http://81.70.163.240:9090/asiatrip/63b0463599a03cc34c40d5d2qq.png"],
								"longitude": "116.276636",
								"latitude": "39.932424",
								"country": "中国",
								"province": "北京市",
								"city": "北京市",
								"address": "海淀区-玲珑路-156号-YoKID优儿学堂(玲珑路托育园)",
								"type": "gcj02",
								"updateTime": "2022-12-28T13:15:06.598+00:00",
								"createTime": "2022-12-28T13:15:06.598+00:00"
							}
						],
				load_status_tuwen: 'loadmore',
				tuwen_default_page: 1
			}
		},
		computed: {
			
		},
		onLoad() {
			// 进入页面就加载推荐数据
			this.getMomentPost();
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.tuwen_default_page = 1;
			this.tuwen_data = this.tuwen_data.reverse();
			this.getMomentPost();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.tuwen_default_page++;
			this.getMomentPost();
		    this.tuwen_data = this.tuwen_data.concat(this.tuwen_data.slice(1,2));
		},
		methods: {
			// 跳转页面
			goto(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			// 获取图文数据
			getMomentPost() {
				// 测试数据待修改
				this.load_status_tuwen = 'loading';
				// this.$H.get('post/list', {
				// 	page: this.tuwen_default_page,
				// 	type: 1
				// })
				
				uni.request({
					method: 'get',
					header: {
						'content-type': 'application/json',
						'Authorization': 'Bearer '+this.$store.state.token
					},
					url: 'http://81.70.163.240:11001/zf/v1/dynamic/list',
					success: (res) => {
						console.log('res',res)
						if(res.data.code==200){
							this.tuwen_data = res.data.data;
							console.log(this.tuwen_data)
							// console.log("---------------> " + JSON.stringify(this.tuwen_data));
						}
						
					},
					fail: (e) => {
						console.log("e: " + JSON.stringify(e));
					}
				});
				
				// .then(res => {
				// 	if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
				// 		this.load_status_tuwen = 'nomore';
				// 	} else {
				// 		this.load_status_tuwen = 'loadmore';
				// 	}
				// });
			}
		}
	}
</script>