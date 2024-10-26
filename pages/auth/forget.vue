<style lang="scss">
/* 每个页面公共css */
@import "@/style/login/weex.scss";
@import "@/style/login/skin.scss";

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
    <view class="form">
      <view class="flex a-center form-item">
        <view class="label_icon">账号</view>
        <view class="label_fgs"></view>
        <view class="flex-1">
          <input placeholder-class="placeholder" class="qui-input" type="number" @input="inputPhone" v-model="phone"
                 maxlength="11" placeholder="请输入手机号"/>
        </view>
      </view>
      <!-- 图形码 -->
      <imgCode ref="imgCode"/>
      <view class="flex a-center form-item">
        <view class="label_icon">验证码</view>
        <view class="label_fgs"></view>
        <view class="flex-1">
          <input placeholder-class="placeholder" class="qui-input" type="number" v-model="code"
                 placeholder="请输入验证码" maxlength="6"/>
        </view>
        <view>
          <text style="opacity: 0.8;" class="fs28 ptb20 main-color yzm" @tap="sendCode">
            {{ codeDuration ? codeDuration + 's' : '获取验证码' }}
          </text>
        </view>
      </view>
      <view class="flex a-center form-item">
        <view class="label_icon">密码</view>
        <view class="label_fgs"></view>
        <view class="flex-1">
          <input :password="password" placeholder-class="placeholder" class="qui-input" type="text" v-model="password"
                 placeholder="请输入新密码"/>
        </view>
      </view>
    </view>
    <view class="btns">
      <view class="qbtn" @click="login" @tap="$u.throttle(login, 3000)">
        <text class="btn-text-color fs30">确认</text>
      </view>
      <view class="flex ptb30 mlr20 aj-center">
        <view @click="goLogin()">
          <text class="fs28 nav-text-color underline">返回登录</text>
        </view>
      </view>
    </view>
    <view class="bottom"></view>
  </view>
</template>

<script>
var that = '';
let timer = ''

import {checkExist} from '@/utils/utils.js'
import imgCode from '@/components/common/form/img_code.vue'

export default {
  data() {
    return {
      password: '',
      phone: '',
      code: '',
      codeDuration: 0,
      random: '',
      imgCode: ''
    }
  },
  components: {
    imgCode
  },
  onLoad() {
    that = this
  },
  created() {
    uni.$on('random', val => {
      this.random = val
    })
    uni.$on('getImgCode', val => {
      this.imgCode = val
    })
  },
  onHide() {
    clearInterval(timer);
  },
  methods: {
    inputPhone() {
      uni.$emit('getUserName', this.phone)
    },
    // 发送验证码
    sendCode() {
      if (this.phone.length < 1) {
        uni.showToast({
          icon: 'none',
          title: '请填写正确的手机号'
        });
        return;
      }
      if (this.imgCode.length < 1) {
        uni.showToast({
          icon: 'none',
          title: '请填写正确的图形码'
        });
        return;
      }
      if (this.codeDuration > 0) {
        return;
      }
      checkExist(this.phone).then(res => {
        if (res.status) {
          // 获取验证码
          this.$H.get('/zf/v1/code/sendCode', {
            phone: this.phone,
            random: this.random,
            code: this.imgCode
          }).then(res => {
            if (res.code === 500) {
              this.$u.toast(res.message);
              return
            }
            if (res.code === 200) {
              this.$u.toast('发送成功');
              this.codeDuration = 60;
              // 倒计时
              timer = setInterval(function () {
                if (that.codeDuration > 0) {
                  that.codeDuration--;
                }
                if (that.codeDuration == 0) {
                  clearInterval(timer);
                }
              }, 1000)
            }
          });
        } else {
          this.$u.toast('当前手机号还没注册，请填写正确手机号！');
        }
      })
    },
    // 登录
    login() {
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        uni.showToast({
          icon: 'none',
          title: '请填写正确的手机号'
        });
        return;
      }
      if (this.code.length < 1) {
        uni.showToast({
          icon: 'none',
          title: '请输入验证码'
        });
        return;
      }
      if (this.password.length < 1) {
        uni.showToast({
          icon: 'none',
          title: '请输入密码'
        });
        return;
      }
      this.$H.post('/zf/v1/user/reset', {
        username: this.phone,
        code: this.code,
        password: this.password
      }).then(res => {
        if (res.code === 200) {
          this.$u.toast('修改成功');
          setTimeout(function () {
            uni.navigateTo({
              url: '/pages/auth/login'
            })
          }, 2000)
        } else {
          this.$u.toast(res.message);
        }
      });
    },
    goLogin() {
      uni.navigateTo({
        url: '/pages/auth/login'
      })
    },
  }
}
</script>