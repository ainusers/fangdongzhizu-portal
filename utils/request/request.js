import config from './config.js';
import store from '../../store/index.js';
export default {
	request(options = {}) {
		return new Promise((resolve, reject) => {
			let url = options.url;
			if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
				options.url = config.domain + url;
			}
			options.complete = (response) => {
				uni.hideLoading()
				if (response.statusCode == 200) {
					if (response.data.code == 10010) {
							uni.removeStorage({
								key:'token'
							})
							uni.navigateTo({
								url: '/pages/auth/login'
							})
					}
					resolve(response.data)
				} else {
					uni.showToast({
						title: response.data.message ||'请求异常,请联系管理员',
						icon: "none"
					});
				}
			}
			uni.request(options)
		})
	},
	// POST请求
	post(url, data = {},isToken, header = {}) {
		if(isToken){
			header={
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + store.state.token
			}
		}
		let options = {
			url: url,
			data: data,
			header: header,
			method: "POST"
		}
		return this.request(options);
	},
	// PATCH请求
	patch(url, data = {},isToken, header = {}) {
		if(isToken){
			header={
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + store.state.token
			}
		}
		let options = {
			url: url,
			data: data,
			header: header,
			method: "PATCH"
		}
		return this.request(options);
	},
	// GET请求
	get(url, data = {},isToken, header = {}) {
		if(isToken){
			header={
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + store.state.token
			}
		}
		let options = {
			url: url,
			data: data,
			header: header
		}
		return this.request(options);
	},
	// 文件上传
	fileUpload(url,files={},header={}){
			header={
					'Authorization': 'Bearer ' + store.state.token
			}
		let options = {
			url: config.domain+url,
			files: files,
			header: header,
		}
		return new Promise((resolve,reject)=>{
			uni.uploadFile({
					url: config.domain+url,
					files: files,
					header: header,
					success:(res)=>{
            try{
              resolve(JSON.parse(res.data).data);
            }catch(e){
              console.log(e)
            }
			},
			fail: (e) => {
				uni.hideLoading();
				reject(e);
			}
			}	
			);
		})
	}
};