// pages/gift/gift.js
import {
  getGifts,
  exchangeGift,
  addLog
} from "../../db/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifts: [],
    index: [],
    cached: false
  },

  onChange: function (event) {
    const {
      index
    } = event.target.dataset;
    console.log(event, index)
    this.data.index[index] = event.detail;
    this.setData({
      index: this.data.index
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      active: 1
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
  init: function () {
    getGifts().then(res => {
      this.setData({
        gifts: res.data,
        index: Array.from({
          length: res.data.length
        }, (v, k) => 1)
      })
    }).catch(err => {
      wx.showToast({
        title: '获取礼物清单失败: ' + err,
      })
    })
  },
  exchange(event) {
    const {
      index
    } = event.target.dataset;
    const number = this.data.index[index];
    const gift = this.data.gifts[index];
    wx.showModal({
      content: `将兑换 ${number} 个 ${gift.title}, 需要 ${gift.point * number} 积分`,
      success(res) {
        if (res.confirm) {
          exchangeGift(gift._id, gift.point, number).then(res => {
            if (!res) {
              wx.showToast({
                title: '积分不足',
                icon: 'error'
              })
              return
            }
            wx.showToast({
              title: '兑换成功',
              icon: 'none'
            })
            addLog("reduce", gift.point, "兑换: " + gift.title)
          }).catch(err => {
            wx.showToast({
              title: '兑换失败: ' + err,
              icon: 'none'
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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