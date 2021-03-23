<template>

	<uni-clayout :isBack="true" navTitle="视频监控">
		<view class="me-fx-col" style="height: 100%;">
			<uni-tab :tabActive.sync="tabActive" :tabList="tabList"></uni-tab>
			<!-- <view class="photoSeacher me-fx-row-c-c">
				<image src="/static/search@2x.png" mode=""></image>
				<input type="text" value="" placeholder="请输入摄像头位置" placeholder-class="photoSeacher_placeholder" />
			</view> -->
			<view class="me-fx-1 scrolly">
				<scroll-view scroll-y v-show="tabActive===0">
					<view class="photoList">
						<view :class="['photoList_one',item.isShow?'photoList_one_show':'']" @tap="getCamerasList(item)" v-for="(item,index) in cameralist"
						 :key="index">
							<view class="me-fx-row-c-c">
								<view class="me-fx-1">{{item.name}}</view>
								<view class="photoList_desc">
									<image :class="[item.isShow?'rotate':'']" src="/static/down@2x.png"></image>
								</view>
							</view>
							<u-loadmore status="loading" color="#fff" icon-type="flower" v-show="item.isloadShow" />
							<view class="photoList_two" v-show="item.isShow">
								<view class="photoList_two_one me-fx-row-start-c" v-for="(items,indexs) in item.list" :key="indexs" @tap.stop="getVideo(items)">
									<image src="/static/camera@2x.png" mode=""></image>
									{{items.cameraName}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<map :scale="18" @markertap="markertap" :latitude="latitude" :longitude="longitude" :markers="markers" v-show="tabActive===1" />
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</uni-clayout>

</template>
<script>
	export default {
		data() {
			const videoModule = uni.requireNativePlugin("VideoModule")
			return {
				videoModule,
				tabActive: 0,
				tabList: [{
						tabName: '列表模式',
						id: 0
					},
					{
						tabName: '地图模式',
						id: 1
					}
				],
				regionIndexCode: '',
				latitude: 25.189824,
				longitude: 116.381477,
				markers: [],
				cameralist: [],
				mapCamerList:[],
				isPlayer: false,
				scrollTop: 0
			}
		},
		onLoad() {
			this.getInit()
		},
		onShow() {
			this.isPlayer = false
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			async getInit() {
				const {
					data
				} = await this.$api.User.spjkRegions()
				this.cameralist = data.list.map(item => {
					return {
						isShow: false,
						list: [],
						isloadShow: false,
						...item
					}
				})
				const {
					data: mapData
				} = await this.$api.User.cameraList()
				this.mapCamerList=mapData.list
				mapData.list.forEach((item,index)=>{
					if(item.position) {
						this.markers.push({
							latitude: item.position.split(',')[1],
							longitude: item.position.split(',')[0],
							iconPath:'/static/add@2x.png',
							width:43,
							height:48,
							title:item.cameraName,
							label:{
								content:item.cameraName
							},
							id:index 
						})
					}
				})
			}, 
			async getCamerasList(item) {
				item.isShow = !item.isShow
				if (item.list.length) {
					return
				}
				item.isloadShow = true
				const {
					data
				} = await this.$api.User.spjkList({
					regionIndexCode: item.regionIndexCode
				})
				item.list = data.list
				item.isloadShow = false
			},
			markertap(e){
				this.getVideo(this.mapCamerList[e.detail.markerId])
			},
			async getVideo(obj) {
				if (this.isPlayer) {
					return
				}
				this.isPlayer = true
				const {
					data
				} = await this.$api.User.spjkUrl({
					cameraIndexCode: obj.cameraIndexCode,
					resourceIndexCode: obj.resourceIndexCode
				})
				this.videoModule.goToVideoPlay(data.url)
			}
		}

	}
</script>

<style lang="scss" scoped>
	map {
		width: 100%;
		height: 100%;
		vertical-align: top;
	}

	.photoSeacher {
		margin: 20rpx;
		height: 70rpx;
		background: #0a3765;
		border-radius: 10rpx;
		padding-left: 20rpx;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 16rpx;
		}
	}

	.photoSeacher_placeholder {
		color: rgba(255, 255, 255, .5);
	}

	.photoList {
		padding: 0 20rpx;

		&_one {
			padding: 42rpx 0 38rpx;
			border-bottom: 2rpx solid rgba(255, 255, 255, .05);
			font-size: 30rpx;
		}
	}

	.photoList_desc {
		image {
			width: 20rpx;
			height: 12rpx;
		}
	}

	.photoList_one_show {
		padding-bottom: 0;
	}

	.rotate {
		transform: rotate(180deg);
	}

	.photoList_two_one {
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		// height: 100rpx;

		height: 120rpx;

		image {
			width: 70rpx;
			height: 70rpx;
			margin-right: 20rpx;
		}

		&:first-child {
			margin-top: 30rpx;
		}
	}

	.photoList_two_one:last-child {
		border-bottom: 0;
	}

	/deep/.u-line {
		display: none;
		height: 80rpx;
	}

	/deep/.u-load-more-wrap {
		height: 40px !important
	}
</style>
