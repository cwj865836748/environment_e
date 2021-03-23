<template>
	<view class="">
		<view class="form_list_select me-fx-row-sb-c" v-if="tabActive===0&&addressList.length" @tap="tapSelect">
			<text>{{query.region}}</text>
			<image src="/static/down@2x.png"></image>
		</view>
		<view class="form_list_select me-fx-row-sb-c" v-else-if="tabActive==1" @tap="timeShow=true">
			<text>{{selectTime?selectTime:'请选择'}}</text>
			<image src="/static/down@2x.png"></image>
		</view>

		<view class="form_list me-fx-row-sb" v-else-if="tabActive===3">
			<view class="form_list_select form_list_select_one me-fx-row-sb-c" @tap="tapSelect">
				<text>{{dateList[dateText].label}}</text>
				<image src="/static/down@2x.png"></image>
			</view>
			<view class="form_list_select form_list_select_one me-fx-row-sb-c" @tap="timeShow=true">
				<text>{{allTime?allTime:'请选择'}}</text>
				<image src="/static/down@2x.png"></image>
			</view>
		</view>
		<u-select :list="selectList" mode=single-column v-model="selectShow" safe-area-inset-bottom @confirm="confirm"
		 :default-value="defaultValue"></u-select>
		<u-picker :params="defaultParams" :default-time="defaultTime" mode="time" v-model="timeShow" safe-area-inset-bottom
		 @confirm="timeConfirm" start-year="1990"></u-picker>
	</view>
</template>

<script>
	import {
		formatTime,
		formatTimes
	} from '@/utils/datetime.js'
	export default {
		props: {
			query: {
				type: Object,
				default: null
			},
			tabActive: {
				type: Number,
				default: 0
			},
			addressList: {
				type: Array,
				default: () => []
			},
			dateList: {
				type: Array,
				default: () => [{
					value: 0,
					label: '时报'
				}, {
					value: 1,
					label: '日报'
				}, {
					value: 2,
					label: '月报'
				}],
			},
			dateNumber: {
				type: Number,
				default: 0
			},
		},

		data() {
			return {
				selectShow: false,
				timeShow: false,
				selectTime: '',
				allTime: '',
				selectParams: {
					year: true,
					month: true,
					day: true,
				},
				allParams: {
					year: true,
					month: true,
					day: true,
				}
			};
		},
		computed: {
			selectList() {
				return this.tabActive ? this.dateList : this.addressList
			},
			defaultTime() {
				return this.tabActive == 1 ? this.selectTime : this.allTime
			},
			defaultParams() {
				return this.tabActive == 1 ? this.selectParams : this.allParams

			},
			defaultValue() {
				const index = this.tabActive == 0 ? this.addressList.findIndex(item => item.label == this.query.region) :
					this.dateList.findIndex(item => item.value == this.dateText)
				return [index]
			},
			dateText: {
				get() {
					return this.dateNumber
				},
				set(val) {
					this.$emit('update:dateNumber',val)
				}
			}
		},
		created() {

		},
		methods: {
			tapSelect() {
				this.selectShow = true
			},
			confirm(e) {
				if (this.tabActive === 0 && e[0].value !== this.query.region) {
					this.$emit('getQuery', 'region', e[0].value)
				} else if (this.tabActive === 3) {
					this.dateText = e[0].value
					if (e[0].value === 0) {
						this.allParams = {
							year: true,
							month: true,
							day: true
						}
					} else if (e[0].value === 1) {
						this.allParams = {
							year: true,
							month: true,
							day: false,
						}
					} else {
						this.allParams = {
							year: true,
							month: false,
							day: false
						}
					}
				}

			},
			timeConfirm(e) {
				if (this.tabActive === 1) {
					this.selectTime = e.year + '-' + e.month + '-' + e.day
					this.$emit('getQuery', ['startTime','endTime'], this.selectTime)
				} else {
					if (this.dateText == 0) {
						this.allTime = e.year + '-' + e.month + '-' + e.day
					} else if (this.dateText == 1) {
						this.allTime = e.year + '-' + e.month
					} else {
						this.allTime = e.year
					}
					this.$emit('getQuery', 'time', this.allTime)
				}

			}
		}

	}
</script>

<style lang="scss" scoped>
	.form_list_select {
		&_one {
			margin: 0;
			width: 344rpx;
		}
	}
</style>
