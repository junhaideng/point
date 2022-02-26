// index.js
import {
  getReward,
  getTotal,
  addLog,
  updateTotal
} from "../../db/index"

Page({
  onShow: function () {
    this.getTabBar().setData({
      active: 0
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
  data: {
    reward: [],
    total: 0,
    cached: false
  },
  addPoint: function (event) {
    const {
      point,
      content
    } = event.target.dataset;
    const total = this.data.total + point;
    this.setData({
      total: total
    })

    if (point > 0) {
      wx.showToast({
        title: "成功添加积分"
      })
      addLog("add", point, content);
      updateTotal(total);
    } else {
      wx.showToast({
        title: "成功减去积分"
      })
      addLog("reduce", point, content);
      updateTotal(total);
    }
  },
  init: function () {
    // 加载奖励机制
    getReward().then(res => {
      this.setData({
        reward: res.data
      })
    }).catch(err => {
      wx.showToast({
        title: err,
      })
    })

    getTotal().then(res => {
      this.setData({
        total: res.data.total
      })
    }).catch(err => {
      wx.showToast({
        title: '获取总积分失败: ' + err,
      })
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.init();
    wx.showToast({
      title: '加载数据完成',
      icon: 'none'
    })
    wx.hideNavigationBarLoading(); //完成停止加载图标
    wx.stopPullDownRefresh();
  }
})