<template>
	<view class="tableAll me-fx-col">
		<!--表格-->
		<table class="me-fx-1" border="0" cellspacing="0" cellpadding="0">
			<scroll-view class="scrollx" scroll-x>
				<tr>
					<th v-for="th in tableTh" :key="th.prop" :width="th.width+'rpx'" v-html="th.thName"></th>
				</tr>
				<view class="me-fx-1 scrolly">
					<scroll-view :lower-threshold='200' scroll-y @scrolltolower="scrolltolower" :style="{width:tableWidth?tableWidth+'rpx':'auto'}">
						<view v-if="tableType==1">
							<tr v-for="(tr,trIndex) in tableList" :key="trIndex">
								<slot :row="tr"></slot>
							</tr>
						</view>
						<view v-else>
							<slot></slot>
						</view>
					</scroll-view>
				</view>
			</scroll-view>
		</table>
	</view>
</template>

<script>
	export default {
		props: {
			tableTh: {
				type: Array,
				default: () => []
			},
			tableList: {
				type: Array,
				default: () => []
			},
			totalCount: {
				type: Number,
				default: 0
			},
			page: {
				type: Number,
				default: 1
			},
			tableType: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				tableWidth: 0,
			};
		},
		computed: {
			limit: {
				get() {
					return this.page
				},
				set(val) {
					this.$emit("update:page", val)
				}
			}
		},
		created() {
			let tableWidth = 0
			this.tableTh.forEach(item => {
				tableWidth += item.width
			})
			this.tableWidth = parseInt(tableWidth)
		},
		methods: {
			scrolltolower() {

				if (this.tableList.length >= this.totalCount || this.totalCount == -1) {
					return
				}
				this.limit++
				this.$emit('getList')
			}
		}

	}
</script>

<style lang="scss" scoped>
</style>
