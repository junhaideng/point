// pages/log.js
import {
  getLog
} from "../../db/index";

Page({

  data: {
    steps: [],
  },

  onShow: function () {
    this.getTabBar().setData({
      active: 3
    })
    if (!this.data.cached) {
      this.init()
      this.setData({
        cached: true
      })
    } else {
      console.log("使用缓存数据")
    }
  },

  init() {
    getLog().then(res => {
      if (res.data.length == 0) {
        wx.showToast({
          title: '暂无日志信息',
          icon: "none"
        })
        this.setData({
          steps: []
        })
        return
      }
      this.setData({
        steps: this.convert(res.data)
      })
    }).catch(err => {
      wx.showToast({
        title: '获取日志失败: ' + err,
      })
    })

  },
  convert: function (log) {
    return log.map(item => {
      if (item.point < 0) {
        return {
          text: item.content + " " + item.point,
          desc: this.formatTime(item.created_time)
        }
      }
      return {
        text: item.content + " +" + item.point,
        desc: this.formatTime(item.created_time)
      }
    })
  },
  formatTime(date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.init();
    wx.showToast({
      title: '加载数据完成',
      icon: 'none'
    })
    wx.hideNavigationBarLoading(); //完成停止加载图标
    wx.stopPullDownRefresh();
  },
})