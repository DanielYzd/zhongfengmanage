//index.js
//获取应用实例
import GoEasyIM from '../../geeasy/goeasy-im-1.0.7'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    newmessage:false
  },
  jump:function(e){
    if(this.data.newmessage){
      this.setData({
        newmessage:false
      })
    }
    wx.navigateTo({
      url: '/historymessage/historymessage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否登录
    wx.getStorage({
      key: 'logininfo',
    }).then(res => {
      console.log(res)
      console.log('这里开始监听订阅消息')
      // 接收私聊消息
      let that = this
      let onPrivateMessageReceived = function (message) {
        console.log(message)
        that.setData({
          newmessage:true
        })
        // app.globalData.message.push(message)
        // console.log(app.globalData.message)
        // that.setData({
        //   num:app.globalData.message.length
        // })
        let arr1 = wx.getStorageSync('patientarr')
        console.log(arr1)
        let dono = wx.getStorageSync('logininfo')
        let arr2 = []
        if(arr1){
           arr2 = [].concat(arr1)
        }
       
        console.log(arr2)
        if(arr2.length>0){
          let index = arr2.findIndex(item=>item.patientno==message.senderId)
          if(index<0){
            arr2.push({
              patientno:message.senderId,
              username:message.payload.username,
              type:true
            })
          }else{
            // 更新缓存数据
               let obj = {
                patientno:message.senderId,
                username:message.payload.username,
                type:true
           }
           arr2[index]=obj
           console.log(arr2)
         
          }
          wx.setStorageSync('patientarr', arr2)
        }else{
          arr2.push({
            patientno:message.senderId,
            username:message.payload.username,
            type:true
          })
          wx.setStorageSync('patientarr', arr2)
        }
      };
      app.globalData.goEasy.on(GoEasyIM.EVENT.PRIVATE_MESSAGE_RECEIVED, onPrivateMessageReceived)
    }).catch(error => {
      console.log(error)
      wx.showModal({
        title: '提示',
        content: '登录信息不存在，请先扫码登录',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //如果不存在跳转登录界面
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消登录')
          }
        }
      })
    })
  },
  onShow:function(){
    
  }
})