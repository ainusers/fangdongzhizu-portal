<template>
	<view>
		<view class="ranking-list">
			<!-- 企业雇主指数及排名模块 -->
			<view class="company-title">
				<view class="search-container">
					<input class="search-input" type="text" v-model="searchCompanyName" placeholder="请输入公司名称" />
					<button style="color: #0076f6;border-color: #0076f6;" @click="search" class="search-button"
						type="primary" plain="true" @tap="$u.throttle(search, 2000)">查询
					</button>
				</view>
			</view>
			<view class="ranking-item" v-for="(item, index) in rankingList" :key="index">
				<view v-if="index === 0">
					<view class="top-item1" @click="toDetail(item.code)">
						<view class="rank top1">{{ index + 1 }}</view>
						<text class="name">{{ item.name }}</text>
						<text class="score">
							<view>{{ item.score }}</view>
							<view style="color: #252933;font-size: 12px;">风险指数</view>
						</text>
					</view>
				</view>
				<view v-else-if="index === 1">
					<view class="top-item2" @click="toDetail(item.code)">
						<view class="rank top2">{{ index + 1 }}</view>
						<text class="name">{{ item.name }}</text>
						<text class="score">
							<view>{{ item.score }}</view>
							<view style="color: #252933;font-size: 12px;">风险指数</view>
						</text>
					</view>
				</view>
				<view v-else-if="index === 2">
					<view class="top-item3" @click="toDetail(item.code)">
						<view class="rank top3">{{ index + 1 }}</view>
						<text class="name">{{ item.name }}</text>
						<text class="score">
							<view>{{ item.score }}</view>
							<view style="color: #252933;font-size: 12px;">风险指数</view>
						</text>
					</view>
				</view>
				<view v-else>
					<view class="other-item" @click="toDetail(item.code)">
						<view class="rank">{{ index + 1 }}</view>
						<text class="name">{{ item.name }}</text>
						<text class="score">
							<view>{{ item.score }}</view>
							<view style="color: #252933;font-size: 12px;">风险指数</view>
						</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 编辑按钮 (当待审核、已发布、已下架时显示)-->
		<view class="operate" @click="publish">
			<uni-icons custom-prefix="iconfont" type="icon-bianji" color="#0076f6" size="30"></uni-icons>
			<view style="color:#0076f6;font-size: 14px;">发布</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rankingList: [],
				searchCompanyName: ''
			};
		},
		onLoad() {
			// 查询风险企业清单
			this.companyList();
		},
		methods: {
			// 查询指定名称的公司
			search() {
				this.$H.get('/zf/v1/feel/name',{name: this.searchCompanyName},true).then(res=>{
					if(res.status){
						this.rankingList = res.data
					}
				})
			},
			// 跳转反馈详情页
			toDetail(code) {
				uni.navigateTo({
					url: '/pages/tabbar/me/list/list-detail?code='+code
				})
			},
			// 发布
			publish(){
				uni.navigateTo({
					url: '/pages/tabbar/me/list/feel'
				})
			},
			// 查询风险企业清单
			companyList(){
				this.$H.get('/zf/v1/feel/list',{},true).then(res=>{
					if(res.status){
						this.rankingList = res.data
					}
				})
			}
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