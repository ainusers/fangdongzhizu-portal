<template>
	<view>
		<view class="ranking-list">
			<!-- 企业雇主指数及排名模块 -->
			<view class="company-title">
				<view class="search-container">
					<input class="search-input" type="text" v-model="searchCompanyName" placeholder="请输入公司名称" @input="handleInput" />
					<button style="color: #1183fb;border-color: #1183fb;" @click="search" class="search-button"
						type="primary" plain="true" @tap="$u.throttle(search, 2000)">查询
					</button>
				</view>
			</view>
			<view class="ranking-item" v-for="(item, index) in rankingList" :key="index">
				<view v-if="index === 0">
					<view class="top-item1" @click="toDetail(item.code)">
						<view class="rank top1">{{ index + 1 }}</view>
						<view class="name">{{ item.name }}</view>
						<view class="score">
							<view>{{ item.score }}</view>
							<view style="color: #252933;font-size: 12px;">风险指数</view>
						</view>
					</view>
				</view>
				<view v-else-if="index === 1">
					<view class="top-item2" @click="toDetail(item.code)">
						<view class="rank top2">{{ index + 1 }}</view>
						<view class="name">{{ item.name }}</view>
						<view class="score">
							<view>{{ item.score }}</view>
							<view style="color: #252933;font-size: 12px;">风险指数</view>
						</view>
					</view>
				</view>
				<view v-else-if="index === 2">
					<view class="top-item3" @click="toDetail(item.code)">
						<view class="rank top3">{{ index + 1 }}</view>
						<view class="name">{{ item.name }}</view>
						<view class="score">
							<view>{{ item.score }}</view>
							<view style="color: #252933;font-size: 12px;">风险指数</view>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="other-item" @click="toDetail(item.code)">
						<view class="rank">{{ index + 1 }}</view>
						<view class="name">{{ item.name }}</view>
						<view class="score">
							<view>{{ item.score }}</view>
							<view style="color: #252933;font-size: 12px;">风险指数</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 编辑按钮 (当待审核、已发布、已下架时显示)-->
		<view class="operate" @click="publish">
			<uni-icons custom-prefix="iconfont" type="icon-bianji" color="#1183fb" size="30"></uni-icons>
			<view style="color:#1183fb;font-size: 14px;">发布</view>
		</view>

		<view>
			<u-loadmore v-if="rankingList.length>0" :status="status" :loading-text="loadingText"
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" icon-color="#1183fb" color="#999" />
			<view v-if="nodataFlag && isShow">
				<u-empty text="暂无数据" mode="favor"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankingList: [],
				searchCompanyName: '',
				status: 'loadmore',
				loadmoreText: '轻轻上拉加载更多...',
				loadingText: '努力加载中...',
				nomoreText: '没有更多了',
				nodataFlag: false,
				isShow: false,
				listPage: 1,
				pageSize: 15,
				changeFlag:false,
				ScrollFlag:false
			};

		},
		onShow() {
			this.listPage = 1;
			this.rankingList = [];
			// 查询风险企业清单
			this.search();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.listPage = 1;
			this.rankingList = [];
			this.nodataFlag = false;
			this.isShow = false;
			this.search();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom() {
			if (!this.nodataFlag && !this.isShow) {
				this.listPage++;
				this.ScrollFlag = true;
				this.search();
			} else {
				uni.showToast({
					icon: 'none',
					title: "小主,别使劲,已经到底了"
				})
				uni.stopPullDownRefresh();
			}
		},
		methods: {
			//监听输入框变化
			handleInput(e){
				this.changeFlag = true;
			},
			// 查询指定名称的公司
			search() {
				if(!this.ScrollFlag){
					if (this.changeFlag ) {
						this.listPage = 1
						this.rankingList = []
						this.status = 'loadmore'
						this.nodataFlag = false
						this.isShow = false
						this.ScrollFlag = false
					}
				}
				let data = {
					"page": this.listPage,
					"size": this.pageSize,
					"name": this.searchCompanyName
				}
				this.$H.get('/zf/v1/feel/list', data, true).then(res => {
					if (res.status) {
						if (res.data.length > 0) {
							this.rankingList = [...this.rankingList, ...res.data]
							if (res.data.length == this.pageSize) {
								this.status = 'loadmore'
							} else {
								this.status = 'nomore'
								this.isShow = true;
							}
						} else {
							this.status = 'nomore'
							this.nodataFlag = true;
							this.isShow = true;
						}
					}
				})
				this.ScrollFlag = false
			},
			// 跳转反馈详情页
			toDetail(code) {
				uni.navigateTo({
					url: '/pages/tabbar/me/list/list-detail?code=' + code
				})
			},
			// 发布
			publish() {
				uni.navigateTo({
					url: '/pages/tabbar/me/list/feel'
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	body {
		font-family: Arial, sans-serif;
		background-color: #f4f4f4;
		margin: 0;
	}

	.ranking-list {
		background-color: #fff;
		padding: 0 5px;
		border-radius: 8px;
		margin: auto;
		position: relative;
	}

	.company-title {
		padding: 3px 0;
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 999;
	}

	.search-container {
		display: flex;
		flex-direction: row;
		margin: 5px;

		.search-input {
			height: 25px;
			width: 80%;
			font-size: 15px;
			padding: 5px 10px;
			border: 1px solid #ddd;
			border-radius: 5px;
		}

		.search-button {
			height: 35px;
			width: 20%;
			font-size: 15px;
			line-height: 35px;
			border-radius: 5px;
			margin-left: 5px;
		}
	}

	.ranking-item {
		height: 50px;
		margin: 5px 0;
		border-bottom: 1px solid #eee;
		box-shadow: 0 0 15px 1px rgba(224, 224, 224, 0.5);

		.top-item1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 5px;
			background: linear-gradient(to right, #faf1f2, rgba(254, 45, 70, 0.99));
			height: 50px;

			.top1 {
				color: #FE2D46;
			}
		}

		.top-item2 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 5px;
			background: linear-gradient(to right, #faf1f2, #F60);
			height: 50px;

			.top2 {
				color: #F60;
			}
		}

		.top-item3 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 5px;
			background: linear-gradient(to right, #faf1f2, #fcc45a);
			height: 50px;

			.top3 {
				color: #FAA90E;
			}
		}

		.other-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 5px;
			height: 50px;
		}

		.rank {
			font-size: 18px;
			font-weight: bold;
			width: 40px;
			text-align: center;
			color: #9195A3;
		}

		.name {
			font-size: 14px;
			flex: 1;
			color: #252933;
		}

		.score {
			font-size: 16px;
			color: #252933;
			text-align: right;
			padding-right: 8px;
			display: flex;
			flex-direction: column;
		}
	}
	
	.operate {
    bottom: 60px;
    position: fixed;
    z-index: 999;
    left: 75%;
	}
</style>