<template>
	<uni-clayout :isBack="true" navTitle="水文监测">
		<view class="me-fx-col" style="height: 100%;">
			<uni-tab :tabActive.sync="tabActive"></uni-tab>
			<uni-control ref="control" :dateList="dateList" :dateNumber.sync='dateNumber' :tabActive="tabActive" @getQuery="getQuery"></uni-control>
			<view class="me-fx-1">
				<uni-table :tableTh="tableTh" :tableList="tableList" :totalCount='totalCount' :page.sync="query.offset" @getList="getList"
				 v-show="tabActive!==2">
					<template slot-scope="scope">
						<td>{{scope.row.swid}}</td>
						<td>{{scope.row.name}}</td>
						<td>{{scope.row.time|formatTime('YYYY-mm-dd HH:MM:SS')}}</u-td>
						<td>{{scope.row.ba}}</td>
					</template>
				</uni-table>
				<rich-text :nodes="richText" v-show="tabActive===2"></rich-text>
			</view>
		</view>
	</uni-clayout>
</template>
<script>  
    import {formatTime} from "@/utils/datetime.js";
	export default {
		data() {
			return {
				tableTh: [{
						thName: '设备id号',
						prop: 'swid',
						width: 240
					},
					{
						thName: '位置',
						prop: 'name',
						width: 240
					},
					{
						thName: '时间',
						prop: 'time',
						width: 240
					},
					{
						thName: '雨量累计值',
						prop: 'ba',
						width: 240
					}
				],
				tableList: [],
				tabActive: 0,
				dateList:[{
					value: 0,
					label: '日累计雨量'
				}, {
					value: 1,
					label: '月累计雨量'
				}, {
					value: 2,
					label: '年累计雨量'
				}],
				dateNumber:0,
				query: {
					offset: 1,
					limit: 20,
					startTime: formatTime(new Date(),'YYYY-mm-dd'),
					endTime: formatTime(new Date(),'YYYY-mm-dd'),
					time:''
				},
				totalCount: 0,
				richText: ''
			}
		},
		watch: {
			tabActive(val, newVal) {
				const control = this.$refs.control
				if(val===0){
					    this.getQuery(['startTime','endTime'], formatTime(new Date(),'YYYY-mm-dd'))
				}else if(val===1){
					if (control.selectTime) {
						this.getQuery(['startTime','endTime'], control.selectTime)
						return
					}
					this.tableList = []
				}else if(val===3) {
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
				const {data} =await this.$api.User.summaryInfo({
					type: 3
				})
				this.richText = data
				this.getList()
			},
			async getList() {
				const {
					data
				} = this.tabActive!==3?await this.$api.User.swList(this.query):await this.$api.User.swReportForms(this.query)
				this.tableList.push(...data.list)
				this.totalCount = data.totalCount
			},
			getQuery(key, value) {
				this.tableList = []
				this.query.offset = 1
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
