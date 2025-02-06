<script>
import {initStorestate} from '@/utils/utils.js'
import store from '@/store/index.js'

export default {
  onLaunch: function () {
    uni.getStorage({
      key: 'token',
      success(res) {
        if (res.data) {
          uni.switchTab({
            url: '/pages/tabbar/home/home'
          })
        }
      }
    })
  },
  onShow() {
    // 持久化内存数据
    initStorestate();
    uni.getStorage({
      key: 'token',
      success(res) {
        if (res.data) {
          //设置未读消息数量
          uni.getStorage({
            key: 'unreadMsgCnt',
            success(res) {
              let unReadMsgCnt = res.data.commentCount + res.data.dynamicCount + res.data.roomCount;
              if (res.data && unReadMsgCnt > 0) {
                uni.setTabBarBadge({
                  index: 3,
                  text: unReadMsgCnt.toString()
                })
              } else {
                uni.request({
                  url: 'http://43.143.148.105:31002/zf/v1/const/news/count', // 后端接口地址
                  method: 'GET', // 请求方法
				  header: {
				    'content-type': 'application/json',
				    'Authorization': 'Bearer ' + store.state.token
				  },
				  data: {userId: store.state.userInfo.id},
                  success: (res) => {
                    // 请求成功时的回调
                    if (200 == res.data.code && res.data.data.length > 0) {
                      uni.setStorage({
                        key: 'unreadMsgCnt',
                        data: res.data.data[0]
                      });
                      let unReadMsgCnt = res.data.data[0].commentCount + res.data.data[0].dynamicCount + res.data.data[0].roomCount;
                      if (unReadMsgCnt > 0) {
                        uni.setTabBarBadge({
                          index: 3,
                          text: unReadMsgCnt.toString()
                        })
                      } else {
                        uni.removeTabBarBadge({
                          index: 3
                        })
                      }
                    } else {
                      console.error('获取消息失败，状态码：', res.statusCode);
                    }
                  },
                  fail: (err) => {
                    // 请求失败时的回调
                    console.error('获取消息失败：', err);
                  }
                });
              }
            }
          });
        }
      }
    })
  }
};
</script>

<!-- 加入公共样式uview-ui -->
<style lang="scss">
@import 'uview-ui/index.scss';
@import "static/iconfont/iconfont.css";
</style>