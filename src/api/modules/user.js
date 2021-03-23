//name:必填用来区分Api对于文件
import {
	request
} from "@/request/http.js"
export default {
	name: 'User',
	login(data) {
		return request({
			url: '/esys/user/login',
			data
		})
	},
	permissions(data) {
		return request({
			url: '/esys/user/permissions',
			data
		})
	},
	//系统模块-概况信息0首页1 污染源监控 2 水文监控 3 坝体位移 4 库坝 5 环保处理 6生活污水7应急闸门 8 生物监测
	summaryInfo(data) {
		return request({
			url: '/esys/sys/summaryInfo',
			data
		})
	},
	//坝体位移模块
	displacementList(data) {
		return request({
			url: '/esys/displacement/list',
			data
		})
	},
	displacementRegion() {
		return request({
			url: '/esys/displacement/regions'
		})
	},
	//库坝系统模块
	kbxtList(data) {
		return request({
			url: '/esys/kbxt/list',
			data
		})
	},
	//应急闸门模块
	yjzmList(data) {
		return request({
			url: '/esys/yjzm/list',
			data
		})
	},
	//水文监测模块
	swList(data) {
		return request({
			url: '/esys/sw/list',
			data
		})
	},
	//水文监测模块-汇总报表
	swReportForms(data) {
		return request({
			url: '/esys/sw/reportForms',
			data
		})
	},
	//污染源监控模块
	wryList(data) {
		return request({
			url: '/esys/wry/list',
			data
		})
	},
	//污染源监控模块-列表位置
	regions() {
		return request({
			url: '/esys/wry/regions'
		})
	},
	//污染源监控模块-汇总报表
	wryReportForms(data) {
		return request({
			url: '/esys/wry/reportForms',
			data
		})
	},
	//消息推送模块-数据异常信息列表
	dataExceptions(data) {
		return request({
			url: '/esys/msg/dataExceptions',
			data
		})
	},
	//消息推送模块-设备异常信息列表
	deviceExceptions(data) {
		return request({
			url: '/esys/msg/deviceExceptions',
			data
		})
	},
	//环保处理模块
	hbclList(data) {
		return request({
			url: '/esys/hbcl/list',
			data
		})
	},
	//生活污水处理系统模块
	wsclxtList(data) {
		return request({
			url: '/esys/wsclxt/list',
			data
		})
	},
	//生物监测系统模块
	swjcxtList(data) {
		return request({
			url: '/esys/swjcxt/list',
			data
		})
	},
	//视频监控系统模块
	spjkList(data) {
		return request({
			url: '/esys/spjk/cameras',
			data
		})
	},
	//视频监控区域列表
	spjkRegions() {
		return request({
			url: '/esys/spjk/regions',
		})
	},
	//视频Url
	spjkUrl(data) {
		return request({
			url: '/esys/spjk/url',
			data
		})
	},
	//视频地图点位
	cameraList() {
		return request({
			url: '/esys/spjk/cameraList',
		})
	},
	//当前新的app版本
	currentVersion() {
		return request({
			url: '/esys/sys/currentVersion'
		})
	},
	changePwd(data) {
		return request({
			url: '/esys/user/changePwd',
			data
		})
	},
	accountInfo() {
		return request({
			url: '/esys/user/accountInfo'
		})
	}
}
