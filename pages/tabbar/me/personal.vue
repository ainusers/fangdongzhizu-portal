<template>
	<view class="personal_main">
		<view class="person_info">
			<!-- 个人信息 -->
			<myInfoAavtar :userInfo="userInfo" :isShow="false"/>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="person_info_ti">
			
		</view>
		<view class="personal_bottom">
			<view v-show="current==0">
				<scroll-view scroll-y="true" class="scroll-view-height list-content" @scrolltolower="scrolltolower">
					<view>
						<view class="content">
							<!-- 列表 -->
							<div v-if="houseList.length>0">
								<block v-for="(item, index) in houseList" :key="index">
									<house-list-item ref="ListItem" :item="item" :index="index"
										@updateHouseList="updateHouseList"></house-list-item>
								</block>
							</div>
							<div v-else>
								<p class="home_nodata">暂无数据</p>
							</div>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-show="current==1">
				<post-list :list="tuwen_data" :loadStatus="load_status_tuwen"  @clickLike="clickLikes" :isPersonal="true"></post-list>
			</view>
		</view>
	</view>
</template>

<script>
	var that = ''
	import postList from '@/components/post-list/post-list.vue';
	import houseListItem from '@/components/house-list/house-list-item.vue';
	import { getuserInfo } from '@/utils/utils.js'
	import myInfoAavtar from '@/components/common/myInfoAvatar.vue'
	export default {
		data() {
			return {
				list: [
					{
						name: 'TA的房源'
					},
					{
						name: 'TA的动态'
					}
				],
				current: 0,
				userInfo: '',
				houseList: [],
				pageNum: 1,
				tuwen_data: [],
				load_status_tuwen: 'loadmore',
				currPage: 1, //图文的页码
				userId: ''
			}
		},
		
		onLoad(options) {
			that = this
			this.userId = options.userId
			this.getstatusHouseList()
			this.getTuwen()
			this.getHead()
		},
		components: {
			houseListItem,
			postList,
			myInfoAavtar
		},
		methods: {
			//动态点赞
			clickLikes(id,isLove,index){
				let data={
					userId:this.$store.state.userInfo.id,
					id:id?id:0,
					type:isLove?'plus':'reduce',
				}
				this.$H.patch('/zf/v1/dynamic/follow',data,true).then(res=>{
					if(res.status&&res.status!=500){
						res.data[0].count?this.tuwen_data[index].likes+=1 :this.tuwen_data[index].likes-=1
					}
				})
			},
			getHead(userId) {
				getuserInfo(this.userId).then(res => {
					console.log(res)
					this.userInfo = res
				})
			},
			change(index) {
				this.current = index;
			},
			scrolltolower() {
				if (this.loadStatus == 'loadmore') {
					this.pageNum++
					this.getstatusHouseList(Number(this.current) + 1)
				}
			},
			getstatusHouseList() {
				let params = {
					"page": this.pageNum,
					"size": "10",
					"status": 2, //(1:待审核,2:已发布,3:已下架)
					"user_id": this.userId,
				}
				//1 待审核 2 已发布  3已下架
				this.$H.post('/zf/v1/room/list', params, true).then(res => {
					console.log(res)
					if (res.data && res.status && res.data.length > 0) {
						that.houseList = [...that.houseList, ...res.data]
						console.log(that.houseList)
					} else if (res.data.length == 0 && that.houseList.length == 0) {
						this.houseList = []
					} else {
						this.loadStatus = 'end'
						uni.showToast({
							icon: 'none',
							title: '已加载完成'
						});
					}
					that.$store.commit('houseInfo', that.houseList)
				})
			},
			//下架刷新
			updateHouseList() {
				this.pageNum = 1
				this.getstatusHouseList(2)
			},
			getTuwen() {
				let data = {
					userId: this.userId,
					page: this.currPage,
					size: 10,
					// way:'user'
				}
				let url = '/zf/v1/dynamic/user'
				this.$H.get(url, data, true).then(res => {
					if (res.status) {
						that.tuwen_data = [...that.tuwen_data, ...res.data]
						this.tuwen_data.forEach(item=>{
							item.image=item.imgurl.split(',')
							this.$set(item,'isReport',false)
						})
						if (that.tuwen_data.length == 0 || that.tuwen_data.length<10) {
							that.load_status_tuwen = 'nomore'
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.person_info {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10;
	}
	.personal_bottom {
		position: absolute;
		width: 100%;
		height: 65%;
		bottom: 0;
		overflow-y: scroll;
		webkit-overflow-scrolling: touch;
	}

	//个人信息
	.top {
		height: 250rpx;
		position: relative;

		.background {
			background-color: #5199ff;
			border-bottom-left-radius: 22px;
			border-bottom-right-radius: 22px;
			position: absolute;
			height: 300rpx;
			width: 100%;
		}
	}

	.user-card {
		height: 200rpx;
		padding: 0 15px;

		.card {
			position: relative;
			bottom: 40px;
			height: 250rpx;
			background-color: #ffffff;
			border-radius: 5px;
			box-shadow: 0 0 15px 1px rgba(224, 224, 224, 50%);

			.top {
				height: 30%;
				position: relative;

				.userImage {
					background-color: white;
					position: relative;
					bottom: 40px;
					margin: 0 auto;
					width: 140rpx;
					height: 140rpx;
					overflow: hidden;
					border-radius: 50%;
					border: 1px solid #eee;

					image {
						display: initial;
					}

					/deep/.avatar {
						width: 140rpx;
						height: 140rpx;
					}
				}
			}

			.bottom {
				display: flex;
				height: 70%;

				.left {
					width: 100%;
					height: 100%;
					position: relative;

					.user-text {
						width: 100%;
						font-size: 30rpx;
						text-align: center;

						.sex_con {
					 	display: inline-block;
							width: 25rpx;
							height: 33rpx;
						}

						.userNickName {
							display: inline-flex;
							align-items: center;
						}

						image {
					 	height: 30px;
							width: 30px;
					 	padding-left: 5px;
							line-height: 200%;
						}
					}

					.user-phone {
						width: 300px;
						margin: auto;
						padding-top: 5px;
						font-size: 28rpx;
						text-align: center;
					}
				}

				.right {
					width: 20%;
					height: 50%;
				}
			}
		}
	}

	.renzheng_icon {
		display: block;
		width: 120upx;
		height: 40upx;
		position: relative;
		bottom: 110rpx;
		margin: 0 auto;
	}

	.home_nodata {
		padding: 5px 0;
		text-align: center;
	}
</style>
