module.exports=()=>({
    "easycom": {
        "^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue",
        "^q-(.*)": "@/components/q-$1/q-$1.vue"
    },
    "pages": [
		{
		    "path": "pages/tabbar/home/home",
		    "style": {
				"transparentTitle":  "always",
				"navigationBarTitleText": "",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"backgroundColor":"#fff",
				"onReachBottomDistance":200
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
				"navigationBarTitleText": "登录",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/home/homeDetail",
            "style": {
				"navigationBarTitleText": "房屋详情页",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/home/chooseCity",
            "style": {
                "navigationBarTitleText": "选择城市",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/auth/forget",
            "style": {
                "navigationBarTitleText": "忘记密码",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/auth/register",
            "style": {
                "navigationBarTitleText": "注册",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/community/community",
            "style": {
				"transparentTitle":  "always",
				"navigationBarTitleText": "",
				"navigationBarTextStyle": "black",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"backgroundColor":"#fff",
				"onReachBottomDistance":200
            }
        },
        {
            "path": "pages/tabbar/community/comment",
            "style": {
                "enablePullDownRefresh": false,
                "navigationBarTitleText": "图文详情",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/publish/publish",
            "style": {
                "navigationBarTitleText": "发布",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
		{
			"path" : "pages/tabbar/news/news",
			"style" : 
			{
				"navigationBarTitleText" : "消息",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light"
			}
		},
        {
            "path": "pages/tabbar/me/me",
            "style": {
                "navigationBarTitleText": "我的",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light"
            }
        },
		{
		    "path": "pages/tabbar/me/list/list",
		    "style": {
				"navigationBarTitleText": "风险榜单",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": true,
				"backgroundTextStyle":"light"
		    }
		},
		{
		    "path": "pages/tabbar/me/list/list-detail",
		    "style": {
				"navigationBarTitleText": "租房体验",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": false,
				"backgroundTextStyle":"light",
				"onReachBottomDistance":0
		    }
		},
        {
            "path": "pages/tabbar/me/tools/check",
            "style": {
                "navigationBarTitleText": "房源信息",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light",
                "backgroundColor":"#ffffff"
            }
        },
        {
            "path": "pages/tabbar/me/user",
            "style": {
                "navigationBarTitleText": "个人信息",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/me/update/nickname",
            "style": {
                "navigationBarTitleText": "修改昵称",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
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
            }
        },
        {
            "path": "pages/tabbar/me/update/realname",
            "style": {
                "navigationBarTitleText": "实名认证",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
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
            }
        },
        {
            "path": "pages/tabbar/me/update/sex",
            "style": {
                "navigationBarTitleText": "设置性别",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
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
            }
        },
        {
            "path": "pages/tabbar/me/update/region",
            "style": {
                "navigationBarTitleText": "选择地区",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
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
            }
        },
        {
            "path": "pages/tabbar/me/update/pwd",
            "style": {
                "navigationBarTitleText": "修改密码",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
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
            }
        },
        {
            "path": "pages/tabbar/me/update/sign",
            "style": {
                "navigationBarTitleText": "个性签名",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
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
            }
        },
        {
            "path": "pages/tabbar/me/tools/about",
            "style": {
                "navigationBarTitleText": "关于我们",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/me/list/feel",
            "style": {
                "navigationBarTitleText": "反馈体验",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/me/tools/advise",
            "style": {
                "navigationBarTitleText": "反馈建议",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/me/tools/shuoshuo",
            "style": {
                "navigationBarTitleText": "动态信息",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/publish/choice/tuwen",
            "style": {
                "navigationBarTitleText": "发布动态",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
        {
            "path": "pages/tabbar/publish/choice/fangyuan",
            "style": {
                "navigationBarTitleText": "发布房源",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
                "enablePullDownRefresh": false,
                "backgroundTextStyle":"light"
            }
        },
        {
            "path" : "components/common/screen-tab/screen-tab",
            "style" :
                {
                    "navigationBarTitleText": "",
                    "enablePullDownRefresh": false
                }
        },
        {
            "path" : "pages/tabbar/me/update/updatephone",
            "style" :
                {
                    "navigationBarTitleText": "修改手机号",
                    "navigationBarTextStyle": "white",
                    "navigationBarBackgroundColor": "#1183fb",
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
                }
        },
        {
            "path": "pages/tabbar/me/personal",
            "style": {
                "navigationBarTitleText": "个人主页",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
            }
        },
        {
            "path": "pages/tabbar/me/text/register",
            "style": {
                "navigationBarTitleText": "注册协议",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
            }
        },
        {
            "path": "pages/tabbar/me/text/privacy",
            "style": {
                "navigationBarTitleText": "隐私协议",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
            }
        },
        {
            "path": "pages/tabbar/me/text/server",
            "style": {
                "navigationBarTitleText": "用户协议",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb",
            }
        },
        {
            "path": "pages/tabbar/me/reward",
            "style": {
                "navigationBarTitleText": "打赏页面",
                "navigationBarTextStyle": "white",
                "navigationBarBackgroundColor": "#1183fb"
            }
        },
		{
			"path" : "pages/tabbar/news/like",
			"style" : 
			{
				"navigationBarTitleText" : "收到的点赞",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": true,
				"backgroundTextStyle":"light"
			}
		},
		{
			"path" : "pages/tabbar/news/bookmark",
			"style" : 
			{
				"navigationBarTitleText" : "收到的收藏",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": true,
				"backgroundTextStyle":"light"
			}
		},
		{
			"path" : "pages/tabbar/news/comment",
			"style" : 
			{
				"navigationBarTitleText" : "收到的评论",
				"navigationBarTextStyle": "white",
				"navigationBarBackgroundColor": "#1183fb",
				"enablePullDownRefresh": true,
				"backgroundTextStyle":"light"
			}
		}
    ],
    "tabBar": {
        "color": "#7A7E83",
        "backgroundColor": "#fff",
        "borderStyle": "white",
        "selectedColor": "#000000",
		"fontSize": "12px",
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
                "iconPath": "static/tabbar/publish.png",
                "selectedIconPath": "static/tabbar/publishactive.png",
                "text": "发布"
            },
			{
			    "pagePath": "pages/tabbar/news/news",
			    "iconPath": "static/tabbar/news.png",
			    "selectedIconPath": "static/tabbar/newsactive.png",
			    "text": "消息"
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