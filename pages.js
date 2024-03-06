module.exports=()=>({
	"easycom": {
		"^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue",
		"^q-(.*)": "@/components/q-$1/q-$1.vue"
	},
	"pages": [
		{
			"path": "pages/auth/guide",
			"style": {
				"transparentTitle":  "always"
			},
			meta:{
				needLogin:false
			}
		},
		{
			"path": "uni_modules/uni-upgrade-center-app/pages/upgrade-popup",
			"style": {
				"disableScroll": true,
				"app-plus": {
					"backgroundColorTop": "transparent",
					"background": "transparent",
					"titleNView": false,
					"scrollIndicator": false,
					"popGesture": "none",
					"animationType": "fade-in",
					"animationDuration": 200
		
				}
			}
		},
		{
			"path": "pages/auth/login",
			"style": {
				"transparentTitle":  "always"
			},
			meta:{
				needLogin:false
			}
		},
		{
			"path": "pages/tabbar/home/homeDetail",
			"style": {
				"transparentTitle":  "always"
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/home/chooseCity",
			"style": {
				"navigationBarTitleText": "选择城市",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/auth/forget",
			"style": {
				"transparentTitle":  "always"
			},
			meta:{
				needLogin:false
			}
		},
		{
			"path": "pages/auth/register",
			"style": {
				"transparentTitle":  "always"
			},
			meta:{
				needLogin:false
			}
		},
		{
			"path": "pages/tabbar/home/home",
			"style": {
				"transparentTitle":  "always",
				"navigationBarTextStyle": "black",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"backgroundColor":"#fff",
				"app-plus": {
					"scrollIndicator": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/community/community",
			"style": {
				"transparentTitle":  "always",
				"enablePullDownRefresh": true
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/community/comment",
			"style": {
				"enablePullDownRefresh": true,
				"navigationBarTitleText": "图文详情",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"backgroundTextStyle":"light"
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/publish/publish",
			"style": {
				"navigationBarTitleText": "发布",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/me",
			"style": {
				"transparentTitle":  "always"
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/tools/check",
			"style": {
				"navigationBarTitleText": "房源信息",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"backgroundColor":"#fff",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none",
					"titleNView": {
						"buttons": [
							{
								"background": "red",
								"margin":"20px",
								"text": "管理",
								"fontSize": "16px",
								"float": "right"
							}
						]
					}
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/user",
			"style": {
				"navigationBarTitleText": "个人信息",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/update/nickname",
			"style": {
				"navigationBarTitleText": "修改昵称",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none",
					"titleNView": {
						"buttons": [
							{
								"background": "red",
								"margin":"20px",
								"text": "保存",
								"fontSize": "16px",
								"float": "right"
							}
						]
					}
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/update/realname",
			"style": {
				"navigationBarTitleText": "实名认证",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none",
					"titleNView": {
						"buttons": [
							{
								"background": "red",
								"margin":"20px",
								"text": "保存",
								"fontSize": "16px",
								"float": "right"
							}
						]
					}
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/update/sex",
			"style": {
				"navigationBarTitleText": "设置性别",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none",
					"titleNView": {
						"buttons": [
							{
								"background": "red",
								"margin":"20px",
								"text": "保存",
								"fontSize": "16px",
								"float": "right"
							}
						]
					}
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/update/region",
			"style": {
				"navigationBarTitleText": "选择地区",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none",
					"titleNView": {
						"buttons": [
							{
								"background": "red",
								"margin":"20px",
								"text": "保存",
								"fontSize": "16px",
								"float": "right"
							}
						]
					}
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/update/pwd",
			"style": {
				"navigationBarTitleText": "修改密码",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none",
					"titleNView": {
						"buttons": [
							{
								"background": "red",
								"margin":"20px",
								"text": "保存",
								"fontSize": "16px",
								"float": "right"
							}
						]
					}
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/update/sign",
			"style": {
				"navigationBarTitleText": "个性签名",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none",
					"titleNView": {
						"buttons": [
							{
								"background": "red",
								"margin":"20px",
								"text": "保存",
								"fontSize": "16px",
								"float": "right"
							}
						]
					}
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/tools/fangyuan",
			"style": {
				"navigationBarTitleText": "房源信息",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/tools/about",
			"style": {
				"navigationBarTitleText": "关于我们",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/tools/advise",
			"style": {
				"navigationBarTitleText": "反馈建议",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/me/tools/shuoshuo",
			"style": {
				"navigationBarTitleText": "动态信息",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none",
					"bounce": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/publish/choice/tuwen",
			"style": {
				"navigationBarTitleText": "发布图文",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none"
				}
			},
			meta:{
				needLogin:true
			}
		},
		{
			"path": "pages/tabbar/publish/choice/fangyuan",
			"style": {
				"navigationBarTitleText": "发布房源",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"app-plus": {
					"scrollIndicator": "none"
				}
			},
			meta:{
				needLogin:true
			}
		}
	    ,{
            "path" : "components/common/screen-tab/screen-tab",
            "style" :                                                                                    
            {
                "navigationBarTitleText": "",
                "enablePullDownRefresh": false
            },
			meta:{
				needLogin:true
			}
        }
        ,
		{
            "path" : "pages/tabbar/me/update/updatephone",
            "style" :                                                                                    
            {
               "navigationBarTitleText": "修改手机号",
               "navigationBarTextStyle": "black",
               "navigationBarBackgroundColor": "#fafafa",
               "enablePullDownRefresh": false,
               "backgroundTextStyle":"light",
               "app-plus": {
               	"scrollIndicator": "none",
               	"bounce": "none",
               	"titleNView": {
               		"buttons": [
               			{
               				"background": "red",
               				"margin":"20px",
               				"text": "保存",
               				"fontSize": "16px",
               				"float": "right"
               			}
               		]
               	}
               }
            },
			meta:{
				needLogin:true
			}
        },
		{
			"path": "pages/tabbar/me/personal",
			"style": {
				"navigationBarTitleText": "个人主页",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
			}
		},
		{
			"path": "pages/tabbar/me/text/register",
			"style": {
				"navigationBarTitleText": "注册协议",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
			}
		},
		{
			"path": "pages/tabbar/me/text/privacy",
			"style": {
				"navigationBarTitleText": "隐私协议",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
			}
		},
		{
			"path": "pages/tabbar/me/text/server",
			"style": {
				"navigationBarTitleText": "用户协议",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#fafafa",
			}
		},
		{
			"path": "pages/tabbar/me/reward",
			"style": {
				"navigationBarTitleText": "打赏",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#5199ff",
			}
		}
    ],
	"tabBar": {
		"color": "#7A7E83",
		"backgroundColor": "#fff",
		"borderStyle": "#eee",
		"selectedColor": "#000000",
		"list": [
			{
				"pagePath": "pages/tabbar/home/home",
				"iconPath": "static/tabbar/home.png",
				"selectedIconPath": "static/tabbar/homeactive.png",
				"text": "首页"
			},
			{
				"pagePath": "pages/tabbar/community/community",
				"iconPath": "static/tabbar/community.png",
				"selectedIconPath": "static/tabbar/communityactive.png",
				"text": "社区"
			},
			{
				"pagePath": "pages/tabbar/publish/publish",
				"iconPath": "static/tabbar/publish-temp.png",
				"selectedIconPath": "static/tabbar/publishactive-temp.png",
				"text": "发布"
			},
			{
				"pagePath": "pages/tabbar/me/me",
				"iconPath": "static/tabbar/me.png",
				"selectedIconPath": "static/tabbar/meactive.png",
				"text": "我的"
			}
		]
	}
})