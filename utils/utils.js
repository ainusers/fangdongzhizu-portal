import store from '@/store/index.js';
import request from '@/utils/request.js'
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update.js'
let updateOnly=false

// 获取本地存储中的数据
const initKey = ['token', 'userInfo', 'communityInfo'] //防止刷新vuex丢失数据
const getStoreData = function(key) {
	uni.getStorage({
		key: key,
		success: (res) => {
			store.state[key] = res.data
		}
	})
}

// 持久化内存数据
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
			resolve(res);
		})
	})
}

//图片压缩
const compressImg = function(img, res) {
	let that = this
	return new Promise((res) => {
		// var localPath = plus.io.convertAbsoluteFileSystem(img);
		plus.io.resolveLocalFileSystemURL(img, (entry) => { //通过URL参数获取目录对象或文件对象
			entry.file((file) => { // 可通过entry对象操作图片 
				//console.log('压缩前图片信息:' + JSON.stringify(file)); //压缩前图片信息
				if (file.size > 504800) { //   如果大于500Kb进行压缩
					plus.zip.compressImage({ // 5+ plus.zip.compressImage 了解一下，有详细的示例
						src: img, //src: 压缩原始图片的路径    
						dst: img.replace('.png', '2222.png').replace('.PNG',
								'2222.PNG').replace('.jpg', '2222.jpg')
							.replace('.JPG', '2222.JPG'),
						width: '40%', //dst: (String 类型 )压缩转换目标图片的路径，这里先在后面原始名后面加一个2222区分一下
						height: '40%', //width,height: (String 类型 )缩放图片的宽度,高度
						quality: 60, //quality: (Number 类型 )压缩图片的质量
						overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件
						// format:'jpg'   //format: (String 类型 )压缩转换后的图片格式
					}, (event) => {
						let newImg = event.target;
						console.log('压缩后图片信息:' + newImg); // 压缩后图片信息
						res(newImg); //返回新的图片地址，在uploadFile之前接收
					}, function(err) {
						// console.log('Resolve file URL failed: ' + err.message);
					});
				} else { //else小于500kb跳过压缩，直接返回现有的src
					res(img);
				}
			});
		}, (e) => { // 返回错误信息
			console.log('返回错误信息' + e.message);
		});
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

// 转义代码
const htmlEncode = function(str) {
	var temp = "";
	if (str.length == 0) return "";
	temp = str.replace(/&/g, "&amp;");
	temp = temp.replace(/</g, "&lt;");
	temp = temp.replace(/>/g, "&gt;");
	// temp = temp.replace(/\s/g, "&nbsp;");
	// temp = temp.replace(/\'/g, "&#39;");
	// temp = temp.replace(/\"/g, "&quot;");
	return temp;
}

// 控制时间间隔
const spaceTime=function(old,now){
	old=new Date(old);
	now=new Date(now);
	var told=old.getTime();
	var tnow=now.getTime();
	return (told>(tnow+1000*60*5))
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
		return  minutes + " 分钟前"
	} else {
		return hours + '小时前' 
	}
}

//根据userid获取用户信息
const getUserInfo = function(userId,type) {
	let url='/zf/v1/user/id'
	let data=''
	if(type){
		url='/zf/v1/user/name' //根据用户名查询信息
		data={username: userId}
	}else{
		data={userId: userId}
	}
	return new Promise((resolve, reject) => {
		request.get(url, data, true).then(res => {
			resolve(res)
		})
	})
}

// 限制发布房源个数
const getCount=function(){
	let data = {
		userId: store.state.userInfo.id
	}
	return request.get('/zf/v1/const/community/user/count', data, true).then(res => {
		return res
	})
}

//限制发布动态个数
const checkPush=function(){
	return request.get('/zf/v1/dynamic/push',{userId:store.state.userInfo.id},true).then(res=>{
		return res.data[0]
	})
}

// 输出提示信息
const showToastTit=function(tit){
	uni.showToast({
		title: tit,
		icon: 'none',
		duration: 2000
	})
}

//检测是否注册过用户
const checkExist=function(username){
	return request.get('/zf/v1/user/exist',{username:username},false).then(res=>{
		if(res.code==200){
			return res.data[0]
		}
	})
}

//获取最新APP版本
const getLatest= function(){
	return request.get('/zf/v1/version/latest',{},true).then(res=>{
		if(res.code==200){
			let data=res.data[0]
			return data
		}
	})
}

// 用户自助更新APP
const MycheckUpdate=function(type){
	// type =1 从关于我们点击的更新
	if(!updateOnly || type==1){
		updateOnly=true
		checkUpdate()
	}
}

export {
	getStoreData,
	initStorestate,
	attachUpload,
	editTitleText,
	htmlEncode,
	tranfTime,
	getUserInfo,
	compressImg,
	showToastTit,
	spaceTime,
	getCount,
	checkPush,
	checkExist,
	getLatest,
	MycheckUpdate
}
