//name:必填用来区分Api对于文件
import {
	request
} from "@/request/http.js"
export default {
	name: 'User',
	login(data) {
		return request({
			url: '/esys/user/login',
			method: 'POST',
			data
		})
	},
	permissions(data) {
		return request({
			url: '/esys/user/permissions',
			method: 'POST',
			data
		})
	},
	//系统模块-概况信息
	summaryInfo(data) {
		return request({
			url: '/esys/sys/summaryInfo',
			method: 'POST',
			data
		})
	},
	//坝体位移模块
	displacementList(data) {
		return request({
			url: '/esys/displacement/list',
			method: 'POST',
			data
		})
	},
	//库坝系统模块
	kbxtList(data) {
		return request({
			url: '/esys/kbxt/list',
			method: 'POST',
			data
		})
	},
	//应急闸门模块
	yjzmList(data) {
		return request({
			url: '/esys/yjzm/list',
			method: 'POST',
			data
		})
	},
	//水文监测模块
	swList(data) {
		return request({
			url: '/esys/sw/list',
			method: 'POST',
			data
		})
	},
	//水文监测模块-汇总报表
	swReportForms(data) {
		return request({
			url: '/esys/sw/reportForms',
			method: 'POST',
			data
		})
	},
	//污染源监控模块
	wryList(data) {
		return request({
			url: '/esys/wry/list',
			method: 'POST',
			data
		})
	},
	//污染源监控模块-列表位置
	regions(data) {
		return request({
			url: '/esys/wry/regions',
			method: 'POST',
			data
		})
	},
	//污染源监控模块-汇总报表
	wryReportForms(data) {
		return request({
			url: '/esys/wry/reportForms',
			method: 'POST',
			data
		})
	},
	//消息推送模块-数据异常信息列表
	dataExceptions(data) {
		return request({
			url: '/esys/msg/dataExceptions',
			method: 'POST',
			data
		})
	},
	//消息推送模块-设备异常信息列表
	deviceExceptions(data) {
		return request({
			url: '/esys/msg/deviceExceptions',
			method: 'POST',
			data
		})
	},
	//环保处理模块
	hbclList(){
		return request({
			url: '/esys/hbcl/list',
			method: 'POST',
			data
		})
	},
	//生活污水处理系统模块
	wsclxtList(){
		return request({
			url: '/esys/wsclxt/list',
			method: 'POST',
			data
		})
	},
	//生物监测系统模块
	swjcxtList(){
		return request({
			url: '/esys/swjcxt/list',
			method: 'POST',
			data
		})
	},
	//视频监控系统模块
	spjkList(){
		return request({
			url: '/esys/spjk/list',
			method: 'POST',
			data
		})
	}
	
}
