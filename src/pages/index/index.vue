<template>

	<uni-clayout>
		<template #header>
			<view class="home_title me-fx-row-sb-c">
				<image src="/static/sign_logo@2x.png"></image>
				<text class="me-fx-1">紫金环保客户端</text>
				<navigator url="/pages/updatePassword/index">
					<image src="/static/home_help@2x.png" class="helpCenter"></image>
				</navigator>
			</view>
		</template>
		<template #default>
			<view class="home">
				<view class="home_menu me-fx-row me-fx-wrap">
					<view :class="['home_menu_one me-fx-col-c-c',item.class,list.indexOf(item.type)!=-1||item.type==-1?'':'opacity']" v-for="(item,index) in menuList" :key="index" @tap="goRouter(item)">
						<image :src="item.imageUrl"></image>
						<view>
							{{item.menuName}}
						</view>
					</view>
				</view>
				<view class="home_loginout" @tap="$store.dispatch('logout')">
					退出登录
				</view>
			</view>
		</template>
	</uni-clayout>


</template>

<script>
	export default {
		data() {
			return {
				menuList: [{
						imageUrl: '/static/home_ico1@2x.png',
						menuName: '概况信息',
						url: '/pages/profileInformation/index',
						class:'',
						type:-1
					},
					{
						imageUrl: '/static/home_ico2@2x.png',
						menuName: '污染源监控',
						url: '/pages/pollutionSource/index',
						class:'',
						type:1
					},
					{
						imageUrl: '/static/home_ico3@2x.png',
						menuName: '水文监控',
						url: '/pages/hydrologicalMonitoring/index',
						class:'',
						type:3
					},
					{
						imageUrl: '/static/home_ico4@2x.png',
						menuName: '坝体位移',
						url: '/pages/damDisplacement/index',
						class:'',
						type:4
					},
					{
						imageUrl: '/static/home_ico5@2x.png',
						menuName: '视频监控',
						url: '/pages/videoSurveillance/index',
						class:'',
						type:2
					}
					
					,
					{
						imageUrl: '/static/home_ico7@2x.png',
						menuName: '库坝监测',
						url: '/pages/reservoirMonitoring/index',
						class:'',
						type:6
					},
					{
						imageUrl: '/static/home_ico8@2x.png',
						menuName: '环保处理系统监测',
						url: '/pages/environmentalProtection/index',
						class:'',
						type:7
					},
					{
						imageUrl: '/static/home_ico9@2x.png',
						menuName: '生活污水监测',
						url: '/pages/domesticSewage/index',
						class:'',
						type:8
					},
					{
						imageUrl: '/static/home_ico10@2x.png',
						menuName: '生物监测',
						url: '/pages/biomonitoring/index',
						class:'',
						type:9
					},
					{
						imageUrl: '/static/home_ico11@2x.png',
						menuName: '应急闸门监测',
						url: '/pages/emergencyValve/index',
						class:'',
						type:5
					}
					,
					//后面两个没用到全部隐藏 功能页面都没做
					{
						imageUrl: '/static/home_ico12@2x.png',
						menuName: '消息推送',
						url: '/pages/messageCenter/index',
						class:'hidden'
					},
					
					{
						imageUrl: '/static/home_ico6@2x.png',
						menuName: '在线升级',
						class:'hidden'
					}
				],
				query:{
					limit:20,
					offset:0
				},
				list:[]
			}
		},
		onLoad() {
           this.getInit()

		},
		methods: {
			async getInit() {
              const {data} = await this.$api.User.permissions(this.query)
			  this.list = data.list
			},
			goRouter(one) {
				(this.list.indexOf(one.type)!=-1||one.type==-1)&&uni.navigateTo({
					url:one.url
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
	.hidden {
		visibility: hidden;
	}
	.opacity {
		opacity: 0.5;
	}
</style>
