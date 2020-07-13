const app = getApp()
import GoEasyIM from '../geeasy/goeasy-im-1.0.7'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
const subscribe = ()=>{
  console.log(111)
 let logininfo =  wx.getStorageSync('logininfo')
 let that = this
 let onPrivateMessageReceived = function (message) {
   console.log(message)
   app.globalData.message.push(message)
   let arr = wx.getStorageSync('patientarr')
   let dono = wx.getStorageSync('logininfo').wechatno
   console.log(arr)
   if(arr && message.senderId!=dono){
     let a = arr.findIndex(item=>item.wechatno==message.senderId)
     if(a<0){
       arr.push({
         patientno:message.senderId,
         username:message.payload.username
       })
     }else{
       // 更新缓存数据
          let obj = {
           patientno:message.senderId,
           username:message.payload.username
      }
      arr[a]=obj
      console.log(arr)
     }
   }else if(!arr && message.senderId!=dono){
     arr = []
     arr.push({
       patientno:message.senderId,
       username:message.payload.username
     })
     wx.setStorageSync('patientarr', arr)
   }
 };
 app.globalData.goEasy.on(GoEasyIM.EVENT.PRIVATE_MESSAGE_RECEIVED, onPrivateMessageReceived)
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  subscribe:subscribe
}