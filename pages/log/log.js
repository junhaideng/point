// pages/log.js
import {
  getLog
} from "../../db/index";

Page({

  data: {
    log: [],
    cached: false,
    hasMore: true,
    page: 0,
  },

  onShow: function () {
    this.getTabBar().setData({
      active: 2
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
          log: [],
          hasMore: true, 
        })
        return
      }
      this.setData({
        log: this.convert(res.data),
        page: 1,
        hasMore: true, 
      })
    }).catch(err => {
      wx.showToast({
        title: '获取日志失败: ' + err,
      })
    })

  },
  convert: function (log) {
    return log.map(item => {
      item.created_time = this.formateTime(item.created_time)
      return item
    })
  },
  formateTime: function (date) {
    let res = date.getFullYear() + "-";

    if (date.getMonth() + 1 < 10) {
      res += "0"
    }
    res += date.getMonth() + 1 + "-"

    if (date.getDate() < 10) {
      res += "0"
    }
    res += date.getDate() + " ";

    if (date.getHours() < 10) {
      res += "0"
    }
    res += date.getHours() + ":";
    if (date.getMinutes() < 10) {
      res += "0"
    }
    res += date.getMinutes() + ":";
    if (date.getSeconds() < 10) {
      res += "0"
    }
    res += date.getSeconds();

    return res
    // return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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
  onReachBottom: function () {
    console.log("到底")
    const {
      hasMore,
      page
    } = this.data;

    if (hasMore) {
      wx.showLoading({
        "title": "获取日志中"
      })
      getLog(page).then(res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无更多日志',
            icon: 'none'
          })
          this.setData({
            hasMore: false
          })
          return
        }
        this.setData({
          log: this.data.log.concat(this.convert(res.data)),
          page: page + 1
        })
        wx.hideLoading()
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '获取日志失败: ' + err,
        })
      })
    }
  }
})