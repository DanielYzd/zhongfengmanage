// historymessage/historymessage.js
import GoEasyIM from '../geeasy/goeasy-im-1.0.7'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payload: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  jump:function(e){
    console.log(e)
    let patientarr = wx.getStorageSync('patientarr')
    let index = patientarr.findIndex(item=>{
     return item.patientno===e.currentTarget.dataset.value.patientno
    })
    patientarr[index].type=false
    console.log(patientarr)
    wx.setStorageSync('patientarr',patientarr)
    this.setData({
      payload:patientarr
    })
    wx.reLaunch({
      url: `/message/message?code=${e.currentTarget.dataset.value.patientno}&name=${e.currentTarget.dataset.value.username}`,
    })
  },
//订阅消息
  onLoad: function (options) {
    // 进入界面清空首页消息数量提示
    this.setData({
     payload: wx.getStorageSync('patientarr')
    })
    // console.log(app.globalData.message)
    // let appmessage = app.globalData.message

    // console.log(this.groupBy(appmessage))
    // let arr2 = this.groupBy(appmessage)
    // let arr3 = Object.values(arr2)
    // console.log(arr3)
    // this.setData({
    //   payload:arr3
    // })
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