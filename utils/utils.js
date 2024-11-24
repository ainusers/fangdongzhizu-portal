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

/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
const tranfTime = function(dateTime = null, format = 'yyyy-mm-dd') {
	// 如果为null,则格式化当前时间
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let timestamp = + new Date(Number(dateTime));

	let timer = (Number(new Date()) - timestamp) / 1000;
	// 如果小于1分钟,则返回"刚刚",其他以此类推
	let tips = '';
	switch (true) {
		case timer < 60:
			tips = '刚刚';
			break;
		case timer >= 60 && timer < 3600:
			tips = parseInt(timer / 60) + '分钟前';
			break;
		case timer >= 3600 && timer < 86400:
			tips = parseInt(timer / 3600) + '小时前';
			break;
		case timer >= 86400 && timer < 365 * 86400:
			tips = parseInt(timer / 86400) + '天前';
			break;
		default:
			// 如果format为false，则无论什么时间戳，都显示xx之前
			if(format === false) {
				tips = parseInt(timer / (86400 * 365)) + '年前';
			} else {
				tips = timeFormat(timestamp, format);
			}
	}
	return tips;
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat(dateTime = null, fmt = 'yyyy-mm-dd') {
	// 如果为null,则格式化当前时间
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let date = new Date(dateTime);
	let ret;
	let opt = {
		"y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"h+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
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

// 跳转权限管理页面
const gotoAppSetting = function() {
	let isIOS = (uni.getSystemInfoSync().platform === 'ios');
	if (isIOS) {
		var UIApplication = plus.ios.import("UIApplication");
		var application2 = UIApplication.sharedApplication();
		var NSURL2 = plus.ios.import("NSURL");
		var setting2 = NSURL2.URLWithString("app-settings:");
		application2.openURL(setting2);
		plus.ios.deleteObject(setting2);
		plus.ios.deleteObject(NSURL2);
		plus.ios.deleteObject(application2);
	} else {
		var Intent = plus.android.importClass("android.content.Intent");
		var Settings = plus.android.importClass("android.provider.Settings");
		var Uri = plus.android.importClass("android.net.Uri");
		var mainActivity = plus.android.runtimeMainActivity();
		var intent = new Intent();
		intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
		var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
		intent.setData(uri);
		mainActivity.startActivity(intent);
	}
}

export {
	getStoreData,
	initStorestate,
	attachUpload,
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
	MycheckUpdate,
	gotoAppSetting
}
