<template>
	<view class="layout me-fx-col">
		<u-navbar :is-back="isBack" :title="navTitle" :title-color="navTitleColor" :background="background"></u-navbar>
		<view class="slot me-fx-1">
			<slot></slot> 
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
