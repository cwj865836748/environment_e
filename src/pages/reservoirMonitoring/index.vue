<template>
	<uni-clayout :isBack="true" navTitle="库坝监测">
		<view class="me-fx-col" style="height: 100%;">
			<uni-tab :tabActive.sync="tabActive" :tabList="tabList"></uni-tab>
			<uni-control ref="control" :tabActive="tabActive" @getQuery="getQuery"></uni-control>
			<view class="me-fx-1">
				<uni-table :tableTh="tableTh" :tableList="tableList" :totalCount='totalCount' :page.sync="query.offset" @getList="getList"
				 v-show="tabActive!==2">
					<template slot-scope="scope">
						<td>{{scope.row.name}}</td>
						<td>{{scope.row.region}}</td>
						<td>{{scope.row.time|formatTime('YYYY-mm-dd HH:MM:SS')}}</u-td>
						<td>{{scope.row.water}}</td>
						<td>{{scope.row.library}}</td>
						<td>{{scope.row.ph}}</td>
						<td>{{scope.row.tcu}}</td>
						<td>{{scope.row.state}}</td>
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
				tabList:[{
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
						thName: '名称',
						prop: 'name',
						width: 240
					},
					{
						thName: '位置',
						prop: 'region',
						width: 240
					},
					{
						thName: '时间',
						prop: 'time',
						width: 240
					},
					{
						thName: '水位/m',
						prop: 'water',
						width: 240
					},
					{
						thName: '库容/万m3',
						prop: 'library',
						width: 240
					},
					{
						thName: 'ph',
						prop: 'ph',
						width: 240
					},
					{
						thName: 'Tcu(mg/L)',
						prop: 'tcu',
						width: 240
					},
					{
						thName: '实时状态',
						prop: 'state',
						width: 240
					}
					
				],
				tableList: [],
				tabActive: 0,
				query: {
					offset: 1,
					limit: 20,
					startTime: formatTime(new Date(),'YYYY-mm-dd'),
					endTime: formatTime(new Date(),'YYYY-mm-dd')
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
				}
			}
		}, 
		onLoad() {
			this.getInit()
		},

		methods: {
			async getInit() {
				const {data} =await this.$api.User.summaryInfo({
					type: 5
				})
				this.richText = data
				this.getList()
			},
			async getList() {
				const {
					data
				} = await this.$api.User.kbxtList(this.query)
				this.tableList.push(...data.list)
				this.totalCount = data.totalCount
			},
			getQuery(key, value) {
				this.tableList = []
				this.query.offset = 1
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
