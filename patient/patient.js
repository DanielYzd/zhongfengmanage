// patient/patient.js
import * as echarts from '../ec-canvas/echarts';
import api from '../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    option: {
      color: ['#61B7FF', '#49C787', '#FBB000', '#F34F2F'],
      // tooltip: {
      //     trigger: 'item',
      //     formatter: '{a} <br/>{b}: {c} ({d}%)'
      // },
      legend: {
        orient: 'horizontal',
        bottom: 20,
        selectedMode: false,
      },
      series: [
        {
          name: 'xxx',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 0, name: '' },
            { value: 0, name: '' },
            { value: 0, name: '' },
            { value: 0, name: '' }
          ]
        }
      ]
    }
  },
  init_echarts: function () {
    const getPixelRatio = () => {
      let pixelRatio = 0
      wx.getSystemInfo({
        success: function (res) {
          pixelRatio = res.pixelRatio
        },
        fail: function () {
          pixelRatio = 0
        }
      })
      return pixelRatio
    }
    // console.log(pixelRatio)
    var dpr = getPixelRatio()
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      Chart.setOption(this.data.option);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.request('api/perdoctorManage/searchpaintper', 'GET').then(res => {
      console.log(res)
      let resData = 'option.series[0].data'
      let temp = []
      temp.push(res.data.highpaint)
      temp.push(res.data.lowpaint)
      temp.push(res.data.secondpaint)
      temp.push(res.data.turepaint)
      console.log(resData)
      let arr = temp.map(item=>{
        return {name:item.skind,value:item.count}
      })
      this.setData({
        [resData]: arr
      })
      console.log(this.data.option)
      this.echartsComponnet = this.selectComponent('#mychart');
      this.init_echarts()
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