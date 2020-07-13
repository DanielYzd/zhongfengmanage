// packageD/pages/daily.js
import api from '../../utils/api'
import { formatDate } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    startdate: '',
    enddate: '',
    list: []
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  query: function () {
    if (new Date(this.data.startdate).getTime() <= new Date(this.data.enddate).getTime()) {
      let body = {
        startTime: this.data.startdate,
        endTime: this.data.enddate,
        wechatno:this.data.code
      }
      api.request('api/medRecord/search', 'GET', body).then(res => {
        console.log(res)
        if (res.statusCode === 200) {
          // this.data.list=res.data.content
          this.setData({
            list: res.data.content
          })
        } else {
          this.setData({
            list: []
          })
          wx.showModal({
            title: '错误',
            content: '接口请求失败'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    } else {
      wx.showModal({
        title: '提醒',
        content: '结束时间不能大于开始时间'
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let currentDate = formatDate(new Date())
    this.setData({
      code:options.code,
      enddate: currentDate,
      startdate: currentDate
    })
    this.query()
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