import store from '@/store/index.js';
import {get,post} from '@/utils/request/request.js'
import request from './request/request.js'
//获取本地存储中的数据
const initKey = ['token', 'userInfo', 'houseInfo', 'communityInfo', 'ThreeInfo'] //防止刷新vuex丢失数据 
const getStoreData = function(key) {
	uni.getStorage({
		key: key,
		success: (res) => {
			store.state[key] = res.data
		}
	})
}
const initStorestate = function() {
	initKey.forEach(item => {
		getStoreData(item)
	})
}
// 批量上传接口
const attachUpload = function(imageList) {
	return new Promise((resolve, reject) => {
		// 批量上传接口
		let files = [];
		for (let i = 0, len = imageList.length; i < len; i++) {
			let imgAttr = new Object();
			imgAttr.name = 'img' + i;
			imgAttr.uri = imageList[i];
			files.push(imgAttr);
		}
		request.fileUpload('/zf/v1/file/uploads',files).then(res=>{
			uni.hideLoading();
			resolve(res);
		})
	})
}
//编辑右上角按钮文字
const editTitleText = function(txt) {
	let pages = getCurrentPages();
	let page = pages[pages.length - 1];
	// #ifdef APP-PLUS
	let currentWebview = page.$getAppWebview();
	let titleObj = currentWebview.getStyle().titleNView;
	if (!titleObj.buttons) {
		return;
	}
	titleObj.buttons[0].text = txt; //修改文字
	currentWebview.setStyle({
		titleNView: titleObj
	});
	// #endif
}
// ios  devtools 微信小程序 android
const getPlatform = function() {
	let platform = uni.getSystemInfoSync().platform
	return platform
}
// 转义代码
const htmlEncode = function(str) {
	var temp = "";
	if (str.length == 0) return "";
	temp = str.replace(/&/g, "&amp;");
	temp = temp.replace(/</g, "&lt;");
	temp = temp.replace(/>/g, "&gt;");
	temp = temp.replace(/\s/g, "&nbsp;");
	temp = temp.replace(/\'/g, "&#39;");
	temp = temp.replace(/\"/g, "&quot;");
	return temp;
}

const isLoginCheck = function() {
	let token = ''
	uni.getStorage({
		key: 'token',
		success(res) {
			if (res.data) {
				token = res.data
			}
		}
	})
	if (!token) {
		uni.navigateTo({
			url: '/pages/auth/login'
		})
	}
}
//时间转换
const tranfTime = function(autoTime) {
	//var autoTime='2022-05-05 21:58:59'   //尽量让服务端传时间戳，能够有效避免时区问题
	var date1 = (Date.parse(new Date())) / 1000; //计算当前时间戳 
	var date2 = (Date.parse(new Date(autoTime))) / 1000;; //自动收货的时间戳 （字符串转时间戳）
	var date3 = (date1 - date2) * 1000; //时间差的毫秒数
	//计算出相差天数
	var days = Math.floor(date3 / (24 * 3600 * 1000));
	if (days >= 1) {
		return autoTime
	}
	//计算出小时数
	var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000));
	//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000));
	if (hours == 0 && minutes == 0) {
		return "刚刚"
	} else if (!hours) {
		return "前" + minutes + " 分钟"
	} else {
		return "前" + hours + '小时' + minutes + " 分钟"
	}
}
//获取userid 信息
const getuserInfo = function(userId) {
	return new Promise((resolve, reject) => {
		request.get('/zf/v1/user/id', {
			userId: userId
		}, true).then(res => {
			resolve(res)
		})
	})
}
export {
	getStoreData,
	initStorestate,
	attachUpload,
	editTitleText,
	htmlEncode,
	getPlatform,
	isLoginCheck,
	tranfTime,
	getuserInfo
}
