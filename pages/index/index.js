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
      updateTotal(total );
    }
  },
})