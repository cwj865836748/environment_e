<template>
	<uni-clayout titleWidth="300" :isBack="true" navTitle="应急闸门监测">
		<view class="me-fx-col" style="height: 100%;">
			<uni-tab :tabActive.sync="tabActive" :tabList="tabList"></uni-tab>
			<uni-control ref="control" :tabActive="tabActive" @getQuery="getQuery"></uni-control>
			<view class="me-fx-1">
				<uni-table :tableType="2" :tableTh="tableTh" :tableList="tableList" :totalCount='totalCount' @getList="getList"
				 v-show="tabActive!==2">
					<template slot-scope="scope">
						<view v-for="(item,index) in tableList" :key="index">
							<tr v-for="(items,indexs) in item" :key="indexs">
								<td :rowspan="item.length" v-if="!indexs">{{items.region}}</td>
								<td>{{items.name}}</td>
								<td>{{items.state}}</td>
								<td>{{items.time|formatTime('YYYY-mm-dd HH:MM:SS')}}</td>
							</tr>
						</view>
					</template>
				</uni-table>
				<rich-text :nodes="richText" v-show="tabActive===2"></rich-text>
			</view>
		</view>
	</uni-clayout>
</template>
<script>
	import {formatTime} from "@/utils/datetime.js"
	export default {
		data() {
			return {
				tabList: [{
						tabName: '实时监控',
						id: 0
					},
					{
						tabName: '历史数据',
						id: 1
					},
					{
						tabName: '基本信息',
						id: 2
					},
				],
				tableTh: [{
						thName: '位置',
						prop: 'region',
						width: 240
					},
					{
						thName: '闸门名称',
						prop: 'name',
						width: 240
					},
					{
						thName: '状态',
						prop: 'state',
						width: 240
					},
					{
						thName: '时间',
						prop: 'time',
						width: 240
					}
				],
				tableList: [],
				tabActive: 0,
				query: {

					startTime: formatTime(new Date(),'YYYY-mm-dd'),
					endTime: formatTime(new Date(),'YYYY-mm-dd')
				},
				totalCount: -1,
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
				}
			}
		},
		onLoad() {
			this.getInit()
		},

		methods: {
			async getInit() {
				const {data} =await this.$api.User.summaryInfo({
					type: 8
				})
				this.richText =data
				this.getList()
			},
			async getList() {
				const {
					data
				} = await this.$api.User.yjzmList(this.query)
				this.tableList = Object.values(data.list.reduce((res, item) => {
					res[item.region] ? res[item.region].push(item) : res[item.region] = [item];
					return res;
				}, {}));
			},
			getQuery(key, value) {
				this.tableList = []
				key.forEach(item=>{
					this.query[item] = value
				})
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
