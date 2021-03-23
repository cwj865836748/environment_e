<template>
		<view class="tableAll_tabs me-fx-row">
			<view :class="['tableAll_tabs_one me-fx-1 me-fx-row-c-c',item.id===topActive?'tabActive':'']" v-for="(item,index) in tabList"
			 :key="index" @tap="tabChange(item.id)">
				{{item.tabName}}
			</view>
		</view>
</template>

<script>
	export default {
		props: {
			tabList: {
				type: Array,
				default: () => [{
						tabName: '实时监控',
						id: 0
					},
					{
						tabName: '历史数据',
						id: 1
					},
					{
						tabName: '汇总数据',
						id: 3
					},
					{
						tabName: '基本信息',
						id: 2
					},
				]
			},
			tabActive: {
				type: Number,
				default: 0
			}

		},
		data() {
			return {
				
			};
		},
		computed: {
			topActive: {
				get() {
					return this.tabActive
				},
				set(newValue) {
					this.$emit('update:tabActive',newValue)
				}
			}
		},
		created() {
		},
		methods: {
			tabChange(id) {
				this.topActive = id
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import './index.scss'
</style>
