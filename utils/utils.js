
	import store from '@/store/index.js';  
	//获取本地存储中的数据
	const initKey=['token','userInfo','houseInfo','communityInfo'] //防止刷新vuex丢失数据 
	const getStoreData= function (key){
		uni.getStorage({
			key:key,
			success:(res)=>{
				store.state[key]=res.data
			}
		})
	}
	const initStorestate=function(){
		initKey.forEach(item=>{
			getStoreData(item)
		})
	}
	// 批量上传接口
	const attachUpload =function(imageList){
		return new Promise((resolve, reject) => {
			// 批量上传接口
			let files = [];
			for(let i = 0,len =imageList.length; i < len; i++){
				let imgAttr = new Object();
				imgAttr.name = 'img' + i;
				imgAttr.uri = imageList[i];
				files.push(imgAttr);
			}
			uni.uploadFile({
				url: 'http://81.70.163.240:11001/zf/v1/file/uploads',
				header: {
					'Authorization': 'Bearer '+store.state.token
				},
				files: files,
				success: (res) => {
					resolve(JSON.parse(res.data).data);
				},
				fail: (e) => {
					uni.hideLoading();
					reject(e);
				}
			});
		})
	}
	//编辑右上角按钮文字
	const editTitleText=function(txt) {
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
	
					// #ifdef APP-PLUS
					let currentWebview = page.$getAppWebview();
					let titleObj = currentWebview.getStyle().titleNView;
					if (!titleObj.buttons) {
						return;
					}
	
					titleObj.buttons[0].text = txt;//修改文字
					currentWebview.setStyle({
						titleNView: titleObj
					});
					// #endif
				}
					
				const getPlatform=function(){
					let platform = uni.getSystemInfoSync().platform
					return platform
								// switch (platform) {
								// 	case "ios":
								// 		console.log('你已经进入苹果平台，你需要执行的代码是！！！！')
								// 		break;
								// 	case "devtools":
								// 		console.log('你已经进入微信小程序，你需要执行的代码是！！！！')
								// 		break;
								// 	case "android":
								// 		console.log('你已经进入安卓平台！！！，你需要执行的代码是！！！！')
								// 		break;
								// 	default:
								// 		break;
								// }
				}
					
				const htmlEncode= function(str){
					  var temp = "";
					              if(str.length == 0) return "";
					              temp = str.replace(/&/g,"&amp;");
					              temp = temp.replace(/</g,"&lt;");
					              temp = temp.replace(/>/g,"&gt;");
					              temp = temp.replace(/\s/g,"&nbsp;");
					              temp = temp.replace(/\'/g,"&#39;");
					              temp = temp.replace(/\"/g,"&quot;");
					 return temp;
				}
					
				const isLoginCheck=function (){
					let token=''
					uni.getStorage({
						key:'token',
						success(res) {
							console.log('当',res)
							if(res.data){
								token=res.data
							}
						}
					})
					if(!token){
							uni.navigateTo({
								url: '/pages/auth/login'
							})
					}
				}
				
	export {
	getStoreData,
	initStorestate,
	attachUpload,
	editTitleText,
	htmlEncode,
	getPlatform,
	isLoginCheck
	}
