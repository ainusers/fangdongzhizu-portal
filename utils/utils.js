
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
	
	export {
	getStoreData,
	initStorestate,
	attachUpload
	}
