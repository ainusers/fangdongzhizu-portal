export default function() {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			const data = {
				action: 'checkVersion',
				appid: '__UNI__190F3AB', //plus.runtime.appid,
				appVersion:'1.0.15',
				wgtVersion: widgetInfo.version
			}
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
