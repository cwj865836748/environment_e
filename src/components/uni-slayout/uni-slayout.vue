<template>
	<view class="layout me-fx-col">
		<u-navbar :is-back="isBack" :title="navTitle" :title-color="navTitleColor" :background="background"></u-navbar>
		<view class="slot me-fx-1">
			<scroll-view scroll-y="true" :refresher-enabled="refresherEnabled" :refresher-triggered="triggered" :refresher-threshold="100"
			 refresher-background="lightgreen" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" @scrolltolower="onTolower">
				<slot></slot> 
			</scroll-view>  
		</view>  
		<u-tabbar :show="tabbarShow" v-model="current" :list="toolBarList"></u-tabbar>
	</view>
</template>

<script> 
	export default {
		name: 'layout',

		props: { 
			navTitle: {
				type: String,
				default: ''
			},
			navTitleColor: {
				type: String,
				default: '#606266'
			},
			isBack: {
				type: Boolean,
				default: false
			},
			background: {
				type: Object,
				default: () => {
					return {
						background: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))',
					}
				}
			},
			toolBarList: {
				type: Array,
				default: () => {
					return [{
							iconPath: "/static/uview/example/component.png",
							selectedIconPath: "/static/uview/example/component_select.png",
							text: '组件',
							pagePath: "/pages/index/index"
						},
						{
							iconPath: "/static/uview/example/template.png",
							selectedIconPath: "/static/uview/example/template_select.png",
							text: '模板',
							pagePath: "/pages/template/index"
						}
					]
				}
			},
			current: {
				type: Number,
				default: 0
			},
			tabbarShow: {
				type: Boolean,
				default: true
			},
			refresherEnabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				triggered: false
			};
		},
		created() {

		},
		mounted() {
		
		},
		methods: {
			//自定义下拉刷新控件被下拉
			onPulling(e) {
				this._freshing = false;
				setTimeout(() => {
					this.triggered = true;
				}, 1000)
			},
			//自定义下拉刷新被触发	
			onRefresh() { 
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
					this.$emit("getList")
				}, 3000)
			},
			//自定义下拉刷新被复位	
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			},
			onTolower() {
				
			}
		}
	}
</script>

<style lang="scss">
	.layout,
	scroll-view {
		width: 100%;
		height: 100%;
	}
</style>
