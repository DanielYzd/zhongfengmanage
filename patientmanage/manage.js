// patientmanage/manage.js
import api from '../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[
      // {name:'张三',time:'2020.03.20 12:23:06'},
      // {name:'张四',time:'2020.03.20 12:23:06'},
      // {name:'张五',time:'2020.03.20 12:23:06'},
      // {name:'张六',time:'2020.03.20 12:23:06'}
    ]
  },
  jump:function(e){
    console.log(e.currentTarget.dataset.code)
    let code=e.currentTarget.dataset.code
    code = JSON.stringify(code)
    wx.navigateTo({
      url: `/patientdetail/patientdetail?code=${code}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.request('api/perdoctorManage/searchonly','GET').then(res=>{
      console.log(res)
      this.setData({
        arr:res.data.content
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