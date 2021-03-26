<template>
	<uni-clayout :isBack="true" navTitle="污染源监控">
		<view class="me-fx-col" style="height: 100%;">
			<uni-tab :tabActive.sync="tabActive"></uni-tab>
			<uni-control ref="control" :dateNumber.sync='dateNumber' :tabActive="tabActive" :addressList="addressList" :query="query"
			 @getQuery="getQuery" v-if="addressList.length"></uni-control>
			<view class="me-fx-1">
				<uni-table :tableTh="tableTh" :tableList="tableList" :totalCount='totalCount' :page.sync="query.offset" @getList="getList"
				 v-show="tabActive!==2">
					<template slot-scope="scope">
						<td>{{scope.row.time}}</u-td>
						<td>{{scope.row.qhw}}</td>
						<td>{{scope.row.zg}}</td>
						<td>{{scope.row.zx}}</td>
						<td>{{scope.row.zk}}</td>
						<td>{{scope.row.zq}}</td>
						<td>{{scope.row.ph}}</td>
						<td>{{scope.row.zt}}</td>
						<td>{{scope.row.ll}}</td>
						<td>{{scope.row.ljll}}</td>
					</template>
				</uni-table>
				<rich-text :nodes="richText" v-show="tabActive===2"></rich-text>
			</view>
	0	</view>
	</uni-clayout>
</template>
<script>
	import {formatTime} from "@/utils/datetime.js"
	export default {
		data() {
			return {
				tableTh: [{
						thName: '时间',
						prop: 'time',
						width: 240
					},
					{
						thName: '<view>监测项：氯化物(水)</view><view>标准值0.5</view><view>单位:毫克/升</view>',
						prop: 'qhw',
						width: 240
					},
					{
						thName: '<view>监测项：总镉</view><view>标准值0.1</view><view>单位:毫克/升</view>',
						prop: 'zg',
						width: 240
					},
					{
						thName: '<view>监测项：总锌</view><view>标准值2.0</view><view>单位:毫克/升</view>',
						prop: 'zx',
						width: 240
					},
					{
						thName: '<view>监测项：总砷</view><view>标准值0.5</view><view>单位:毫克/升</view>',
						prop: 'zk',
						width: 240
					},
					{
						thName: '<view>监测项：总铅</view><view>标准值1.0</view><view>单位:毫克/升</view>',
						prop: 'zq',
						width: 240
					},
					{
						thName: '<view>监测项：pH值</view><view>标准值6~9</view><view>单位:范围数据</view>',
						prop: 'ph',
						width: 260
					},
					{
						thName: '<view>监测项：总铜</view><view>标准值0.5</view><view>单位:毫克/升</view>',
						prop: 'zt',
						width: 240
					},
					{
						thName: '<view>监测项：流量</view><view>单位:立方米/小时</view>',
						prop: 'll',
						width: 240
					},
					{
						thName: '<view>监测项：累计流量</view>',
						prop: 'ljll',
						width: 240
					}
				],
				tableList: [],
				tabActive: 0,
				addressList: [],
				query: {
					offset: 0,
					limit: 20,
					region: '',
					startTime: formatTime(new Date(),'YYYY-mm-dd'),
					endTime: formatTime(new Date(),'YYYY-mm-dd'),
					time: ''
				},
				dateNumber: 0,
				totalCount: 0,
				richText: ''
			}
		},
		watch: {
			tabActive(val, newVal) {
				const control = this.$refs.control
				if (val === 0) {
					    this.getQuery(['startTime','endTime'], formatTime(new Date(),'YYYY-mm-dd'))
				} else if (val === 1) {
					if (control.selectTime) {
						this.getQuery(['startTime','endTime'], control.selectTime)
						return
					}
					this.tableList = []
				} else if (val === 3) {
					if (control.allTime) {
						this.getQuery('time', control.allTime)
						return
					}
					this.tableList = []
				}
			}
		},
		onLoad() {
			this.getInit()
		},

		methods: {
			async getInit() {
				const {
					data
				} = await this.$api.User.regions()
				const {data:richText} =await this.$api.User.summaryInfo({
					type: 1
				})
				this.richText = richText
				this.query.region = data.list[0]
				this.addressList = data.list.map(item => {
					return {
						label: item,
						value: item
					}
				})
				this.getList()
			},
			async getList() {
				const {
					data
				} = this.tabActive !== 3 ? await this.$api.User.wryList(this.query) : await this.$api.User.wryReportForms(this.query)
				this.tableList.push(...data.list)
				this.totalCount = data.totalCount
			},
			getQuery(key, value) {
				this.tableList = []
				this.query.offset = 0
				if(Array.isArray(key)) {
					key.forEach(item=>{
						this.query[item] = value
					})
				}else {
						this.query[key] = value
				}
				this.getList()
			}

		}
	}
</script>

<style scoped lang="scss">
	.form_list_select {
		&_one {
			margin: 0;
			width: 344rpx;
		}
	}
</style>
