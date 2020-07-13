// let host = "http://sky.zjdeltamind.com:8000/"
let host = "https://www.zjdeltamind.com/"
// loading配置，请求次数统计
function startLoading() {
  wx.showLoading({
    title: 'Loading...',
    icon: 'none'
  })
}

function endLoading() {
  wx.hideLoading();
}
// 声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};

function request(url, method, data = {}, header = {},notlogin=true) {
  console.log(notlogin)
  showFullScreenLoading()
  let contentType = method==='GET'?'application/x-www-form-urlencoded':'application/json' 
  header={
    'Content-type': contentType
  }
  let obj = {
    sbarcode:wx.getStorageSync('logininfo').sbarcode
  }
  data = notlogin?Object.assign(data,obj):data
  return new Promise((resolve,reject)=>{
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: header,
      success(res){
        if(res.statusCode===200||res.statusCode===201){
          resolve(res)
        }else{
          if(res.data){
            reject(res.data)
          }
        
        }
      
      },
      fail(error){
        wx.showModal({
          title: '错误',
          content: '网络连接失败'
        })
        reject(error)
      },
      complete: function () {
        tryHideFullScreenLoading()
      }
    })
  })
}
module.exports = {
  request: request
}