<template>
	<view class="layout me-fx-col">
		<u-navbar :is-back="isBack" :title-width="titleWidth" :back-icon-color="backIconColor" :border-bottom="false" :title="navTitle" :title-color="navTitleColor"
		 :background="background" :back-icon-size="backIconSize" :title-size="titleSize">
			<slot name="header"></slot>
		</u-navbar>
		<view class="slot me-fx-1">
			<slot></slot>
		</view>
		<!-- <u-tabbar :show="tabbarShow" v-model="current" :list="toolBarList"></u-tabbar> -->
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
			titleSize: {
				type: String,
				default: '36'
			},
			titleWidth: {
				type: String,
				default: '250'
			},
			navTitleColor: {
				type: String,
				default: '#FFFFFF'
			},
			isBack: {
				type: Boolean,
				default: false
			},
			backIconColor: {
				type: String,
				default: '#FFFFFF'
			},
			backIconSize: {
				type: String,
				default: '50'
			},
			background: {
				type: Object,
				default: () => {
					return {
						background: '#022D55',
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
			}
		},
		data() {
			return {

			};
		},
		created() {

		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.layout {
		width: 100%;
		height: 100%;
	}
</style>
