// index.js
import {
  getReward,
  getTotal,
  addLog,
  updateTotal
} from "../../db/index"

Page({
  onShow() {
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
  data: {
    reward: [],
    total: 0,
  },
  addPoint: function (event) {
    const {
      point,
      content
    } = event.target.dataset;
    this.setData({
      total: this.data.total + point
    })
    wx.showToast({
      title: "成功添加 " + point + " 点积分"
    })

    addLog("add", point, "因" + content + "添加 " + point + " 点积分");
    updateTotal(this.data.total + point);
  },
  reducePoint: function (event) {
    const point = event.target.dataset.point

    this.setData({
      total: this.data.total - point
    })
    wx.showToast({
      title: "成功减去 " + point + " 分"
    })
    addLog("reduce", point, "因" + content + "减去 " + point + " 点积分");
    updateTotal(this.data.total - point);
  }
})