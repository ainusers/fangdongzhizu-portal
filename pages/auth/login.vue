<style lang="scss">
/* 每个页面公共css */
@import "@/style/login/weex.scss";
@import "@/style/login/skin.scss";

.forget_btn {
  position: absolute;
  bottom: 30rpx;
  width: $boxWidth
}

.top {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  image {
    width: 150rpx;
    height: 150rpx;
    margin-top: 100rpx;
  }
}
</style>
<template>
  <view class="abslrtb flex-column a-center wrap">
    <view class="top">
      <image src="http://43.143.148.105:9090/remote/fangdongzhizu/logo.png"></image>
    </view>

    <view class="flex tabs mb30">
      <view @click="tab(0)" class="flex-1 flex aj-center" :class="tabIndex==0 && 'active'">
        <text class="fs34 fw600 text-gray" :class="tabIndex==0 && 'curtext'">账号登录</text>
      </view>
      <view @click="tab(1)" class="flex-1 flex aj-center" :class="tabIndex==1 && 'active'">
        <text class="fs34 fw600 text-gray" :class="tabIndex==1 && 'curtext'">手机登录</text>
      </view>
    </view>

    <view class="form" v-if="tabIndex == 0">
      <!-- //用户名 -->
      <phoneTab type="user" ref="userName"></phoneTab>
      <!-- //密码 -->
      <pwdTab ref="passWord"/>
    </view>

    <view class="form" v-if="tabIndex ==1">
      <!-- 手机号 -->
      <phoneTab type="phone" ref="phone"></phoneTab>
      <!-- 图形码 -->
      <imgCode ref="imgCode"/>
      <!-- 验证码 -->
      <yzmCode ref="yzmCode"/>
    </view>

    <view class="btns">
      <button @click="login" class="qbtn" @tap="$u.throttle(login, 2000)">
        <view class="btn-text-color fs30">登录</view>
      </button>
      <view class="blue_link" :class="{'animShake':isShow}" style="display: flex;flex-direction: inherit;">
        <u-checkbox-group width="25px">
          <u-checkbox
              v-model="checked"
              name="隐私协议"
              shape="square"
              active-color="#1183fb">
          </u-checkbox>
        </u-checkbox-group>
        <view>我已阅读并同意</view>
        <view class="blue" @click="goUserUrl">《用户协议》</view>
        <view class="blue" @click="goUrl">《隐私协议》</view>
      </view>

      <view class="flex ptb30 mlr20 space-between forget_btn">
        <view @click="goRegister">
          <text class="fs28 nav-text-color ">注册用户</text>
        </view>
        <view @click="goForget">
          <text class="fs28 nav-text-color">忘记密码</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
var timer;

import phoneTab from '@/components/common/form/phone_tab.vue'
import pwdTab from '@/components/common/form/pwd_tab.vue'
import yzmCode from '@/components/common/form/yzm_code.vue'
import imgCode from '@/components/common/form/img_code.vue'

