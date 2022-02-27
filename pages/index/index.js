// index.js
import {
  getReward,
  removeReward,
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
    cached: false,
    hasMore: true,
    page: 0
  },
  addPoint: function (point, content) {
    // return 
    const total = this.data.total + point;
    this.setData({
      total: total
    })

    if (point >= 0) {
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
        reward: res.data,
        page: 1
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
        icon: "none"
      })
    })
  },
  onClick: function (event) {
    const that = this;
    const position = event.detail;
    const {
      id,
      point,
      content,
      index
    } = event.target.dataset;
    console.log(id, point, position)
    switch (position) {
      case "cell":
        let title;
        if (point < 0) {
          title = "确定减少 " + -point + " 积分?"
        } else {
          title = "确定增加 " + point + " 积分?";
        }
        wx.showModal({
          content: title,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.addPoint(point, content)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        break;
      case "right":
        wx.showModal({
          content: '确定删除该方案？',
          success(res) {
            if (res.confirm) {
              removeReward(id).then(res => {
                let reward = that.data.reward;
                reward.splice(index, 1)
                that.setData({
                  reward: reward
                })
                wx.showToast({
                  title: '删除成功',
                })
              }).catch(err => {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                })
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        break;
      default:
        console.log("default")
    }
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
  },
  onReachBottom: function () {
    console.log("到底")
    const {
      hasMore,
      page
    } = this.data;

    if (hasMore) {
      wx.showLoading({
        "title": "获取数据中"
      })
      getReward(page).then(res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '暂无更多数据',
            icon: 'none'
          })
          this.setData({
            hasMore: false
          })
          return
        }
        this.setData({
          reward: this.data.reward.concat(res.data),
          page: page + 1
        })
        wx.hideLoading()
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '获取数据失败: ' + err,
          icon: "none"
        })
      })
    }
  }
})