export default function() {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			// console.log(plus.runtime.appid)
			// conole.log(plus.runtime.version)
			console.log(widgetInfo)
			const data = {
				action: 'checkVersion',
				appid: '__UNI__190F3AB', //plus.runtime.appid,
				appVersion:'1.0.1.6',
				wgtVersion: widgetInfo.version
			}
			console.log("data: ",data);
			uniCloud.callFunction({
				name: 'uni-upgrade-center',
				data,
				success: (e) => {
					console.log("e: ", e);
					resolve(e)
				},
				fail: (error) => {
					reject(error)
				}
			})
		})
	})
	// #endif
	// #ifndef APP-PLUS
	return new Promise((resolve, reject) => {
		reject({
			message: '请在App中使用'
		})
	})
	// #endif
}
