// personal/personal.js
import api from '../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    disabled:true
  },
  // 点击编辑按钮
  edit:function(e){
    this.setData({
      disabled:false
    })
  },
   // 点击编辑按钮
   bindFormSubmit:function(e){
   console.log(wx.getStorageSync('logininfo'))
   let wechatno = {
     wechatno:wx.getStorageSync('logininfo').wechatno
   }
   let data = Object.assign(wechatno,e.detail.value)
   console.log(data)
   api.request('api/doctorDocoument/update','PUT',data).then(res=>{
     console.log(res)
      this.setData({
      disabled:true
    })
    //更新缓存信息
    wx.setStorage({
      data: res.data[0],
      key: 'logininfo',
    })
   }).catch(error=>{
     console.log(error)
   })

   
  },
   // 点击编辑按钮
   cancle:function(e){
    this.setData({
      disabled:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'logininfo',
    }).then(res => {
      console.log(res.data)
      this.setData({
        info:res.data
      })
    }).catch(error => {
      console.log(error)
      wx.showModal({
        title: '获取用户信息失败',
        content: '请扫码登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })

    })
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