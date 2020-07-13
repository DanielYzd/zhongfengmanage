// message/message.js
import GoEasyIM from '../geeasy/goeasy-im-1.0.7'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    name:'',
    sendMessage: '',
    scrollLast: ''
  },
  input: function (e) {
    console.log(e)
    this.setData({
      sendMessage: e.detail.value
    })
  },
  //发送消息，医生发送消息通道是自己的wechatno加患者的wechatno
  send: function () {
    if (this.data.sendMessage) {
      let username = wx.getStorageSync('logininfo').dodoctname
      let payload={
        username:username,
        message:this.data.sendMessage
      }
     
      let message = app.globalData.goEasy.createMessage(payload);
      let promise2 = app.globalData.goEasy.sendPrivateMessage(this.data.code,message);
      promise2.then(res=>{
        console.log(res)
        this.gethistory()
        this.setData({
          sendMessage:''
        })
      }).catch(error=>{
        console.log(error)
      })
    } else {
      wx.showModal({
        content: '发送内容不能为空',
      })
    }

  },
  reconnect: function () {
    app.globalData.goEasy.reconnect()
  },
  disconnect: function () {
    app.globalData.goEasy.disconnect()
  },
  //订阅消息 医生订阅消息通道是患者的wechatno
  subscribe: function () {
    let that = this
    let onPrivateMessageReceived = function (message) {
      console.log(message)
      that.gethistory()
    };
    app.globalData.goEasy.on(GoEasyIM.EVENT.PRIVATE_MESSAGE_RECEIVED, onPrivateMessageReceived)
  },

  //查询历史消息
  gethistory: function () {
    let option = {
      friendId: this.data.code,
      limit: 10
    }
    let promise = app.globalData.goEasy.history(option)
    promise.then(res => {
      console.log(res)
      let all = res.content.map(item => {
        if (item.senderId == this.data.code) {
          return ({
            time: item.timestamp,
            content: item.payload.message,
            type: 'accept'
          })
        } else {
          return ({
            time: item.timestamp,
            content: item.payload.message,
            type: 'send'
          })
        }
      })
      this.setData({
        all: all
      })
      this.setData({
        scrollLast: 'item' + (this.data.all.length - 1)
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.setData({
      code: options.code
    })
    this.setData({
      name: options.name
    })
    this.gethistory()
    this.subscribe()
    // this.getAllhistory()

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