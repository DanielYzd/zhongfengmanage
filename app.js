//app.js
import GoEasyIM from './geeasy/goeasy-im-1.0.7';
App({
  //GOEasyIm消息初始化连接、监听
  goEasy: function (user) {
    let options = {
      host: "hangzhou.goeasy.io",
      appkey: "BC-19b527060cd242f7ad17e4a1c6b90442"
    };
    //初始化
    this.globalData.goEasy = GoEasyIM.getInstance(options)
    //建立连接
    let promise = this.globalData.goEasy.connect(user)
    promise.then(res => {
      console.log('Connect successful')
    }).catch(error => {
      console.log(error)
    })
  },
  onLaunch: function () {
    let userInfo = wx.getStorageSync('logininfo')
    if (userInfo) {
      let user = {
        id:userInfo.wechatno,
        dodoctname:userInfo.dodoctname,
        department:userInfo.department,
        professional:userInfo.professional
      }
      this.goEasy(user)
    }
  },
  globalData: {
    userInfo: null,
    goEasy: null,
    message:[]
  }
})