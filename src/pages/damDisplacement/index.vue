<template>
	<uni-clayout :isBack="true" navTitle="坝体位移">
		<view class="me-fx-col" style="height: 100%;">
			<view class="form_list_select me-fx-row-sb-c" @tap="selectShow=true">
				<text>{{query.region}}</text>
				<image src="/static/down@2x.png"></image>
			</view>
			<view class="form_list_select me-fx-row-c-c">
				<u-icon name="calendar" size="26" color="rgba(255,255,255,.5)"></u-icon>
				<view class="me-fx-1 me-fx-row me-fx-row-c-c">
					<picker mode="date" :end="query.endTime?query.endTime:undefined" :value="query.startTime" class="me-fx-1 me-fx-row-c-c" @change="bindDateChange('startTime',$event)">
						<view :class="[query.startTime?'':'date']">
							{{query.startTime?query.startTime:'开始日期'}}
						</view>
					</picker>
					至
					<picker mode="date" :start="query.startTime?query.startTime:undefined" :value="query.endTime" class="me-fx-1 me-fx-row-c-c" @change="bindDateChange('endTime',$event)">
						<view :class="[query.endTime?'':'date']">
							{{query.endTime?query.endTime:'结束日期'}}
						</view>
					</picker>
				</view>
				<icon @tap="clearDate" class="icon" type="clear" size="14" v-show="query.startTime||query.endTime"/>
			</view>
			<view class="me-fx-1">
				<uni-table :tableTh="tableTh" :tableList="tableList" :totalCount='totalCount' :page.sync="query.offset" @getList="getList">
					<template slot-scope="scope">
						<td>{{scope.row.sectionName}}</td>
						<td>{{scope.row.deviceName}}</td>
						<td>{{scope.row.startTime}}</td>
						<td>{{scope.row.nowV1}}</td>
						<td>{{scope.row.nowV2}}</td>
						<td>{{scope.row.nowV3}}</td>
						<td>{{scope.row.v4}}</td>
						<td>{{scope.row.v5}}</td>
						<td>{{scope.row.v1}}</td>
						<td>{{scope.row.v2}}</td>
						<td>{{scope.row.v3}}</td>
					</template>
				</uni-table>
			</view>
		</view>
		<u-select :list="selectList" mode=single-column v-model="selectShow" safe-area-inset-bottom @confirm="confirm"
		 :default-value="[defaultValue]"></u-select>
		<!-- <u-picker :default-time="defaultTime" mode="time" v-model="timeShow" safe-area-inset-bottom
		  @confirm="timeConfirm"></u-picker> -->
	</uni-clayout>
</template>
<script>
	import {formatTime} from "@/utils/datetime.js"
	export default {
		data() {
			return {
				tableTh: [{
						thName: '断面名称',
						prop: 'sectionName',
						width: 240
					},
					{
						thName: '测点名称',
						prop: 'deviceName',
						width: 240
					},
					{
						thName: '时间',
						prop: 'startTime',
						width: 240
					},
					{
						thName: '本次测值-X',
						prop: 'nowV1',
						width: 240
					},
					{
						thName: '本次测值-Y',
						prop: 'nowV2',
						width: 240
					},
					{
						thName: '本次测值-H',
						prop: 'nowV3',
						width: 240
					},
					{
						thName: '2D',
						prop: 'v4',
						width: 240
					},
					{
						thName: '3D',
						prop: 'v5',
						width: 240
					},
					{
						thName: 'X轴累计位移',
						prop: 'v1',
						width: 240
					},
					{
						thName: 'Y轴累计位移',
						prop: 'v2',
						width: 240
					},
					{
						thName: 'H轴累计位移',
						prop: 'v3',
						width: 240
					}

				],
				tableList: [],
				selectList: [],
				selectShow: false,
				defaultValue: 0,
				query: {
					offset: 0,
					limit: 20,
					startTime: formatTime(new Date(),'YYYY-mm-dd'),
					endTime: formatTime(new Date(),'YYYY-mm-dd'),
					region: ''
				},
				totalCount: 0
			}
		},
		onLoad() {
			this.getInit()
		},

		methods: {
			async getInit() {
				const {
					data
				} = await this.$api.User.displacementRegion()
				this.selectList = data.list.map((item, index) => {
					return {
						value: index,
						label: item
					}
				})
				this.query.region = data.list[0]
				this.getList()
			},
			async getList() {
				const {
					data
				} = await this.$api.User.displacementList(this.query)
				this.tableList.push(...data.list)
				this.totalCount = data.totalCount
			},
			getQuery(key, value) {
				this.tableList = []
				this.query.offset = 0
				this.query[key] = value
				this.getList()
			},
			confirm(e) {
				this.defaultValue = e[0].value
				this.getQuery('region', e[0].label)
			},
			bindDateChange(key,e) {
				this.getQuery(key, e.detail.value)
			},
			clearDate(){
				this.tableList = []
				this.query.offset = 0
				this.query.startTime=''
				this.query.endTime=''
				this.getList()
			}
		}
	}
</script>

<style scoped lang="scss">
	.form_list_select {
	

		.date {
			font-size: 26rpx;
			color: rgba(255, 255, 255, .5)
		}
		
	}
	.icon {
		margin-left: 16rpx;
	}
</style>