export default {
  data() {
    return {
      tabIndex: 0,
      username: '',
      password: '',
      phone: '',
      code: '',
      phoneInfo: '',
      checked: false,
      isShow: false,
    }
  },
  components: {
    phoneTab,
    pwdTab,
    yzmCode,
    imgCode
  },
  onLoad() {
    // 获取系统信息
    uni.getSystemInfo({
      success(res) {
        uni.setStorage({
          key: 'phoneInfo',
          data: res
        })
      }
    })
  },
  onUnload() {
    clearInterval(timer);
  },
  // 退出APP后不允许用户操作返回键
  onBackPress() {
    let token = uni.getStorageSync('token')
    if (!token) {
      // 退出APP
      plus.runtime.quit();
    }
  },
  methods: {
    // 查看隐私协议
    goUrl() {
      uni.navigateTo({
        url: '/pages/tabbar/me/text/privacy'
      })
    },
    // 查看用户协议
    goUserUrl() {
      uni.navigateTo({
        url: '/pages/tabbar/me/text/server'
      })
    },
    // 用户登录
    login() {
      switch (this.tabIndex) {
        case 0:
          this.loginByUser()
          this.username = this.$refs.userName.username
          break;
        case 1:
          this.username = this.$refs.phone.username
          this.loginByMsg()
          break;
        default:
          break;
      }
    },
    // 账号登录
    loginByUser() {
      if (!this.$refs.userName.username) {
        uni.showToast({
          icon: 'none',
          title: '请填写手机号'
        });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(this.$refs.userName.username)) {
        uni.showToast({
          icon: 'none',
          title: '请填写正确的手机号'
        });
        return;
      }
      if (this.$refs.passWord.password.length < 1) {
        uni.showToast({
          icon: 'none',
          title: '请输入密码'
        });
        return;
      }
      if (!this.checkYinSiXieYi()) {
        return;
      }
      let data = {
        username: this.$refs.userName.username,
        password: this.$refs.passWord.password
      }
      this.$H.post('/zf/v1/user/login', data, false).then(res => {
        if (res.status) {
          this.$store.commit('token', res.data[0].token)
          this.getUserInfo();
          uni.switchTab({
            url: '/pages/tabbar/home/home'
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: res.message
          });
        }
      })
    },
    // 手机号登录
    loginByMsg() {
      if (!this.$refs.phone.username) {
        uni.showToast({
          icon: 'none',
          title: '请填写手机号'
        });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(this.$refs.phone.username)) {
        uni.showToast({
          icon: 'none',
          title: '请填写正确的手机号'
        });
        return;
      }
      if (this.$refs.imgCode.code.length < 1) {
        uni.showToast({
          icon: 'none',
          title: '请输入图形码'
        });
        return;
      }
      if (this.$refs.yzmCode.code.length < 1) {
        uni.showToast({
          icon: 'none',
          title: '请输入验证码'
        });
        return;
      }
      uni.showToast({
        icon: 'none',
        title: this.checkYinSiXieYi()
      });
      if (!this.checkYinSiXieYi()) {
        return
      }
      let data = {
        username: this.$refs.phone.username,
        code: this.$refs.yzmCode.code
      }
      uni.showToast({
        icon: 'none',
        title: data
      });
      this.$H.post('/zf/v1/user/login', data, false).then(res => {
        if (res.status) {
          this.$store.commit('token', res.data[0].token)
          this.getUserInfo();
          //获取未读消息数量
          this.getUnreadMsgCnt();
          uni.switchTab({
            url: '/pages/tabbar/home/home'
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: res.message
          });
        }
      })
    },
    // 检查是否勾选隐私协议
    checkYinSiXieYi() {
      let status = false
      if (!this.checked) {
        uni.showToast({
          icon: 'none',
          title: '请勾选用户协议和隐私协议！'
        });
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
        }, 500)
        status = false
      } else {
        status = true
      }
      return status
    },
    // 获取用户token
    getUserInfo() {
      this.$H.get('/zf/v1/user/attr/token', {}, true).then(res => {
        if (res.status) {
          this.userInfo = res.data[0].user;
          this.$store.commit('userInfo', this.userInfo)
          uni.setStorage({
            key: 'userInfo',
            data: this.userInfo
          })
		      this.getUnreadMsgCnt(this.userInfo.id);
        }
      })
    },
    // 切换tab标签
    tab(index) {
      this.tabIndex = index;
    },
    // 注册
    goRegister() {
      uni.navigateTo({
        url: '/pages/auth/register'
      })
    },
    // 忘记密码
    goForget() {
      uni.navigateTo({
        url: '/pages/auth/forget'
      })
    },
	//设置未读消息数量
	getUnreadMsgCnt(userId){
		let data ={
			userId: userId
		}
		this.$H.get('/zf/v1/const/news/count', data, true).then(res => {
			if (200 == res.code && res.data.length > 0) {
				this.unReadMsgCnt=res.data[0].commentCount+res.data[0].dynamicCount+res.data[0].roomCount;
				uni.setStorage({
				  key: 'unreadMsgCnt',
				  data: res.data[0]
				})
				if(this.unReadMsgCnt > 0){
					uni.setTabBarBadge({
						index:3,
						text: this.unReadMsgCnt.toString()
					})
				}
			}
		})
	}
  }
}
</script>
