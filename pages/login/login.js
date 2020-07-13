// pages/login/login.js
import api from '../../utils/api'
import GoEasy from '../../geeasy/goeasy-im-1.0.7';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  getScanCode: function (e) {
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        let result = res.result
        wx.login({
          success: (res) => {
            console.log(res)
            let data = {
              wxCode: res.code,
              sbarcode: result
            }
            api.request('api/doctorDocoument/wxLogin', 'GET', data,{},false).then(res => {
              console.log(res)
              wx.setStorageSync('logininfo', res.data)
              wx.showModal({
                content: '登录成功,跳转首页',
                showCancel: false,
                confirmText: 'OK'
              })
              //登录成功重新建立初始化goeasy聊天
              let userInfo =  wx.getStorageSync('logininfo')
              if (userInfo) {
                let user = {
                  id:userInfo.wechatno,
                  dodoctname:userInfo.dodoctname,
                  department:userInfo.department,
                  professional:userInfo.professional
                }
                app.goEasy(user)
              }
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }, 2000);
            }).catch(error => {
              console.log(error)
              let that = this
              wx.showModal({
                title: '扫码失败',
                content:error.message,
                confirmText: '重试',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击重试')
                    //如果不存在跳转登录界面
                    that.onLoad()
                  }
                }
              })
            //  this.Reread()
            })
          },
        })

      },
      fail: (error) => {
        console.log(error)
       this.Reread()
      }
    })
  },

  Reread: function () {
    let that = this
    wx.showModal({
      content: '扫码失败',
      confirmText: '重试',
      success(res) {
        if (res.confirm) {
          console.log('用户点击重试')
          //如果不存在跳转登录界面
          that.onLoad()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScanCode()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})